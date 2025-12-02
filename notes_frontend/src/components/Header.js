import React, { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';

// PUBLIC_INTERFACE
export default function Header() {
  /** Top navigation with branding, theme toggle, and quick actions. */
  const { createNote } = useNotes();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <header className="header" role="banner" aria-label="Top navigation">
      <div className="header-inner">
        <div className="brand" aria-label="App brand">
          <div className="brand-badge" aria-hidden="true">🗒️</div>
          <div className="brand-title">Ocean Notes</div>
        </div>
        <div className="header-actions" role="group" aria-label="Header actions">
          <button className="btn btn-primary" onClick={createNote} aria-label="Create new note">
            + New Note
          </button>
          <button
            className="btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
