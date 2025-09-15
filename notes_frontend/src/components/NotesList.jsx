import React from 'react';
import NoteItem from './NotesListItem';

/**
 * NotesList renders a responsive grid of notes.
 * Props:
 * - notes: Array<Note>
 * - onEdit: (note) => void
 * - onDelete: (id) => void
 */
export default function NotesList({ notes, onEdit, onDelete }) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <NoteItem note={note} onEdit={() => onEdit(note)} onDelete={() => onDelete(note.id)} />
        </div>
      ))}
    </div>
  );
}
