import React from 'react';
import { Inbox } from 'lucide-react';

/**
 * Empty state placeholder
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ReactNode} [props.action]
 */
export function EmptyState({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Inbox size={32} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
      {action && <div style={{ marginTop: '8px' }}>{action}</div>}
    </div>
  );
}

export default EmptyState;
