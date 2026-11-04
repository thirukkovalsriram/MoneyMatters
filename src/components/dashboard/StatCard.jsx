import React from 'react';
import { formatAmount } from '../../utils/currencyFormatter';

/**
 * Single Stat Card
 * @param {Object} props
 * @param {string} props.title
 * @param {number|string} props.amount
 * @param {React.ReactNode} props.icon
 * @param {'credit' | 'debit' | 'balance'} props.variant
 */
export function StatCard({ title, amount, icon, variant }) {
  const iconWrapperClass = `stat-card__icon-wrapper stat-card__icon-wrapper--${variant}`;

  return (
    <article className="stat-card">
      <div className="stat-card__info">
        <span className="stat-card__title">{title}</span>
        <span className="stat-card__amount">{formatAmount(amount)}</span>
      </div>
      <div className={iconWrapperClass}>{icon}</div>
    </article>
  );
}

export default StatCard;
