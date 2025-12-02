import React from 'react';
import { useNotes } from '../context/NotesContext';
import NoteList from './NoteList';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar with search, new note button, and scrollable list. */
  const { query, setQuery, createNote } = useNotes();

  return (
    <aside className="sidebar" aria-label="Notes sidebar">
      <div className="sidebar-header">
        <div className="search">
          <span className="icon" aria-hidden="true">🔎</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={createNote} aria-label="Create new note from sidebar">
            + New Note
          </button>
        </div>
      </div>
      <NoteList />
    </aside>
  );
}
