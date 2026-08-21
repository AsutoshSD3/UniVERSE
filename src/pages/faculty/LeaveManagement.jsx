import { useState } from 'react';
import { facultyLeave } from '../../data/mockFacultyData';
import { formatDate } from '../../utils/helpers';
import { CalendarDays, Plus, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import DataTable from '../../components/common/DataTable';

export default function FacultyLeaveManagement() {
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaves, setLeaves] = useState(facultyLeave);

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    alert('✅ Leave request routed to HOD with your suggested proxy arrangements.');
    setIsLeaveModalOpen(false);
  };

  const columns = [
    { header: 'Type', key: 'type', render: (row) => <span className="font-bold">{row.type}</span> },
    { header: 'From Date', key: 'fromDate', render: (row) => formatDate(row.fromDate) },
    { header: 'To Date', key: 'toDate', render: (row) => formatDate(row.toDate) },
    { header: 'Days', key: 'days' },
    { header: 'Reason', key: 'reason' },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => (
        <span className={`badge ${row.status === 'Approved' ? 'badge-green' : 'badge-orange'}`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="faculty-leave-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Leave & Appraisal Management</h1>
          <p>Request leaves with auto-proxy routing and track your performance appraisals</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsLeaveModalOpen(true)}>
          <Plus size={18} /> Apply for Leave
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Casual Leaves (CL)"
          value="8 / 12"
          subtitle="4 Remaining this year"
          icon={CalendarDays}
          color="#3b82f6"
        />
        <StatCard
          title="Medical Leaves (ML)"
          value="2 / 10"
          subtitle="8 Remaining this year"
          icon={AlertCircle}
          color="#f59e0b"
        />
        <StatCard
          title="Academic Leaves (AL)"
          value="4 / 15"
          subtitle="Conferences & Workshops"
          icon={CheckCircle2}
          color="#10b981"
        />
      </div>

      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          Leave Application History
        </h3>
        <DataTable
          columns={columns}
          data={leaves}
          searchable={false}
        />
      </div>

      <div className="glass-card">
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          Performance Appraisal Tracker (Current Academic Year)
        </h3>
        <div className="grid-3">
          <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div className="text-sm font-bold text-blue mb-1">Student Feedback Score</div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>4.8 / 5.0</div>
            <div className="text-xs text-muted mt-2">Based on end-semester surveys across 3 subjects.</div>
          </div>
          <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div className="text-sm font-bold text-green mb-1">Research & Publications</div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>92 / 100</div>
            <div className="text-xs text-muted mt-2">Excellent performance in securing grants & Scopus papers.</div>
          </div>
          <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div className="text-sm font-bold text-purple mb-1">Administrative Duties</div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>85 / 100</div>
            <div className="text-xs text-muted mt-2">Satisfactory contribution to Dept Committees.</div>
          </div>
        </div>
      </div>

      <Modal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)} title="Apply for Leave with Proxy Routing">
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: 'var(--font-xs)', color: 'var(--accent-blue)' }}>
          ℹ️ The system will automatically suggest available faculty members to take over your scheduled classes during this period.
        </div>
        <form onSubmit={handleLeaveSubmit}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Leave Type</label>
            <select className="input-field" required>
              <option>Casual Leave (CL)</option>
              <option>Medical Leave (ML)</option>
              <option>Academic/On-Duty Leave (AL/OD)</option>
            </select>
          </div>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="input-group">
              <label>From Date</label>
              <input type="date" className="input-field" required />
            </div>
            <div className="input-group">
              <label>To Date</label>
              <input type="date" className="input-field" required />
            </div>
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Reason</label>
            <textarea className="input-field" placeholder="Brief reason for leave..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">Proceed to Proxy Setup</button>
        </form>
      </Modal>
    </div>
  );
}
