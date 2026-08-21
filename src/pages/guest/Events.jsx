import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users, ExternalLink, Filter } from 'lucide-react';
import { guestEvents } from '../../data/mockGuestData';

export default function GuestEvents() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All' 
    ? guestEvents 
    : guestEvents.filter(e => e.category === filter);

  const categories = ['All', ...new Set(guestEvents.map(e => e.category))];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="btn btn-ghost" 
            onClick={() => navigate('/guest/dashboard')}
            style={{ padding: '8px' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>Campus Events Hub</h1>
            <p className="text-muted">Discover and register for public fests, workshops, and seminars.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Filter size={18} className="text-muted" />
          <select 
            className="btn btn-ghost" 
            style={{ background: 'var(--bg-tertiary)' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-2">
        {filteredEvents.map(event => (
          <div key={event.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
            {/* Image Placeholder */}
            <div style={{ 
              height: '140px', 
              background: `linear-gradient(135deg, var(--bg-tertiary) 0%, rgba(${Math.random()*100 + 50}, ${Math.random()*100 + 50}, 255, 0.2) 100%)`,
              position: 'relative'
            }}>
              <div className="badge badge-blue" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                {event.category}
              </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '8px' }}>{event.name}</h3>
              <p className="text-sm text-muted mb-4" style={{ flex: 1 }}>{event.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                  <Calendar size={16} className="text-blue" />
                  <span>{event.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                  <Clock size={16} className="text-orange" />
                  <span>{event.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                  <MapPin size={16} className="text-red" />
                  <span>{event.venue}</span>
                </div>
                {event.maxCapacity > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                    <Users size={16} className="text-green" />
                    <span>{event.registeredCount} / {event.maxCapacity} Registered</span>
                  </div>
                )}
              </div>

              {event.registrationOpen ? (
                <button className="btn btn-primary w-full" onClick={() => alert('Event registration simulated! You will receive a QR pass shortly.')}>
                  Register Now <ExternalLink size={16} />
                </button>
              ) : (
                <button className="btn w-full" disabled style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                  Registration Closed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
