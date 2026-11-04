import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import IconButton from '../Button/IconButton';

/**
 * Accessible Modal Shell with Backdrop & Escape Key Listener
 * @param {Object} props
 * @param {string} props.title
 * @param {() => void} props.onClose
 * @param {React.ReactNode} props.children
 * @param {number} [props.maxWidth]
 */
export function ModalShell({ title, onClose, children, maxWidth = 520 }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{ maxWidth: `${maxWidth}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <IconButton icon={<X size={20} />} label="Close modal" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalShell;
