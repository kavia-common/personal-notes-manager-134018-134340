import React, { useMemo, useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import NoteForm from './NoteForm';
import NotesList from './NotesList';
import ConfirmDialog from './common/ConfirmDialog';

export default function NotesPage() {
  const { notes, loading, addNote, updateNote, deleteNote } = useNotes();
  const [editing, setEditing] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const total = useMemo(() => notes.length, [notes]);

  const handleCreate = async (values) => {
    await addNote(values);
  };

  const handleEdit = (note) => {
    setEditing(note);
  };

  const handleUpdate = async (values) => {
    if (!editing) return;
    await updateNote(editing.id, values);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    await deleteNote(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  return (
    <div className="grid">
      <section className="col-12">
        <div className="card">
          <h2 className="section-title">Create a new note</h2>
          <NoteForm
            key="create-form"
            onSubmit={handleCreate}
            submitLabel="Add Note"
          />
        </div>
      </section>

      <section className="col-12">
        <div className="spacer" />
      </section>

      <section className="col-12">
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8}}>
            <h2 className="section-title">Your notes</h2>
            <small className="muted">{total} {total === 1 ? 'note' : 'notes'}</small>
          </div>
          {loading ? (
            <p className="muted">Loading...</p>
          ) : (
            <NotesList
              notes={notes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          {!loading && notes.length === 0 && (
            <p className="muted">No notes yet. Create your first note above!</p>
          )}
        </div>
      </section>

      {editing && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal" role="document" aria-label="Edit note dialog">
            <div className="modal-header">
              <h3 className="modal-title">Edit note</h3>
              <button className="btn secondary" onClick={() => setEditing(null)} aria-label="Close">Close</button>
            </div>
            <NoteForm
              key={editing.id}
              initialValues={{ title: editing.title, content: editing.content }}
              onSubmit={handleUpdate}
              submitLabel="Save Changes"
            />
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <ConfirmDialog
          title="Delete note?"
          message="This action cannot be undone."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmType="danger"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
}
