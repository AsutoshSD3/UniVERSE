import { useState } from 'react';
import { clubs } from '../../data/mockStudentData';
import { Wrench, ShieldAlert, Users, Search, Image as ImageIcon, Send, MessageSquare } from 'lucide-react';
import Modal from '../../components/common/Modal';

export default function StudentServices() {
  const [isLostFoundModalOpen, setIsLostFoundModalOpen] = useState(false);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [clubsList, setClubsList] = useState(clubs);

  const toggleClub = (id) => {
    setClubsList(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 };
      }
      return c;
    }));
  };

  return (
    <div className="student-services-page animate-fade-in">
      <div className="page-header">
        <h1>Campus Services & Student Life</h1>
        <p>Access AI lost & found, anonymous grievance redressal, and campus clubs</p>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        {/* Lost & Found */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Search size={32} />
          </div>
          <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '8px' }}>AI Visual Lost & Found</h3>
          <p className="text-sm text-muted mb-6">
            Post lost or found items with photos. Our AI engine automatically matches visual features to reunite students with their belongings.
          </p>
          <button className="btn btn-primary" onClick={() => setIsLostFoundModalOpen(true)}>
            <ImageIcon size={18} /> Report Lost / Found Item
          </button>
        </div>

        {/* Anonymous Grievance */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <ShieldAlert size={32} />
          </div>
          <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '8px' }}>Anonymous Grievance Redressal</h3>
          <p className="text-sm text-muted mb-6">
            Submit formal complaints regarding mess food, facilities, or academic issues. Identities are stripped client-side for complete anonymity.
          </p>
          <button className="btn btn-danger" onClick={() => setIsGrievanceModalOpen(true)}>
            <Send size={18} /> Submit Anonymous Grievance
          </button>
        </div>
      </div>

      {/* Campus Clubs & Societies */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Users size={20} className="text-purple" />
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>Campus Clubs & Peer Study Groups</h3>
        </div>
        
        <div className="grid-3">
          {clubsList.map(club => (
            <div key={club.id} style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: 'var(--font-base)', fontWeight: 700 }}>{club.name}</h4>
                  <span className="badge badge-blue">{club.members} Members</span>
                </div>
                <p className="text-xs text-muted mb-4">{club.description}</p>
              </div>
              <button 
                className={`btn btn-sm w-full ${club.joined ? 'btn-ghost' : 'btn-primary'}`}
                onClick={() => toggleClub(club.id)}
              >
                {club.joined ? 'Leave Club' : 'Join Club'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lost & Found Modal */}
      <Modal isOpen={isLostFoundModalOpen} onClose={() => setIsLostFoundModalOpen(false)} title="Report Item (AI Match)">
        <form onSubmit={(e) => { e.preventDefault(); alert('Item reported! AI is analyzing the image for matches.'); setIsLostFoundModalOpen(false); }}>
          <div className="tabs" style={{ marginBottom: '16px' }}>
            <button type="button" className="tab active">I Lost Something</button>
            <button type="button" className="tab">I Found Something</button>
          </div>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Item Name / Description</label>
            <input type="text" className="input-field" placeholder="e.g., Black Dell Laptop Charger" required />
          </div>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Last Seen Location</label>
            <input type="text" className="input-field" placeholder="e.g., Library 2nd Floor" required />
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Upload Photo for AI Matching</label>
            <input type="file" className="input-field" accept="image/*" />
          </div>
          <button type="submit" className="btn btn-primary w-full">Submit Report</button>
        </form>
      </Modal>

      {/* Grievance Modal */}
      <Modal isOpen={isGrievanceModalOpen} onClose={() => setIsGrievanceModalOpen(false)} title="Anonymous Grievance Triage">
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: 'var(--font-xs)', color: 'var(--accent-orange)' }}>
          🔒 Your identity is cryptographically stripped before reaching the server. The administration cannot trace this back to you.
        </div>
        <form onSubmit={(e) => { e.preventDefault(); alert('Anonymous grievance submitted successfully and routed to the relevant department head.'); setIsGrievanceModalOpen(false); }}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Department / Category</label>
            <select className="input-field" required>
              <option value="">Select Category</option>
              <option>Hostel & Mess Facilities</option>
              <option>Academic Issues</option>
              <option>Campus Infrastructure</option>
              <option>Harassment / Ragging</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Detailed Description</label>
            <textarea className="input-field" placeholder="Describe your issue in detail..." required style={{ minHeight: '120px' }}></textarea>
          </div>
          <button type="submit" className="btn btn-danger w-full">Submit Securely</button>
        </form>
      </Modal>
    </div>
  );
}
