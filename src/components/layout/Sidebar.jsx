import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, UserCheck, LogOut } from 'lucide-react';
import Logo from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { APP_ROUTES } from '../../constants/routes';

const NAVIGATION_ITEMS = [
  {
    to: APP_ROUTES.DASHBOARD,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    to: APP_ROUTES.TRANSACTIONS,
    label: 'Transactions',
    icon: ArrowLeftRight,
  },
  {
    to: APP_ROUTES.PROFILE,
    label: 'Profile',
    icon: UserCheck,
  },
];

/**
 * Main Application Sidebar
 * @param {Object} props
 * @param {boolean} props.isOpen - For mobile drawer
 * @param {() => void} props.onCloseMobile
 */
export function Sidebar({ isOpen, onCloseMobile }) {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <aside className={`app-shell__sidebar ${isOpen ? 'app-shell__sidebar--open' : ''}`}>
      <div className="sidebar">
        <div className="sidebar__brand">
          <Logo />
        </div>

        <nav className="sidebar__nav">
          {NAVIGATION_ITEMS.map(({ to, label, icon: IconComponent }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              <IconComponent size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user-info">
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isAdmin ? 'var(--color-accent-orange)' : 'var(--color-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '15px',
                flexShrink: 0,
              }}
            >
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="sidebar__user-details">
              <span className="sidebar__user-name" title={currentUser?.name}>
                {currentUser?.name || 'User'}
              </span>
              <span className="sidebar__user-role">
                {isAdmin ? 'Admin Mode' : 'User Account'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            title="Log Out"
            className="btn-icon btn-icon--danger"
            aria-label="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
