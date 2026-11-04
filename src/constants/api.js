/**
 * Money Matters API & Authentication Constants
 * All Hasura REST endpoints and secret configurations
 */

export const HASURA_BASE_URL = 'https://bursting-gelding-24.hasura.app/api/rest';

export const HASURA_ADMIN_SECRET = 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF';

export const USER_ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
});

export const API_ENDPOINTS = Object.freeze({
  GET_USER_ID: `${HASURA_BASE_URL}/get-user-id`,
  PROFILE: `${HASURA_BASE_URL}/profile`,
  ALL_TRANSACTIONS: `${HASURA_BASE_URL}/all-transactions`,
  
  // User Totals & Charts
  USER_TOTALS: `${HASURA_BASE_URL}/credit-debit-totals`,
  USER_DAYWISE_7_DAYS: `${HASURA_BASE_URL}/daywise-totals-7-days`,

  // Admin Totals & Charts
  ADMIN_TOTALS: `${HASURA_BASE_URL}/transaction-totals-admin`,
  ADMIN_DAYWISE_7_DAYS: `${HASURA_BASE_URL}/daywise-totals-last-7-days-admin`,

  // Mutations
  ADD_TRANSACTION: `${HASURA_BASE_URL}/add-transaction`,
  UPDATE_TRANSACTION: `${HASURA_BASE_URL}/update-transaction`,
  DELETE_TRANSACTION: `${HASURA_BASE_URL}/delete-transaction`,
});

export const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
});

export const API_STATUS = Object.freeze({
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});
