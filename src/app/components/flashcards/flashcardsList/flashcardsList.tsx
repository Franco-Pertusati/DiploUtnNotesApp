"use client";
import { flashcardsApi, Note, notesApi } from "@/app/api/contentRoutes";
import { useEffect, useState } from "react";
import FlashcardFolder from "../../notes/flashcardFolder/flashcardFolder";
import LoadingSpin from "../../loadingSpin/loadingSpin";

const FlashcardsList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const allNotes = await notesApi.getAllNotes();
      
      const notesWithFlashcards = await Promise.all(
        allNotes.map(async (note: Note) => {
          try {
            const flashcards = await flashcardsApi.getByNoteId(note.id);
            return flashcards && flashcards.length > 0 ? note : null;
          } catch {
            return null;
          }
        })
      );
      
      const filteredNotes = notesWithFlashcards.filter((note): note is Note => note !== null);
      
      const sortedNotes = filteredNotes.sort((a: Note, b: Note) => {
        const dateA = new Date(a.updated_at || a.created_at).getTime();
        const dateB = new Date(b.updated_at || b.created_at).getTime();
        return dateB - dateA;
      });
      
      setNotes(sortedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpin />;
  }

  if (error) {
    return <div className="text-red-500 py-8">Error: {error}</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col gap-3 items-center my-24">
        <i className="material-symbols-rounded text-xl p-3 bg-neutral rounded-xl">
          description
        </i>
        <span>No hay notas con flashcards disponibles.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {notes.map((note) => (
        <FlashcardFolder key={note.id} note={note} />
      ))}
    </div>
  );
};

export default FlashcardsList;