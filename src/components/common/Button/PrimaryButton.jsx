import React from 'react';

/**
 * Primary action button
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 * @param {boolean} [props.disabled]
 * @param {string} [props.type]
 * @param {string} [props.size] - 'sm' | 'md' | 'lg'
 * @param {string} [props.className]
 */
export function PrimaryButton({
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
      className={`btn btn--primary btn--${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
