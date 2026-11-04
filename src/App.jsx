import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AppShell from './components/layout/AppShell';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import ProfilePage from './pages/ProfilePage';
import { APP_ROUTES } from './constants/routes';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DashboardProvider>
          <Routes>
            {/* Public Auth Route */}
            <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />

            {/* Protected Application Routes */}
            <Route
              path={APP_ROUTES.ROOT}
              element={<Navigate to={APP_ROUTES.DASHBOARD} replace />}
            />

            <Route
              path={APP_ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <AppShell>
                    <DashboardPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />

            <Route
              path={APP_ROUTES.TRANSACTIONS}
              element={
                <ProtectedRoute>
                  <AppShell>
                    <TransactionsPage />
                  </AppShell>
                </ProtectedRoute>
              }
            />

            <Route
              path={APP_ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <AppShell>
                    <ProfilePage />
                  </AppShell>
                </ProtectedRoute>
              }
            />

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
          </Routes>
        </DashboardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
