import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Download, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function QRCodeCard({
  value,
  title = "Universal Dynamic QR Single-Pass",
  subtitle = "Gate Entry • Library • Mess • Exam Hall",
  badge = "ACTIVE PASS",
  expiry = "Valid Today until 11:59 PM",
  meta = []
}) {
  const [token, setToken] = useState(Date.now().toString());

  const handleRefresh = () => {
    setToken(Date.now().toString());
  };

  const payload = typeof value === 'string' ? `${value}:${token}` : JSON.stringify({ ...value, t: token });

  return (
    <div className="glass-card qr-card text-center" style={{ maxWidth: '380px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span className="badge badge-green">
          <ShieldCheck size={12} /> {badge}
        </span>
        <button 
          className="btn-icon sm btn-ghost" 
          onClick={handleRefresh}
          title="Refresh Dynamic Token"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div style={{ marginTop: '8px' }}>
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{title}</h3>
        <p className="text-xs text-muted" style={{ marginTop: '2px' }}>{subtitle}</p>
      </div>

      <div style={{ 
        padding: '16px', 
        background: '#ffffff', 
        borderRadius: 'var(--radius-lg)', 
        margin: '12px 0',
        display: 'inline-flex',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
      }}>
        <QRCodeSVG 
          value={payload}
          size={180}
          level="H"
          includeMargin={false}
        />
      </div>

      <div style={{ width: '100%' }}>
        <div className="text-xs text-muted" style={{ marginBottom: '8px' }}>
          ⏳ {expiry}
        </div>

        {meta.length > 0 && (
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '10px 14px', 
            borderRadius: 'var(--radius-md)', 
            fontSize: 'var(--font-xs)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {meta.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">{m.label}:</span>
                <span style={{ fontWeight: 600 }}>{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
