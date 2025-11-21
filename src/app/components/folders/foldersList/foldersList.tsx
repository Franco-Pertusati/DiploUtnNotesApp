"use client";
import { Folder, foldersApi } from "@/app/api/foldersApi";
import { Note, notesApi } from "@/app/api/notesApi";
import { useState, useEffect } from "react";
import Button from "../../ui/buttons/button/button";
import useDialog from "@/lib/dialogs/useDialog";
import EditNoteDialog from "../../dialogs/editNoteDialog/editNoteDialog";

interface FoldersListProps {
  refresh?: number;
}

export default function FoldersList({ refresh = 0 }: FoldersListProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dialog = useDialog();

  useEffect(() => {
    loadContent();
  }, [refresh]);

  const loadContent = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const [foldersData, notesData] = await Promise.all([
        foldersApi.getFolders(null),
        notesApi.getNotes(null),
      ]);

      setFolders(foldersData);
      setNotes(notesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando contenido...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-8">Error: {error}</div>;
  }

  if (folders.length === 0 && notes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay carpetas ni documentos. ¡Crea tu primer elemento!
      </div>
    );
  }

  const combined = [
    ...folders.map((f) => ({ ...f, type: "folder" as const })),
    ...notes.map((n) => ({ ...n, type: "note" as const })),
  ].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  function openNote(noteData: Note) {
    dialog.show(EditNoteDialog, noteData, {
      width: '50%',
      height: '65%'
    })
  }

  return (
    <div className="flex flex-col">
      {combined.map((item) => (
        <div
          key={`${item.type}-${item.id}`}
          className="px-1.5 hover:bg-gray-50 cursor-pointer hover:bg-neutral rounded-lg"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              <i className="material-symbols-rounded">
                {item.type === "folder" ? "folder" : "text_snippet"}
              </i>

              <button className="font-medium truncate" onClick={() => item.type === "note" && openNote(item as Note)}>
                {item.type === "folder" ? item.name : item.title}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">
                {new Date(item.created_at).toLocaleDateString()}
              </p>
              <Button icon="more_vert" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
