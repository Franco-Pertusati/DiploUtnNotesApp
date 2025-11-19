const API_URL = 'http://localhost:3000';

export interface Folder {
  id: number;
  name: string;
  parent_folder_id: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface FolderContent {
  folders: Array<{
    id: number;
    name: string;
    parent_folder_id: number;
    created_at: string;
  }>;
  notes: Array<{
    id: number;
    title: string;
    folder_id: number;
    created_at: string;
  }>;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

export const foldersApi = {
  // GET /api/folders - Obtener carpetas
  getFolders: async (parentId: number | null = null): Promise<Folder[]> => {
    const url = parentId 
      ? `${API_URL}/folders?parent_id=${parentId}`
      : `${API_URL}/folders`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener carpetas');
    }

    return response.json();
  },

  // GET /api/folders/:id - Obtener una carpeta específica
  getFolder: async (id: number): Promise<Folder> => {
    const response = await fetch(`${API_URL}/folders/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener carpeta');
    }

    return response.json();
  },

  // POST /api/folders - Crear carpeta
  createFolder: async (name: string, parentFolderId: number | null = null): Promise<Folder> => {
    const response = await fetch(`${API_URL}/folders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        parent_folder_id: parentFolderId,
      }),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al crear carpeta');
    }

    return response.json();
  },

  // PUT /api/folders/:id - Actualizar carpeta
  updateFolder: async (id: number, name: string): Promise<Folder> => {
    const response = await fetch(`${API_URL}/folders/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al actualizar carpeta');
    }

    return response.json();
  },

  // DELETE /api/folders/:id - Eliminar carpeta
  deleteFolder: async (id: number): Promise<boolean> => {
    const response = await fetch(`${API_URL}/folders/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al eliminar carpeta');
    }

    // 204 No Content no tiene body
    return true;
  },

  // GET /api/folders/:id/content - Obtener contenido de carpeta
  getFolderContent: async (id: number): Promise<FolderContent> => {
    const response = await fetch(`${API_URL}/folders/${id}/content`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener contenido');
    }

    return response.json();
  },
};