import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { facultyClasses, facultyIssues, facultyTasks, todayEvents } from '../../data/mockFacultyData';
import StatCard from '../../components/common/StatCard';
import Calendar from '../../components/common/Calendar';
import { 
  Users, AlertCircle, FileCheck, ShieldAlert, CheckCircle2, 
  ArrowRight, BookOpen, Upload, ClipboardList 
} from 'lucide-react';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const pendingIssues = facultyIssues.filter(i => i.status === 'Open' || i.status === 'In Progress');
  const pendingTasks = facultyTasks.filter(t => t.status === 'Pending');

  return (
    <div className="faculty-dashboard animate-fade-in">
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        marginBottom: 'var(--space-xl)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-green">Faculty • {user?.department || 'CSE'}</span>
            <span className="badge badge-cyan">{user?.designation || 'Assistant Professor'}</span>
          </div>
          <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>
            Welcome, Dr. {user?.name?.split(' ')[0] || 'Faculty'}! 📚
          </h1>
          <p className="text-xs text-muted" style={{ marginTop: '2px' }}>
            EmpID: <strong>{user?.empId || 'EMP1001'}</strong> • Next Class in: <strong>45 mins</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/faculty/attendance-upload')}
          >
            <ClipboardList size={16} />
            <span>Mark Attendance</span>
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => alert('🚨 EMERGENCY PANIC ACTIVATED')}
            title="Instant SOS Panic Button for Classroom Emergencies"
          >
            <ShieldAlert size={16} />
            <span>SOS Panic</span>
          </button>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="My Classes Today"
          value={facultyClasses.filter(c => c.time.includes('AM') || c.time.includes('PM')).length}
          subtitle="Scheduled lectures"
          icon={Users}
          color="#3b82f6"
          onClick={() => navigate('/faculty/classes')}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.length}
          subtitle="Assessments & grading"
          icon={FileCheck}
          color="#f59e0b"
          badge="URGENT"
        />
        <StatCard
          title="Student Issues"
          value={pendingIssues.length}
          subtitle="Mentee tickets unresolved"
          icon={AlertCircle}
          color="#ef4444"
          badge="ACTION REQ"
          onClick={() => navigate('/faculty/student-issues')}
        />
        <StatCard
          title="Research Grants"
          value="₹12.5L"
          subtitle="Active ongoing projects"
          icon={CheckCircle2}
          color="#10b981"
          onClick={() => navigate('/faculty/research')}
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)', gridTemplateColumns: '1.2fr 0.8fr' }}>
        <Calendar 
          classes={facultyClasses}
          tasks={pendingTasks}
          issues={pendingIssues}
          events={todayEvents}
          title="Faculty Schedule & Agenda"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="glass-card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>Quick Actions</h3>
                <p className="text-xs text-muted">Frequent workflows</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                className="btn btn-ghost" 
                style={{ justifyContent: 'flex-start' }}
                onClick={() => navigate('/faculty/marks-upload')}
              >
                <Upload size={16} className="text-purple" /> Upload Midterm Marks
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ justifyContent: 'flex-start' }}
                onClick={() => navigate('/faculty/classes')}
              >
                <BookOpen size={16} className="text-blue" /> Distribute Course Material (LMS)
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ justifyContent: 'flex-start' }}
                onClick={() => navigate('/faculty/timetable')}
              >
                <ArrowRight size={16} className="text-orange" /> Request Proxy / Substitute
              </button>
            </div>
          </div>

          <div className="glass-card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
              Student Issues / Grievances
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pendingIssues.slice(0, 3).map((issue, idx) => (
                <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '10px 14px', borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${issue.priority === 'High' ? 'var(--accent-red)' : 'var(--accent-orange)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="text-xs font-bold">{issue.subject}</span>
                    <span className="text-xs text-muted">{issue.date}</span>
                  </div>
                  <div className="text-xs text-muted">
                    Student: {issue.student} ({issue.rollNo})
                  </div>
                </div>
              ))}
              {pendingIssues.length > 3 && (
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/faculty/student-issues')}>
                  View All {pendingIssues.length} Issues
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
