// Mock data for Guest portal
const today = new Date();

export const guestEvents = [
  { id: 1, name: 'Innovate 2026 — Annual Tech Fest', date: '2026-09-05', time: '9:00 AM - 6:00 PM', venue: 'Main Auditorium', description: 'Hackathons, workshops, tech talks by industry leaders.', category: 'Tech Fest', registeredCount: 450, maxCapacity: 600, registrationOpen: true },
  { id: 2, name: 'IEEE Workshop on AI Ethics', date: '2026-09-12', time: '10:00 AM - 1:00 PM', venue: 'Seminar Hall 3', description: 'Panel discussion on responsible AI development.', category: 'Workshop', registeredCount: 80, maxCapacity: 120, registrationOpen: true },
  { id: 3, name: 'Campus Recruitment — TCS', date: '2026-09-05', time: '9:00 AM - 5:00 PM', venue: 'Placement Block', description: 'On-campus recruitment drive for final year students.', category: 'Recruitment', registeredCount: 0, maxCapacity: 0, registrationOpen: false },
  { id: 4, name: 'Alumni Homecoming 2026', date: '2026-10-01', time: '4:00 PM - 9:00 PM', venue: 'Convention Center', description: 'Annual alumni reunion with cultural performances.', category: 'Cultural', registeredCount: 200, maxCapacity: 500, registrationOpen: true },
];

export const campusBuildings = [
  { id: 1, name: 'Main Academic Block', shortName: 'MAB', floors: 4, departments: ['CSE', 'ECE', 'EEE'], x: 30, y: 25 },
  { id: 2, name: 'Science Block', shortName: 'SB', floors: 3, departments: ['Physics', 'Chemistry', 'Maths'], x: 55, y: 20 },
  { id: 3, name: 'Admin Building', shortName: 'ADMIN', floors: 3, departments: ['Administration', 'Finance', 'HR'], x: 15, y: 40 },
  { id: 4, name: 'Central Library', shortName: 'LIB', floors: 3, departments: [], x: 40, y: 45 },
  { id: 5, name: 'Main Auditorium', shortName: 'AUD', floors: 1, departments: [], x: 60, y: 40 },
  { id: 6, name: 'Hostel Block A', shortName: 'HA', floors: 4, departments: [], x: 75, y: 60 },
  { id: 7, name: 'Hostel Block B', shortName: 'HB', floors: 4, departments: [], x: 85, y: 60 },
  { id: 8, name: 'Sports Complex', shortName: 'SC', floors: 1, departments: [], x: 20, y: 70 },
  { id: 9, name: 'Cafeteria', shortName: 'CAF', floors: 1, departments: [], x: 50, y: 65 },
  { id: 10, name: 'Placement Block', shortName: 'PB', floors: 2, departments: ['T&P Cell'], x: 70, y: 35 },
  { id: 11, name: 'Main Gate', shortName: 'GATE', floors: 0, departments: [], x: 5, y: 50 },
  { id: 12, name: 'Health Center', shortName: 'HC', floors: 1, departments: ['Medical'], x: 65, y: 55 },
];

export const courses = [
  { id: 1, name: 'B.Tech Computer Science & Engineering', duration: '4 Years', seats: 120, fee: '₹1,85,000/year', placement: '95%' },
  { id: 2, name: 'B.Tech Electronics & Communication', duration: '4 Years', seats: 60, fee: '₹1,70,000/year', placement: '88%' },
  { id: 3, name: 'B.Tech Mechanical Engineering', duration: '4 Years', seats: 60, fee: '₹1,60,000/year', placement: '82%' },
  { id: 4, name: 'M.Tech Data Science', duration: '2 Years', seats: 30, fee: '₹2,20,000/year', placement: '92%' },
  { id: 5, name: 'MBA Business Analytics', duration: '2 Years', seats: 60, fee: '₹3,50,000/year', placement: '90%' },
  { id: 6, name: 'B.Sc Computer Science', duration: '3 Years', seats: 90, fee: '₹85,000/year', placement: '78%' },
];

export const visitorPassStatuses = {
  PENDING: 'pending',
  APPROVED: 'approved',
  CHECKED_IN: 'checked_in',
  EXPIRED: 'expired',
  REJECTED: 'rejected',
};
