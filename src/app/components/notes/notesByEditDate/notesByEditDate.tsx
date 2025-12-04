"use client";
import { Note, notesApi } from "@/app/api/contentRoutes";
import { useState, useEffect } from "react";
import useDialog from "@/lib/dialogs/useDialog";
import EditNoteDialog from "../../dialogs/editNoteDialog/editNoteDialog";
import NoteItem from "../noteItem/noteItem";
import LoadingSpin from "../../loadingSpin/loadingSpin";

interface NotesByEditDateProps {
  limit?: number;
  showActions?: boolean;
}

const NotesByEditDate = ({
  limit,
  showActions = true,
}: NotesByEditDateProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dialog = useDialog();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const allNotes = await notesApi.getAllNotes();

      const sortedNotes = allNotes.sort((a: Note, b: Note) => {
        const dateA = new Date(a.updated_at || a.created_at).getTime();
        const dateB = new Date(b.updated_at || b.created_at).getTime();
        return dateB - dateA;
      });

      const limitedNotes = limit ? sortedNotes.slice(0, limit) : sortedNotes;

      setNotes(limitedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const openNote = (note: Note) => {
    dialog.show(EditNoteDialog, note, {
      width: "50%",
      height: "65%",
    });
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
        <span>No hay notas disponibles.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onOpen={openNote}
            showActions={showActions}
            onUpdate={loadNotes}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesByEditDate;
