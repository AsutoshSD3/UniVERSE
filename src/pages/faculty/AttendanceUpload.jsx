import { useState } from 'react';
import { facultyClasses } from '../../data/mockFacultyData';
import { QrCode, CheckCircle2, ShieldCheck, Users, XCircle } from 'lucide-react';
import Modal from '../../components/common/Modal';

export default function FacultyAttendanceUpload() {
  const [selectedClass, setSelectedClass] = useState('');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  return (
    <div className="faculty-attendance-page animate-fade-in">
      <div className="page-header">
        <h1>1-Click / AI Attendance Logging</h1>
        <p>Dynamic QR codes, biometric sync & manual override for class attendance</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', textAlign: 'center' }}>
        <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, marginBottom: '16px' }}>Select Class for Attendance</h3>
        <div className="input-group" style={{ marginBottom: '24px' }}>
          <select className="input-field" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">-- Choose Ongoing Class --</option>
            {facultyClasses.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.subject} ({cls.code}) - Sec {cls.section}</option>
            ))}
          </select>
        </div>

        <div className="grid-2">
          <button 
            className="btn btn-primary btn-lg" 
            disabled={!selectedClass}
            onClick={() => setIsQrModalOpen(true)}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px' }}
          >
            <QrCode size={32} />
            <span>Generate Dynamic QR</span>
          </button>
          <button 
            className="btn btn-ghost btn-lg" 
            disabled={!selectedClass}
            onClick={() => setIsManualModalOpen(true)}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px', border: '1px solid var(--border-color)' }}
          >
            <Users size={32} />
            <span>Manual Roll Call</span>
          </button>
        </div>
      </div>

      <Modal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} title="Dynamic AI QR Attendance" maxWidth="400px">
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <p className="text-sm text-muted mb-4">Project this QR code on the screen. It refreshes every 5 seconds to prevent proxy attendance.</p>
          <div style={{ width: '200px', height: '200px', background: 'white', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <QrCode size={180} color="#000" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="text-green font-bold flex items-center gap-1"><CheckCircle2 size={16}/> 45 Present</div>
            <div className="text-red font-bold flex items-center gap-1"><XCircle size={16}/> 15 Absent</div>
          </div>
          <button className="btn btn-success w-full mt-6" onClick={() => { alert('Attendance Logged & Synced with ERP successfully!'); setIsQrModalOpen(false); }}>
            <ShieldCheck size={16} /> Finalize & Submit
          </button>
        </div>
      </Modal>

      <Modal isOpen={isManualModalOpen} onClose={() => setIsManualModalOpen(false)} title="Manual Roll Call">
        <p className="text-sm text-muted mb-4">Toggle attendance for 60 enrolled students.</p>
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <div className="font-bold">Student Name {i+1}</div>
                <div className="text-xs text-muted">Roll: CSE/2023/{1042+i}</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked={i % 5 !== 0} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-green)' }} />
                <span className="text-sm">Present</span>
              </label>
            </div>
          ))}
        </div>
        <button className="btn btn-primary w-full mt-4" onClick={() => { alert('Manual Attendance Submitted!'); setIsManualModalOpen(false); }}>
          Submit Attendance
        </button>
      </Modal>
    </div>
  );
}
