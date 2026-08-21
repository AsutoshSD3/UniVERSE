import { useState } from 'react';
import { placementDrives, studentMarks, studentAttendance } from '../../data/mockStudentData';
import { formatDate } from '../../utils/helpers';
import { Briefcase, FileText, CheckCircle2, TrendingUp, Calendar, ExternalLink, Download } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';

export default function StudentPlacement() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [drives, setDrives] = useState(placementDrives);

  const handleApply = (driveId) => {
    setDrives(prev => prev.map(d => {
      if (d.id === driveId) {
        return { ...d, registered: true };
      }
      return d;
    }));
    alert(`✅ Successfully registered for ${drives.find(d => d.id === driveId)?.company} placement drive!`);
  };

  return (
    <div className="student-placement-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Placement & Mentorship Portal</h1>
          <p>Track recruitment drives, build institutional resumes & book mentorship slots</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsResumeModalOpen(true)}
        >
          <FileText size={18} />
          <span>Auto-Build Resume</span>
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Active Drives"
          value={drives.filter(d => d.status === 'Open').length}
          subtitle="Registrations currently open"
          icon={Briefcase}
          color="#3b82f6"
        />
        <StatCard
          title="Your Applications"
          value={drives.filter(d => d.registered).length}
          subtitle="Drives registered this season"
          icon={CheckCircle2}
          color="#10b981"
        />
        <StatCard
          title="Placement Eligibility"
          value={studentMarks.cgpa >= 7.5 ? "Tier 1" : "Tier 2"}
          subtitle={`Current CGPA: ${studentMarks.cgpa}`}
          icon={TrendingUp}
          color="#8b5cf6"
          badge={studentMarks.cgpa >= 7.5 ? "ELIGIBLE" : "RESTRICTED"}
        />
      </div>

      <div className="glass-card">
        <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
          Upcoming Campus Recruitment Drives
        </h3>
        
        <div className="grid-auto">
          {drives.map(drive => {
            const isEligible = studentMarks.cgpa >= parseFloat(drive.eligibility.match(/[\d.]+/)?.[0] || 0);
            
            return (
              <div key={drive.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: `4px solid ${drive.status === 'Completed' ? 'var(--text-muted)' : 'var(--accent-blue)'}` }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className={`badge ${drive.status === 'Open' ? 'badge-green' : drive.status === 'Upcoming' ? 'badge-orange' : 'badge-blue'}`}>
                      {drive.status.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold">{formatDate(drive.date)}</span>
                  </div>
                  
                  <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {drive.company}
                  </h3>
                  <div className="text-sm font-bold text-blue mb-3">{drive.role}</div>
                  
                  <div className="text-xs text-muted mb-2">
                    <strong>Package:</strong> {drive.package}
                  </div>
                  <div className="text-xs text-muted mb-4">
                    <strong>Eligibility:</strong> {drive.eligibility}
                  </div>
                </div>
                
                <div>
                  {drive.status === 'Completed' ? (
                    <div className="text-xs text-muted text-center p-2 bg-glass rounded">Drive Concluded</div>
                  ) : drive.registered ? (
                    <div className="text-xs text-green font-bold flex items-center justify-center gap-1 p-2 bg-glass rounded">
                      <CheckCircle2 size={14} /> Registered Successfully
                    </div>
                  ) : (
                    <button 
                      className="btn btn-primary btn-sm w-full" 
                      disabled={!isEligible}
                      onClick={() => handleApply(drive.id)}
                    >
                      {isEligible ? 'Apply Now' : 'Not Eligible'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        title="Automated Institutional Resume Builder"
      >
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--gradient-primary)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Sparkles size={40} />
          </div>
          <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '8px' }}>Generating Verified Resume</h3>
          <p className="text-sm text-muted mb-6">
            Compiling your verified academic grades (CGPA: {studentMarks.cgpa}), attendance records, project submissions, and certifications into the standard university template.
          </p>
          
          <button 
            className="btn btn-success btn-lg w-full"
            onClick={() => {
              alert('📄 Verified Resume (PDF) Downloaded!');
              setIsResumeModalOpen(false);
            }}
          >
            <Download size={18} /> Download Verified Resume PDF
          </button>
        </div>
      </Modal>
    </div>
  );
}
