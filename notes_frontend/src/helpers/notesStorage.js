const STORAGE_KEY = 'notes_app_items_v1';

// PUBLIC_INTERFACE
export function loadNotesFromStorage() {
  /** Load notes array from localStorage with safe parsing. */
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data
      .filter(n => n && typeof n.id === 'string')
      .map(n => ({
        id: String(n.id),
        title: String(n.title || ''),
        content: String(n.content || ''),
        createdAt: Number(n.createdAt || Date.now()),
        updatedAt: Number(n.updatedAt || Date.now())
      }));
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotesToStorage(notes) {
  /** Persist notes array into localStorage. */
  try {
    const safe = Array.isArray(notes) ? notes : [];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch {
    // ignore storage errors (private mode, quota)
  }
}

// PUBLIC_INTERFACE
export function generateId() {
  /** Generate a simple unique ID for notes. */
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// PUBLIC_INTERFACE
export function sortNotesByUpdated(list) {
  /** Sort notes by updatedAt desc. */
  return [...list].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

// PUBLIC_INTERFACE
export function getPreview(content, len = 120) {
  /** Get a content plain text preview trimmed to len. */
  const text = String(content || '').replace(/\s+/g, ' ').trim();
  if (text.length <= len) return text;
  return `${text.slice(0, len - 1)}…`;
}
