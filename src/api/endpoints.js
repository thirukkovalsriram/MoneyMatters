/**
 * API Service Endpoints
 * All domain specific interactions with Hasura REST endpoints.
 */
import { apiClient, buildHeaders } from './client';
import { API_ENDPOINTS, HTTP_METHODS, USER_ROLES } from '../constants/api';
import { PAGINATION_LIMITS } from '../constants/transaction';

/**
 * Authenticates user credentials via /get-user-id
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<number>} Returns the authenticated user ID
 */
export async function loginUser({ email, password }) {
  const headers = buildHeaders({ role: USER_ROLES.ADMIN });
  const data = await apiClient(API_ENDPOINTS.GET_USER_ID, {
    method: HTTP_METHODS.POST,
    headers,
    body: { email, password },
  });

  const userId = data?.get_user_id?.[0]?.id;
  if (!userId) {
    throw new Error('Invalid email or password');
  }

  return userId;
}

/**
 * Fetches user profile(s)
 * If role is user, fetches the profile for specified userId.
 * If role is admin, fetches all profiles.
 * @param {Object} options
 * @param {string} options.role
 * @param {number|string} [options.userId]
 * @returns {Promise<any>}
 */
export async function fetchProfile({ role = USER_ROLES.USER, userId }) {
  const headers = buildHeaders({ role, userId });
  const data = await apiClient(API_ENDPOINTS.PROFILE, {
    method: HTTP_METHODS.GET,
    headers,
  });
  return data?.users || [];
}

/**
 * Fetches transactions list
 * Hasura requires both 'limit' and 'offset' query parameters.
 * @param {Object} options
 * @param {string} options.role
 * @param {number|string} [options.userId]
 * @param {number} [options.limit]
 * @param {number} [options.offset]
 * @returns {Promise<Array>}
 */
export async function fetchTransactions({
  role = USER_ROLES.USER,
  userId,
  limit = PAGINATION_LIMITS.USER_FETCH_LIMIT,
  offset = 0,
}) {
  const headers = buildHeaders({ role, userId });
  const url = `${API_ENDPOINTS.ALL_TRANSACTIONS}?limit=${limit}&offset=${offset}`;

  const data = await apiClient(url, {
    method: HTTP_METHODS.GET,
    headers,
  });

  return data?.transactions || [];
}

/**
 * Fetches credit and debit totals
 * @param {Object} options
 * @param {string} options.role
 * @param {number|string} [options.userId]
 * @returns {Promise<{ credit: number, debit: number }>}
 */
export async function fetchTotals({ role = USER_ROLES.USER, userId }) {
  const isRoleAdmin = role === USER_ROLES.ADMIN;
  const endpoint = isRoleAdmin ? API_ENDPOINTS.ADMIN_TOTALS : API_ENDPOINTS.USER_TOTALS;
  const headers = buildHeaders({ role, userId });

  const data = await apiClient(endpoint, {
    method: HTTP_METHODS.GET,
    headers,
  });

  let credit = 0;
  let debit = 0;

  if (isRoleAdmin) {
    const adminTotals = data?.transaction_totals_admin || [];
    adminTotals.forEach((item) => {
      if (item.type === 'credit') credit = Number(item.sum) || 0;
      if (item.type === 'debit') debit = Number(item.sum) || 0;
    });
  } else {
    const userTotals = data?.totals_credit_debit_transactions || [];
    userTotals.forEach((item) => {
      if (item.type === 'credit') credit = Number(item.sum) || 0;
      if (item.type === 'debit') debit = Number(item.sum) || 0;
    });
  }

  return { credit, debit };
}

/**
 * Fetches day-wise totals for the last 7 days
 * @param {Object} options
 * @param {string} options.role
 * @param {number|string} [options.userId]
 * @returns {Promise<Array>}
 */
export async function fetchDaywiseChart({ role = USER_ROLES.USER, userId }) {
  const isRoleAdmin = role === USER_ROLES.ADMIN;
  const endpoint = isRoleAdmin ? API_ENDPOINTS.ADMIN_DAYWISE_7_DAYS : API_ENDPOINTS.USER_DAYWISE_7_DAYS;
  const headers = buildHeaders({ role, userId });

  const data = await apiClient(endpoint, {
    method: HTTP_METHODS.GET,
    headers,
  });

  if (isRoleAdmin) {
    return data?.last_7_days_transactions_totals_admin || [];
  }
  return data?.last_7_days_transactions_credit_debit_totals || [];
}

/**
 * Creates a new transaction
 * @param {Object} options
 * @param {string} options.name
 * @param {string} options.type - 'credit' | 'debit'
 * @param {string} options.category
 * @param {number} options.amount
 * @param {string} options.date - ISO string
 * @param {number|string} options.userId
 * @returns {Promise<any>}
 */
export async function createTransaction({ name, type, category, amount, date, userId }) {
  const headers = buildHeaders({ role: USER_ROLES.USER, userId });
  return apiClient(API_ENDPOINTS.ADD_TRANSACTION, {
    method: HTTP_METHODS.POST,
    headers,
    body: {
      name,
      type,
      category,
      amount: Math.round(Number(amount)),
      date,
      user_id: Number(userId),
    },
  });
}

/**
 * Updates an existing transaction
 * @param {Object} options
 * @param {number|string} options.id
 * @param {string} options.name
 * @param {string} options.type
 * @param {string} options.category
 * @param {number} options.amount
 * @param {string} options.date
 * @param {number|string} options.userId
 * @returns {Promise<any>}
 */
export async function updateTransaction({ id, name, type, category, amount, date, userId }) {
  const headers = buildHeaders({ role: USER_ROLES.USER, userId });
  return apiClient(API_ENDPOINTS.UPDATE_TRANSACTION, {
    method: HTTP_METHODS.POST,
    headers,
    body: {
      id: Number(id),
      name,
      type,
      category,
      amount: Math.round(Number(amount)),
      date,
    },
  });
}

/**
 * Deletes a transaction by ID
 * @param {Object} options
 * @param {number|string} options.id
 * @param {number|string} options.userId
 * @returns {Promise<any>}
 */
export async function deleteTransaction({ id, userId }) {
  const headers = buildHeaders({ role: USER_ROLES.USER, userId });
  return apiClient(API_ENDPOINTS.DELETE_TRANSACTION, {
    method: HTTP_METHODS.DELETE,
    headers,
    body: {
      id: Number(id),
    },
  });
}
