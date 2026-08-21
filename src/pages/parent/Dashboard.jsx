import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { parentWard, busLocation, feeDetails } from '../../data/mockParentData';
import { studentAttendance, studentMarks, todaysClasses, calendarEvents } from '../../data/mockStudentData';
import { announcements } from '../../data/mockAnnouncements';
import StatCard from '../../components/common/StatCard';
import Calendar from '../../components/common/Calendar';
import { 
  BarChart3, BookOpen, CreditCard, Bus, MessageSquare, 
  MapPin, AlertTriangle, ArrowRight, Bell 
} from 'lucide-react';

export default function ParentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Combine some data for the parent view
  const overallAttendance = 82.5; // Mock aggregated from studentAttendance
  const recentNotices = announcements.slice(0, 3);

  return (
    <div className="parent-dashboard animate-fade-in">
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        marginBottom: 'var(--space-xl)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-purple">Parent Portal</span>
          </div>
          <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>
            Welcome, {user?.name?.split(' ')[0] || 'Parent'} 👋
          </h1>
          <p className="text-sm text-muted" style={{ marginTop: '4px' }}>
            Ward: <strong>{parentWard.name}</strong> ({parentWard.rollNo}) • {parentWard.course} Sem {parentWard.semester}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/parent/fees')}
          >
            <CreditCard size={16} />
            <span>Pay Semester Fee</span>
          </button>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Ward's Attendance"
          value={`${overallAttendance}%`}
          subtitle="Above 75% Threshold"
          icon={BarChart3}
          color="#10b981"
          badge="SAFE"
          onClick={() => navigate('/parent/attendance')}
        />
        <StatCard
          title="Current CGPA"
          value={studentMarks.cgpa}
          subtitle="Top 15% of Batch"
          icon={BookOpen}
          color="#3b82f6"
          onClick={() => navigate('/parent/academics')}
        />
        <StatCard
          title="Pending Fees"
          value={`₹${feeDetails.pending.toLocaleString()}`}
          subtitle={`Due: ${feeDetails.nextDueDate}`}
          icon={AlertTriangle}
          color="#ef4444"
          badge="DUE SOON"
          onClick={() => navigate('/parent/fees')}
        />
        <StatCard
          title="Transport Status"
          value="In Transit"
          subtitle={`Bus ${busLocation.busNo} • ${busLocation.speed}`}
          icon={Bus}
          color="#f59e0b"
          onClick={() => navigate('/parent/bus-tracking')}
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)', gridTemplateColumns: '1fr 1fr' }}>
        <Calendar 
          classes={todaysClasses}
          events={calendarEvents}
          title={`${parentWard.name}'s Academic Schedule`}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {/* Recent Messages / Notices */}
          <div className="glass-card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>Institutional Notices</h3>
                <p className="text-xs text-muted">Latest updates from university</p>
              </div>
              <Bell size={20} className="text-blue" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentNotices.map((notice, idx) => (
                <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: `3px solid var(--accent-blue)` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="text-xs font-bold">{notice.title}</span>
                    <span className="text-xs text-muted">{notice.date}</span>
                  </div>
                  <div className="text-xs text-muted line-clamp-1">{notice.content || 'Please check the full circular online.'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
              Quick Actions
            </h3>
            <div className="grid-2" style={{ gap: '8px' }}>
              <button 
                className="btn btn-ghost" 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }}
                onClick={() => navigate('/parent/messages')}
              >
                <MessageSquare size={24} className="text-purple" /> 
                <span className="text-xs">Message Teacher</span>
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }}
                onClick={() => navigate('/parent/hostel')}
              >
                <MapPin size={24} className="text-green" /> 
                <span className="text-xs">Approve Out-Pass</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
