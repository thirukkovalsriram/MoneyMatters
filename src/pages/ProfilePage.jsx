import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, MapPin, Building, Globe, CheckCircle, Shield } from 'lucide-react';
import TextField from '../components/common/Form/TextField';
import PrimaryButton from '../components/common/Button/PrimaryButton';
import SecondaryButton from '../components/common/Button/SecondaryButton';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../constants/api';

export function ProfilePage() {
  const { currentUser, updateProfile, isAdmin, switchUserRole } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    presentAddress: '',
    permanentAddress: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        dateOfBirth: currentUser.dateOfBirth || '1996-06-12',
        presentAddress: currentUser.presentAddress || 'San Jose, California, USA',
        permanentAddress: currentUser.permanentAddress || 'San Jose, California, USA',
        city: currentUser.city || 'San Jose',
        postalCode: currentUser.postalCode || '45962',
        country: currentUser.country || 'USA',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSavedSuccess(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div className="card">
        {/* Profile Card Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '24px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: isAdmin ? 'var(--color-accent-orange)' : 'var(--color-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-heading)' }}>
                {currentUser?.name || 'User Profile'}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                {currentUser?.email || 'user@example.com'}
              </p>
              <div style={{ marginTop: '6px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isAdmin
                      ? 'var(--color-accent-orange-light)'
                      : 'var(--color-primary-light)',
                    color: isAdmin ? 'var(--color-accent-orange)' : 'var(--color-primary)',
                  }}
                >
                  {isAdmin ? 'System Administrator' : 'Standard User Account'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <SecondaryButton
              size="sm"
              onClick={() => switchUserRole(isAdmin ? USER_ROLES.USER : USER_ROLES.ADMIN)}
            >
              <Shield size={16} />
              <span>Switch to {isAdmin ? 'User' : 'Admin'} Mode</span>
            </SecondaryButton>
          </div>
        </div>

        {/* Success Notice */}
        {savedSuccess && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              backgroundColor: 'var(--color-credit-bg)',
              color: 'var(--color-credit)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <CheckCircle size={18} />
            Profile changes saved successfully!
          </div>
        )}

        {/* Profile Information Form */}
        <form onSubmit={handleSave}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px 24px',
            }}
          >
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              required
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. jane.doe@gmail.com"
              required
            />

            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <TextField
              label="Present Address"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              placeholder="Apartment, Street address"
            />

            <TextField
              label="Permanent Address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Apartment, Street address"
            />

            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. San Jose"
            />

            <TextField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="e.g. 45962"
            />

            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. USA"
            />
          </div>

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px solid var(--color-border-subtle)',
              paddingTop: '20px',
            }}
          >
            <PrimaryButton type="submit" size="md">
              Save Changes
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
