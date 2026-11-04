/**
 * Hasura API Client
 * Wraps native fetch with required headers, status checking, and error handling.
 */
import { HASURA_ADMIN_SECRET, USER_ROLES } from '../constants/api';

/**
 * Builds request headers based on role and userId
 * @param {Object} options
 * @param {string} options.role - 'user' or 'admin'
 * @param {string|number} [options.userId]
 * @returns {HeadersInit}
 */
export function buildHeaders({ role = USER_ROLES.USER, userId } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    'x-hasura-role': role,
  };

  if (role === USER_ROLES.USER && userId !== undefined && userId !== null) {
    headers['x-hasura-user-id'] = String(userId);
  }

  return headers;
}

/**
 * Core HTTP request handler
 * @param {string} url
 * @param {Object} options
 * @returns {Promise<any>}
 */
export async function apiClient(url, { method = 'GET', body, headers = {} } = {}) {
  const config = {
    method,
    headers: {
      ...headers,
    },
  };

  if (body !== undefined && body !== null) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  let responseData;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    const errorMessage =
      (responseData && typeof responseData === 'object' && (responseData.error || responseData.message)) ||
      `HTTP Error ${response.status}: ${response.statusText}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = responseData;
    throw error;
  }

  return responseData;
}
