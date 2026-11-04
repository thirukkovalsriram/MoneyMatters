import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, ArrowRight } from 'lucide-react';
import CreditTransactionIcon from '../common/Transaction/CreditTransactionIcon';
import DebitTransactionIcon from '../common/Transaction/DebitTransactionIcon';
import CategoryBadge from '../common/Transaction/CategoryBadge';
import IconButton from '../common/Button/IconButton';
import EmptyState from '../common/Feedback/EmptyState';
import { formatCreditAmount, formatDebitAmount } from '../../utils/currencyFormatter';
import { formatTransactionDate } from '../../utils/dateFormatter';
import { TRANSACTION_TYPES } from '../../constants/transaction';
import { APP_ROUTES } from '../../constants/routes';

/**
 * Recent Transactions Component (Displays the last 3 records)
 * @param {Object} props
 * @param {Array} props.transactions
 * @param {boolean} [props.isAdmin]
 * @param {(tx: Object) => void} [props.onEdit]
 * @param {(tx: Object) => void} [props.onDelete]
 */
export function RecentTransactions({
  transactions = [],
  isAdmin = false,
  onEdit,
  onDelete,
}) {
  return (
    <div className="card" style={{ marginTop: '28px' }}>
      <div className="card__header">
        <h2 className="card__title">Recent Transactions</h2>
        <Link
          to={APP_ROUTES.TRANSACTIONS}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-primary)',
          }}
        >
          <span>View All</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No recent transactions"
          description="Transactions you add will appear here."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {transactions.map((tx) => {
            const isCredit = tx.type === TRANSACTION_TYPES.CREDIT;
            const amountFormatted = isCredit
              ? formatCreditAmount(tx.amount)
              : formatDebitAmount(tx.amount);
            const amountClass = isCredit ? 'tx-amount--credit' : 'tx-amount--debit';
            const txName = tx.transaction_name || tx.name || 'Transaction';

            return (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {isCredit ? <CreditTransactionIcon /> : <DebitTransactionIcon />}
                  <div>
                    <h4
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--color-text-heading)',
                        marginBottom: '3px',
                      }}
                    >
                      {txName}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CategoryBadge category={tx.category} />
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {formatTransactionDate(tx.date)}
                      </span>
                      {isAdmin && tx.username && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: 'var(--color-accent-orange)',
                            backgroundColor: 'var(--color-accent-orange-light)',
                            padding: '2px 8px',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          User: {tx.username}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className={`tx-amount ${amountClass}`} style={{ fontSize: '15px' }}>
                    {amountFormatted}
                  </span>

                  {!isAdmin && onEdit && onDelete && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconButton
                        icon={<Pencil size={15} />}
                        label="Edit Transaction"
                        onClick={() => onEdit(tx)}
                      />
                      <IconButton
                        icon={<Trash2 size={15} />}
                        label="Delete Transaction"
                        danger
                        onClick={() => onDelete(tx)}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentTransactions;
