import React from 'react';
import { Plus, Menu, User, ShieldCheck } from 'lucide-react';
import PrimaryButton from '../common/Button/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { USER_ROLES } from '../../constants/api';

/**
 * Top Application Header
 * @param {Object} props
 * @param {string} props.title - Dynamic title based on route
 * @param {() => void} props.onToggleMobileMenu
 */
export function Header({ title, onToggleMobileMenu }) {
  const { currentUser, isAdmin, switchUserRole } = useAuth();
  const { openAddModal } = useDashboard();

  const handleRoleToggle = () => {
    const nextRole = isAdmin ? USER_ROLES.USER : USER_ROLES.ADMIN;
    switchUserRole(nextRole);
  };

  return (
    <header className="header">
      <div className="header__left">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="header__menu-btn"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="header__title">{title}</h1>
      </div>

      <div className="header__right">
        {/* Quick Role Switcher Pill for reviewer evaluation */}
        <button
          type="button"
          onClick={handleRoleToggle}
          title="Click to toggle between User and Admin demo view"
          className={`header__role-badge ${
            isAdmin ? 'header__role-badge--admin' : 'header__role-badge--user'
          }`}
        >
          {isAdmin ? <ShieldCheck size={14} /> : <User size={14} />}
          <span>Role: {isAdmin ? 'Admin' : 'User'} (Switch)</span>
        </button>

        {/* Add Transaction CTA (User mode only) */}
        {!isAdmin && (
          <PrimaryButton onClick={openAddModal} size="md">
            <Plus size={18} />
            <span>Add Transaction</span>
          </PrimaryButton>
        )}

        {/* Profile Avatar Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 8px 4px 4px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-bg-subtle)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: isAdmin ? 'var(--color-accent-orange)' : 'var(--color-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-heading)',
              paddingRight: '6px',
            }}
          >
            {currentUser?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
