import { useState } from 'react';
import { studentMarks } from '../../data/mockStudentData';
import { Award, BookOpen, Calculator, Sparkles, TrendingUp, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import ChartCard from '../../components/common/ChartCard';
import Modal from '../../components/common/Modal';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

export default function StudentAcademics() {
  const [targetGPA, setTargetGPA] = useState(8.5);
  const [isRevalModalOpen, setIsRevalModalOpen] = useState(false);
  const [selectedRevalSubject, setSelectedRevalSubject] = useState('');

  const cgpaData = [
    { semester: 'Sem 1', gpa: 8.2, target: 8.0 },
    { semester: 'Sem 2', gpa: 8.5, target: 8.0 },
    { semester: 'Sem 3', gpa: 7.9, target: 8.0 },
    { semester: 'Sem 4', gpa: 8.7, target: 8.0 },
    { semester: 'Sem 5 (Current)', gpa: 8.6, target: 8.5 },
  ];

  const internalsBarData = studentMarks.currentSubjects.map(s => ({
    name: s.code,
    internal1: s.internal1,
    internal2: s.internal2 || 0,
    assignment: s.assignment || 0,
    quiz: s.quiz || 0,
    total: s.totalInternal
  }));

  // GPA Goal Calculator logic:
  // Assume 70% internal (weight 40%) + 100 end sem (weight 60%)
  // Calculate average end-semester exam marks out of 100 needed across all 5 subjects to hit target GPA
  // Grade points: 9-10 (O: 90+), 8-8.9 (A+: 80-89), 7-7.9 (A: 70-79), 6-6.9 (B+: 60-69)
  const calculateRequiredFinalMarks = (target) => {
    // Approx required percentage = target * 10
    const reqTotalScore = target * 10;
    // Current average internal % out of 100:
    const avgInternalPct = (studentMarks.currentSubjects.reduce((acc, curr) => acc + (curr.totalInternal / curr.maxTotalInternal) * 100, 0)) / studentMarks.currentSubjects.length;
    
    // Total Score = (0.4 * avgInternalPct) + (0.6 * reqEndSem)
    // reqEndSem = (reqTotalScore - 0.4 * avgInternalPct) / 0.6
    const reqEndSem = Math.min(100, Math.max(0, Math.round((reqTotalScore - (0.4 * avgInternalPct)) / 0.6)));
    return {
      avgInternalPct: Math.round(avgInternalPct),
      reqEndSem,
      isFeasible: reqEndSem <= 98
    };
  };

  const gpaGoal = calculateRequiredFinalMarks(targetGPA);

  return (
    <div className="student-academics-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Academic Gradebook & GPA Goal Engine</h1>
          <p>Continuous internal assessment tracker, semester transcripts & final exam mark predictor</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setIsRevalModalOpen(true)}
          >
            Apply for Revaluation
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => alert('📄 Official Digital Transcript PDF Generated with Cryptographic Stamp!')}
          >
            <Download size={16} />
            <span>Download Transcript</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Cumulative CGPA"
          value={studentMarks.cgpa}
          subtitle="Top 10% in Department"
          icon={Award}
          color="#3b82f6"
          trend="+0.37"
          trendLabel="since Sem 3"
          badge="FIRST CLASS DISTINCTION"
        />
        <StatCard
          title="Current Sem 5 SGPA (Est.)"
          value="8.60"
          subtitle="Based on Midterm Evaluations"
          icon={TrendingUp}
          color="#10b981"
          badge="PROJECTED"
        />
        <StatCard
          title="Total Credits Earned"
          value="92 / 160"
          subtitle="Degree Completion: 57.5%"
          icon={BookOpen}
          color="#8b5cf6"
        />
        <StatCard
          title="Active Backlogs"
          value="0"
          subtitle="Clear Academic Standing"
          icon={CheckCircle2}
          color="#06b6d4"
          badge="CLEAN"
        />
      </div>

      {/* Mark & GPA Goal Calculator Tool */}
      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(20, 30, 50, 0.9) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Calculator className="text-purple" size={24} />
          <div>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700 }}>Mark & GPA Goal Calculator (Final Exam Score Predictor)</h3>
            <p className="text-xs text-muted">Calculate the exact score needed in upcoming final exams to hit your dream Semester 5 GPA</p>
          </div>
        </div>

        <div className="grid-3" style={{ alignItems: 'center' }}>
          {/* Target Slider */}
          <div className="input-group">
            <label>Desired SGPA Target: <strong className="text-purple" style={{ fontSize: '18px' }}>{targetGPA.toFixed(2)}</strong></label>
            <input
              type="range"
              min="6.5"
              max="9.8"
              step="0.1"
              value={targetGPA}
              onChange={(e) => setTargetGPA(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span>6.5 (B+)</span>
              <span>7.5 (A)</span>
              <span>8.5 (A+)</span>
              <span>9.5+ (O - Outstanding)</span>
            </div>
          </div>

          {/* Current Internal Performance */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <div className="text-xs text-muted">Internal Assessment Standing (40% Weightage)</div>
            <div style={{ fontSize: 'var(--font-xl)', fontWeight: 700, margin: '4px 0', color: 'var(--accent-blue-light)' }}>
              {gpaGoal.avgInternalPct}% Avg Score
            </div>
            <p className="text-xs text-muted">Calculated across IA-1, IA-2, Quizzes & Lab submissions.</p>
          </div>

          {/* Goal Requirement Box */}
          <div style={{
            background: gpaGoal.isFeasible ? 'rgba(139, 92, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${gpaGoal.isFeasible ? 'rgba(139, 92, 246, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 'var(--font-xs)', fontWeight: 700, color: 'var(--accent-purple-light)' }}>
              TARGET SCORE IN FINAL EXAMS (60% Weight)
            </div>
            <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
              {gpaGoal.reqEndSem} / 100 Marks
            </div>
            <p className="text-xs text-muted">
              {gpaGoal.isFeasible ? `Target ${targetGPA} SGPA is achievable with ~${gpaGoal.reqEndSem}% in end-term exams!` : 'Target requires exceptional top percentile scores.'}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Charts: CGPA Trend & Current Internals */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        <ChartCard
          title="CGPA Progression Trend"
          subtitle="Semester-by-semester academic journey"
          headerBadge="SGPA vs Target"
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={cgpaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="semester" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[6, 10]} stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6' }} name="SGPA Achieved" />
              <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeDasharray="5 5" strokeWidth={2} name="Target Goal" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Semester 5 Internal Scores (Out of 70)"
          subtitle="Continuous evaluation breakdown by subject"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={internalsBarData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0, 70]} stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Bar dataKey="total" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} name="Total Internal Marks" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Detailed Current Semester Internal Assessment Table */}
      <div className="glass-card">
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          Semester 5 Internal Marks Breakdown
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject Code & Name</th>
                <th>Midterm 1 (25)</th>
                <th>Midterm 2 (25)</th>
                <th>Assignment (10)</th>
                <th>Quiz (10)</th>
                <th>Total Internal (70)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentMarks.currentSubjects.map((sub) => (
                <tr key={sub.code}>
                  <td style={{ fontWeight: 600 }}>
                    {sub.name} <span className="text-xs text-muted">({sub.code})</span>
                  </td>
                  <td>{sub.internal1} / 25</td>
                  <td>{sub.internal2 !== null ? `${sub.internal2} / 25` : '-'}</td>
                  <td>{sub.assignment !== null ? `${sub.assignment} / 10` : '-'}</td>
                  <td>{sub.quiz !== null ? `${sub.quiz} / 10` : '-'}</td>
                  <td>
                    <strong style={{ color: 'var(--accent-blue-light)' }}>
                      {sub.totalInternal} / {sub.maxTotalInternal}
                    </strong>
                  </td>
                  <td>
                    <span className="badge badge-green">VERIFIED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revaluation Modal */}
      <Modal
        isOpen={isRevalModalOpen}
        onClose={() => setIsRevalModalOpen(false)}
        title="Apply for Paper Revaluation / Photocopy"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          alert(`✅ Revaluation request submitted for ${selectedRevalSubject}! Application Fee: ₹500.`);
          setIsRevalModalOpen(false);
        }}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Select Subject</label>
            <select
              className="input-field"
              value={selectedRevalSubject}
              onChange={(e) => setSelectedRevalSubject(e.target.value)}
              required
            >
              <option value="">-- Choose Subject --</option>
              {studentMarks.currentSubjects.map(s => (
                <option key={s.code} value={s.name}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Request Type</label>
            <select className="input-field">
              <option>Digital Answer Script Photocopy (₹300)</option>
              <option>Full Revaluation by External Committee (₹800)</option>
              <option>Total Marks Re-tallying (₹200)</option>
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Reason for Challenge</label>
            <textarea className="input-field" placeholder="Explain the discrepancy in marked questions..." required></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsRevalModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit & Proceed to Fee Payment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
