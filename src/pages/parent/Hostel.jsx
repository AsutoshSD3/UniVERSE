import { useState } from 'react';
import { hostelInfo } from '../../data/mockStudentData';
import { parentWard } from '../../data/mockParentData';
import { formatDate } from '../../utils/helpers';
import { Building2, CheckCircle2, XCircle, AlertTriangle, User, ShieldCheck } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';

export default function ParentHostel() {
  const [outPasses, setOutPasses] = useState(hostelInfo.outPasses);

  const handleApprove = (id) => {
    setOutPasses(prev => prev.map(p => {
      if (p.id === id) return { ...p, status: 'Approved' };
      return p;
    }));
    alert(`✅ Out-pass ID: ${id} approved successfully. Warden notified.`);
  };

  const handleReject = (id) => {
    setOutPasses(prev => prev.map(p => {
      if (p.id === id) return { ...p, status: 'Rejected' };
      return p;
    }));
    alert(`❌ Out-pass ID: ${id} rejected.`);
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
        <span className={`badge ${row.status === 'Approved' ? 'badge-green' : row.status === 'Rejected' ? 'badge-red' : 'badge-orange'}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Action',
      key: 'action',
      sortable: false,
      render: (row) => (
        row.status === 'Pending Parent Approval' ? (
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="btn-icon sm btn-ghost text-green" onClick={() => handleApprove(row.id)}>
              <CheckCircle2 size={16} />
            </button>
            <button className="btn-icon sm btn-ghost text-red" onClick={() => handleReject(row.id)}>
              <XCircle size={16} />
            </button>
          </div>
        ) : (
          <span className="text-xs text-muted">Action Taken</span>
        )
      )
    }
  ];

  return (
    <div className="parent-hostel-page animate-fade-in">
      <div className="page-header">
        <h1>Hostel & Digital Out-Pass Approval</h1>
        <p>Monitor {parentWard.name}'s hostel check-ins and approve out-pass requests</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Current Location Status"
          value="In Campus"
          subtitle="Last biometric scan at Gate 2"
          icon={ShieldCheck}
          color="#10b981"
          badge="SAFE"
        />
        <StatCard
          title="Hostel Allocation"
          value={`Block ${hostelInfo.block}`}
          subtitle={`Room ${hostelInfo.room} (${hostelInfo.roomType})`}
          icon={Building2}
          color="#3b82f6"
        />
        <StatCard
          title="Pending Approvals"
          value={outPasses.filter(p => p.status === 'Pending Parent Approval').length}
          subtitle="Awaiting your authorization"
          icon={AlertTriangle}
          color="#f59e0b"
        />
      </div>

      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          Digital Out-Pass Requests
        </h3>
        <DataTable
          columns={columns}
          data={outPasses}
          searchable={false}
        />
      </div>
    </div>
  );
}
