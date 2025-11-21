"use client";
import { useState, useEffect, useRef } from "react";
import FoldersList from "@/app/components/folders/foldersList/foldersList";
import PageHeader from "@/app/components/page/page-header/page-header";
import Button from "@/app/components/ui/buttons/button/button";
import "@/app/globals.css";
import { foldersApi } from "@/app/api/foldersApi";
import { notesApi } from "@/app/api/notesApi";

type CreatingType = "folder" | "note" | null;

export default function FoldersPage() {
  const [isCreating, setIsCreating] = useState<CreatingType>(null);
  const [itemName, setItemName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function startCreating(type: "folder" | "note") {
    setIsCreating(type);
  }

  function cancelCreating() {
    setIsCreating(null);
    setItemName("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!itemName.trim()) {
      cancelCreating();
      return;
    }

    setIsSubmitting(true);

    try {
      if (isCreating === "folder") {
        await foldersApi.createFolder(itemName.trim(), null);
        console.log("Carpeta creada exitosamente");
      } else if (isCreating === "note") {
        await notesApi.createNote(itemName.trim(), "", null);
        console.log("Nota creada exitosamente");
      }

      setItemName("");
      setIsCreating(null);
      setRefreshCounter((prev) => prev + 1);
    } catch (err) {
      cancelCreating();
      console.error("Error al crear:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isCreating) {
        cancelCreating();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCreating]);

  return (
    <div className="overflow-y-auto h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col h-full py-3 px-6 gap-3">
        <PageHeader title="Carpetas">
          <Button
            icon="folder"
            label="Nueva carpeta"
            variant="secondary"
            onClick={() => startCreating("folder")}
            disabled={isCreating !== null}
          />
          <Button
            icon="note"
            label="Nuevo documento"
            variant="secondary"
            onClick={() => startCreating("note")}
            disabled={isCreating !== null}
          />
        </PageHeader>

        <div className="flex flex-col gap-2">
          {isCreating && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder={
                  isCreating === "folder"
                    ? "Nombre de la carpeta"
                    : "Título del documento"
                }
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="p-2 border-border border rounded flex-1"
                disabled={isSubmitting}
              />
            </form>
          )}

          <FoldersList refresh={refreshCounter} />
        </div>
      </div>
    </div>
  );
}
