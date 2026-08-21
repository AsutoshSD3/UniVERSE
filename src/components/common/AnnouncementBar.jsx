import { Megaphone } from 'lucide-react';
import { announcements } from '../../data/mockAnnouncements';

export default function AnnouncementBar() {
  const highPriority = announcements.filter(a => a.priority === 'high');

  return (
    <div className="announcement-ticker">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0 16px',
          background: 'rgba(59, 130, 246, 0.2)',
          color: 'var(--accent-blue-light)',
          fontSize: 'var(--font-xs)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 2,
          flexShrink: 0,
        }}>
          <Megaphone size={14} />
          <span>Announcements</span>
        </div>

        <div className="announcement-ticker-content">
          {highPriority.concat(highPriority).map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="announcement-ticker-item">
              <span className="dot"></span>
              <span><strong>[{item.category}]</strong> {item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
