import { useState } from 'react';
import { facultyIssues } from '../../data/mockFacultyData';
import { MessageSquare, AlertCircle, CheckCircle2, User, EyeOff } from 'lucide-react';
import Modal from '../../components/common/Modal';

export default function FacultyStudentIssues() {
  const [issues, setIssues] = useState(facultyIssues);
  const [activeIssue, setActiveIssue] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleResolve = (id) => {
    setIssues(prev => prev.map(i => {
      if (i.id === id) return { ...i, status: 'Resolved' };
      return i;
    }));
    setActiveIssue(null);
    alert('✅ Issue marked as resolved. Student has been notified.');
  };

  const handleReply = (e) => {
    e.preventDefault();
    alert(`Reply sent to student: "${replyText}"`);
    setReplyText('');
    setActiveIssue(null);
  };

  return (
    <div className="faculty-issues-page animate-fade-in">
      <div className="page-header">
        <h1>Mentorship & Student Grievances</h1>
        <p>Track academic issues, approve requests, and communicate with masked parents</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        {issues.map(issue => (
          <div key={issue.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderLeft: `4px solid ${issue.priority === 'High' ? 'var(--accent-red)' : issue.status === 'Resolved' ? 'var(--accent-green)' : 'var(--accent-orange)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span className={`badge ${issue.priority === 'High' ? 'badge-red' : issue.status === 'Resolved' ? 'badge-green' : 'badge-orange'}`}>
                {issue.status === 'Resolved' ? 'RESOLVED' : issue.priority.toUpperCase() + ' PRIORITY'}
              </span>
              <span className="text-xs text-muted font-bold">{issue.date}</span>
            </div>
            
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '4px' }}>{issue.subject}</h3>
            <p className="text-sm text-muted mb-4 line-clamp-2">{issue.description}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--font-xs)', marginBottom: '16px' }}>
              <User size={14} className="text-blue" />
              <span>Student: <strong>{issue.student}</strong> ({issue.rollNo})</span>
            </div>

            <button 
              className={`btn btn-sm w-full ${issue.status === 'Resolved' ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => setActiveIssue(issue)}
            >
              <MessageSquare size={14} /> 
              {issue.status === 'Resolved' ? 'View Details' : 'Review & Respond'}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!activeIssue} onClose={() => setActiveIssue(null)} title="Issue Details & Response">
        {activeIssue && (
          <div>
            <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="font-bold text-primary">{activeIssue.subject}</span>
                <span className="text-xs text-muted">{activeIssue.date}</span>
              </div>
              <p className="text-sm text-muted mb-4">{activeIssue.description}</p>
              
              <div className="text-xs text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <EyeOff size={14} className="text-orange" /> Masked Parent Comms Enabled
              </div>
            </div>

            {activeIssue.status !== 'Resolved' ? (
              <form onSubmit={handleReply}>
                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label>Your Response / Actions Taken</label>
                  <textarea 
                    className="input-field" 
                    placeholder="Type your reply to the student/parent here..." 
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="btn btn-primary flex-1">
                    <MessageSquare size={16} /> Send Reply
                  </button>
                  <button type="button" className="btn btn-success flex-1" onClick={() => handleResolve(activeIssue.id)}>
                    <CheckCircle2 size={16} /> Mark as Resolved
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center p-4 text-green font-bold flex flex-col items-center gap-2">
                <CheckCircle2 size={32} />
                This issue has been resolved.
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
