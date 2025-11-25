"use client";
import { Note, notesApi } from "@/app/api/contentRoutes";
import Button from "../../ui/buttons/button/button";
import { useEffect, useRef, useState } from "react";

interface EditNoteDialogProps extends Note {
  onClose?: () => void;
}

const EditNoteDialog = (props: EditNoteDialogProps) => {
  const { id, title, content, onClose } = props;
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      await notesApi.updateNote(id, { content: editedContent });
      onClose?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar cambios");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between items-center">
        <span className="text-2xl">{title}</span>
        <Button icon="close" onClick={onClose} variant="outlined" />
      </div>

      <textarea
        ref={textareaRef}
        className="focus:outline-none border-border border rounded p-2 grow resize-none bg-neutral"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        icon="check"
        label={isSaving ? "Guardando..." : "Guardar cambios"}
        variant="cta"
        onClick={handleSave}
        disabled={isSaving}
      />
    </div>
  );
};

export default EditNoteDialog;
