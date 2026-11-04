import React from 'react';
import { AlertCircle } from 'lucide-react';
import PrimaryButton from '../Button/PrimaryButton';

/**
 * Error state display with retry capability
 * @param {Object} props
 * @param {string} props.message
 * @param {() => void} [props.onRetry]
 */
export function ErrorState({ message = 'An error occurred while loading data.', onRetry }) {
  return (
    <div
      style={{
        padding: '36px 24px',
        backgroundColor: '#FFF1F3',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #FED7D7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        textAlign: 'center',
        margin: '20px 0',
      }}
    >
      <AlertCircle size={36} color="var(--color-debit)" />
      <h4 style={{ color: '#9B1C1C', fontWeight: 600 }}>Failed to Load Data</h4>
      <p style={{ color: '#C81E1E', fontSize: '14px', maxWidth: '400px' }}>{message}</p>
      {onRetry && (
        <PrimaryButton size="sm" onClick={onRetry} style={{ marginTop: '8px' }}>
          Retry Request
        </PrimaryButton>
      )}
    </div>
  );
}

export default ErrorState;
