import React from 'react';
import './App.css';
import { NotesProvider } from './context/NotesContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import EmptyState from './components/EmptyState';

// PUBLIC_INTERFACE
function App() {
  /** Main application layout with Ocean Professional theme. Renders:
   * - Header with brand and theme toggle
   * - Sidebar with search, new note, and list
   * - Editor for the active note, or an EmptyState prompt
   */
  return (
    <NotesProvider>
      <div className="app-root" data-theme="light">
        <Header />
        <main className="app-main" role="main">
          <Sidebar />
          <section className="editor-wrapper" aria-label="Editor panel">
            <Editor />
            <EmptyState />
          </section>
        </main>
      </div>
    </NotesProvider>
  );
}

export default App;
