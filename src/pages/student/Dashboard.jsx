import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  studentSubjects, studentAttendance, overallAttendance, todaysClasses, 
  assignments, calendarEvents, feeDetails 
} from '../../data/mockStudentData';
import { formatCurrency, getColorForValue } from '../../utils/helpers';
import StatCard from '../../components/common/StatCard';
import Calendar from '../../components/common/Calendar';
import QRCodeCard from '../../components/common/QRCodeCard';
import CampusMap from '../../components/maps/CampusMap';
import { 
  BookOpen, Clock, BarChart3, CreditCard, ShieldAlert, 
  Sparkles, CheckCircle2, AlertTriangle, ArrowRight, MapPin, 
  ChevronRight, Calendar as CalendarIcon, FileText
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const attendanceChartData = studentAttendance.map(s => ({
    name: s.subjectName.split(' ')[0],
    percentage: s.percentage,
    value: s.attended,
    total: s.totalClasses
  }));

  const pieData = [
    { name: 'Attended', value: overallAttendance.attended, color: '#10b981' },
    { name: 'Missed', value: overallAttendance.totalClasses - overallAttendance.attended, color: '#ef4444' }
  ];

  return (
    <div className="student-dashboard animate-fade-in">
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        marginBottom: 'var(--space-xl)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-blue">Semester {user?.semester || 5} • Section {user?.section || 'A'}</span>
            <span className="badge badge-purple">{user?.department || 'CSE'}</span>
          </div>
          <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-xs text-muted" style={{ marginTop: '2px' }}>
            Roll No: <strong>{user?.enrollmentNo}</strong> • Hostel: <strong>{user?.hostelBlock}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/student/attendance')}
          >
            <BarChart3 size={16} />
            <span>Target Calculator</span>
          </button>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('/student/timetable')}
          >
            <Clock size={16} />
            <span>Live Timetable</span>
          </button>
        </div>
      </div>

      {/* Quick KPI Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Overall Attendance"
          value={`${overallAttendance.percentage}%`}
          subtitle={`Min target: ${overallAttendance.target}%`}
          icon={BarChart3}
          color="#10b981"
          trend="+2.4%"
          trendLabel="vs last month"
          badge="SAFE"
          onClick={() => navigate('/student/attendance')}
        />
        <StatCard
          title="Today's Lectures"
          value={todaysClasses.length}
          subtitle="Classes scheduled"
          icon={Clock}
          color="#3b82f6"
          trendLabel="2 Completed"
          onClick={() => navigate('/student/timetable')}
        />
        <StatCard
          title="Pending Assignments"
          value={pendingAssignments.length}
          subtitle="Submissions due this week"
          icon={FileText}
          color="#f59e0b"
          trend="2 Urgent"
          onClick={() => navigate('/student/assignments')}
        />
        <StatCard
          title="Pending Dues"
          value={formatCurrency(feeDetails.pending)}
          subtitle={`Due by ${feeDetails.nextDueDate}`}
          icon={CreditCard}
          color="#ec4899"
          badge="1-CLICK PAY"
          onClick={() => navigate('/student/fees')}
        />
      </div>

      {/* Main 2-Column Grid: Calendar & Today's Schedule + Attendance Per Class */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)', gridTemplateColumns: '1.2fr 0.8fr' }}>
        {/* Full Interactive Calendar with today's classes & assignments */}
        <Calendar 
          classes={todaysClasses}
          assignments={pendingAssignments}
          events={calendarEvents}
          title="Academic Calendar & Today's Agenda"
        />

        {/* Subject-Wise Attendance Overview with Donut */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>Attendance per Class</h3>
              <p className="text-xs text-muted">Subject-wise compliance monitor</p>
            </div>
            <button 
              className="btn btn-ghost btn-sm"
              onClick={() => navigate('/student/attendance')}
            >
              Details <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '100px', height: '100px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}>
                {overallAttendance.percentage}%
              </div>
            </div>

            <div style={{ flex: 1, fontSize: 'var(--font-xs)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="text-muted">Total Classes:</span>
                <strong>{overallAttendance.totalClasses}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="text-muted">Attended:</span>
                <strong className="text-green">{overallAttendance.attended}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Can Skip Safely:</span>
                <strong className="text-blue">{overallAttendance.canSkip} lectures</strong>
              </div>
            </div>
          </div>

          {/* Subject Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
            {studentAttendance.map((sub) => {
              const isLow = sub.percentage < 75;
              return (
                <div key={sub.subjectId} style={{ background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-xs)', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{sub.subjectName}</span>
                    <span style={{ 
                      fontWeight: 700, 
                      color: isLow ? 'var(--accent-red)' : sub.percentage >= 85 ? 'var(--accent-green)' : 'var(--accent-orange)' 
                    }}>
                      {sub.percentage}% ({sub.attended}/{sub.totalClasses})
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-bar-fill ${isLow ? 'red' : sub.percentage >= 85 ? 'green' : 'orange'}`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Campus Map Widget + Universal Dynamic QR Pass */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.3fr 0.7fr' }}>
        {/* Campus Map Widget */}
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={18} className="text-blue" />
                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>Live Campus Map & Safest Path</h3>
              </div>
              <p className="text-xs text-muted">Real-time CCTV & night well-lit corridor routing</p>
            </div>
            <button 
              className="btn btn-ghost btn-sm"
              onClick={() => navigate('/student/campus-map')}
            >
              Full Screen Map <ArrowRight size={14} />
            </button>
          </div>
          <CampusMap compact={true} showControls={false} />
        </div>

        {/* Dynamic Single-Pass QR Card */}
        <QRCodeCard 
          value={{
            studentId: user?.id,
            roll: user?.enrollmentNo,
            hostel: user?.hostelBlock,
            name: user?.name,
            role: 'student'
          }}
          title="Universal Single-Pass QR"
          subtitle="Hostel Gate • Library • Mess • Labs"
          badge="STUDENT ID PASS"
          meta={[
            { label: 'Student', value: user?.name || 'Arjun Mehta' },
            { label: 'Roll No', value: user?.enrollmentNo || 'CSE/2023/1042' },
            { label: 'Hostel Out-Pass', value: 'Authorized' },
          ]}
        />
      </div>
    </div>
  );
}
