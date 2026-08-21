import { useState, useEffect } from 'react';
import { ShieldAlert, MapPin, Phone, CheckCircle2, AlertTriangle, Wind } from 'lucide-react';

export default function StudentEmergency() {
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [location, setLocation] = useState('Acquiring high-accuracy GPS fix...');

  useEffect(() => {
    let timer;
    if (sosActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (sosActive && countdown === 0) {
      setLocation('Lat: 28.5355° N, Long: 77.3910° E (Main Library, 2nd Floor)');
    }
    return () => clearTimeout(timer);
  }, [sosActive, countdown]);

  const triggerSOS = () => {
    setSosActive(true);
    setCountdown(3);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setCountdown(3);
    setLocation('Acquiring high-accuracy GPS fix...');
  };

  return (
    <div className="student-emergency-page animate-fade-in" style={{ 
      minHeight: 'calc(100vh - var(--topbar-height) - 100px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'var(--space-xl)'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-3xl)', fontWeight: 900, marginBottom: '8px' }}>
          Emergency Response Center
        </h1>
        <p className="text-muted mb-8">
          This system connects directly to Campus Security, Medical Responders, and local authorities. <strong>Do not test this system.</strong> Misuse will lead to severe disciplinary action.
        </p>

        {/* SOS Button Area */}
        <div style={{
          background: sosActive ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-tertiary)',
          border: `2px solid ${sosActive ? 'var(--accent-red)' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-xl)',
          padding: '48px 32px',
          boxShadow: sosActive ? '0 0 40px rgba(239, 68, 68, 0.4)' : 'none',
          transition: 'all var(--transition-slow)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {sosActive && (
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'repeating-linear-gradient(45deg, #ef4444, #ef4444 10px, transparent 10px, transparent 20px)' }} />
          )}

          <div style={{ position: 'relative', zIndex: 10 }}>
            {!sosActive ? (
              <>
                <button 
                  onClick={triggerSOS}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'var(--accent-red)',
                    border: '8px solid rgba(239, 68, 68, 0.3)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    margin: '0 auto',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.5)',
                    transition: 'transform 0.1s',
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <ShieldAlert size={48} />
                  <span style={{ fontSize: 'var(--font-xl)', fontWeight: 900, letterSpacing: '2px' }}>SOS</span>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>Hold to trigger</span>
                </button>
                <p className="text-xs text-muted mt-6 font-bold uppercase tracking-wider">
                  Sends live location to QRT (Quick Response Team)
                </p>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                {countdown > 0 ? (
                  <>
                    <h2 style={{ fontSize: 'var(--font-4xl)', fontWeight: 900, color: 'var(--accent-red)', margin: '0 0 16px 0' }}>
                      {countdown}
                    </h2>
                    <p style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '24px' }}>
                      Dispatching Emergency Services...
                    </p>
                    <button className="btn btn-ghost" onClick={cancelSOS}>
                      CANCEL FALSE ALARM
                    </button>
                  </>
                ) : (
                  <div className="animate-fade-in-up">
                    <div style={{ 
                      width: '80px', height: '80px', borderRadius: '50%', 
                      background: 'var(--accent-red)', color: 'white', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      margin: '0 auto 16px',
                      animation: 'pulse 1.5s infinite'
                    }}>
                      <Wind size={40} />
                    </div>
                    <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 900, color: 'var(--accent-red)', marginBottom: '8px' }}>
                      SOS SIGNAL BROADCASTED
                    </h2>
                    <p className="font-bold mb-4">Security personnel have been dispatched to your location.</p>
                    
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'inline-block', textAlign: 'left', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <MapPin size={16} className="text-blue" />
                        <span className="text-sm"><strong>Live Location:</strong> {location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={16} className="text-green" />
                        <span className="text-sm"><strong>Status:</strong> Guard Unit 4 is en route (ETA 2 mins)</span>
                      </div>
                    </div>

                    <div>
                      <button className="btn btn-primary" onClick={cancelSOS}>
                        MARK AS SAFE / RESOLVED
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Contact Directory */}
        <div className="grid-3" style={{ marginTop: 'var(--space-2xl)' }}>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="text-sm font-bold">Campus Security</div>
              <div className="text-xs text-muted">+91 9988776655</div>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="text-sm font-bold">Medical Center</div>
              <div className="text-xs text-muted">+91 1122334455</div>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="text-sm font-bold">Hostel Warden</div>
              <div className="text-xs text-muted">+91 5566778899</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
