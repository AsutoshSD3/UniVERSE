import { useState } from 'react';
import { studentAttendance, overallAttendance } from '../../data/mockStudentData';
import { parentWard } from '../../data/mockParentData';
import { BarChart3, Bell, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

export default function ParentAttendance() {
  const [targetPercentage] = useState(75);

  const pieData = [
    { name: 'Attended', value: overallAttendance.attended, color: '#10b981' },
    { name: 'Missed', value: overallAttendance.totalClasses - overallAttendance.attended, color: '#ef4444' }
  ];

  const columns = [
    {
      header: 'Subject',
      key: 'subjectName',
      render: (row) => <div style={{ fontWeight: 600 }}>{row.subjectName}</div>
    },
    {
      header: 'Attended / Total',
      key: 'attended',
      render: (row) => <span>{row.attended} / {row.totalClasses} classes</span>
    },
    {
      header: 'Percentage',
      key: 'percentage',
      render: (row) => {
        const isLow = row.percentage < targetPercentage;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontWeight: 700,
              color: isLow ? 'var(--accent-red)' : row.percentage >= 85 ? 'var(--accent-green)' : 'var(--accent-orange)' 
            }}>
              {row.percentage}%
            </span>
            {isLow && <span className="badge badge-red">SHORTAGE WARNING</span>}
          </div>
        );
      }
    }
  ];

  return (
    <div className="parent-attendance-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Ward's Attendance Tracker</h1>
          <p>Real-time class compliance & automated absence alerts for {parentWard.name}</p>
        </div>
        <button className="btn btn-ghost" onClick={() => alert('🔔 Instant SMS Alerts toggled on for any missed classes.')}>
          <Bell size={18} className="text-orange" /> Configure SMS Alerts
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Overall Attendance"
          value={`${overallAttendance.percentage}%`}
          subtitle="Mandatory Minimum: 75%"
          icon={BarChart3}
          color={overallAttendance.percentage >= 75 ? "#10b981" : "#ef4444"}
          badge={overallAttendance.percentage >= 75 ? "SAFE" : "AT RISK"}
        />
        <StatCard
          title="Total Lectures Attended"
          value={`${overallAttendance.attended} / ${overallAttendance.totalClasses}`}
          subtitle="Current Semester"
          icon={TrendingUp}
          color="#3b82f6"
        />
        <StatCard
          title="Subjects with Shortage"
          value={studentAttendance.filter(s => s.percentage < 75).length}
          subtitle="Computer Networks (68.4%)"
          icon={AlertTriangle}
          color="#f59e0b"
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>Attendance Distribution</h3>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '200px', height: '200px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>{overallAttendance.percentage}%</span>
                <span className="text-xs text-muted">Total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
            Subject Breakdown
          </h3>
          <DataTable
            columns={columns}
            data={studentAttendance}
            searchable={false}
          />
        </div>
      </div>
    </div>
  );
}
