"use client";
import { foldersApi } from "@/app/api/foldersApi";
import { notesApi } from "@/app/api/notesApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../page/page-header/page-header";
import Button from "../../ui/buttons/button/button";
import FoldersList from "../foldersList/foldersList";


type CreatingType = "folder" | "note" | null;

const FoldersContainer = () => {
    const searchParams = useSearchParams();
    
    const currentFolderId = searchParams.get("folder_id") 
      ? parseInt(searchParams.get("folder_id")!) 
      : null;
  
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
          await foldersApi.createFolder(itemName.trim(), currentFolderId);
          console.log("Carpeta creada exitosamente");
        } else if (isCreating === "note") {
          await notesApi.createNote(itemName.trim(), "", currentFolderId);
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

        <div className="flex flex-col gap-2 relative">
          {isCreating && (
            <form 
              onSubmit={handleSubmit} 
              className="flex rounded-lg mb-2 z-10 absolute bg-neutral w-full"
            >
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
  );
};

export default FoldersContainer;
