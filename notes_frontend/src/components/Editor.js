import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNotes } from '../context/NotesContext';

function useDebouncedCallback(cb, delay) {
  const timeout = useRef(null);
  return (val) => {
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => cb(val), delay);
  };
}

// PUBLIC_INTERFACE
export default function Editor() {
  /** Editor for the active note with debounced autosave. */
  const { activeNote, updateNote, deleteNote, activeId } = useNotes();
  const [title, setTitle] = useState(activeNote?.title ?? '');
  const [content, setContent] = useState(activeNote?.content ?? '');

  // Keep local state in sync when active note changes
  useEffect(() => {
    setTitle(activeNote?.title ?? '');
    setContent(activeNote?.content ?? '');
  }, [activeNote?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const debouncedSaveTitle = useDebouncedCallback((val) => {
    if (activeNote) updateNote(activeNote.id, { title: val });
  }, 250);

  const debouncedSaveContent = useDebouncedCallback((val) => {
    if (activeNote) updateNote(activeNote.id, { content: val });
  }, 350);

  const show = Boolean(activeId);

  const handleDelete = () => {
    if (!activeId) return;
    // Confirm with user
    // eslint-disable-next-line no-restricted-globals
    const ok = window.confirm('Delete this note? This action cannot be undone.');
    if (ok) deleteNote(activeId);
  };

  const placeholder = useMemo(() => 'Start typing your note here…', []);

  return (
    <div className="editor" aria-hidden={!show}>
      {show && (
        <>
          <input
            className="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              debouncedSaveTitle(e.target.value);
            }}
            aria-label="Note title"
          />
          <textarea
            className="content"
            placeholder={placeholder}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              debouncedSaveContent(e.target.value);
            }}
            aria-label="Note content"
          />
          <div className="editor-toolbar" role="toolbar" aria-label="Editor actions">
            <button className="btn btn-danger" onClick={handleDelete} aria-label="Delete note">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
