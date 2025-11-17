'use client';

import { useState, useEffect } from 'react';
import { Folder, foldersApi } from '../../../api/foldersApi'

export default function FoldersList() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await foldersApi.getFolders();
      setFolders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async (name: string): Promise<void> => {
    try {
      await foldersApi.createFolder(name);
      loadFolders(); // Recargar lista
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al crear carpeta');
    }
  };

  const handleDeleteFolder = async (id: number): Promise<void> => {
    try {
      await foldersApi.deleteFolder(id);
      loadFolders(); // Recargar lista
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar carpeta');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div></div>
  );
}