import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CATEGORY_COLORS = [
  '#02B89D',
  '#F89A1E',
  '#2D60FF',
  '#FE5C73',
  '#8B5CF6',
  '#EC4899',
  '#10B981',
  '#6B7280',
];

/**
 * Category Breakdown Doughnut Chart
 * @param {Object} props
 * @param {Array<{ id: string, transaction_name: string, category: string, amount: number, type: string }>} props.transactions
 */
export function ExpenseCategoryChart({ transactions = [] }) {
  // Aggregate expenses by category
  const categoryMap = {};
  transactions.forEach((tx) => {
    const cat = tx.category || 'others';
    const amount = Number(tx.amount) || 0;
    categoryMap[cat] = (categoryMap[cat] || 0) + amount;
  });

  let chartData = Object.keys(categoryMap).map((cat) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    value: categoryMap[cat],
  }));

  // Fallback if empty
  if (chartData.length === 0) {
    chartData = [
      { name: 'Shopping', value: 35 },
      { name: 'Food', value: 25 },
      { name: 'Entertainment', value: 20 },
      { name: 'Investment', value: 20 },
    ];
  }

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Expense Statistics</h2>
        <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>By Category</span>
      </div>

      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(val) => [`$${Number(val).toLocaleString()}`, 'Amount']}
              contentStyle={{
                backgroundColor: '#1F2937',
                borderRadius: 'var(--radius-sm)',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseCategoryChart;
