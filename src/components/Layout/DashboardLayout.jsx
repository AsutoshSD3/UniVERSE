import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import AnnouncementBar from '../common/AnnouncementBar';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      
      <div className="main-wrapper">
        <TopBar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <AnnouncementBar />
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
