"use client";
import Button from "../../ui/buttons/button/button";
import { notesApi } from "@/app/api/contentRoutes";
import { useState } from "react";

const QuickNote = () => {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim() || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      await notesApi.createNote("Nota rápida", content.trim(), null);
      setContent("");
      alert("Nota guardada exitosamente");
    } catch (error) {
      console.error("Error saving quick note:", error);
      alert("Error al guardar la nota. Por favor, intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative h-full">
      <Button
        icon="save"
        classList="absolute z-20 bottom-4 left-4"
        variant="cta"
        onClick={handleSave}
        disabled={isSaving || !content.trim()}
      />
      <textarea
        name=""
        id=""
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nota rapida: Lo que escribas aqui se guardara con tus notas sin clasificar"
        className="border-border border rounded-xl p-2 grow resize-none bg-neutral w-full h-full"
        disabled={isSaving}
      ></textarea>
    </div>
  );
};

export default QuickNote;
