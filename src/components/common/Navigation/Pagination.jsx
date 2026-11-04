import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IconButton from '../Button/IconButton';

/**
 * Pagination Controls
 * @param {Object} props
 * @param {number} props.currentPage - 1-based page index
 * @param {number} props.totalPages
 * @param {(newPage: number) => void} props.onPageChange
 * @param {number} props.totalItems
 * @param {number} props.pageSize
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderTop: '1px solid var(--color-border-subtle)',
        fontSize: '13px',
        color: 'var(--color-text-muted)',
      }}
    >
      <div>
        Showing <span style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>{startItem}</span> to{' '}
        <span style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>{endItem}</span> of{' '}
        <span style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>{totalItems}</span> entries
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn--secondary btn--sm"
          style={{ padding: '4px 10px' }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <span style={{ fontWeight: 600, padding: '0 8px', color: 'var(--color-text-heading)' }}>
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="btn btn--secondary btn--sm"
          style={{ padding: '4px 10px' }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
