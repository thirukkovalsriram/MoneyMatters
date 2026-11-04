/**
 * Transaction Enums, Categories, and Pagination Constants
 */

export const TRANSACTION_TYPES = Object.freeze({
  CREDIT: 'credit',
  DEBIT: 'debit',
});

export const TRANSACTION_TABS = Object.freeze({
  ALL: 'all',
  CREDIT: 'credit',
  DEBIT: 'debit',
});

export const TRANSACTION_CATEGORIES = Object.freeze([
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'food', label: 'Food & Dining' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'salary', label: 'Salary' },
  { id: 'investment', label: 'Investment' },
  { id: 'housing', label: 'Housing' },
  { id: 'others', label: 'Others' },
]);

export const PAGINATION_LIMITS = Object.freeze({
  DEFAULT_PAGE_SIZE: 8,
  RECENT_TRANSACTIONS_COUNT: 3,
  ADMIN_FETCH_LIMIT: 500,
  USER_FETCH_LIMIT: 200,
});
