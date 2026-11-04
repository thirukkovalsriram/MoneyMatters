import React from 'react';

/**
 * Reusable dropdown field
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.name
 * @param {string|number} props.value
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} props.onChange
 * @param {Array<{ id: string|number, label: string }>} props.options
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 */
export function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label} {required && <span style={{ color: 'var(--color-debit)' }}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-select"
      >
        {options.map(({ id, label: optLabel }) => (
          <option key={id} value={id}>
            {optLabel}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default SelectField;
