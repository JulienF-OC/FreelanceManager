import React from 'react';
import './Chart.css';

export function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  const colors = ['var(--blue-accent)', 'var(--orange)', 'var(--green)'];

  return (
    <div className="chart-wrap fade-up fade-up-5">
      <div className="card-header"><h2>Statistiques</h2></div>
      <div className="bar-chart">
        {data.map((d, i) => (
          <div key={d.label} className="bar-group">
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  height: `${(d.value / max) * 100}%`,
                  background: colors[i % colors.length],
                  animationDelay: `${0.4 + i * 0.1}s`,
                }}
              />
            </div>
            <div className="bar-value">{d.value}</div>
            <div className="bar-label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonutChart({ data, title }) {
  const total = data.reduce((s, d) => s + d.amount, 0);
  let cumulative = 0;
  const size = 140;
  const r = 52;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  const segments = data.map(d => {
    const pct = d.amount / total;
    const offset = cumulative;
    cumulative += pct;
    return { ...d, pct, offset };
  });

  return (
    <div className="chart-wrap fade-up fade-up-5">
      <div className="card-header"><h2>{title}</h2></div>
      <div className="donut-layout">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="22"
              strokeDasharray={`${s.pct * circumference} ${circumference}`}
              strokeDashoffset={-s.offset * circumference}
            />
          ))}
          <circle cx={cx} cy={cy} r="34" fill="white" />
        </svg>
        <div className="donut-legend">
          {data.map((d, i) => (
            <div key={i} className="legend-item">
              <span className="legend-dot" style={{ background: d.color }} />
              <span>{d.client}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}