import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Visual badge for outgoing Debit transactions
 */
export function DebitTransactionIcon() {
  return (
    <div className="tx-icon-badge tx-icon-badge--debit" title="Debit / Expense">
      <ArrowUpRight size={18} />
    </div>
  );
}

export default DebitTransactionIcon;
