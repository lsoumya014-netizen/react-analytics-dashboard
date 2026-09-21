import React from 'react';

export function StatCard({ label, value, subtitle, color = 'blue' }) {
  const colorClasses = {
    blue: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    green: { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
    amber: { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
    rose: { bg: '#fff1f2', text: '#be123c', border: '#fecdd3' }
  }[color] || { bg: '#f8fafc', text: '#334155', border: '#e2e8f0' };

  return (
    <div
      data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
      style={{
        backgroundColor: colorClasses.bg,
        borderColor: colorClasses.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '160px',
        flex: 1
      }}
    >
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: colorClasses.text, margin: '6px 0 2px 0' }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
