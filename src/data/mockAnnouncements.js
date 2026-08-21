// Shared announcements across all portals
const today = new Date();
const fmt = (d) => d.toISOString().split('T')[0];
const daysAgo = (n) => { const d = new Date(today); d.setDate(d.getDate() - n); return d; };
const daysAhead = (n) => { const d = new Date(today); d.setDate(d.getDate() + n); return d; };

export const announcements = [
  { id: 1, title: 'Mid-Semester Examinations Schedule Released', category: 'Academic', priority: 'high', date: fmt(daysAgo(1)), description: 'The mid-semester examination schedule for all departments has been published. Please check the exam portal for your individual timetable.' },
  { id: 2, title: 'Annual Tech Fest "Innovate 2026" — Registrations Open', category: 'Event', priority: 'medium', date: fmt(daysAgo(2)), description: 'Register for workshops, hackathons, and coding competitions at Innovate 2026. Early bird deadline: next Friday.' },
  { id: 3, title: 'Library Operating Hours Extended During Exams', category: 'Administrative', priority: 'low', date: fmt(daysAgo(3)), description: 'The central library will remain open until 11 PM during the examination period starting next week.' },
  { id: 4, title: 'Campus Maintenance: Water Supply Disruption on Saturday', category: 'Facility', priority: 'high', date: fmt(daysAgo(0)), description: 'Scheduled maintenance will cause water supply disruption in Hostel Blocks A-C from 8 AM to 2 PM this Saturday.' },
  { id: 5, title: 'Placement Drive: Infosys On-Campus Recruitment', category: 'Placement', priority: 'high', date: fmt(daysAgo(1)), description: 'Infosys will conduct on-campus placement drive on the 28th. Eligible students must register before the 25th.' },
  { id: 6, title: 'Workshop on AI & Machine Learning — Dr. Raj Kumar', category: 'Event', priority: 'medium', date: fmt(daysAhead(2)), description: 'Guest lecture and hands-on workshop on practical ML applications. Venue: Seminar Hall 3, 2 PM.' },
  { id: 7, title: 'Hostel Fee Payment Deadline Extended', category: 'Administrative', priority: 'medium', date: fmt(daysAgo(4)), description: 'The deadline for hostel fee payment has been extended to the end of this month without any late fee charges.' },
  { id: 8, title: 'Sports Day Trials — Cricket & Football Teams', category: 'Event', priority: 'low', date: fmt(daysAhead(3)), description: 'Selection trials for inter-university cricket and football teams. Report to the sports ground at 6 AM.' },
  { id: 9, title: 'Emergency Drill Scheduled for Wednesday', category: 'Emergency', priority: 'high', date: fmt(daysAhead(1)), description: 'A campus-wide emergency evacuation drill will be conducted. All students and staff must participate.' },
  { id: 10, title: 'New Canteen Menu Launched', category: 'Facility', priority: 'low', date: fmt(daysAgo(5)), description: 'The central canteen has introduced a new menu with healthier options and regional cuisines.' },
  { id: 11, title: 'Parent-Teacher Meeting: Semester 5 CSE', category: 'Academic', priority: 'medium', date: fmt(daysAhead(5)), description: 'PTM for Semester 5 CSE students scheduled next Monday. Parents can join virtually via the portal.' },
  { id: 12, title: 'Research Paper Submission Deadline — IEEE Conference', category: 'Academic', priority: 'high', date: fmt(daysAhead(7)), description: 'Faculty and students submitting papers to the IEEE conference must submit by end of next week.' },
];

export const tickerAnnouncements = announcements.filter(a => a.priority === 'high').map(a => a.title);
