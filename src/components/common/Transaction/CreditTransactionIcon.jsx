import React from 'react';
import { ArrowDownLeft } from 'lucide-react';

/**
 * Visual badge for incoming Credit transactions
 */
export function CreditTransactionIcon() {
  return (
    <div className="tx-icon-badge tx-icon-badge--credit" title="Credit / Income">
      <ArrowDownLeft size={18} />
    </div>
  );
}

export default CreditTransactionIcon;
