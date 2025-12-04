"use client";
import { Folder, foldersApi, Note, notesApi } from "@/app/api/contentRoutes";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDialog from "@/lib/dialogs/useDialog";
import EditNoteDialog from "../../dialogs/editNoteDialog/editNoteDialog";
import ConfirmActionDialog from "../../dialogs/confirmActionDialog/confirmActionDialog";
import Button from "../../ui/buttons/button/button";
import Breadcrumb from "../../breadcrumb/breadcrumb";
import FolderItem from "../folderItem/folderItem";
import NoteItem from "../../notes/noteItem/noteItem";
import LoadingSpin from "../../loadingSpin/loadingSpin";

interface FoldersListProps {
  refresh?: number;
}

export default function FoldersList({ refresh = 0 }: FoldersListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFolderId = searchParams.get("folder_id")
    ? parseInt(searchParams.get("folder_id")!)
    : null;

  const [folders, setFolders] = useState<Folder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<
    Array<{ id: number | null; name: string }>
  >([{ id: null, name: "Mis documentos" }]);
  const dialog = useDialog();

  useEffect(() => {
    loadContent();
    loadBreadcrumbPath();
  }, [refresh, currentFolderId]);

  const loadContent = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const [foldersData, notesData] = await Promise.all([
        foldersApi.getFolders(currentFolderId),
        notesApi.getNotes(currentFolderId),
      ]);
      setFolders(foldersData);
      setNotes(notesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const loadBreadcrumbPath = async (): Promise<void> => {
    if (!currentFolderId) {
      setFolderPath([{ id: null, name: "Mis documentos" }]);
      return;
    }

    try {
      const path: Array<{ id: number | null; name: string }> = [];

      let folderId: number | null = currentFolderId;
      const visited = new Set<number>();

      while (folderId !== null && !visited.has(folderId)) {
        visited.add(folderId);
        const folder = await foldersApi.getFolder(folderId);
        path.unshift({ id: folder.id, name: folder.name });
        folderId = folder.parent_folder_id;
      }

      path.unshift({ id: null, name: "Mis documentos" });
      setFolderPath(path);
    } catch (err) {
      console.error("Error loading breadcrumb path:", err);
      setFolderPath([
        { id: null, name: "Mis documentos" },
        { id: currentFolderId, name: "..." },
      ]);
    }
  };

  const navigateToFolder = (folder: Folder) => {
    router.push(`/folders?folder_id=${folder.id}`);
  };

  const navigateToBreadcrumb = (index: number) => {
    const targetFolder = folderPath[index];
    if (targetFolder.id === null) {
      router.push("/folders");
    } else {
      router.push(`/folders?folder_id=${targetFolder.id}`);
    }
  };

  const goBack = () => {
    if (folderPath.length > 1) {
      const parentFolder = folderPath[folderPath.length - 2];
      if (parentFolder.id === null) {
        router.push("/folders");
      } else {
        router.push(`/folders?folder_id=${parentFolder.id}`);
      }
    }
  };

  function openNote(noteData: Note) {
    dialog.show(EditNoteDialog, noteData, {
      width: "50%",
      height: "65%",
    });
  }

  const deleteFolder = async (folder: Folder, e: React.MouseEvent) => {
    e.stopPropagation();
    dialog.show(ConfirmActionDialog, {
      message: `¿Estás seguro de que deseas eliminar la carpeta "${folder.name}"?`,
      onConfirm: async () => {
        try {
          await foldersApi.deleteFolder(folder.id);
          loadContent();
        } catch (err) {
          alert(
            err instanceof Error ? err.message : "Error al eliminar carpeta"
          );
        }
      },
    });
  };

  if (loading) {
    return <LoadingSpin />;
  }

  if (error) {
    return <div className="text-red-500 py-8">Error: {error}</div>;
  }

  const combined = [
    ...folders.map((f) => ({ ...f, type: "folder" as const })),
    ...notes.map((n) => ({ ...n, type: "note" as const })),
  ].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {folderPath.length > 1 && <Button icon="arrow_back" onClick={goBack} />}
        <Breadcrumb
          levels={folderPath.map((f) => f.name)}
          onNavigate={navigateToBreadcrumb}
        />
      </div>

      {combined.length === 0 ? (
        <div className="flex flex-col gap-3 items-center my-24">
          <i className="material-symbols-rounded text-xl p-3 bg-neutral rounded-xl">
            folder_open
          </i>
          <span>Carpeta vacia, prueba a crear tu primer contenido.</span>
        </div>
      ) : (
        <div className="flex flex-col">
          {combined.map((item) =>
            item.type === "folder" ? (
              <FolderItem
                key={`folder-${item.id}`}
                folder={item as Folder}
                onOpen={navigateToFolder}
                onDelete={deleteFolder}
              />
            ) : (
              <NoteItem
                key={`note-${item.id}`}
                note={item as Note}
                onOpen={openNote}
                onUpdate={loadContent}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
