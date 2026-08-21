import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { qrPasses } from '../../data/mockGuestData';
import { ArrowLeft, MapPin, User, Calendar, Clock, CheckCircle } from 'lucide-react';

export default function GuestQrPass() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get pass details from navigation state (if just registered),
  // otherwise fallback to the mock active pass.
  const passDetails = location.state?.passDetails || qrPasses.find(p => p.status === 'Active') || null;

  if (!passDetails) {
    return (
      <div className="animate-fade-in text-center p-8">
        <h2 style={{ fontSize: 'var(--font-xl)', marginBottom: '16px' }}>No Active Pass Found</h2>
        <p className="text-muted mb-4">You do not have a valid gate pass. Please register your visit.</p>
        <button className="btn btn-primary" onClick={() => navigate('/guest/register')}>
          Register Visit
        </button>
      </div>
    );
  }

  // Create a JSON string to embed in the QR code for scanners
  const qrData = JSON.stringify({
    id: passDetails.id || `GUEST-${Math.floor(Math.random() * 10000)}`,
    name: passDetails.name || passDetails.visitorName,
    host: passDetails.hostName || passDetails.host,
    date: passDetails.date || passDetails.validUntil
  });

  return (
    <div className="animate-fade-in max-w-2xl mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <button 
        className="btn btn-ghost mb-4" 
        onClick={() => navigate('/guest/dashboard')}
        style={{ padding: '8px 0' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Header Area */}
        <div style={{ 
          background: 'var(--gradient-success)', 
          padding: '24px', 
          textAlign: 'center',
          color: 'white'
        }}>
          <CheckCircle size={48} style={{ margin: '0 auto 12px auto' }} />
          <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800, margin: 0 }}>Approved Entry Pass</h2>
          <p style={{ opacity: 0.9, marginTop: '4px' }}>Please show this code at the security gate.</p>
        </div>

        <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* QR Code Container */}
          <div style={{ 
            background: 'white', 
            padding: '16px', 
            borderRadius: '16px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <QRCodeSVG value={qrData} size={200} />
          </div>

          <div style={{ width: '100%', borderTop: '1px dashed var(--border-color)', margin: '16px 0' }} />

          {/* Details Grid */}
          <div className="grid-2" style={{ width: '100%', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <User size={20} className="text-blue" style={{ marginTop: '2px', color: 'var(--accent-blue)' }} />
              <div>
                <p className="text-xs text-muted">Visitor Name</p>
                <p style={{ fontWeight: 600 }}>{passDetails.name || passDetails.visitorName}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin size={20} className="text-orange" style={{ marginTop: '2px', color: 'var(--accent-orange)' }} />
              <div>
                <p className="text-xs text-muted">Host Name</p>
                <p style={{ fontWeight: 600 }}>{passDetails.hostName || passDetails.host}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Calendar size={20} className="text-green" style={{ marginTop: '2px', color: 'var(--accent-green)' }} />
              <div>
                <p className="text-xs text-muted">Date of Visit</p>
                <p style={{ fontWeight: 600 }}>{passDetails.date || passDetails.validUntil}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Clock size={20} className="text-purple" style={{ marginTop: '2px', color: 'var(--accent-purple)' }} />
              <div>
                <p className="text-xs text-muted">Time / Purpose</p>
                <p style={{ fontWeight: 600 }}>{passDetails.time || 'All Day'} • {passDetails.purpose}</p>
              </div>
            </div>
          </div>

        </div>
        
        <div style={{ background: 'var(--bg-secondary)', padding: '16px', textAlign: 'center' }}>
          <p className="text-sm text-muted">
            Pass ID: <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{JSON.parse(qrData).id}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
