import React from 'react';
import StatsGrid from '../components/dashboard/StatsGrid';
import WeeklyActivityChart from '../components/dashboard/WeeklyActivityChart';
import ExpenseCategoryChart from '../components/dashboard/ExpenseCategoryChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ErrorState from '../components/common/Feedback/ErrorState';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const {
    totals,
    netBalance,
    recentTransactions,
    transactions,
    graphData,
    isLoading,
    isError,
    errorMessage,
    refreshDashboardData,
    openUpdateModal,
    openDeleteModal,
  } = useDashboard();

  const { isAdmin } = useAuth();

  if (isError) {
    return (
      <ErrorState
        message={errorMessage || 'Unable to connect to the finance server.'}
        onRetry={refreshDashboardData}
      />
    );
  }

  return (
    <div>
      {/* 3 Metric Cards */}
      <StatsGrid
        creditTotal={totals.credit}
        debitTotal={totals.debit}
        balance={netBalance}
        isLoading={isLoading}
      />

      {/* Analytics Charts Grid */}
      <div className="dashboard-grid">
        <WeeklyActivityChart data={graphData} />
        <ExpenseCategoryChart transactions={transactions} />
      </div>

      {/* Recent Transactions List */}
      <RecentTransactions
        transactions={recentTransactions}
        isAdmin={isAdmin}
        onEdit={openUpdateModal}
        onDelete={openDeleteModal}
      />
    </div>
  );
}

export default DashboardPage;
