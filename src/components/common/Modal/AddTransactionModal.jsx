import React, { useState } from 'react';
import ModalShell from './ModalShell';
import TextField from '../Form/TextField';
import SelectField from '../Form/SelectField';
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';
import { TRANSACTION_TYPES, TRANSACTION_CATEGORIES } from '../../../constants/transaction';
import { formatInputDateTime } from '../../../utils/dateFormatter';

const TYPE_OPTIONS = [
  { id: TRANSACTION_TYPES.CREDIT, label: 'Credit (Income)' },
  { id: TRANSACTION_TYPES.DEBIT, label: 'Debit (Expense)' },
];

/**
 * Add Transaction Modal (Single Responsibility: Create)
 * @param {Object} props
 * @param {() => void} props.onClose
 * @param {(data: Object) => Promise<void>} props.onSubmit
 */
export function AddTransactionModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    type: TRANSACTION_TYPES.CREDIT,
    category: TRANSACTION_CATEGORIES[0].id,
    amount: '',
    date: formatInputDateTime(new Date()),
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Transaction name is required';
    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid positive amount';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setSubmitError('');
      await onSubmit({
        name: formData.name.trim(),
        type: formData.type,
        category: formData.category,
        amount: Number(formData.amount),
        date: new Date(formData.date).toISOString(),
      });
      onClose();
    } catch (err) {
      setSubmitError(err.message || 'Failed to create transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalShell title="Add Transaction" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {submitError && (
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'var(--color-debit-bg)',
                color: 'var(--color-debit)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
                fontSize: '13px',
              }}
            >
              {submitError}
            </div>
          )}

          <TextField
            label="Transaction Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Monthly Salary, Grocery Shopping"
            error={errors.name}
            required
          />

          <SelectField
            label="Transaction Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={TYPE_OPTIONS}
            required
          />

          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={TRANSACTION_CATEGORIES}
            required
          />

          <TextField
            label="Amount ($)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            error={errors.amount}
            required
          />

          <TextField
            label="Date & Time"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            required
          />
        </div>

        <div className="modal-footer">
          <SecondaryButton onClick={onClose} disabled={isSubmitting}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Add Transaction'}
          </PrimaryButton>
        </div>
      </form>
    </ModalShell>
  );
}

export default AddTransactionModal;
