"use client";
import { Note, notesApi } from "@/app/api/contentRoutes";
import { useState, useEffect } from "react";
import useDialog from "@/lib/dialogs/useDialog";
import EditNoteDialog from "../../dialogs/editNoteDialog/editNoteDialog";
import ConfirmActionDialog from "../../dialogs/confirmActionDialog/confirmActionDialog";
import NoteItem from "../noteItem/noteItem";

interface NotesByEditDateProps {
  limit?: number;
  showActions?: boolean;
}

const NotesByEditDate = ({ limit, showActions = true }: NotesByEditDateProps) => {
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

      const allNotes = await notesApi.getNotes(undefined);

      const sortedNotes = allNotes.sort((a, b) => {
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

  const deleteNote = async (note: Note, e: React.MouseEvent) => {
    e.stopPropagation();
    dialog.show(ConfirmActionDialog, {
      message: `¿Estás seguro de que deseas eliminar la nota "${note.title}"?`,
      onConfirm: async () => {
        try {
          await notesApi.deleteNote(note.id);
          loadNotes();
        } catch (err) {
          alert(err instanceof Error ? err.message : "Error al eliminar nota");
        }
      },
    });
  };

  if (loading) {
    return <div className="text-center py-8">Cargando notas...</div>;
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
      <h2 className="text-lg font-semibold mb-2">Notas recientes</h2>
      <div className="flex flex-col">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onOpen={openNote}
            onDelete={showActions ? deleteNote : undefined}
            showActions={showActions}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesByEditDate;