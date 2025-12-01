const API_URL = "https://diploutnapi-production.up.railway.app";

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

export interface Note {
  id: number;
  title: string;
  content: string;
  folder_id: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

export interface Flashcard {
  id: number;
  note_id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
  next_review_date: string;
  ease_factor: number;
  review_count: number;
}

export interface CreateFlashcardData {
  note_id: number;
  question: string;
  answer: string;
}

export interface UpdateFlashcardData {
  question?: string;
  answer?: string;
}

export interface UpdateReviewData {
  ease_factor: number;
  next_review_date: string;
}


export const foldersApi = {
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

    return true;
  },
};

export const notesApi = {
  getNotes: async (folderId: number | string | null = null): Promise<Note[]> => {
    const url = folderId
      ? `${API_URL}/notes?folder_id=${folderId}`
      : `${API_URL}/notes`;

    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener notas');
    }

    return response.json();
  },

  getAllNotes: async () => {
    const response = await fetch(`${API_URL}/notes/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener notas');
    }

    return response.json();
  },

  getNote: async (id: number): Promise<Note> => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener nota');
    }

    return response.json();
  },

  createNote: async (
    title: string,
    content: string = '',
    folderId: number | null = null
  ): Promise<Note> => {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        folder_id: folderId,
      }),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al crear nota');
    }

    return response.json();
  },

  updateNote: async (
    id: number,
    updates: {
      title?: string;
      content?: string;
      folder_id?: number | null;
    }
  ): Promise<Note> => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al actualizar nota');
    }

    return response.json();
  },

  deleteNote: async (id: number): Promise<boolean> => {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al eliminar nota');
    }

    return true;
  },
};

export const flashcardsApi = {
  create: async (data: CreateFlashcardData): Promise<Flashcard> => {
    const response = await fetch(`${API_URL}/flashcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al crear flashcard');
    }

    const result = await response.json();
    return result.data;
  },

  getByNoteId: async (noteId: number): Promise<Flashcard[]> => {
    const response = await fetch(`${API_URL}/flashcards/note/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener flashcards');
    }

    const result = await response.json();
    return result.data;
  },

  getById: async (id: number): Promise<Flashcard> => {
    const response = await fetch(`${API_URL}/flashcards/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener flashcard');
    }

    const result = await response.json();
    return result.data;
  },

  getAllByUser: async (): Promise<Flashcard[]> => {
    const response = await fetch(`${API_URL}/flashcards/user/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al obtener flashcards del usuario');
    }

    const result = await response.json();
    return result.data;
  },

  update: async (id: number, data: UpdateFlashcardData): Promise<Flashcard> => {
    const response = await fetch(`${API_URL}/flashcards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al actualizar flashcard');
    }

    const result = await response.json();
    return result.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/flashcards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al eliminar flashcard');
    }
  },

  updateReview: async (id: number, data: UpdateReviewData): Promise<void> => {
    const response = await fetch(`${API_URL}/flashcards/${id}/review`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error?.message || 'Error al actualizar datos de revisión');
    }
  },
};