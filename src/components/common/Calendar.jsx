import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, BookOpen, AlertCircle, CalendarDays, CheckCircle2 } from 'lucide-react';
import { getMonthDays, formatDate } from '../../utils/helpers';
import './Calendar.css';

export default function Calendar({ 
  events = [], 
  classes = [], 
  assignments = [], 
  tasks = [], 
  issues = [],
  title = "Schedule & Calendar"
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('all');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = getMonthDays(year, month);
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const isTodaySelected = selectedDate.toDateString() === today.toDateString();

  // Combine items for the selected day
  const dayEvents = events.filter(e => e.date === selectedDateStr);
  const dayAssignments = assignments.filter(a => a.deadline?.startsWith(selectedDateStr));
  const dayClasses = isTodaySelected ? classes : []; // Show classes for today
  const dayTasks = tasks.filter(t => t.date === selectedDateStr || (!t.date && isTodaySelected));
  const dayIssues = issues.filter(i => i.date === selectedDateStr || (!i.date && isTodaySelected));

  // Determine if a date has items
  const hasItemsOnDate = (date) => {
    const dStr = date.toISOString().split('T')[0];
    return events.some(e => e.date === dStr) || 
           assignments.some(a => a.deadline?.startsWith(dStr)) ||
           tasks.some(t => t.date === dStr) ||
           issues.some(i => i.date === dStr);
  };

  return (
    <div className="erp-calendar-card glass-card">
      <div className="calendar-header-top">
        <div className="calendar-title-group">
          <CalendarDays className="text-blue" size={22} />
          <h3>{title}</h3>
        </div>
        <div className="calendar-nav-controls">
          <button className="btn-icon sm btn-ghost" onClick={prevMonth}>
            <ChevronLeft size={16} />
          </button>
          <span className="calendar-month-label">
            {monthNames[month]} {year}
          </span>
          <button className="btn-icon sm btn-ghost" onClick={nextMonth}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="calendar-main-grid-layout">
        {/* Month Calendar Grid */}
        <div className="calendar-left-pane">
          <div className="calendar-grid">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
              <div key={i} className="calendar-header">{d}</div>
            ))}
            {days.map((item, idx) => {
              const isToday = item.date.toDateString() === today.toDateString();
              const isSelected = item.date.toDateString() === selectedDate.toDateString();
              const hasItem = hasItemsOnDate(item.date);

              return (
                <button
                  key={idx}
                  className={`calendar-day ${!item.currentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasItem ? 'has-event' : ''}`}
                  onClick={() => setSelectedDate(item.date)}
                >
                  <span>{item.day}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda Pane */}
        <div className="calendar-right-agenda">
          <div className="agenda-header">
            <div>
              <h4>{isTodaySelected ? "Today's Agenda" : formatDate(selectedDateStr)}</h4>
              <p className="text-xs text-muted">
                {isTodaySelected ? "Classes, due tasks & events" : "Scheduled items"}
              </p>
            </div>
            <div className="agenda-filters">
              <button 
                className={`agenda-pill ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              {classes.length > 0 && (
                <button 
                  className={`agenda-pill ${filter === 'classes' ? 'active' : ''}`}
                  onClick={() => setFilter('classes')}
                >
                  Classes
                </button>
              )}
              {assignments.length > 0 && (
                <button 
                  className={`agenda-pill ${filter === 'assignments' ? 'active' : ''}`}
                  onClick={() => setFilter('assignments')}
                >
                  Due
                </button>
              )}
            </div>
          </div>

          <div className="agenda-items-list">
            {/* Classes */}
            {(filter === 'all' || filter === 'classes') && dayClasses.map((cls, idx) => (
              <div key={`cls-${idx}`} className="agenda-item class-item">
                <div className="agenda-item-badge blue">
                  <Clock size={14} />
                </div>
                <div className="agenda-item-details">
                  <div className="agenda-item-title">{cls.subject}</div>
                  <div className="agenda-item-sub">
                    <span>{cls.time}</span> • <span className="text-blue">{cls.room}</span> • {cls.faculty || cls.type}
                  </div>
                </div>
              </div>
            ))}

            {/* Assignments Due */}
            {(filter === 'all' || filter === 'assignments') && dayAssignments.map((asg) => (
              <div key={`asg-${asg.id}`} className="agenda-item assignment-item">
                <div className="agenda-item-badge orange">
                  <BookOpen size={14} />
                </div>
                <div className="agenda-item-details">
                  <div className="agenda-item-title">{asg.title}</div>
                  <div className="agenda-item-sub">
                    <span className="text-orange">Due: {asg.subject}</span> • Max Marks: {asg.maxMarks}
                  </div>
                </div>
                <span className={`badge ${asg.status === 'submitted' ? 'badge-green' : 'badge-orange'}`}>
                  {asg.status}
                </span>
              </div>
            ))}

            {/* Tasks (e.g. for Faculty) */}
            {(filter === 'all' || filter === 'tasks') && dayTasks.map((tsk, idx) => (
              <div key={`tsk-${idx}`} className="agenda-item task-item">
                <div className="agenda-item-badge purple">
                  <CheckCircle2 size={14} />
                </div>
                <div className="agenda-item-details">
                  <div className="agenda-item-title">{tsk.title || tsk.task}</div>
                  <div className="agenda-item-sub">{tsk.priority || 'Normal'} priority • {tsk.category || 'General'}</div>
                </div>
              </div>
            ))}

            {/* Student Issues (for Faculty) */}
            {(filter === 'all' || filter === 'issues') && dayIssues.map((iss) => (
              <div key={`iss-${iss.id}`} className="agenda-item issue-item">
                <div className="agenda-item-badge red">
                  <AlertCircle size={14} />
                </div>
                <div className="agenda-item-details">
                  <div className="agenda-item-title">{iss.subject}</div>
                  <div className="agenda-item-sub">
                    Student: <span className="text-red">{iss.student} ({iss.rollNo})</span>
                  </div>
                </div>
                <span className="badge badge-red">{iss.priority}</span>
              </div>
            ))}

            {/* General Events */}
            {(filter === 'all' || filter === 'events') && dayEvents.map((evt, idx) => (
              <div key={`evt-${idx}`} className="agenda-item event-item">
                <div className="agenda-item-badge cyan">
                  <CalendarDays size={14} />
                </div>
                <div className="agenda-item-details">
                  <div className="agenda-item-title">{evt.title}</div>
                  <div className="agenda-item-sub">{evt.type} • {formatDate(evt.date)}</div>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {dayClasses.length === 0 && dayAssignments.length === 0 && dayTasks.length === 0 && dayIssues.length === 0 && dayEvents.length === 0 && (
              <div className="agenda-empty">
                <p className="text-muted text-sm">No scheduled classes, deadlines or events for this date.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
