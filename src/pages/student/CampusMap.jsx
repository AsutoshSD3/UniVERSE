import CampusMapComponent from '../../components/maps/CampusMap';
import { MapPin, Info } from 'lucide-react';

export default function StudentCampusMap() {
  return (
    <div className="student-campus-map-page animate-fade-in" style={{ height: 'calc(100vh - var(--topbar-height) - 40px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '16px' }}>
        <h1>Interactive Campus GIS Map</h1>
        <p>Turn-by-turn navigation, real-time safety geofences & night corridor routing</p>
      </div>
      
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <CampusMapComponent interactive={true} showControls={true} compact={false} />
      </div>
    </div>
  );
}
