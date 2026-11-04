import React from 'react';

/**
 * Money Matters Brand Logo
 */
export function Logo({ size = 'md' }) {
  const isSmall = size === 'sm';
  const imgHeight = isSmall ? 28 : 36;
  const fontSize = isSmall ? '18px' : '22px';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="/logo.png"
        alt="Money Matters Logo"
        style={{ height: `${imgHeight}px`, width: 'auto', objectFit: 'contain' }}
        onError={(e) => {
          // If image fails to load, fallback to SVG icon
          e.target.style.display = 'none';
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize, fontWeight: 800, color: '#F89A1E', letterSpacing: '-0.02em' }}>
          Money <span style={{ color: '#02B89D' }}>Matters</span>
        </span>
      </div>
    </div>
  );
}

export default Logo;
