import React from 'react';

/**
 * Compact icon action button
 * @param {Object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.label - Accessible title
 * @param {() => void} [props.onClick]
 * @param {boolean} [props.danger]
 * @param {string} [props.className]
 */
export function IconButton({ icon, label, onClick, danger = false, className = '' }) {
  const dangerClass = danger ? 'btn-icon--danger' : '';
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`btn-icon ${dangerClass} ${className}`}
    >
      {icon}
    </button>
  );
}

export default IconButton;
