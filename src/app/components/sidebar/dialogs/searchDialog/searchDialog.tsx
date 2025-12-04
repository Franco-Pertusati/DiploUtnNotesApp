import { Note, notesApi } from '@/app/api/contentRoutes';
import LoadingSpin from '@/app/components/loadingSpin/loadingSpin';
import NoteItem from '@/app/components/notes/noteItem/noteItem';
import { useState, useEffect } from 'react';

const SearchDialog = ({ onClose }: { onClose?: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await notesApi.getAllNotes();
        setAllNotes(data);
        setFilteredNotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredNotes(allNotes);
    } else {
      const filtered = allNotes.filter(note =>
        note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [searchTerm, allNotes]);

  return (
    <div className="flex flex-col gap-2 w-5xl">
      <div className="w-full">
        <input
          type="text"
          placeholder="Escribe para buscar entre tus notas"
          className="p-2 rounded w-full focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full mt-4">
        {loading ? (
          <LoadingSpin />
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            {searchTerm ? 'No se encontraron notas' : 'No tienes notas'}
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {filteredNotes.map((n) => (
             <NoteItem note={n} key={n.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDialog;