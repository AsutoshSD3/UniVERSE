// Date and time utility helpers
export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
};

export const formatDateTime = (dateStr) => {
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`;
};

export const getRelativeTime = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
};

export const isToday = (dateStr) => {
  const d = new Date(dateStr);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

export const isPast = (dateStr) => {
  return new Date(dateStr) < new Date();
};

export const isFuture = (dateStr) => {
  return new Date(dateStr) > new Date();
};

export const getDaysRemaining = (dateStr) => {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / 86400000);
};

export const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const days = [];

  // Previous month's days
  const prevMonthLast = new Date(year, month, 0).getDate();
  for (let i = startingDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthLast - i, currentMonth: false, date: new Date(year, month - 1, prevMonthLast - i) });
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, currentMonth: true, date: new Date(year, month, i) });
  }

  // Next month's days
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, currentMonth: false, date: new Date(year, month + 1, i) });
  }

  return days;
};

export const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const getColorForValue = (value, thresholds = { good: 85, warning: 75 }) => {
  if (value >= thresholds.good) return 'var(--accent-green)';
  if (value >= thresholds.warning) return 'var(--accent-orange)';
  return 'var(--accent-red)';
};

export const generateQRData = (data) => {
  return JSON.stringify({
    ...data,
    timestamp: new Date().toISOString(),
    hash: Math.random().toString(36).substring(2, 15),
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
