import React from 'react';

/**
 * ConfirmDialog displays a blocking confirmation modal.
 * Props:
 * - title: string
 * - message: string
 * - confirmLabel?: string
 * - cancelLabel?: string
 * - confirmType?: 'danger' | 'primary'
 * - onConfirm: () => void
 * - onCancel: () => void
 */
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmType = 'primary',
  onConfirm,
  onCancel,
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal" role="document" aria-label="Confirmation dialog">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="btn secondary" onClick={onCancel} aria-label="Close">Close</button>
        </div>
        <p style={{ marginBottom: 12 }}>{message}</p>
        <div className="modal-actions">
          <button className="btn secondary" onClick={onCancel}>{cancelLabel}</button>
          <button
            className={`btn ${confirmType === 'danger' ? 'danger' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
