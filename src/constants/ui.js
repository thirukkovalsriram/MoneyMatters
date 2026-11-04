/**
 * UI State, Button Variants, and Design Tokens
 */

export const BUTTON_VARIANTS = Object.freeze({
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
  GHOST: 'ghost',
});

export const BUTTON_SIZES = Object.freeze({
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
});

export const MODAL_TYPES = Object.freeze({
  NONE: 'NONE',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  LOGOUT: 'LOGOUT',
});

export const STORAGE_KEYS = Object.freeze({
  AUTH_USER: 'moneymatters_auth_user',
  THEME_PREFERENCE: 'moneymatters_theme',
});
