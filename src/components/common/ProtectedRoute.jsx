import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Feedback/Loader';
import { APP_ROUTES } from '../../constants/routes';

/**
 * Protected Route Gatekeeper
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader message="Verifying session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return children;
}

export default ProtectedRoute;
