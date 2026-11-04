import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import StatCard from './StatCard';
import SkeletonCard from '../common/Feedback/SkeletonCard';

/**
 * Metric Cards Grid (Credit, Debit, Net Balance)
 * @param {Object} props
 * @param {number} props.creditTotal
 * @param {number} props.debitTotal
 * @param {number} props.balance
 * @param {boolean} [props.isLoading]
 */
export function StatsGrid({ creditTotal, debitTotal, balance, isLoading = false }) {
  if (isLoading) {
    return (
      <section className="stats-grid" aria-label="Loading summary metrics">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    );
  }

  return (
    <section className="stats-grid" aria-label="Financial summary metrics">
      <StatCard
        title="Total Credit"
        amount={creditTotal}
        variant="credit"
        icon={<ArrowDownLeft size={24} />}
      />

      <StatCard
        title="Total Debit"
        amount={debitTotal}
        variant="debit"
        icon={<ArrowUpRight size={24} />}
      />

      <StatCard
        title="Net Balance"
        amount={balance}
        variant="balance"
        icon={<Wallet size={24} />}
      />
    </section>
  );
}

export default StatsGrid;
