import React from 'react';

/**
 * Secondary outline/neutral button
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 * @param {boolean} [props.disabled]
 * @param {string} [props.type]
 * @param {string} [props.size]
 * @param {string} [props.className]
 */
export function SecondaryButton({
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
      className={`btn btn--secondary btn--${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
