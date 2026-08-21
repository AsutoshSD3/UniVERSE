import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calculator, HelpCircle, Send } from 'lucide-react';
import { courses } from '../../data/mockGuestData';

export default function GuestInquiry() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseOfInterest: '',
    query: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', courseOfInterest: '', query: '' });
      alert('Your inquiry has been submitted! An admission counselor will contact you shortly.');
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <button 
          className="btn btn-ghost" 
          onClick={() => navigate('/guest/dashboard')}
          style={{ padding: '8px' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800 }}>Admissions Inquiry Portal</h1>
          <p className="text-muted">Explore courses, estimate fees, and contact our counselors.</p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '24px', alignItems: 'start' }}>
        {/* Courses List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <BookOpen size={24} className="text-blue" style={{ color: 'var(--accent-blue)' }} />
              <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 700 }}>Available Courses</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {courses.map(course => (
                <div key={course.id} style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '8px' }}>{course.name}</h3>
                  <div className="grid-2" style={{ gap: '8px' }}>
                    <div>
                      <p className="text-xs text-muted">Duration</p>
                      <p style={{ fontWeight: 500 }}>{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Intake Seats</p>
                      <p style={{ fontWeight: 500 }}>{course.seats}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Indicative Fee</p>
                      <p style={{ fontWeight: 500, color: 'var(--accent-green)' }}>{course.fee}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Placement Rate</p>
                      <p style={{ fontWeight: 500 }}>{course.placement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <HelpCircle size={24} className="text-orange" style={{ color: 'var(--accent-orange)' }} />
            <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 700 }}>Submit an Inquiry</h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>

            <div className="grid-2" style={{ gap: '16px' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Phone</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Course of Interest</label>
              <select 
                required
                value={formData.courseOfInterest}
                onChange={e => setFormData({...formData, courseOfInterest: e.target.value})}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              >
                <option value="">Select a course</option>
                {courses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Your Query</label>
              <textarea 
                rows="4"
                required
                value={formData.query}
                onChange={e => setFormData({...formData, query: e.target.value})}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitted} style={{ marginTop: '8px' }}>
              {submitted ? 'Sending...' : 'Submit Inquiry'} <Send size={16} />
            </button>
          </form>
          
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Calculator size={20} className="text-blue" />
              <h4 style={{ fontWeight: 600 }}>Fee Estimation Calculator</h4>
            </div>
            <p className="text-sm text-muted mb-3">Want a detailed breakdown of tuition, hostel, and transport fees?</p>
            <button className="btn btn-sm w-full" style={{ background: 'var(--bg-tertiary)' }} onClick={() => alert('Opening Fee Calculator...')}>
              Open Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
