import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { demoCredentials } from '../data/mockUsers';
import { GraduationCap, Users, UserCheck, Globe, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import './Login.css';

const roles = [
  { key: 'student', label: 'Student', icon: GraduationCap, color: '#3b82f6', desc: 'Access academics, attendance & campus life' },
  { key: 'faculty', label: 'Faculty', icon: Users, color: '#8b5cf6', desc: 'Manage classes, grades & research' },
  { key: 'parent', label: 'Parent', icon: UserCheck, color: '#10b981', desc: 'Monitor ward progress & communication' },
  { key: 'guest', label: 'Guest', icon: Globe, color: '#f59e0b', desc: 'Campus visit & event registration' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState(demoCredentials.student.email);
  const [password, setPassword] = useState(demoCredentials.student.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const result = login(email, password);
    if (result.success) {
      navigate(`/${result.user.role}`);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      {/* Animated background */}
      <div className="login-bg">
        <div className="login-orb orb-1"></div>
        <div className="login-orb orb-2"></div>
        <div className="login-orb orb-3"></div>
        <div className="login-grid"></div>
      </div>

      <div className="login-container animate-fade-in-up">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <div className="login-logo-icon">
              <Sparkles size={28} />
            </div>
            <div>
              <h1>UniVerse ERP</h1>
              <p>Unified University Management Platform</p>
            </div>
          </div>
        </div>

        {/* Role Selector */}
        <div className="role-selector">
          <p className="role-label">Select your role to continue</p>
          <div className="role-cards">
            {roles.map(({ key, label, icon: Icon, color, desc }) => (
              <button
                key={key}
                className={`role-card ${selectedRole === key ? 'active' : ''}`}
                onClick={() => handleRoleSelect(key)}
                style={{ '--role-color': color }}
              >
                <div className="role-icon" style={{ background: `${color}15`, color }}>
                  <Icon size={22} />
                </div>
                <span className="role-name">{label}</span>
                <span className="role-desc">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button
            type="submit"
            className={`btn btn-primary btn-lg login-submit ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <LogIn size={18} />
                Sign In as {roles.find(r => r.key === selectedRole)?.label}
              </>
            )}
          </button>

          <p className="demo-hint">
            💡 Demo credentials are pre-filled. Just click Sign In!
          </p>
        </form>
      </div>
    </div>
  );
}
