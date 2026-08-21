import { useState } from 'react';
import { facultyClasses } from '../../data/mockFacultyData';
import { FileSpreadsheet, UploadCloud, CheckCircle2, AlertTriangle, FilePenLine } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

export default function FacultyMarksUpload() {
  const [selectedClass, setSelectedClass] = useState(facultyClasses[0]?.id || '');
  
  // Dummy student list for marks entry
  const studentList = Array.from({length: 15}).map((_, i) => ({
    id: `CSE2310${i+10}`,
    name: `Student Name ${i+1}`,
    q1: Math.floor(Math.random() * 10) + 1,
    q2: Math.floor(Math.random() * 10) + 1,
    q3: Math.floor(Math.random() * 5) + 1,
    total: 0 // calculated later
  })).map(s => ({...s, total: s.q1 + s.q2 + s.q3}));

  const columns = [
    { header: 'Roll No', key: 'id', render: (row) => <span className="font-bold">{row.id}</span> },
    { header: 'Student Name', key: 'name' },
    { header: 'Q1 (10M)', key: 'q1', render: (row) => <input type="number" defaultValue={row.q1} className="input-field" style={{ width: '60px', padding: '4px' }} max="10" min="0" /> },
    { header: 'Q2 (10M)', key: 'q2', render: (row) => <input type="number" defaultValue={row.q2} className="input-field" style={{ width: '60px', padding: '4px' }} max="10" min="0" /> },
    { header: 'Q3 (5M)', key: 'q3', render: (row) => <input type="number" defaultValue={row.q3} className="input-field" style={{ width: '60px', padding: '4px' }} max="5" min="0" /> },
    { header: 'Total (25M)', key: 'total', render: (row) => <strong className="text-blue">{row.total}</strong> }
  ];

  return (
    <div className="faculty-marks-upload-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Internal Assessment & Marks Entry</h1>
          <p>Digital marking (OSM simulation), Bloom's taxonomy mapping & bulk excel upload</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-ghost">
            <UploadCloud size={18} /> Excel Bulk Upload
          </button>
          <button className="btn btn-primary" onClick={() => alert('Marks successfully published to ERP & Students Notified!')}>
            <CheckCircle2 size={18} /> Publish Results
          </button>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="grid-3" style={{ alignItems: 'center' }}>
          <div className="input-group">
            <label>Select Course</label>
            <select className="input-field" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {facultyClasses.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.subject} ({cls.code})</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Assessment Type</label>
            <select className="input-field">
              <option>Midterm Exam 1 (25 Marks)</option>
              <option>Midterm Exam 2 (25 Marks)</option>
              <option>Lab Evaluation (20 Marks)</option>
              <option>Quiz / Assignment (10 Marks)</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '100%' }}>
            <button className="btn btn-primary w-full" style={{ height: '42px' }}>
              <FileSpreadsheet size={16} /> Load Roster
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>
            On-Screen Digital Marking (OSM)
          </h3>
          <span className="badge badge-orange"><AlertTriangle size={12}/> Unsaved Changes</span>
        </div>
        
        <DataTable
          columns={columns}
          data={studentList}
          searchPlaceholder="Search roll no or name..."
          searchKey="name"
        />
      </div>
    </div>
  );
}
