import { useState } from 'react';
import { timetable } from '../../data/mockStudentData';
import { Clock, MapPin, User, AlertCircle, Calendar, Download, Sparkles } from 'lucide-react';

export default function StudentTimetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const [selectedDay, setSelectedDay] = useState(days.includes(todayName) ? todayName : 'Monday');

  const proxyAlerts = [
    {
      id: 1,
      subject: 'Computer Networks (CS304)',
      originalFaculty: 'Dr. Vikram Patel',
      proxyFaculty: 'Prof. Sneha Reddy',
      reason: 'Faculty on Conference Leave',
      date: 'Today',
      time: '9:00 AM - 10:00 AM',
      room: 'CSE-301 ➔ Lab-3'
    }
  ];

  return (
    <div className="student-timetable-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Interactive Live Timetable</h1>
          <p>Real-time class schedules, dynamic room assignments & proxy substitution alerts</p>
        </div>
        <button 
          className="btn btn-ghost btn-sm"
          onClick={() => alert('📥 Timetable PDF downloaded successfully!')}
        >
          <Download size={16} />
          <span>Export Weekly Schedule</span>
        </button>
      </div>

      {/* Proxy / Substitution Alert Banner */}
      {proxyAlerts.length > 0 && (
        <div className="glass-card" style={{ 
          background: 'rgba(245, 158, 11, 0.1)', 
          borderColor: 'rgba(245, 158, 11, 0.3)',
          marginBottom: 'var(--space-xl)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.2)',
            color: 'var(--accent-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertCircle size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-orange">PROXY / ROOM RESCHEDULE ALERT</span>
              <span className="text-xs text-muted">{proxyAlerts[0].date} • {proxyAlerts[0].time}</span>
            </div>
            <p className="text-sm font-bold" style={{ marginTop: '2px' }}>
              {proxyAlerts[0].subject}: Substituted by <span className="text-orange">{proxyAlerts[0].proxyFaculty}</span> (Room: {proxyAlerts[0].room})
            </p>
            <span className="text-xs text-muted">Reason: {proxyAlerts[0].reason}</span>
          </div>
        </div>
      )}

      {/* Day Selector Tabs */}
      <div className="tabs">
        {days.map((day) => (
          <button
            key={day}
            className={`tab ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day} {day === todayName && <span className="badge badge-blue" style={{ marginLeft: '6px', fontSize: '9px' }}>TODAY</span>}
          </button>
        ))}
      </div>

      {/* Classes for Selected Day */}
      <div className="grid-auto">
        {(timetable[selectedDay] || []).map((cls, idx) => (
          <div 
            key={idx} 
            className="glass-card"
            style={{
              borderLeft: `4px solid ${cls.type === 'Lab' ? 'var(--accent-purple)' : cls.type === 'Tutorial' ? 'var(--accent-orange)' : 'var(--accent-blue)'}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span className={`badge ${cls.type === 'Lab' ? 'badge-purple' : cls.type === 'Tutorial' ? 'badge-orange' : 'badge-blue'}`}>
                {cls.type}
              </span>
              <span className="text-xs text-muted font-bold">{cls.code}</span>
            </div>

            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '8px' }}>
              {cls.subject}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} className="text-blue" />
                <span>{cls.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} className="text-green" />
                <span>Room: <strong className="text-primary">{cls.room}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} className="text-purple" />
                <span>Faculty: {cls.faculty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Weekly Timetable Grid Table */}
      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '16px' }}>
          Weekly Master Schedule View
        </h3>
        
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>9:00 - 10:00</th>
                <th>10:00 - 11:00</th>
                <th>11:15 - 12:15</th>
                <th>2:00 - 3:00</th>
                <th>3:00 - 4:00</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dayClasses = timetable[day] || [];
                return (
                  <tr key={day} style={{ background: day === todayName ? 'rgba(59, 130, 246, 0.05)' : 'transparent' }}>
                    <td style={{ fontWeight: 700 }}>
                      {day} {day === todayName && <span className="status-dot online" style={{ marginLeft: '4px' }}></span>}
                    </td>
                    {['9:00 - 10:00', '10:00 - 11:00', '11:15 - 12:15', '2:00 - 3:00', '3:00 - 4:00'].map((slot, sIdx) => {
                      const match = dayClasses.find(c => c.time.includes(slot.split(' - ')[0]));
                      return (
                        <td key={sIdx} style={{ fontSize: 'var(--font-xs)' }}>
                          {match ? (
                            <div style={{ 
                              background: 'var(--bg-tertiary)', 
                              padding: '6px 8px', 
                              borderRadius: 'var(--radius-sm)',
                              borderLeft: '2px solid var(--accent-blue)'
                            }}>
                              <div style={{ fontWeight: 600 }}>{match.code}</div>
                              <div className="text-muted">{match.room}</div>
                            </div>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
