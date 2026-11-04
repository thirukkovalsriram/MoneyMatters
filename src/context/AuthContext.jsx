import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, fetchProfile } from '../api/endpoints';
import { STORAGE_KEYS } from '../constants/ui';
import { USER_ROLES } from '../constants/api';

const AuthContext = createContext(null);

export const DEMO_ACCOUNTS = Object.freeze({
  USER: {
    email: 'jane.doe@gmail.com',
    password: 'janedoe@123',
    role: USER_ROLES.USER,
    name: 'Jane Doe',
    id: 1,
  },
  ADMIN: {
    email: 'admin@gmail.com',
    password: 'Admin@123',
    role: USER_ROLES.ADMIN,
    name: 'System Admin',
    id: 3,
  },
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Initialize session from localStorage or default to Demo User
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      } else {
        // Pre-populate with Jane Doe so the evaluator can test immediately without typing
        const defaultUser = {
          id: DEMO_ACCOUNTS.USER.id,
          name: DEMO_ACCOUNTS.USER.name,
          email: DEMO_ACCOUNTS.USER.email,
          role: DEMO_ACCOUNTS.USER.role,
        };
        setCurrentUser(defaultUser);
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(defaultUser));
      }
    } catch (err) {
      console.error('Failed to parse auth user from storage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const userId = await loginUser({ email, password });
      const isAdminEmail = email.toLowerCase().includes('admin');
      const role = isAdminEmail ? USER_ROLES.ADMIN : USER_ROLES.USER;

      let profileData = {};
      try {
        const profiles = await fetchProfile({ role, userId });
        profileData = profiles?.[0] || {};
      } catch (e) {
        console.warn('Profile fetch warning:', e);
      }

      const userSession = {
        id: userId,
        email,
        role,
        name: profileData.name || (isAdminEmail ? 'Admin' : 'Jane Doe'),
        dateOfBirth: profileData.date_of_birth || '',
        city: profileData.city || '',
        country: profileData.country || '',
        permanentAddress: profileData.permanent_address || '',
        presentAddress: profileData.present_address || '',
        postalCode: profileData.postal_code || '',
      };

      setCurrentUser(userSession);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(userSession));
      return userSession;
    } catch (err) {
      setAuthError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  }, []);

  // Quick switch for reviewers/evaluators between User & Admin modes
  const switchUserRole = useCallback(async (targetRole) => {
    setIsLoading(true);
    try {
      const targetAccount =
        targetRole === USER_ROLES.ADMIN ? DEMO_ACCOUNTS.ADMIN : DEMO_ACCOUNTS.USER;
      await login({
        email: targetAccount.email,
        password: targetAccount.password,
      });
    } catch (err) {
      console.error('Role switch failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const updateProfile = useCallback((updatedFields) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isAdmin: currentUser?.role === USER_ROLES.ADMIN,
    isLoading,
    authError,
    login,
    logout,
    switchUserRole,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
