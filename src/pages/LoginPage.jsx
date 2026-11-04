import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, UserCheck, Shield } from 'lucide-react';
import Logo from '../components/common/Logo';
import TextField from '../components/common/Form/TextField';
import PrimaryButton from '../components/common/Button/PrimaryButton';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { APP_ROUTES } from '../constants/routes';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await login({ email, password });
      navigate(APP_ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (account) => {
    setEmail(account.email);
    setPassword(account.password);
    try {
      setIsSubmitting(true);
      setError('');
      await login({ email: account.email, password: account.password });
      navigate(APP_ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message || 'Quick login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-app)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-border)',
          padding: '36px 32px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Logo size="lg" />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-heading)' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Log in to manage your financial transactions
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--color-debit-bg)',
              color: 'var(--color-debit)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. jane.doe@gmail.com"
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <div style={{ marginTop: '24px' }}>
            <PrimaryButton
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              style={{ width: '100%' }}
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </form>

        {/* Quick Demo Access Buttons for Evaluators */}
        <div style={{ marginTop: '28px', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '20px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            Instant Demo Access
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_ACCOUNTS.USER)}
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid rgba(2, 184, 157, 0.2)',
                color: 'var(--color-primary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={16} />
                <span>Log in as Jane Doe (User)</span>
              </div>
              <span style={{ fontSize: '11px', opacity: 0.8 }}>One-Click</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin(DEMO_ACCOUNTS.ADMIN)}
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-accent-orange-light)',
                border: '1px solid rgba(248, 154, 30, 0.2)',
                color: 'var(--color-accent-orange)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} />
                <span>Log in as System Admin</span>
              </div>
              <span style={{ fontSize: '11px', opacity: 0.8 }}>One-Click</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
