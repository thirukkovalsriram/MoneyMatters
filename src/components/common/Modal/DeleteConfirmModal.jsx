import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import ModalShell from './ModalShell';
import DangerButton from '../Button/DangerButton';
import SecondaryButton from '../Button/SecondaryButton';

/**
 * Delete Confirmation Modal
 * @param {Object} props
 * @param {Object} props.transaction
 * @param {() => void} props.onClose
 * @param {(id: number|string) => Promise<void>} props.onConfirm
 */
export function DeleteConfirmModal({ transaction, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError('');
      await onConfirm(transaction.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete transaction');
      setIsDeleting(false);
    }
  };

  const transactionName = transaction?.transaction_name || transaction?.name || 'this transaction';

  return (
    <ModalShell title="Delete Transaction" onClose={onClose} maxWidth={440}>
      <div className="modal-body" style={{ textAlign: 'center', padding: '28px 24px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-debit-bg)',
            color: 'var(--color-debit)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <AlertTriangle size={28} />
        </div>

        <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '8px' }}>
          Are you sure?
        </h4>

        <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          This will permanently delete <strong>"{transactionName}"</strong>. This action cannot be undone.
        </p>

        {error && (
          <div
            style={{
              marginTop: '16px',
              padding: '8px 12px',
              backgroundColor: 'var(--color-debit-bg)',
              color: 'var(--color-debit)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
            }}
          >
            {error}
          </div>
        )}
      </div>

      <div className="modal-footer" style={{ justifyContent: 'center' }}>
        <SecondaryButton onClick={onClose} disabled={isDeleting}>
          No, Cancel
        </SecondaryButton>
        <DangerButton onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </DangerButton>
      </div>
    </ModalShell>
  );
}

export default DeleteConfirmModal;
