import React, { useEffect, useMemo, useState } from 'react';

/**
 * NoteForm handles both creation and editing of notes.
 * Props:
 * - initialValues?: { title: string, content: string }
 * - onSubmit: (values) => Promise|void
 * - submitLabel?: string
 */
export default function NoteForm({ initialValues, onSubmit, submitLabel = 'Save' }) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const isValid = useMemo(() => title.trim().length > 0 || content.trim().length > 0, [title, content]);

  useEffect(() => {
    setTitle(initialValues?.title || '');
    setContent(initialValues?.content || '');
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setTouched(true);
    if (!isValid) return;
    try {
      setSubmitting(true);
      await onSubmit({ title: title.trim(), content: content.trim() });
      // reset only for creation flows (no initial values)
      if (!initialValues) {
        setTitle('');
        setContent('');
        setTouched(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Note form">
      <div className="grid">
        <div className="col-12">
          <label htmlFor="note-title" className="muted">Title</label>
          <input
            id="note-title"
            className="input"
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched(true)}
            maxLength={160}
          />
        </div>
        <div className="col-12">
          <label htmlFor="note-content" className="muted">Content</label>
          <textarea
            id="note-content"
            className="textarea"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setTouched(true)}
            maxLength={5000}
          />
        </div>
        <div className="col-12" style={{display:'flex', gap: 10, alignItems:'center'}}>
          <button type="submit" className="btn" disabled={submitting || !isValid}>
            {submitLabel}
          </button>
          {!isValid && touched && (
            <small className="muted">Enter a title or content to continue.</small>
          )}
        </div>
      </div>
    </form>
  );
}
