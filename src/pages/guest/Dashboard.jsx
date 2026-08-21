import { useNavigate } from 'react';
import { useAuth } from '../../context/AuthContext';
import { qrPasses, activeEvents } from '../../data/mockGuestData';
import StatCard from '../../components/common/StatCard';
import { 
  ClipboardList, QrCode, Map, CalendarCheck, HelpCircle, 
  ArrowRight, ShieldCheck, User 
} from 'lucide-react';

export default function GuestDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const activePass = qrPasses.find(p => p.status === 'Active');

  return (
    <div className="guest-dashboard animate-fade-in">
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        marginBottom: 'var(--space-xl)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-orange">Visitor / Guest Portal</span>
          </div>
          <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>
            Welcome to Campus, {user?.name?.split(' ')[0] || 'Visitor'}! 🏛️
          </h1>
          <p className="text-sm text-muted" style={{ marginTop: '4px' }}>
            Role: <strong>{user?.visitorType || 'General Visitor'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {!activePass ? (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/guest/register')}
            >
              <ClipboardList size={16} />
              <span>Register Visit</span>
            </button>
          ) : (
            <button 
              className="btn btn-success btn-sm"
              onClick={() => navigate('/guest/qr-pass')}
            >
              <QrCode size={16} />
              <span>Show Active QR Pass</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Gate Pass Status"
          value={activePass ? "ACTIVE" : "NONE"}
          subtitle={activePass ? `Valid until ${activePass.validUntil}` : "Requires Registration"}
          icon={ShieldCheck}
          color={activePass ? "#10b981" : "#f59e0b"}
          badge={activePass ? "APPROVED" : "PENDING"}
          onClick={() => navigate(activePass ? '/guest/qr-pass' : '/guest/register')}
        />
        <StatCard
          title="Upcoming Campus Events"
          value={activeEvents.length}
          subtitle="Open for public registration"
          icon={CalendarCheck}
          color="#3b82f6"
          onClick={() => navigate('/guest/events')}
        />
        <StatCard
          title="Admissions Inquiry"
          value="Open"
          subtitle="Explore courses & fee structure"
          icon={HelpCircle}
          color="#8b5cf6"
          onClick={() => navigate('/guest/inquiry')}
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        {/* Quick Actions */}
        <div className="glass-card">
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
            Quick Links for Visitors
          </h3>
          <div className="grid-2" style={{ gap: '12px' }}>
            <button 
              className="btn btn-ghost" 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}
              onClick={() => navigate('/guest/register')}
            >
              <ClipboardList size={28} className="text-orange" /> 
              <span className="font-bold">Register Visit</span>
              <span className="text-xs text-muted">Generate gate pass</span>
            </button>
            <button 
              className="btn btn-ghost" 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}
              onClick={() => navigate('/guest/campus-map')}
            >
              <Map size={28} className="text-blue" /> 
              <span className="font-bold">Campus Map</span>
              <span className="text-xs text-muted">Navigate to buildings</span>
            </button>
            <button 
              className="btn btn-ghost" 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}
              onClick={() => navigate('/guest/events')}
            >
              <CalendarCheck size={28} className="text-green" /> 
              <span className="font-bold">Events Hub</span>
              <span className="text-xs text-muted">Register for fests</span>
            </button>
            <button 
              className="btn btn-ghost" 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px' }}
              onClick={() => navigate('/guest/inquiry')}
            >
              <HelpCircle size={28} className="text-purple" /> 
              <span className="font-bold">Inquiry Portal</span>
              <span className="text-xs text-muted">Courses & prospectus</span>
            </button>
          </div>
        </div>

        {/* Featured Event / Campus Info */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
            Featured Campus Event
          </h3>
          {activeEvents.length > 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div style={{ height: '140px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '32px' }}>🎉</span>
              </div>
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="badge badge-blue mb-2">{activeEvents[0].type}</div>
                  <h4 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: '4px' }}>{activeEvents[0].title}</h4>
                  <p className="text-sm text-muted mb-4">{activeEvents[0].description}</p>
                </div>
                <button className="btn btn-primary w-full" onClick={() => navigate('/guest/events')}>
                  Register Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
