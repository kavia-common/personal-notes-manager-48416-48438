import React from 'react';
import { useNotes } from '../context/NotesContext';

// PUBLIC_INTERFACE
export default function EmptyState() {
  /** Overlay helper shown when there is no active note. */
  const { activeId, createNote } = useNotes();
  if (activeId) return null;

  return (
    <div className="empty-state" aria-live="polite">
      <div className="empty-card">
        <h3>Welcome to Ocean Notes</h3>
        <p>Create your first note to get started.</p>
        <p>
          Tip: Use <kbd>Search</kbd> in the sidebar to quickly find notes.
        </p>
        <button className="btn btn-primary" onClick={createNote} aria-label="Create your first note">
          + New Note
        </button>
      </div>
    </div>
  );
}
