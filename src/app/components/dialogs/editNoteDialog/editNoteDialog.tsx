"use client";
import { Note, notesApi } from "@/app/api/contentRoutes";
import { flashcardsApi } from "@/app/api/contentRoutes";
import Button from "../../ui/buttons/button/button";
import { useEffect, useRef, useState, KeyboardEvent } from "react";

interface Flashcard {
  tempId: string;
  id?: number;
  question: string;
  answer: string;
}

interface EditNoteDialogProps extends Note {
  onClose?: () => void;
}

const EditNoteDialog = (props: EditNoteDialogProps) => {
  const { id, title, content, onClose } = props;
  const [editedContent, setEditedContent] = useState(content);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeTab, setActiveTab] = useState<"content" | "flashcards">("content");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const parseFlashcard = (line: string): { question: string; answer: string } | null => {
    const match = line.match(/^(.+?)\s*==\s*(.+)$/);

    if (!match) return null;

    const question = match[1].trim();
    const answer = match[2].trim();

    if (!question || !answer) return null;

    return { question, answer };
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = editedContent.substring(0, cursorPos);
    const currentLine = textBeforeCursor.split("\n").pop() || "";

    const parsed = parseFlashcard(currentLine);

    if (parsed) {
      e.preventDefault();

      const tempId = `temp_${Date.now()}`;
      const newFlashcard: Flashcard = {
        tempId,
        question: parsed.question,
        answer: parsed.answer,
      };

      setFlashcards((prev) => [...prev, newFlashcard]);

      const lines = editedContent.split("\n");
      const lineIndex = textBeforeCursor.split("\n").length - 1;
      lines.splice(lineIndex, 1);
      setEditedContent(lines.join("\n"));

      try {
        const createdFlashcard = await flashcardsApi.create({
          note_id: id,
          question: parsed.question,
          answer: parsed.answer,
        });

        setFlashcards((prev) =>
          prev.map((fc) =>
            fc.tempId === tempId
              ? { ...fc, id: createdFlashcard.id }
              : fc
          )
        );
      } catch (err) {
        setFlashcards((prev) => prev.filter((fc) => fc.tempId !== tempId));
        setError(err instanceof Error ? err.message : "Error al crear flashcard");
        
        const restoredLines = editedContent.split("\n");
        restoredLines.splice(lineIndex, 0, currentLine);
        setEditedContent(restoredLines.join("\n"));
      }
    }
  };

  const handleDeleteFlashcard = async (flashcard: Flashcard) => {
    setFlashcards((prev) => prev.filter((fc) => fc.tempId !== flashcard.tempId));

    if (flashcard.id) {
      try {
        await flashcardsApi.delete(flashcard.id);
      } catch (err) {
        setFlashcards((prev) => [...prev, flashcard]);
        setError(err instanceof Error ? err.message : "Error al eliminar flashcard");
      }
    }
  };

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
    const loadFlashcards = async () => {
      try {
        const existingFlashcards = await flashcardsApi.getByNoteId(id);
        setFlashcards(
          existingFlashcards.map((fc) => ({
            tempId: fc.id.toString(),
            id: fc.id,
            question: fc.question,
            answer: fc.answer,
          }))
        );
      } catch (err) {
        console.error("Error loading flashcards:", err);
        setError("Error al cargar flashcards");
      }
    };

    loadFlashcards();
    textareaRef.current?.focus();
  }, [id]);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between items-center">
        <span className="text-3xl">{title}</span>
        <div className="flex gap-2 p-1 rounded-lg border border-border">
          <Button
            label="Contenido"
            variant={activeTab === "content" ? "cta" : "text"}
            onClick={() => setActiveTab("content")}
          />
          <Button
            label={`Flashcards (${flashcards.length})`}
            variant={activeTab === "flashcards" ? "cta" : "text"}
            onClick={() => setActiveTab("flashcards")}
          />
        </div>
      </div>

      <div className="grow overflow-auto">
        {activeTab === "content" ? (
          <textarea
            ref={textareaRef}
            className="focus:outline-none border-border border rounded p-2 w-full h-full resize-none bg-neutral"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu nota... Para crear flashcards usa: pregunta == respuesta"
          />
        ) : (
          <div className="flex flex-col gap-2">
            {flashcards.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No hay flashcards aún. Crea una escribiendo: pregunta == respuesta
              </div>
            ) : (
              flashcards.map((fc) => (
                <div
                  key={fc.tempId}
                  className="flex items-center justify-between p-3 w-full rounded bg-main-400 text-dark"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{fc.question}</span>
                    <i className="material-symbols-rounded">arrow_forward</i>
                    <span>{fc.answer}</span>
                  </div>
                  <Button icon="delete" onClick={() => handleDeleteFlashcard(fc)} />
                </div>
              ))
            )}
          </div>
        )}
      </div>

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