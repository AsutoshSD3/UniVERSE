import { useState } from 'react';
import { Clock, MapPin, User, AlertCircle, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import Modal from '../../components/common/Modal';

export default function FacultyTimetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  
  const [isProxyModalOpen, setIsProxyModalOpen] = useState(false);

  // Mock faculty timetable
  const schedule = [
    { time: '09:00 - 10:00', type: 'Lecture', subject: 'Computer Networks (CS304)', room: 'CSE-301', branch: 'CSE - Sem 5 (A)' },
    { time: '11:15 - 12:15', type: 'Lecture', subject: 'Network Security (CS308)', room: 'CSE-304', branch: 'CSE - Sem 5 (B)' },
    { time: '14:00 - 16:00', type: 'Lab', subject: 'Networking Lab', room: 'Lab-3', branch: 'CSE - Sem 5 (A)' },
  ];

  return (
    <div className="faculty-timetable-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Personal Timetable & Proxy Engine</h1>
          <p>Manage your weekly schedule, book labs, and request automated proxies</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsProxyModalOpen(true)}>
          <RefreshCw size={18} /> Request Proxy / Substitute
        </button>
      </div>

      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarIcon className="text-blue" size={20} /> Today's Schedule ({todayName})
        </h3>
        
        <div className="grid-3">
          {schedule.map((cls, idx) => (
            <div key={idx} className="glass-card" style={{ borderLeft: `4px solid ${cls.type === 'Lab' ? 'var(--accent-purple)' : 'var(--accent-blue)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className={`badge ${cls.type === 'Lab' ? 'badge-purple' : 'badge-blue'}`}>{cls.type}</span>
                <span className="text-xs text-muted font-bold">{cls.time}</span>
              </div>
              <h4 style={{ fontSize: 'var(--font-base)', fontWeight: 700, marginBottom: '4px' }}>{cls.subject}</h4>
              <div className="text-xs text-muted mb-4">{cls.branch}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-xs)' }}>
                <MapPin size={14} className="text-green" /> <strong>{cls.room}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly View Placeholder */}
      <div className="glass-card">
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          Weekly Master Schedule
        </h3>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>9:00 - 10:00</th>
                <th>10:00 - 11:00</th>
                <th>11:15 - 12:15</th>
                <th>2:00 - 4:00 (Lab)</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} style={{ background: day === todayName ? 'rgba(59, 130, 246, 0.05)' : 'transparent' }}>
                  <td style={{ fontWeight: 700 }}>
                    {day} {day === todayName && <span className="status-dot online" style={{ marginLeft: '4px' }}></span>}
                  </td>
                  {day === 'Monday' || day === 'Wednesday' ? (
                    <>
                      <td><div className="text-xs font-bold text-blue">CS304<br/><span className="text-muted">CSE-301</span></div></td>
                      <td><span className="text-muted">-</span></td>
                      <td><div className="text-xs font-bold text-blue">CS308<br/><span className="text-muted">CSE-304</span></div></td>
                      <td><div className="text-xs font-bold text-purple">Net Lab<br/><span className="text-muted">Lab-3</span></div></td>
                    </>
                  ) : (
                    <>
                      <td><span className="text-muted">-</span></td>
                      <td><div className="text-xs font-bold text-blue">CS304<br/><span className="text-muted">CSE-301</span></div></td>
                      <td><span className="text-muted">-</span></td>
                      <td><span className="text-muted">-</span></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isProxyModalOpen} onClose={() => setIsProxyModalOpen(false)} title="Request Class Proxy / Substitute">
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: 'var(--font-xs)', color: 'var(--accent-orange)' }}>
          ⚠️ The automated engine will find available faculty in your department during your scheduled slot.
        </div>
        <form onSubmit={(e) => { e.preventDefault(); alert('Proxy request sent! Awaiting approval from matched faculty.'); setIsProxyModalOpen(false); }}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Select Class to Reschedule</label>
            <select className="input-field" required>
              {schedule.map((c, i) => (
                <option key={i} value={i}>{c.subject} - {c.time} ({todayName})</option>
              ))}
            </select>
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Reason for Proxy</label>
            <input type="text" className="input-field" placeholder="e.g. Attending Conference, Medical Leave" required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Find Available Substitutes (Auto-Match)</button>
        </form>
      </Modal>
    </div>
  );
}
