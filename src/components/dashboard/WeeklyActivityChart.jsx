import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

/**
 * Custom Tooltip for Recharts
 */
function ChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#1F2937',
          color: '#FFFFFF',
          padding: '10px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: '6px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
            {entry.name}: ${Number(entry.value).toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

/**
 * Weekly Activity Debit vs Credit Bar Chart
 * @param {Object} props
 * @param {Array<{ day: string, credit: number, debit: number }>} props.data
 */
export function WeeklyActivityChart({ data = [] }) {
  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Weekly Activity</h2>
        <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Debit vs Credit</span>
      </div>

      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="day" tickLine={false} stroke="#9CA3AF" fontSize={12} />
            <YAxis
              tickLine={false}
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '13px' }}
            />
            <Bar dataKey="debit" name="Debit" fill="#FE5C73" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="credit" name="Credit" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyActivityChart;
