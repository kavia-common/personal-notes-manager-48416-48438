import React, { memo } from 'react';
import { useNotes } from '../context/NotesContext';

function formatTime(ts) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleString();
  }
}

// PUBLIC_INTERFACE
function NoteItem({ note, active, onSelect }) {
  /** Single note list item card. */
  const { getPreview } = useNotes();

  return (
    <li
      role="option"
      aria-selected={active}
      className={`note-item ${active ? 'active' : ''}`}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      tabIndex={0}
    >
      <h4 title={note.title || 'Untitled'}>{note.title || 'Untitled'}</h4>
      <p>{getPreview(note.content)}</p>
      <time dateTime={new Date(note.updatedAt).toISOString()}>
        Updated {formatTime(note.updatedAt)}
      </time>
    </li>
  );
}

export default memo(NoteItem);
