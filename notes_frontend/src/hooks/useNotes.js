import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { notesStorage } from '../services/notesStorage';

/**
 * NotesContext provides notes data and CRUD operations to the UI.
 */
const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    let active = true;
    (async () => {
      const data = await notesStorage.getAll();
      if (active) {
        setNotes(data);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // PUBLIC_INTERFACE
  const addNote = useCallback(async (note) => {
    /**
     * Add a new note.
     * Params: note { title: string, content: string }
     * Returns: saved note with id and timestamps
     */
    const saved = await notesStorage.create(note);
    setNotes((prev) => [saved, ...prev]);
    return saved;
  }, []);

  // PUBLIC_INTERFACE
  const updateNote = useCallback(async (id, updates) => {
    /**
     * Update an existing note by id.
     * Params: id: string, updates: Partial<{title: string, content: string}>
     * Returns: updated note
     */
    const saved = await notesStorage.update(id, updates);
    setNotes((prev) => prev.map((n) => (n.id === id ? saved : n)));
    return saved;
  }, []);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback(async (id) => {
    /**
     * Delete a note by id.
     * Params: id: string
     * Returns: void
     */
    await notesStorage.remove(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // PUBLIC_INTERFACE
  const getNote = useCallback((id) => {
    /**
     * Get a note by id from current state (sync).
     * Params: id: string
     * Returns: note | undefined
     */
    return notes.find((n) => n.id === id);
  }, [notes]);

  const value = useMemo(
    () => ({ notes, loading, addNote, updateNote, deleteNote, getNote }),
    [notes, loading, addNote, updateNote, deleteNote, getNote]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Access the notes context with data and CRUD operations. */
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
