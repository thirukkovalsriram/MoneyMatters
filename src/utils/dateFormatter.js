/**
 * Date Formatting Utilities
 */

/**
 * Formats a transaction ISO date string to readable format: '28 Jan, 12:30 PM'
 * @param {string|Date} dateString
 * @returns {string}
 */
export function formatTransactionDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${day} ${month}, ${formattedHours}:${minutes} ${ampm}`;
}

/**
 * Formats a date for standard day-wise chart labels ('Mon', 'Tue', etc.)
 * @param {string|Date} dateString
 * @returns {string}
 */
export function formatDayOfWeek(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Formats a date for HTML input type="datetime-local" (YYYY-MM-DDTHH:MM)
 * @param {string|Date} dateString
 * @returns {string}
 */
export function formatInputDateTime(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  if (isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 16);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
