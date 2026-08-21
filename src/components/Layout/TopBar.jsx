import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, ShieldAlert, Sparkles, User, LogOut, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { announcements } from '../../data/mockAnnouncements';
import './TopBar.css';

export default function TopBar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = announcements.slice(0, 5);

  const handleSOS = () => {
    if (user?.role === 'student') {
      navigate('/student/emergency');
    } else {
      alert('🚨 EMERGENCY PROTOCOL TRIGGERED: Campus Security & Medical Team have been alerted with your live location coordinates.');
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search classes, rooms, notices, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="topbar-right">
        {/* Quick SOS Panic Button */}
        <button 
          className="topbar-sos-btn"
          onClick={handleSOS}
          title="Instant Emergency Panic Button"
        >
          <ShieldAlert size={18} />
          <span>SOS Panic</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="topbar-menu-wrapper">
          <button 
            className="topbar-icon-btn" 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            title="Notifications"
          >
            <Bell size={20} />
            <span className="notification-badge">{notifications.length}</span>
          </button>

          {showNotifications && (
            <div className="dropdown-menu notifications-dropdown animate-fade-in-up">
              <div className="dropdown-header">
                <h3>Notifications & Alerts</h3>
                <span className="badge badge-blue">{notifications.length} New</span>
              </div>
              <div className="notifications-list">
                {notifications.map((n) => (
                  <div key={n.id} className="notification-item">
                    <div className="notification-icon">
                      {n.priority === 'high' ? (
                        <AlertTriangle size={16} className="text-red" />
                      ) : n.category === 'Academic' ? (
                        <Info size={16} className="text-blue" />
                      ) : (
                        <CheckCircle2 size={16} className="text-green" />
                      )}
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{n.title}</div>
                      <div className="notification-time">{n.date} • {n.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="topbar-menu-wrapper">
          <button 
            className="user-profile-btn"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
          >
            <div className="avatar sm" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
              {user?.avatar || 'U'}
            </div>
            <div className="user-profile-meta">
              <span className="user-profile-name">{user?.name}</span>
              <span className="user-profile-role">{user?.role}</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="dropdown-menu user-dropdown animate-fade-in-up">
              <div className="user-dropdown-header">
                <div className="avatar" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                  {user?.avatar || 'U'}
                </div>
                <div>
                  <div className="font-bold">{user?.name}</div>
                  <div className="text-xs text-muted">{user?.email}</div>
                  <span className="badge badge-blue mt-1">{user?.role?.toUpperCase()}</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              {user?.department && (
                <div className="user-dropdown-item text-xs text-muted">
                  Dept: {user.department}
                </div>
              )}
              {user?.enrollmentNo && (
                <div className="user-dropdown-item text-xs text-muted">
                  Roll No: {user.enrollmentNo}
                </div>
              )}
              <div className="dropdown-divider"></div>
              <button className="dropdown-action-btn logout-btn" onClick={logout}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
