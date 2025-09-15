import React, { useMemo } from 'react';

function formatDate(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return ts;
  }
}

export default function NotesListItem({ note, onEdit, onDelete }) {
  const subtitle = useMemo(() => {
    if (note.content) {
      const t = note.content.trim().split('\n')[0];
      return t.length > 120 ? t.slice(0, 117) + '...' : t;
    }
    return '';
  }, [note.content]);

  return (
    <article className="card" aria-label={`Note ${note.title || 'untitled'}`}>
      <h3 className="note-title">{note.title || 'Untitled'}</h3>
      <div className="note-meta">
        <span title={`Created ${formatDate(note.createdAt)}`}>Created {formatDate(note.createdAt)}</span>
        {' · '}
        <span title={`Updated ${formatDate(note.updatedAt)}`}>Updated {formatDate(note.updatedAt)}</span>
      </div>
      {subtitle && <p className="note-content">{subtitle}</p>}
      <div className="note-actions">
        <button className="btn secondary" onClick={onEdit} aria-label="Edit note">Edit</button>
        <button className="btn danger" onClick={onDelete} aria-label="Delete note">Delete</button>
      </div>
    </article>
  );
}
