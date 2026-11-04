import React, { useState, useMemo } from 'react';
import { Search, Plus, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import Tabs from '../components/common/Navigation/Tabs';
import Pagination from '../components/common/Navigation/Pagination';
import CreditTransactionIcon from '../components/common/Transaction/CreditTransactionIcon';
import DebitTransactionIcon from '../components/common/Transaction/DebitTransactionIcon';
import CategoryBadge from '../components/common/Transaction/CategoryBadge';
import IconButton from '../components/common/Button/IconButton';
import PrimaryButton from '../components/common/Button/PrimaryButton';
import EmptyState from '../components/common/Feedback/EmptyState';
import ErrorState from '../components/common/Feedback/ErrorState';
import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import { formatCreditAmount, formatDebitAmount } from '../utils/currencyFormatter';
import { formatTransactionDate } from '../utils/dateFormatter';
import { TRANSACTION_TYPES, TRANSACTION_TABS, PAGINATION_LIMITS } from '../constants/transaction';

const TAB_OPTIONS = [
  { id: TRANSACTION_TABS.ALL, label: 'All Transactions' },
  { id: TRANSACTION_TABS.CREDIT, label: 'Credit' },
  { id: TRANSACTION_TABS.DEBIT, label: 'Debit' },
];

export function TransactionsPage() {
  const {
    transactions,
    isLoading,
    isError,
    errorMessage,
    refreshDashboardData,
    openAddModal,
    openUpdateModal,
    openDeleteModal,
  } = useDashboard();

  const { isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState(TRANSACTION_TABS.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = PAGINATION_LIMITS.DEFAULT_PAGE_SIZE;

  // Filter transactions based on tab and search
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Tab filter
      if (activeTab === TRANSACTION_TABS.CREDIT && tx.type !== TRANSACTION_TYPES.CREDIT) {
        return false;
      }
      if (activeTab === TRANSACTION_TABS.DEBIT && tx.type !== TRANSACTION_TYPES.DEBIT) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = (tx.transaction_name || tx.name || '').toLowerCase().includes(query);
        const catMatch = (tx.category || '').toLowerCase().includes(query);
        const userMatch = (tx.username || '').toLowerCase().includes(query);
        return nameMatch || catMatch || userMatch;
      }

      return true;
    });
  }, [transactions, activeTab, searchQuery]);

  // Pagination calculation
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

  // Tab switch handler: reset pagination to page 1
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (isError) {
    return (
      <ErrorState
        message={errorMessage || 'Failed to load transaction ledger.'}
        onRetry={refreshDashboardData}
      />
    );
  }

  return (
    <div className="table-container">
      {/* Toolbar: Tabs & Search Input */}
      <div className="table-toolbar">
        <Tabs activeTab={activeTab} onSelectTab={handleSelectTab} tabs={TAB_OPTIONS} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="table-search">
            <Search size={18} color="var(--color-text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or category..."
            />
          </div>

          {!isAdmin && (
            <PrimaryButton size="sm" onClick={openAddModal}>
              <Plus size={16} />
              <span>Add</span>
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Table Body */}
      {isLoading ? (
        <div style={{ padding: '24px' }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ height: '48px', marginBottom: '12px', width: '100%' }}
            />
          ))}
        </div>
      ) : paginatedTransactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description={
            searchQuery
              ? `No transactions match your search "${searchQuery}".`
              : 'There are no transactions recorded in this category.'
          }
          action={
            !isAdmin && (
              <PrimaryButton size="sm" onClick={openAddModal}>
                <Plus size={16} /> Add First Transaction
              </PrimaryButton>
            )
          }
        />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction Name</th>
                <th>Category</th>
                <th>Date & Time</th>
                <th>Amount</th>
                {isAdmin ? <th>User Account</th> : <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((tx) => {
                const isCredit = tx.type === TRANSACTION_TYPES.CREDIT;
                const formattedAmount = isCredit
                  ? formatCreditAmount(tx.amount)
                  : formatDebitAmount(tx.amount);
                const amountClass = isCredit ? 'tx-amount--credit' : 'tx-amount--debit';
                const txName = tx.transaction_name || tx.name || 'Transaction';

                return (
                  <tr key={tx.id}>
                    <td>
                      <div className="tx-name-cell">
                        {isCredit ? <CreditTransactionIcon /> : <DebitTransactionIcon />}
                        <span style={{ fontWeight: 600 }}>{txName}</span>
                      </div>
                    </td>
                    <td>
                      <CategoryBadge category={tx.category} />
                    </td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
                      {formatTransactionDate(tx.date)}
                    </td>
                    <td>
                      <span className={`tx-amount ${amountClass}`}>{formattedAmount}</span>
                    </td>
                    {isAdmin ? (
                      <td>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: 'var(--color-accent-orange)',
                            backgroundColor: 'var(--color-accent-orange-light)',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          {tx.username || `User #${tx.user_id}`}
                        </span>
                      </td>
                    ) : (
                      <td style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <IconButton
                            icon={<Pencil size={15} />}
                            label="Edit Transaction"
                            onClick={() => openUpdateModal(tx)}
                          />
                          <IconButton
                            icon={<Trash2 size={15} />}
                            label="Delete Transaction"
                            danger
                            onClick={() => openDeleteModal(tx)}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Bar */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default TransactionsPage;
