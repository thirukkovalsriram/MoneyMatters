import React from 'react';

/**
 * Pill badge for transaction categories
 * @param {Object} props
 * @param {string} props.category
 */
export function CategoryBadge({ category }) {
  const displayCategory = category || 'Uncategorized';
  return <span className="badge-category">{displayCategory}</span>;
}

export default CategoryBadge;
