import React from 'react';

/**
 * Danger button for destructive actions
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 * @param {boolean} [props.disabled]
 * @param {string} [props.type]
 * @param {string} [props.size]
 * @param {string} [props.className]
 */
export function DangerButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  size = 'md',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--danger btn--${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default DangerButton;
