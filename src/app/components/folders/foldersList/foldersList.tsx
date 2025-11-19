"use client";

import { useState, useEffect } from "react";
import { Folder, foldersApi } from "../../../api/foldersApi";

interface FoldersListProps {
  refresh?: number;
}

export default function FoldersList({ refresh = 0 }: FoldersListProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFolders();
  }, [refresh]);

  const loadFolders = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await foldersApi.getFolders();
      setFolders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div className="text-center py-8">Cargando carpetas...</div>;
  if (error) return <div className="text-danger py-8">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <span>{`Numero de carpetas: ${folders.length}`}</span>
    </div>
  );
}
