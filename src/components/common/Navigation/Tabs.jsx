import React from 'react';

/**
 * Filter Tabs component (All / Credit / Debit)
 * @param {Object} props
 * @param {string} props.activeTab
 * @param {(tabId: string) => void} props.onSelectTab
 * @param {Array<{ id: string, label: string }>} props.tabs
 */
export function Tabs({ activeTab, onSelectTab, tabs = [] }) {
  return (
    <div className="table-tabs" role="tablist">
      {tabs.map(({ id, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectTab(id)}
            className={`table-tab ${isActive ? 'table-tab--active' : ''}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
