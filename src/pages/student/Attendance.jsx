import { useState } from 'react';
import { studentAttendance, overallAttendance } from '../../data/mockStudentData';
import { BarChart3, Calculator, ShieldCheck, AlertTriangle, Info, CheckCircle2, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';

export default function StudentAttendance() {
  const [targetPercentage, setTargetPercentage] = useState(75);
  const [selectedSubject, setSelectedSubject] = useState(studentAttendance[0]);

  // Calculate skip or attend needed for a subject based on custom target
  const calculateMargin = (attended, total, target) => {
    const currentPct = (attended / total) * 100;
    const targetFrac = target / 100;

    if (currentPct >= target) {
      // Safe to skip
      // (attended) / (total + x) >= targetFrac => attended >= targetFrac * total + targetFrac * x => x <= (attended - targetFrac * total) / targetFrac
      const canSkip = Math.floor((attended - targetFrac * total) / targetFrac);
      return {
        status: 'safe',
        canSkip: Math.max(0, canSkip),
        message: `You can safely skip ${Math.max(0, canSkip)} upcoming classes and stay above ${target}%.`
      };
    } else {
      // Need to attend consecutive classes
      // (attended + x) / (total + x) >= targetFrac => attended + x >= targetFrac * total + targetFrac * x => x * (1 - targetFrac) >= targetFrac * total - attended => x >= (targetFrac * total - attended) / (1 - targetFrac)
      const needToAttend = Math.ceil((targetFrac * total - attended) / (1 - targetFrac));
      return {
        status: 'shortage',
        needToAttend: Math.max(0, needToAttend),
        message: `You must attend ${Math.max(0, needToAttend)} consecutive classes without missing to reach ${target}%.`
      };
    }
  };

  const selectedCalc = calculateMargin(
    selectedSubject.attended,
    selectedSubject.totalClasses,
    targetPercentage
  );

  const columns = [
    {
      header: 'Subject & Code',
      key: 'subjectName',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.subjectName}</div>
          <div className="text-xs text-muted">ID: {row.subjectId}</div>
        </div>
      )
    },
    {
      header: 'Attended / Total',
      key: 'attended',
      render: (row) => (
        <span>{row.attended} / {row.totalClasses} lectures</span>
      )
    },
    {
      header: 'Attendance %',
      key: 'percentage',
      render: (row) => {
        const isLow = row.percentage < 75;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontWeight: 700,
              color: isLow ? 'var(--accent-red)' : row.percentage >= 85 ? 'var(--accent-green)' : 'var(--accent-orange)' 
            }}>
              {row.percentage}%
            </span>
            {isLow && <span className="badge badge-red">DEFICIT</span>}
          </div>
        );
      }
    },
    {
      header: 'Status & Margin (At 75%)',
      key: 'status',
      render: (row) => {
        const margin = calculateMargin(row.attended, row.totalClasses, 75);
        return margin.status === 'safe' ? (
          <span className="text-xs text-green font-bold">
            ✓ Can skip {margin.canSkip} classes
          </span>
        ) : (
          <span className="text-xs text-red font-bold">
            ⚠️ Attend {margin.needToAttend} more classes
          </span>
        );
      }
    },
    {
      header: 'Action',
      key: 'action',
      sortable: false,
      render: (row) => (
        <button 
          className="btn btn-ghost btn-sm"
          onClick={() => setSelectedSubject(row)}
        >
          Calculate
        </button>
      )
    }
  ];

  return (
    <div className="student-attendance-page animate-fade-in">
      <div className="page-header">
        <h1>Attendance Target & Margin Calculator</h1>
        <p>Real-time lecture compliance monitoring and shortage prevention engine</p>
      </div>

      {/* KPI Cards */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Overall Attendance"
          value={`${overallAttendance.percentage}%`}
          subtitle="Cumulative Semester 5"
          icon={BarChart3}
          color="#10b981"
          badge="HEALTHY"
        />
        <StatCard
          title="Total Lectures"
          value={overallAttendance.totalClasses}
          subtitle={`${overallAttendance.attended} Attended`}
          icon={TrendingUp}
          color="#3b82f6"
        />
        <StatCard
          title="Safe Skip Margin"
          value={`${overallAttendance.canSkip} Classes`}
          subtitle="At 75% Institutional Threshold"
          icon={ShieldCheck}
          color="#8b5cf6"
        />
        <StatCard
          title="Subjects in Deficit"
          value={studentAttendance.filter(s => s.percentage < 75).length}
          subtitle="Computer Networks (68.4%)"
          icon={AlertTriangle}
          color="#ef4444"
          badge="ALERT"
        />
      </div>

      {/* Interactive Target & Margin Calculator Tool */}
      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)', background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Calculator className="text-blue" size={24} />
          <div>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700 }}>Interactive What-If Margin Simulator</h3>
            <p className="text-xs text-muted">Select a subject and drag your target goal to calculate exact class margins</p>
          </div>
        </div>

        <div className="grid-3" style={{ alignItems: 'center' }}>
          {/* Subject Dropdown */}
          <div className="input-group">
            <label>Select Subject</label>
            <select
              className="input-field"
              value={selectedSubject.subjectId}
              onChange={(e) => setSelectedSubject(studentAttendance.find(s => s.subjectId === e.target.value))}
            >
              {studentAttendance.map((sub) => (
                <option key={sub.subjectId} value={sub.subjectId}>
                  {sub.subjectName} ({sub.percentage}%)
                </option>
              ))}
            </select>
          </div>

          {/* Target Slider */}
          <div className="input-group">
            <label>Desired Target Percentage: <strong className="text-blue">{targetPercentage}%</strong></label>
            <input
              type="range"
              min="60"
              max="95"
              step="1"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-blue)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span>60% (Condonation)</span>
              <span>75% (Mandatory)</span>
              <span>85% (Distinction)</span>
              <span>95% (Dean's List)</span>
            </div>
          </div>

          {/* Simulation Output Card */}
          <div style={{
            background: selectedCalc.status === 'safe' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${selectedCalc.status === 'safe' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 'var(--font-xs)', fontWeight: 700, color: selectedCalc.status === 'safe' ? 'var(--accent-green-light)' : 'var(--accent-red)' }}>
              {selectedCalc.status === 'safe' ? '✅ SAFE SURPLUS MARGIN' : '⚠️ ATTENDANCE SHORTAGE WARNING'}
            </div>
            <div style={{ fontSize: 'var(--font-xl)', fontWeight: 800, margin: '6px 0', color: 'var(--text-primary)' }}>
              {selectedCalc.status === 'safe' ? `${selectedCalc.canSkip} Classes Can Be Skipped` : `${selectedCalc.needToAttend} Consecutive Classes Needed`}
            </div>
            <p className="text-xs text-muted">{selectedCalc.message}</p>
          </div>
        </div>
      </div>

      {/* Full Subject-Wise Attendance Breakdown Table */}
      <div className="glass-card">
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          Subject-Wise Attendance Breakdown
        </h3>
        <DataTable
          columns={columns}
          data={studentAttendance}
          searchPlaceholder="Search subject or code..."
          searchKey="subjectName"
        />
      </div>
    </div>
  );
}
