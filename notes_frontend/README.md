# Ocean Notes – React Frontend

A simple personal notes manager with a modern, clean layout using the Ocean Professional theme.

## Features

- Notes list in a sidebar with search
- Create, edit (autosave), and delete notes
- Local persistence (localStorage), no backend required
- Accessible: keyboard navigation for list, ARIA labels, focus styles
- Responsive layout (sidebar stacks below editor on small screens)
- Smooth transitions, subtle shadows, rounded corners

## Tech

- React 18 + Create React App
- No UI framework; custom CSS in `src/App.css`
- State via React Context (`src/context/NotesContext.js`)

## Getting Started

Install dependencies and start:

```
npm install
npm start
```

The app runs at http://localhost:3000

Environment variables in `.env` (if present) are respected by CRA but are not required. This app does not call a backend.

## Usage

- New Note: Click “+ New Note” in header or sidebar
- Search: Filter notes by title or content
- Select: Click a note in the list to edit
- Edit: Title and content autosave after a short pause
- Delete: Use the Delete button in the editor toolbar

## Project Structure

- `src/App.js` – Main layout
- `src/App.css` – Theme and layout styles
- `src/context/NotesContext.js` – Notes state and persistence
- `src/helpers/notesStorage.js` – Storage helpers and utilities
- `src/components/` – UI components (Header, Sidebar, NoteList, NoteItem, Editor, EmptyState)

## Tests

Basic smoke test exists. No additional tests were required.

## Theme

Ocean Professional palette:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827
