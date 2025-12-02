import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { generateId, getPreview, loadNotesFromStorage, saveNotesToStorage, sortNotesByUpdated } from '../helpers/notesStorage';

/**
 * Notes data shape:
 * { id: string, title: string, content: string, createdAt: number, updatedAt: number }
 */

const NotesContext = createContext(null);

// PUBLIC_INTERFACE
export function useNotes() {
  /** Accessor hook to get notes state and actions */
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /** Provider that handles notes lifecycle and localStorage persistence. */
  const [notes, setNotes] = useState(() => sortNotesByUpdated(loadNotesFromStorage()));
  const [activeId, setActiveId] = useState(notes[0]?.id ?? null);
  const [query, setQuery] = useState('');

  // Persist to storage whenever notes change
  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const createNote = useCallback(() => {
    const now = Date.now();
    const newNote = {
      id: generateId(),
      title: 'Untitled note',
      content: '',
      createdAt: now,
      updatedAt: now
    };
    setNotes(prev => sortNotesByUpdated([newNote, ...prev]));
    setActiveId(newNote.id);
    return newNote.id;
  }, []);

  const updateNote = useCallback((id, fields) => {
    setNotes(prev => {
      const next = prev.map(n => n.id === id ? { ...n, ...fields, updatedAt: Date.now() } : n);
      return sortNotesByUpdated(next);
    });
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    setActiveId(prev => (prev === id ? null : prev));
  }, []);

  const activeNote = useMemo(() => notes.find(n => n.id === activeId) ?? null, [notes, activeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n => {
      return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    });
  }, [notes, query]);

  const value = useMemo(() => ({
    notes,
    filtered,
    activeId,
    activeNote,
    query,
    setQuery,
    setActiveId,
    createNote,
    updateNote,
    deleteNote,
    getPreview
  }), [notes, filtered, activeId, activeNote, query, createNote, updateNote, deleteNote]);

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
