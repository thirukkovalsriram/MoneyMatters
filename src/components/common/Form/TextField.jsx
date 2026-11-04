import React from 'react';

/**
 * Reusable input field with label and error display
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {string} [props.type]
 * @param {string|number} props.value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange
 * @param {string} [props.placeholder]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 */
export function TextField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
  required = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label} {required && <span style={{ color: 'var(--color-debit)' }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input"
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default TextField;
