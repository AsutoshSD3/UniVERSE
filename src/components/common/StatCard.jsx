export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  color = '#3b82f6',
  badge,
  onClick
}) {
  return (
    <div 
      className="stat-card" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div 
        className="stat-icon" 
        style={{ 
          background: `${color}15`, 
          color: color,
          border: `1px solid ${color}30`
        }}
      >
        {Icon && <Icon size={24} />}
      </div>
      <div className="stat-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="stat-label">{title}</div>
          {badge && <span className="badge badge-blue">{badge}</span>}
        </div>
        <div className="stat-value" style={{ color: 'var(--text-primary)' }}>
          {value}
        </div>
        {(subtitle || trend) && (
          <div className="stat-change" style={{ color: trend?.startsWith('+') ? 'var(--accent-green)' : trend?.startsWith('-') ? 'var(--accent-red)' : 'var(--text-muted)' }}>
            {trend && <strong>{trend}</strong>} {trendLabel || subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
