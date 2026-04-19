import React from 'react';
import './StatCard.css';

export default function StatCard({ label, value, color, delay = 0 }) {
  const colorMap = {
    orange: { bg: 'var(--orange)', text: '#fff' },
    blue: { bg: 'var(--blue-accent)', text: '#fff' },
    green: { bg: 'var(--green)', text: '#fff' },
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div
      className="stat-card fade-up"
      style={{
        background: style.bg,
        color: style.text,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-decoration" />
    </div>
  );
}