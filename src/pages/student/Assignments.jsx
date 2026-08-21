import { useState } from 'react';
import { assignments, studentSubjects } from '../../data/mockStudentData';
import { formatDate, getDaysRemaining } from '../../utils/helpers';
import { BookOpen, Upload, CheckCircle2, Clock, FileText, Download, AlertTriangle, Sparkles, FolderDown } from 'lucide-react';
import Modal from '../../components/common/Modal';

export default function StudentAssignments() {
  const [assignmentList, setAssignmentList] = useState(assignments);
  const [filter, setFilter] = useState('all');
  const [activeModal, setActiveModal] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionNote, setSubmissionNote] = useState('');

  const filtered = assignmentList.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submissionFile && !submissionNote) {
      alert('Please select a file or add submission text.');
      return;
    }

    setAssignmentList(prev => prev.map(a => {
      if (a.id === activeModal.id) {
        return {
          ...a,
          status: 'submitted',
          submittedAt: new Date().toISOString(),
          fileName: submissionFile ? submissionFile.name : 'solution_code.zip'
        };
      }
      return a;
    }));

    alert(`✅ Assignment "${activeModal.title}" submitted successfully! An automated receipt has been logged.`);
    setActiveModal(null);
    setSubmissionFile(null);
    setSubmissionNote('');
  };

  return (
    <div className="student-assignments-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>LMS & Digital Assignment Portal</h1>
          <p>Download lecture notes, course materials & submit coursework with automated deadline tracking</p>
        </div>
        <button 
          className="btn btn-ghost btn-sm"
          onClick={() => alert('📦 All semester course notes and lecture PDFs downloaded in ZIP bundle!')}
        >
          <FolderDown size={16} />
          <span>Download All Course Notes (.zip)</span>
        </button>
      </div>

      {/* Course Materials & Syllabus Downloads Hub */}
      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '12px' }}>
          📚 Course Syllabus & Lecture Notes Repository
        </h3>
        <div className="grid-3">
          {studentSubjects.map(sub => (
            <div key={sub.id} style={{ background: 'var(--bg-tertiary)', padding: '12px 16px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 'var(--font-sm)' }}>{sub.name}</div>
                <div className="text-xs text-muted">Faculty: {sub.faculty} • {sub.credits} Credits</div>
              </div>
              <button 
                className="btn-icon sm btn-ghost" 
                title="Download Lecture Notes & Syllabus"
                onClick={() => alert(`📥 Downloaded latest syllabus & lecture notes PDF for ${sub.name}`)}
              >
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs">
        <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All Assignments ({assignmentList.length})
        </button>
        <button className={`tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
          Pending Action ({assignmentList.filter(a => a.status === 'pending').length})
        </button>
        <button className={`tab ${filter === 'submitted' ? 'active' : ''}`} onClick={() => setFilter('submitted')}>
          Submitted ({assignmentList.filter(a => a.status === 'submitted').length})
        </button>
        <button className={`tab ${filter === 'graded' ? 'active' : ''}`} onClick={() => setFilter('graded')}>
          Graded / Evaluated ({assignmentList.filter(a => a.status === 'graded').length})
        </button>
      </div>

      {/* Assignment Cards Grid */}
      <div className="grid-auto">
        {filtered.map((asg) => {
          const daysLeft = getDaysRemaining(asg.deadline);
          const isUrgent = asg.status === 'pending' && daysLeft <= 2;

          return (
            <div 
              key={asg.id} 
              className="glass-card" 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                borderLeft: `4px solid ${asg.status === 'graded' ? 'var(--accent-green)' : asg.status === 'submitted' ? 'var(--accent-blue)' : isUrgent ? 'var(--accent-red)' : 'var(--accent-orange)'}`
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span className={`badge ${asg.status === 'graded' ? 'badge-green' : asg.status === 'submitted' ? 'badge-blue' : isUrgent ? 'badge-red' : 'badge-orange'}`}>
                    {asg.status.toUpperCase()}
                  </span>
                  <span className="badge badge-purple">{asg.type}</span>
                </div>

                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>
                  {asg.subject}
                </div>

                <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '8px' }}>
                  {asg.title}
                </h3>

                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} className={isUrgent ? 'text-red' : 'text-orange'} />
                    <span>
                      Deadline: <strong>{formatDate(asg.deadline)}</strong> ({daysLeft > 0 ? `${daysLeft} days left` : 'Passed'})
                    </span>
                  </div>
                  <div>
                    Max Marks: <strong>{asg.maxMarks}</strong>
                  </div>
                  {asg.marks !== undefined && (
                    <div className="text-green font-bold">
                      Grade Awarded: {asg.marks} / {asg.maxMarks} Marks (Verified)
                    </div>
                  )}
                </div>
              </div>

              <div>
                {asg.status === 'pending' ? (
                  <button 
                    className="btn btn-primary btn-sm" 
                    style={{ width: '100%' }}
                    onClick={() => setActiveModal(asg)}
                  >
                    <Upload size={14} />
                    <span>Submit Assignment</span>
                  </button>
                ) : (
                  <button 
                    className="btn btn-ghost btn-sm" 
                    style={{ width: '100%' }}
                    onClick={() => alert(`📄 Viewing submission receipt for ${asg.title}. File: solution_v1.zip`)}
                  >
                    <CheckCircle2 size={14} className="text-green" />
                    <span>View Submission Receipt</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={`Submit: ${activeModal?.title}`}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
            <div className="text-xs text-muted">Subject: {activeModal?.subject}</div>
            <div className="text-xs text-muted">Max Marks: {activeModal?.maxMarks} • Deadline: {activeModal ? formatDate(activeModal.deadline) : ''}</div>
          </div>

          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Upload Solution Document / Archive (.pdf, .zip, .docx)</label>
            <input 
              type="file" 
              className="input-field" 
              onChange={(e) => setSubmissionFile(e.target.files[0])}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Optional Submission Notes / GitHub Repo Link</label>
            <textarea 
              className="input-field" 
              placeholder="Add comments or public GitHub repository link here..."
              value={submissionNote}
              onChange={(e) => setSubmissionNote(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setActiveModal(null)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={16} />
              <span>Confirm & Submit Online</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
