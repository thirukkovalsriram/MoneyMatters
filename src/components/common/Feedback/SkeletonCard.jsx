import React from 'react';

/**
 * Skeleton card for loading states
 */
export function SkeletonCard() {
  return (
    <div className="stat-card" style={{ height: '110px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '60%' }}>
        <div className="skeleton" style={{ height: '16px', width: '50%' }} />
        <div className="skeleton" style={{ height: '28px', width: '80%' }} />
      </div>
      <div className="skeleton" style={{ width: '52px', height: '52px', borderRadius: '50%' }} />
    </div>
  );
}

export default SkeletonCard;
