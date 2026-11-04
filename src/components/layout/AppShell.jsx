import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import AddTransactionModal from '../common/Modal/AddTransactionModal';
import UpdateTransactionModal from '../common/Modal/UpdateTransactionModal';
import DeleteConfirmModal from '../common/Modal/DeleteConfirmModal';
import { useDashboard } from '../../context/DashboardContext';
import { MODAL_TYPES } from '../../constants/ui';
import { APP_ROUTES } from '../../constants/routes';

const ROUTE_TITLES = {
  [APP_ROUTES.DASHBOARD]: 'Dashboard',
  [APP_ROUTES.TRANSACTIONS]: 'Transactions',
  [APP_ROUTES.PROFILE]: 'User Profile',
};

/**
 * Main Layout Shell
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AppShell({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentTitle = ROUTE_TITLES[location.pathname] || 'Money Matters';

  const {
    activeModal,
    selectedTransaction,
    closeModal,
    handleAddTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
  } = useDashboard();

  return (
    <div className="app-shell">
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 35,
          }}
        />
      )}

      {/* Main Sidebar */}
      <Sidebar isOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

      {/* App Body */}
      <div className="app-shell__main">
        <Header
          title={currentTitle}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="app-shell__content">{children}</main>
      </div>

      {/* Global Modals (No Flag Arguments — Explicit Modals) */}
      {activeModal === MODAL_TYPES.ADD_TRANSACTION && (
        <AddTransactionModal onClose={closeModal} onSubmit={handleAddTransaction} />
      )}

      {activeModal === MODAL_TYPES.UPDATE_TRANSACTION && selectedTransaction && (
        <UpdateTransactionModal
          transaction={selectedTransaction}
          onClose={closeModal}
          onSubmit={handleUpdateTransaction}
        />
      )}

      {activeModal === MODAL_TYPES.DELETE_TRANSACTION && selectedTransaction && (
        <DeleteConfirmModal
          transaction={selectedTransaction}
          onClose={closeModal}
          onConfirm={handleDeleteTransaction}
        />
      )}
    </div>
  );
}

export default AppShell;
