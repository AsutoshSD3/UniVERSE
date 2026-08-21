import { useState } from 'react';
import { facultyResearch } from '../../data/mockFacultyData';
import { FlaskConical, Download, Plus, Search, ExternalLink, ShieldCheck } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';

export default function FacultyResearch() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState(facultyResearch);

  return (
    <div className="faculty-research-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Research, Patents & Publications Hub</h1>
          <p>Track active grants, publish papers, and auto-export NAAC/NBA faculty portfolios</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost" onClick={() => alert('📥 NAAC Criteria III / NBA Portfolio exported as PDF!')}>
            <Download size={18} /> Export NAAC/NBA Portfolio
          </button>
          <button className="btn btn-primary" onClick={() => setIsAddProjectModalOpen(true)}>
            <Plus size={18} /> Add New Project/Paper
          </button>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Total Funding Granted"
          value="₹12,50,000"
          subtitle="From Govt & Private Agencies"
          icon={FlaskConical}
          color="#3b82f6"
        />
        <StatCard
          title="Active Projects"
          value={projects.filter(p => p.status === 'Ongoing').length}
          subtitle="Currently in progress"
          icon={Search}
          color="#10b981"
        />
        <StatCard
          title="Total Publications"
          value="14"
          subtitle="Scopus / IEEE Indexed"
          icon={ExternalLink}
          color="#8b5cf6"
          badge="H-INDEX: 8"
        />
      </div>

      <div className="glass-card">
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          My Active Research Portfolio
        </h3>
        <div className="grid-auto">
          {projects.map(proj => (
            <div key={proj.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderLeft: `4px solid ${proj.status === 'Completed' ? 'var(--accent-green)' : 'var(--accent-blue)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className={`badge ${proj.status === 'Completed' ? 'badge-green' : 'badge-blue'}`}>{proj.status}</span>
                <span className="badge badge-purple">{proj.role}</span>
              </div>
              <h4 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '4px' }}>{proj.title}</h4>
              <p className="text-sm text-muted mb-4 line-clamp-2">Funding Agency: {proj.agency}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-xs)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Grant Amount:</span>
                  <strong>{proj.grant}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Duration:</span>
                  <strong>{proj.duration}</strong>
                </div>
              </div>

              <button className="btn btn-ghost btn-sm w-full">
                <ExternalLink size={14} /> View Details & Submissions
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} title="Log New Research Work">
        <form onSubmit={(e) => { e.preventDefault(); alert('Research entry logged and sent for HOD verification.'); setIsAddProjectModalOpen(false); }}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Entry Type</label>
            <select className="input-field" required>
              <option>Funded Research Project</option>
              <option>Journal Publication (Scopus/SCI)</option>
              <option>Conference Paper</option>
              <option>Patent Filed/Granted</option>
            </select>
          </div>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Title of Work</label>
            <input type="text" className="input-field" placeholder="e.g. AI-driven crop disease detection..." required />
          </div>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '24px' }}>
            <div className="input-group">
              <label>Funding Agency / Journal Name</label>
              <input type="text" className="input-field" required />
            </div>
            <div className="input-group">
              <label>Grant Amount / DOI Link</label>
              <input type="text" className="input-field" required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            <ShieldCheck size={16} /> Submit for Institutional Review
          </button>
        </form>
      </Modal>
    </div>
  );
}
