import { Note, notesApi } from "@/app/api/contentRoutes";
import Button from "../../ui/buttons/button/button";
import useDialog from "@/lib/dialogs/useDialog";
import ConfirmActionDialog from "../../dialogs/confirmActionDialog/confirmActionDialog";
import { useState, useRef, useEffect } from "react";

interface NoteItemProps {
  note: Note;
  onOpen?: (note: Note) => void;
  onUpdate?: () => void;
  showActions?: boolean;
}

export default function NoteItem({
  note,
  onOpen,
  onUpdate,
  showActions = true,
}: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialog = useDialog();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditTitle(note.title);
    setIsEditing(true);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    dialog.show(ConfirmActionDialog, {
      message: `¿Estás seguro de que deseas eliminar la nota "${note.title}"?`,
      onConfirm: async () => {
        try {
          await notesApi.deleteNote(note.id);
          onUpdate?.();
        } catch (error) {
          console.error("Error deleting note:", error);
          alert("Error al eliminar la nota. Por favor, intenta de nuevo.");
        }
      },
    });
  };

  const handleSubmit = async () => {
    if (!editTitle.trim() || editTitle === note.title || isSubmitting) {
      setIsEditing(false);
      setEditTitle(note.title);
      return;
    }

    try {
      setIsSubmitting(true);
      await notesApi.updateNote(note.id, { title: editTitle.trim() });
      setIsEditing(false);
      onUpdate?.();
    } catch (error) {
      console.error("Error renaming note:", error);
      alert("Error al renombrar la nota. Por favor, intenta de nuevo.");
      setEditTitle(note.title);
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditTitle(note.title);
    }
  };

  const handleBlur = () => {
    if (!isSubmitting) {
      setIsEditing(false);
      setEditTitle(note.title);
    }
  };

  return (
    <div className="px-2 hover:bg-gray-50 cursor-pointer rounded-lg group hover:bg-neutral h-9">
      <div className="flex items-center justify-between gap-2 relative">
        <div className="flex gap-2 items-center flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="absolute bg-neutral border border-border rounded h-9 top-0 -left-1 z-10 px-2"
              placeholder="Nuevo título"
              disabled={isSubmitting}
            />
          ) : (
            <>
              <i className="material-symbols-rounded">text_snippet</i>
              <button
                className="font-medium truncate text-left"
                onClick={() => onOpen?.(note)}
              >
                {note.title}
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showActions && !isEditing && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100">
              <Button icon="delete" onClick={handleDelete} />
              <Button icon="edit" onClick={handleEdit} />
            </div>
          )}
          <p className="text-gray-500 text-sm">
            {new Date(note.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}