import { useState } from 'react';
import { busLocation } from '../../data/mockParentData';
import { Bus, MapPin, Map, Bell, Clock, Compass } from 'lucide-react';

export default function ParentBusTracking() {
  return (
    <div className="parent-bus-tracking-page animate-fade-in" style={{ height: 'calc(100vh - var(--topbar-height) - 40px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Live GPS Transport Tracking</h1>
          <p>Track University Bus {busLocation.busNo} and receive boarding/alighting geo-alerts</p>
        </div>
        <button className="btn btn-ghost" onClick={() => alert('🔔 Geofence alerts for Stop: ' + busLocation.lastStop + ' configured!')}>
          <Bell size={18} className="text-orange" /> Set Arrival Alert
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bus size={24} />
          </div>
          <div>
            <div className="text-sm font-bold">Bus Route {busLocation.busNo}</div>
            <div className="text-xs text-muted">Driver: Ramesh Kumar</div>
            <div className="text-xs text-green font-bold mt-1">Live • {busLocation.speed}</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={24} />
          </div>
          <div>
            <div className="text-sm font-bold">Current Location</div>
            <div className="text-xs text-muted">Crossed {busLocation.lastStop}</div>
            <div className="text-xs font-bold text-orange mt-1">ETA Next Stop: {busLocation.etaNextStop}</div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="text-sm font-bold">Student Status</div>
            <div className="text-xs text-muted">Biometric scan verified</div>
            <div className="text-xs font-bold text-green mt-1">Boarded at 7:42 AM</div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ flex: 1, minHeight: 0, padding: 0, position: 'relative', overflow: 'hidden' }}>
        {/* Mock Map Viewport */}
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, #172138 0%, #0d1222 100%)', position: 'relative' }}>
          {/* Map Grid */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Bus Route Line */}
            <path d="M 100,100 L 250,200 L 400,150 L 550,300 L 700,250" fill="none" stroke="var(--border-color)" strokeWidth="4" />
            
            {/* Highlighted Traveled Route */}
            <path d="M 100,100 L 250,200 L 400,150" fill="none" stroke="var(--accent-blue)" strokeWidth="4" className="nav-line-anim" />

            {/* Stops */}
            <circle cx="100" cy="100" r="8" fill="var(--bg-card)" stroke="var(--accent-blue)" strokeWidth="3" />
            <circle cx="250" cy="200" r="8" fill="var(--bg-card)" stroke="var(--accent-blue)" strokeWidth="3" />
            <circle cx="400" cy="150" r="8" fill="var(--bg-card)" stroke="var(--accent-blue)" strokeWidth="3" />
            <circle cx="550" cy="300" r="8" fill="var(--bg-card)" stroke="var(--text-muted)" strokeWidth="3" />
            <circle cx="700" cy="250" r="8" fill="var(--bg-card)" stroke="var(--accent-green)" strokeWidth="4" /> {/* Destination */}
          </svg>

          {/* Live Bus Marker */}
          <div style={{
            position: 'absolute',
            left: '400px',
            top: '150px',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '6px', borderRadius: '50%', boxShadow: '0 0 16px var(--accent-blue)' }}>
              <Bus size={20} />
            </div>
            <div className="badge badge-blue mt-1" style={{ fontSize: '10px' }}>Bus {busLocation.busNo}</div>
          </div>

          <div style={{ position: 'absolute', left: '700px', top: '230px', transform: 'translate(-50%, -100%)' }}>
            <div className="badge badge-green">Campus Destination</div>
          </div>
          
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: 'var(--font-xs)' }}>
              <Compass size={16} /> GPS Accuracy: &lt; 5 meters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
