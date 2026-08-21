import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, User, MapPin, Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react';

export default function GuestRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    hostName: '',
    purpose: '',
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call for pass generation
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Auto-redirect to QR Pass after a short delay
      setTimeout(() => {
        navigate('/guest/qr-pass', { state: { passDetails: formData } });
      }, 1500);
    }, 1500);
  };

  if (success) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <CheckCircle size={64} className="text-success mb-4 animate-scale-in" style={{ color: 'var(--accent-green)' }} />
        <h2 style={{ fontSize: 'var(--font-2xl)', fontWeight: 800, marginBottom: '8px' }}>Registration Successful!</h2>
        <p className="text-muted">Generating your secure QR Gate Pass...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button 
        className="btn btn-ghost mb-4" 
        onClick={() => navigate('/guest/dashboard')}
        style={{ padding: '8px 0' }}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <ClipboardList className="text-orange" size={24} style={{ color: 'var(--accent-orange)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 700 }}>Request Campus Entry</h2>
            <p className="text-sm text-muted">Pre-register your visit to generate a gate pass.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid-2" style={{ gap: '24px' }}>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>
              Personal Details
            </h3>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. John Doe"
                style={{ width: '100%', padding: '10px 12px 10px 40px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 9876543210"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
            <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Email Address (Optional)</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
            <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>
              Visit Details
            </h3>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Host Name (Who are you visiting?)</label>
            <input 
              type="text" 
              name="hostName"
              value={formData.hostName}
              onChange={handleChange}
              required
              placeholder="e.g. Dr. Alan Turing"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Purpose of Visit</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
            >
              <option value="">Select Purpose</option>
              <option value="Meeting">Meeting</option>
              <option value="Event">Event Attendance</option>
              <option value="Delivery">Delivery/Vendor</option>
              <option value="Personal">Personal Visit</option>
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Date</label>
            <div style={{ position: 'relative' }}>
              <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 12px 10px 40px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: 'var(--font-sm)', fontWeight: 500, color: 'var(--text-secondary)' }}>Time</label>
            <div style={{ position: 'relative' }}>
              <Clock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="time" 
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 12px 10px 40px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              className="btn btn-ghost mr-4"
              onClick={() => navigate('/guest/dashboard')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Generate Gate Pass'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
