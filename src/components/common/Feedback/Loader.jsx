import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Centered spinner loader
 * @param {Object} props
 * @param {string} [props.message]
 */
export function Loader({ message = 'Loading data...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        gap: '12px',
        color: 'var(--color-primary)',
      }}
    >
      <Loader2 size={36} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
      <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{message}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
