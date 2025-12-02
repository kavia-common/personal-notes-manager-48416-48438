import React, { useCallback, useEffect, useRef } from 'react';
import { useNotes } from '../context/NotesContext';
import NoteItem from './NoteItem';

// PUBLIC_INTERFACE
export default function NoteList() {
  /** Virtualized-like simple list with keyboard navigation. */
  const { filtered, activeId, setActiveId } = useNotes();
  const containerRef = useRef(null);

  const onKeyDown = useCallback((e) => {
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return;
    e.preventDefault();
    const idx = filtered.findIndex(n => n.id === activeId);
    if (e.key === 'Enter') return;
    if (e.key === 'ArrowDown') {
      const next = filtered[Math.min(idx + 1, filtered.length - 1)];
      if (next) setActiveId(next.id);
    } else if (e.key === 'ArrowUp') {
      const prev = filtered[Math.max(idx - 1, 0)];
      if (prev) setActiveId(prev.id);
    }
  }, [filtered, activeId, setActiveId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <ul
      className="note-list"
      role="listbox"
      aria-label="Notes list"
      ref={containerRef}
      tabIndex={0}
    >
      {filtered.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          active={note.id === activeId}
          onSelect={() => setActiveId(note.id)}
        />
      ))}
      {filtered.length === 0 && (
        <li className="note-item" aria-live="polite">No notes found</li>
      )}
    </ul>
  );
}
