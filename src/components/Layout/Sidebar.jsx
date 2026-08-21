import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, BookOpen, Clock, BarChart3, FileText, CreditCard,
  Building2, Briefcase, Wrench, Map, ShieldAlert, GraduationCap,
  Users, Upload, FlaskConical, CalendarDays, DollarSign, MessageSquare,
  Bus, Heart, ClipboardList, Globe, QrCode, CalendarCheck, HelpCircle,
  LogOut, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import './Sidebar.css';

const navConfig = {
  student: [
    { path: '/student', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/student/timetable', icon: Clock, label: 'Timetable' },
    { path: '/student/attendance', icon: BarChart3, label: 'Attendance' },
    { path: '/student/academics', icon: BookOpen, label: 'Academics' },
    { path: '/student/assignments', icon: FileText, label: 'Assignments' },
    { divider: true, label: 'Campus Life' },
    { path: '/student/fees', icon: CreditCard, label: 'Fees & Payments' },
    { path: '/student/hostel', icon: Building2, label: 'Hostel' },
    { path: '/student/placement', icon: Briefcase, label: 'Placements' },
    { path: '/student/services', icon: Wrench, label: 'Services' },
    { path: '/student/campus-map', icon: Map, label: 'Campus Map' },
    { path: '/student/emergency', icon: ShieldAlert, label: 'Emergency' },
  ],
  faculty: [
    { path: '/faculty', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/faculty/classes', icon: GraduationCap, label: 'My Classes' },
    { path: '/faculty/attendance-upload', icon: ClipboardList, label: 'Mark Attendance' },
    { path: '/faculty/marks-upload', icon: Upload, label: 'Upload Marks' },
    { path: '/faculty/timetable', icon: Clock, label: 'Timetable' },
    { path: '/faculty/student-issues', icon: MessageSquare, label: 'Student Issues' },
    { divider: true, label: 'Personal' },
    { path: '/faculty/research', icon: FlaskConical, label: 'Research' },
    { path: '/faculty/leave', icon: CalendarDays, label: 'Leave Management' },
    { path: '/faculty/payslips', icon: DollarSign, label: 'Payslips' },
  ],
  parent: [
    { path: '/parent', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/parent/attendance', icon: BarChart3, label: 'Attendance' },
    { path: '/parent/academics', icon: BookOpen, label: 'Academics' },
    { path: '/parent/fees', icon: CreditCard, label: 'Fees & Payments' },
    { path: '/parent/hostel', icon: Building2, label: 'Hostel' },
    { path: '/parent/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/parent/bus-tracking', icon: Bus, label: 'Bus Tracking' },
  ],
  guest: [
    { path: '/guest', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/guest/register', icon: ClipboardList, label: 'Register Visit' },
    { path: '/guest/qr-pass', icon: QrCode, label: 'My QR Pass' },
    { path: '/guest/campus-map', icon: Map, label: 'Campus Map' },
    { path: '/guest/events', icon: CalendarCheck, label: 'Events' },
    { path: '/guest/inquiry', icon: HelpCircle, label: 'Inquiry Portal' },
  ],
};

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const items = navConfig[user?.role] || [];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Sparkles size={20} />
        </div>
        {!collapsed && (
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">UniVerse</span>
            <span className="sidebar-logo-sub">ERP System</span>
          </div>
        )}
        <button className="sidebar-toggle" onClick={onToggle}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {items.map((item, i) =>
          item.divider ? (
            !collapsed && (
              <div key={i} className="sidebar-divider">
                <span>{item.label}</span>
              </div>
            )
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        )}
      </nav>

      {/* User card */}
      <div className="sidebar-user">
        {!collapsed ? (
          <div className="sidebar-user-info">
            <div className="avatar" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
              {user?.avatar}
            </div>
            <div className="sidebar-user-details">
              <span className="sidebar-user-name">{user?.name}</span>
              <span className="sidebar-user-role">{user?.role}</span>
            </div>
          </div>
        ) : (
          <div className="avatar" style={{ background: 'var(--gradient-primary)', color: 'white', margin: '0 auto' }}>
            {user?.avatar}
          </div>
        )}
        <button className="sidebar-logout" onClick={logout} title="Sign Out">
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
