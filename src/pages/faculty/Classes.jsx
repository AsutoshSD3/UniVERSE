import { useState } from 'react';
import { facultyClasses } from '../../data/mockFacultyData';
import { BookOpen, Users, Upload, Search, Book, Clock } from 'lucide-react';
import Modal from '../../components/common/Modal';

export default function FacultyClasses() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLmsModalOpen, setIsLmsModalOpen] = useState(false);

  return (
    <div className="faculty-classes-page animate-fade-in">
      <div className="page-header">
        <h1>My Classes & Course Management (LMS)</h1>
        <p>Manage syllabus, lesson trackers, and share course materials</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        {facultyClasses.map(cls => (
          <div key={cls.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderLeft: `4px solid var(--accent-blue)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span className="badge badge-blue">{cls.type}</span>
              <span className="text-xs text-muted font-bold">{cls.code}</span>
            </div>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '4px' }}>{cls.subject}</h3>
            <div className="text-sm text-muted mb-4">{cls.branch} - Sem {cls.semester} (Sec {cls.section})</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-xs)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={14} className="text-purple" /> <span>{cls.studentsCount} Students Enrolled</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Book size={14} className="text-green" /> <span>Syllabus Covered: <strong>{cls.syllabusCovered}%</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} className="text-orange" /> <span>Schedule: {cls.time}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-primary btn-sm flex-1"
                onClick={() => { setSelectedClass(cls); setIsLmsModalOpen(true); }}
              >
                <Upload size={14} /> LMS Share
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isLmsModalOpen} onClose={() => setIsLmsModalOpen(false)} title={`Upload Course Material: ${selectedClass?.subject}`}>
        <form onSubmit={(e) => { e.preventDefault(); alert('Material uploaded to LMS and students notified successfully!'); setIsLmsModalOpen(false); }}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Material Type</label>
            <select className="input-field" required>
              <option value="Lecture Notes">Lecture Notes / PPT</option>
              <option value="Assignment">Assignment / Homework</option>
              <option value="Reference Book">Reference Book (PDF)</option>
            </select>
          </div>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Title</label>
            <input type="text" className="input-field" placeholder="e.g. Module 3: Network Layers PDF" required />
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label>Select File</label>
            <input type="file" className="input-field" required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Distribute to {selectedClass?.studentsCount} Students</button>
        </form>
      </Modal>
    </div>
  );
}
