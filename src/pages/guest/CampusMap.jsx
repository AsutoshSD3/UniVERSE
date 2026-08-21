import { useNavigate } from 'react-router-dom';
import CampusMapComponent from '../../components/maps/CampusMap';
import { ArrowLeft } from 'lucide-react';

export default function GuestCampusMap() {
  const navigate = useNavigate();

  return (
    <div className="guest-campus-map-page animate-fade-in" style={{ height: 'calc(100vh - var(--topbar-height) - 40px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className="btn btn-ghost" 
          onClick={() => navigate('/guest/dashboard')}
          style={{ padding: '8px' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>Campus Navigation Map</h1>
          <p className="text-muted">Interactive map with wayfinding, guest parking zones, and public areas.</p>
        </div>
      </div>
      
      <div style={{ flex: 1, minHeight: 0, position: 'relative', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <CampusMapComponent interactive={true} showControls={true} compact={false} />
      </div>
    </div>
  );
}
