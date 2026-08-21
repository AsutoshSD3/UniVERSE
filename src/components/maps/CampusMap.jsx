import { useState } from 'react';
import { campusBuildings } from '../../data/mockGuestData';
import { MapPin, Navigation, ShieldCheck, AlertTriangle, Eye, Video, Car, Info, Layers, Compass, Sparkles } from 'lucide-react';
import './CampusMap.css';

export default function CampusMap({ 
  interactive = true, 
  showControls = true,
  defaultDestination = null,
  compact = false 
}) {
  const [selectedBuilding, setSelectedBuilding] = useState(defaultDestination ? campusBuildings.find(b => b.shortName === defaultDestination) : null);
  const [safestPathActive, setSafestPathActive] = useState(false);
  const [showCCTV, setShowCCTV] = useState(false);
  const [showParking, setShowParking] = useState(false);
  const [showDangerZones, setShowDangerZones] = useState(false);
  const [search, setSearch] = useState('');
  const [navRoute, setNavRoute] = useState(null);

  // Simulated Danger / Construction Zones
  const dangerZones = [
    { id: 1, name: 'Active Construction - New Biotech Wing', x: 25, y: 15, radius: 45, reason: 'Restricted Heavy Machinery' },
    { id: 2, name: 'Forest Boundary (Low Lighting)', x: 85, y: 15, radius: 55, reason: 'Unlit Perimeter' },
  ];

  // Simulated CCTV & Lighting Nodes for Safest Path
  const safeNodes = [
    { x: 5, y: 50 },   // Gate
    { x: 15, y: 40 },  // Admin
    { x: 30, y: 25 },  // Main Block
    { x: 40, y: 45 },  // Library
    { x: 50, y: 65 },  // Cafeteria
    { x: 60, y: 40 },  // Auditorium
    { x: 70, y: 35 },  // Placement
    { x: 75, y: 60 },  // Hostel A
    { x: 85, y: 60 },  // Hostel B
  ];

  // Filtered buildings
  const filtered = campusBuildings.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.shortName.toLowerCase().includes(search.toLowerCase()) ||
    b.departments.some(d => d.toLowerCase().includes(search.toLowerCase()))
  );

  const startNavigation = (b) => {
    setSelectedBuilding(b);
    setNavRoute({
      from: 'Main Security Gate (Entry)',
      to: b.name,
      distance: '420 meters',
      estTime: safestPathActive ? '4 mins (Safe Well-Lit CCTV Corridor)' : '3 mins (Direct Path)',
      destX: b.x,
      destY: b.y
    });
  };

  return (
    <div className={`campus-map-card ${compact ? 'compact' : ''}`}>
      {showControls && (
        <div className="map-toolbar">
          <div className="map-search-box">
            <input
              type="text"
              placeholder="Search building, dept (e.g. CSE, Library, Cafeteria)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="map-toggles">
            <button 
              className={`map-toggle-btn ${safestPathActive ? 'active safe' : ''}`}
              onClick={() => setSafestPathActive(!safestPathActive)}
              title="Night Safe Navigation Mode with CCTV & Streetlight Coverage"
            >
              <ShieldCheck size={16} />
              <span>Safest Path Mode</span>
            </button>

            <button 
              className={`map-toggle-btn ${showCCTV ? 'active' : ''}`}
              onClick={() => setShowCCTV(!showCCTV)}
            >
              <Video size={16} />
              <span>CCTV</span>
            </button>

            <button 
              className={`map-toggle-btn ${showParking ? 'active' : ''}`}
              onClick={() => setShowParking(!showParking)}
            >
              <Car size={16} />
              <span>Parking</span>
            </button>

            <button 
              className={`map-toggle-btn ${showDangerZones ? 'active warn' : ''}`}
              onClick={() => setShowDangerZones(!showDangerZones)}
            >
              <AlertTriangle size={16} />
              <span>Danger Geofences</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Canvas Area */}
      <div className="map-viewport">
        {/* SVG Grid and Pathways */}
        <svg className="map-svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="safePathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="dangerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Roads & Pathways */}
          <path d="M 5,50 L 15,40 L 30,25 L 55,20 L 70,35 L 85,60" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <path d="M 15,40 L 40,45 L 60,40 L 70,35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <path d="M 5,50 L 20,70 L 50,65 L 75,60 L 85,60" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          <path d="M 40,45 L 50,65 L 65,55" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />

          {/* Safest Path Highlight */}
          {safestPathActive && (
            <path 
              d="M 5,50 L 15,40 L 40,45 L 60,40 L 70,35 L 75,60" 
              fill="none" 
              stroke="url(#safePathGrad)" 
              strokeWidth="2.5" 
              strokeDasharray="3,1"
              className="safest-path-glow"
            />
          )}

          {/* Active Navigation Route */}
          {navRoute && (
            <line 
              x1="5" y1="50" 
              x2={navRoute.destX} y2={navRoute.destY} 
              stroke="#3b82f6" 
              strokeWidth="2" 
              strokeDasharray="2,2"
              className="nav-line-anim"
            />
          )}

          {/* Danger Geofences */}
          {showDangerZones && dangerZones.map(dz => (
            <circle
              key={dz.id}
              cx={dz.x}
              cy={dz.y}
              r="10"
              fill="url(#dangerGrad)"
              stroke="#ef4444"
              strokeWidth="0.8"
              strokeDasharray="2,1"
            />
          ))}
        </svg>

        {/* Building Markers */}
        {filtered.map((b) => {
          const isSelected = selectedBuilding?.id === b.id;
          return (
            <div
              key={b.id}
              className={`map-building-marker ${isSelected ? 'selected' : ''} ${b.shortName === 'GATE' ? 'gate' : ''}`}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              onClick={() => setSelectedBuilding(b)}
            >
              <div className="marker-dot">
                <MapPin size={14} />
              </div>
              <span className="marker-label">{b.shortName}</span>
            </div>
          );
        })}

        {/* CCTV Camera Pins */}
        {showCCTV && safeNodes.map((node, i) => (
          <div 
            key={`cctv-${i}`} 
            className="map-overlay-pin cctv-pin"
            style={{ left: `${node.x + 3}%`, top: `${node.y - 3}%` }}
            title="Live AI Edge CCTV Camera (Active)"
          >
            <Video size={10} />
          </div>
        ))}

        {/* Parking Pins */}
        {showParking && [
          { x: 10, y: 55, name: 'P1: Guest Parking (24 Slots Free)' },
          { x: 35, y: 15, name: 'P2: Faculty Parking (12 Slots Free)' },
          { x: 80, y: 70, name: 'P3: Student 2-Wheeler Parking' },
        ].map((p, i) => (
          <div 
            key={`park-${i}`} 
            className="map-overlay-pin parking-pin"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            title={p.name}
          >
            <Car size={10} />
          </div>
        ))}

        {/* Compass */}
        <div className="map-compass">
          <Compass size={24} />
          <span>N</span>
        </div>
      </div>

      {/* Building Details / Navigation Info Bottom Sheet */}
      {selectedBuilding && (
        <div className="map-building-sheet animate-fade-in-up">
          <div className="sheet-header">
            <div>
              <div className="sheet-tag">Campus Building</div>
              <h4>{selectedBuilding.name} ({selectedBuilding.shortName})</h4>
              <p className="text-xs text-muted">
                Floors: {selectedBuilding.floors || 'Ground'} • Departments: {selectedBuilding.departments.join(', ') || 'General Facility'}
              </p>
            </div>
            <div className="sheet-actions">
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => startNavigation(selectedBuilding)}
              >
                <Navigation size={14} />
                <span>Navigate Here</span>
              </button>
            </div>
          </div>

          {navRoute && navRoute.destX === selectedBuilding.x && (
            <div className="nav-turn-by-turn">
              <div className="nav-step">
                <span className="badge badge-green">ROUTE READY</span>
                <span className="text-sm">From: <strong>{navRoute.from}</strong> ➔ To: <strong>{navRoute.to}</strong></span>
              </div>
              <div className="nav-meta">
                <span>📍 Est. Distance: <strong>{navRoute.distance}</strong></span>
                <span>⏱️ Time: <strong>{navRoute.estTime}</strong></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
