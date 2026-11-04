/**
 * Currency Formatting Utilities
 * Adheres to guideline: No boolean flag arguments.
 */

const DEFAULT_CURRENCY_SYMBOL = '$';

/**
 * Formats a raw number into a localized string (e.g. 1,234.50)
 * @param {number|string} amount
 * @param {string} symbol
 * @returns {string}
 */
export function formatAmount(amount, symbol = DEFAULT_CURRENCY_SYMBOL) {
  const numericValue = Math.abs(Number(amount) || 0);
  const formatted = numericValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

/**
 * Formats a credit transaction amount with an explicit positive prefix
 * @param {number|string} amount
 * @param {string} symbol
 * @returns {string}
 */
export function formatCreditAmount(amount, symbol = DEFAULT_CURRENCY_SYMBOL) {
  return `+${formatAmount(amount, symbol)}`;
}

/**
 * Formats a debit transaction amount with an explicit negative prefix
 * @param {number|string} amount
 * @param {string} symbol
 * @returns {string}
 */
export function formatDebitAmount(amount, symbol = DEFAULT_CURRENCY_SYMBOL) {
  return `-${formatAmount(amount, symbol)}`;
}
