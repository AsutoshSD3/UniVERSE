export default function ChartCard({
  title,
  subtitle,
  children,
  action,
  headerBadge
}) {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between', 
        marginBottom: '16px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{title}</h3>
            {headerBadge && <span className="badge badge-blue">{headerBadge}</span>}
          </div>
          {subtitle && <p className="text-xs text-muted" style={{ marginTop: '2px' }}>{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div style={{ flex: 1, minHeight: '260px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
