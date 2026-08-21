import { useState } from 'react';
import { hostelInfo } from '../../data/mockStudentData';
import { formatDate } from '../../utils/helpers';
import { Building2, User, PhoneCall, Clock, CalendarDays, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import DataTable from '../../components/common/DataTable';

export default function StudentHostel() {
  const [isOutPassModalOpen, setIsOutPassModalOpen] = useState(false);
  const [outPassReason, setOutPassReason] = useState('');
  const [outPassReturn, setOutPassReturn] = useState('');

  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const todayMenu = hostelInfo.messMenu[todayName];

  const handleOutPassSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Out-pass request submitted! It has been automatically routed to Warden ${hostelInfo.warden} and your parent for digital approval.`);
    setIsOutPassModalOpen(false);
  };

  const columns = [
    { header: 'Pass ID', key: 'id', render: (row) => <span className="text-xs font-bold">{row.id}</span> },
    { header: 'Date', key: 'date', render: (row) => formatDate(row.date) },
    { header: 'Reason', key: 'reason' },
    { header: 'Return Date', key: 'returnDate', render: (row) => formatDate(row.returnDate) },
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
    <div className="student-hostel-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Hostel & Mess Services</h1>
          <p>Digital out-pass requests, mess menu tracker & facility overview</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsOutPassModalOpen(true)}
        >
          <Plus size={18} />
          <span>Request Digital Out-Pass</span>
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Hostel Allocation"
          value={`Block ${hostelInfo.block} - ${hostelInfo.room}`}
          subtitle={hostelInfo.roomType}
          icon={Building2}
          color="#3b82f6"
        />
        <StatCard
          title="Hostel Warden"
          value={hostelInfo.warden}
          subtitle={<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><PhoneCall size={12} /> {hostelInfo.wardenPhone}</span>}
          icon={User}
          color="#8b5cf6"
        />
        <StatCard
          title="Night Check-in Time"
          value={hostelInfo.checkIn}
          subtitle="Biometric entry closing time"
          icon={Clock}
          color="#f59e0b"
          badge="MANDATORY"
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        {/* Today's Mess Menu */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarDays size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>Today's Mess Menu</h3>
              <p className="text-xs text-muted">{todayName}'s Specials</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-orange)' }}>
              <div className="text-xs font-bold text-orange mb-1">BREAKFAST (7:30 AM - 9:00 AM)</div>
              <div>{todayMenu.breakfast}</div>
            </div>
            <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-blue)' }}>
              <div className="text-xs font-bold text-blue mb-1">LUNCH (12:30 PM - 2:00 PM)</div>
              <div>{todayMenu.lunch}</div>
            </div>
            <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-purple)' }}>
              <div className="text-xs font-bold text-purple mb-1">DINNER (7:30 PM - 9:00 PM)</div>
              <div>{todayMenu.dinner}</div>
            </div>
          </div>
        </div>

        {/* Roommate Info */}
        <div className="glass-card">
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
            Roommate Information
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
            <div className="avatar lg" style={{ background: 'var(--gradient-primary)' }}>
              {hostelInfo.roommate.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>{hostelInfo.roommate}</div>
              <div className="text-sm text-muted">B.Tech Mechanical (Sem 5)</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <span className="badge badge-green"><CheckCircle2 size={12} /> Present in Campus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          My Out-Pass History
        </h3>
        <DataTable
          columns={columns}
          data={hostelInfo.outPasses}
          searchable={false}
        />
      </div>

      <Modal
        isOpen={isOutPassModalOpen}
        onClose={() => setIsOutPassModalOpen(false)}
        title="Request Digital Out-Pass"
      >
        <form onSubmit={handleOutPassSubmit}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Leave Date</label>
            <input type="date" className="input-field" required />
          </div>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Expected Return Date</label>
            <input 
              type="date" 
              className="input-field" 
              value={outPassReturn}
              onChange={(e) => setOutPassReturn(e.target.value)}
              required 
            />
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Reason for Leave</label>
            <textarea 
              className="input-field" 
              placeholder="E.g., Medical checkup, Home visit..."
              value={outPassReason}
              onChange={(e) => setOutPassReason(e.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsOutPassModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} />
              <span>Submit for Approval</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
