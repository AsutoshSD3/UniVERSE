// Comprehensive mock data for the Student portal
const today = new Date();
const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...

export const studentSubjects = [
  { id: 'CS301', name: 'Data Structures & Algorithms', code: 'CS301', faculty: 'Dr. Priya Sharma', credits: 4, type: 'Theory' },
  { id: 'CS302', name: 'Database Management Systems', code: 'CS302', faculty: 'Prof. Anil Gupta', credits: 4, type: 'Theory' },
  { id: 'CS303', name: 'Operating Systems', code: 'CS303', faculty: 'Dr. Meena Iyer', credits: 3, type: 'Theory' },
  { id: 'CS304', name: 'Computer Networks', code: 'CS304', faculty: 'Dr. Vikram Patel', credits: 3, type: 'Theory' },
  { id: 'CS305', name: 'Machine Learning', code: 'CS305', faculty: 'Dr. Priya Sharma', credits: 4, type: 'Theory + Lab' },
  { id: 'CS306', name: 'Web Technologies Lab', code: 'CS306', faculty: 'Prof. Sneha Reddy', credits: 2, type: 'Lab' },
];

export const studentAttendance = [
  { subjectId: 'CS301', subjectName: 'Data Structures & Algorithms', totalClasses: 42, attended: 38, percentage: 90.5 },
  { subjectId: 'CS302', subjectName: 'Database Management Systems', totalClasses: 40, attended: 34, percentage: 85.0 },
  { subjectId: 'CS303', subjectName: 'Operating Systems', totalClasses: 36, attended: 28, percentage: 77.8 },
  { subjectId: 'CS304', subjectName: 'Computer Networks', totalClasses: 38, attended: 26, percentage: 68.4 },
  { subjectId: 'CS305', subjectName: 'Machine Learning', totalClasses: 44, attended: 40, percentage: 90.9 },
  { subjectId: 'CS306', subjectName: 'Web Technologies Lab', totalClasses: 20, attended: 18, percentage: 90.0 },
];

export const overallAttendance = {
  totalClasses: 220,
  attended: 184,
  percentage: 83.6,
  target: 75,
  canSkip: 20, // classes that can be skipped and still maintain 75%
};

export const timetable = {
  Monday: [
    { time: '9:00 - 10:00', subject: 'Data Structures & Algorithms', code: 'CS301', room: 'CSE-201', faculty: 'Dr. Priya Sharma', type: 'Lecture' },
    { time: '10:00 - 11:00', subject: 'Database Management Systems', code: 'CS302', room: 'CSE-202', faculty: 'Prof. Anil Gupta', type: 'Lecture' },
    { time: '11:15 - 12:15', subject: 'Operating Systems', code: 'CS303', room: 'CSE-101', faculty: 'Dr. Meena Iyer', type: 'Lecture' },
    { time: '2:00 - 4:00', subject: 'Web Technologies Lab', code: 'CS306', room: 'Lab-3', faculty: 'Prof. Sneha Reddy', type: 'Lab' },
  ],
  Tuesday: [
    { time: '9:00 - 10:00', subject: 'Computer Networks', code: 'CS304', room: 'CSE-301', faculty: 'Dr. Vikram Patel', type: 'Lecture' },
    { time: '10:00 - 11:00', subject: 'Machine Learning', code: 'CS305', room: 'CSE-201', faculty: 'Dr. Priya Sharma', type: 'Lecture' },
    { time: '11:15 - 12:15', subject: 'Data Structures & Algorithms', code: 'CS301', room: 'CSE-201', faculty: 'Dr. Priya Sharma', type: 'Lecture' },
    { time: '2:00 - 3:00', subject: 'Database Management Systems', code: 'CS302', room: 'CSE-202', faculty: 'Prof. Anil Gupta', type: 'Tutorial' },
  ],
  Wednesday: [
    { time: '9:00 - 10:00', subject: 'Operating Systems', code: 'CS303', room: 'CSE-101', faculty: 'Dr. Meena Iyer', type: 'Lecture' },
    { time: '10:00 - 12:00', subject: 'Machine Learning Lab', code: 'CS305', room: 'Lab-5', faculty: 'Dr. Priya Sharma', type: 'Lab' },
    { time: '2:00 - 3:00', subject: 'Computer Networks', code: 'CS304', room: 'CSE-301', faculty: 'Dr. Vikram Patel', type: 'Lecture' },
  ],
  Thursday: [
    { time: '9:00 - 10:00', subject: 'Data Structures & Algorithms', code: 'CS301', room: 'CSE-201', faculty: 'Dr. Priya Sharma', type: 'Lecture' },
    { time: '10:00 - 11:00', subject: 'Database Management Systems', code: 'CS302', room: 'CSE-202', faculty: 'Prof. Anil Gupta', type: 'Lecture' },
    { time: '11:15 - 12:15', subject: 'Machine Learning', code: 'CS305', room: 'CSE-201', faculty: 'Dr. Priya Sharma', type: 'Lecture' },
    { time: '2:00 - 3:00', subject: 'Operating Systems', code: 'CS303', room: 'CSE-101', faculty: 'Dr. Meena Iyer', type: 'Tutorial' },
  ],
  Friday: [
    { time: '9:00 - 10:00', subject: 'Computer Networks', code: 'CS304', room: 'CSE-301', faculty: 'Dr. Vikram Patel', type: 'Lecture' },
    { time: '10:00 - 11:00', subject: 'Machine Learning', code: 'CS305', room: 'CSE-201', faculty: 'Dr. Priya Sharma', type: 'Lecture' },
    { time: '11:15 - 1:15', subject: 'DSA Lab', code: 'CS301', room: 'Lab-2', faculty: 'Dr. Priya Sharma', type: 'Lab' },
  ],
  Saturday: [
    { time: '9:00 - 10:00', subject: 'Database Management Systems', code: 'CS302', room: 'CSE-202', faculty: 'Prof. Anil Gupta', type: 'Lecture' },
    { time: '10:00 - 11:00', subject: 'Operating Systems', code: 'CS303', room: 'CSE-101', faculty: 'Dr. Meena Iyer', type: 'Lecture' },
  ],
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const todaysClasses = timetable[dayNames[dayOfWeek]] || [];

export const studentMarks = {
  currentSemester: 5,
  semesters: [
    { sem: 1, sgpa: 8.2, credits: 22 },
    { sem: 2, sgpa: 8.5, credits: 22 },
    { sem: 3, sgpa: 7.9, credits: 24 },
    { sem: 4, sgpa: 8.7, credits: 24 },
  ],
  cgpa: 8.33,
  currentSubjects: [
    {
      code: 'CS301', name: 'Data Structures & Algorithms',
      internal1: 22, internal2: 24, assignment: 9, quiz: 8,
      maxInternal: 25, maxAssignment: 10, maxQuiz: 10,
      totalInternal: 63, maxTotalInternal: 70,
    },
    {
      code: 'CS302', name: 'Database Management Systems',
      internal1: 20, internal2: 21, assignment: 8, quiz: 7,
      maxInternal: 25, maxAssignment: 10, maxQuiz: 10,
      totalInternal: 56, maxTotalInternal: 70,
    },
    {
      code: 'CS303', name: 'Operating Systems',
      internal1: 18, internal2: 20, assignment: 9, quiz: 9,
      maxInternal: 25, maxAssignment: 10, maxQuiz: 10,
      totalInternal: 56, maxTotalInternal: 70,
    },
    {
      code: 'CS304', name: 'Computer Networks',
      internal1: 19, internal2: 22, assignment: 7, quiz: 6,
      maxInternal: 25, maxAssignment: 10, maxQuiz: 10,
      totalInternal: 54, maxTotalInternal: 70,
    },
    {
      code: 'CS305', name: 'Machine Learning',
      internal1: 24, internal2: 23, assignment: 10, quiz: 9,
      maxInternal: 25, maxAssignment: 10, maxQuiz: 10,
      totalInternal: 66, maxTotalInternal: 70,
    },
    {
      code: 'CS306', name: 'Web Technologies Lab',
      internal1: 45, internal2: null, assignment: null, quiz: null,
      maxInternal: 50, maxAssignment: null, maxQuiz: null,
      totalInternal: 45, maxTotalInternal: 50,
    },
  ],
};

export const assignments = [
  { id: 1, subject: 'Data Structures & Algorithms', title: 'Implement AVL Tree Operations', deadline: new Date(today.getTime() + 2 * 86400000).toISOString(), status: 'pending', maxMarks: 20, type: 'Coding' },
  { id: 2, subject: 'Database Management Systems', title: 'ER Diagram for Hospital Management', deadline: new Date(today.getTime() + 5 * 86400000).toISOString(), status: 'pending', maxMarks: 15, type: 'Report' },
  { id: 3, subject: 'Operating Systems', title: 'Process Scheduling Simulation', deadline: new Date(today.getTime() - 1 * 86400000).toISOString(), status: 'submitted', marks: 17, maxMarks: 20, type: 'Coding' },
  { id: 4, subject: 'Machine Learning', title: 'Linear Regression on Housing Dataset', deadline: new Date(today.getTime() + 7 * 86400000).toISOString(), status: 'pending', maxMarks: 25, type: 'Project' },
  { id: 5, subject: 'Computer Networks', title: 'TCP/IP Protocol Analysis Report', deadline: new Date(today.getTime() - 3 * 86400000).toISOString(), status: 'graded', marks: 13, maxMarks: 15, type: 'Report' },
  { id: 6, subject: 'Web Technologies Lab', title: 'Build a REST API with Express.js', deadline: new Date(today.getTime() - 5 * 86400000).toISOString(), status: 'graded', marks: 42, maxMarks: 50, type: 'Lab' },
];

export const feeDetails = {
  totalFee: 185000,
  paid: 125000,
  pending: 60000,
  nextDueDate: new Date(today.getTime() + 30 * 86400000).toISOString().split('T')[0],
  breakdown: [
    { item: 'Tuition Fee', amount: 120000, status: 'Paid' },
    { item: 'Hostel Fee', amount: 35000, status: 'Paid' },
    { item: 'Lab & Library Fee', amount: 8000, status: 'Pending' },
    { item: 'Exam Fee', amount: 5000, status: 'Pending' },
    { item: 'Transport Fee', amount: 12000, status: 'Pending' },
    { item: 'Student Activity Fee', amount: 5000, status: 'Paid' },
  ],
  payments: [
    { id: 'TXN001', date: '2026-07-15', amount: 125000, method: 'UPI', status: 'Success', receipt: 'REC-2026-001' },
    { id: 'TXN002', date: '2026-01-10', amount: 95000, method: 'Net Banking', status: 'Success', receipt: 'REC-2025-002' },
  ],
};

export const hostelInfo = {
  block: 'A',
  room: '304',
  roomType: 'Double Sharing',
  roommate: 'Karthik Nair',
  warden: 'Mr. Suresh Kumar',
  wardenPhone: '+91 98765 11111',
  checkIn: '10:00 PM',
  messMenu: {
    Monday: { breakfast: 'Idli, Sambhar, Coffee', lunch: 'Rice, Dal, Paneer Curry, Salad', dinner: 'Chapati, Mixed Veg, Rice, Dal' },
    Tuesday: { breakfast: 'Poha, Tea, Banana', lunch: 'Rice, Rajma, Curd, Papad', dinner: 'Paratha, Chole, Rice, Kheer' },
    Wednesday: { breakfast: 'Dosa, Chutney, Coffee', lunch: 'Rice, Sambhar, Potato Fry, Buttermilk', dinner: 'Chapati, Palak Paneer, Rice, Dal' },
    Thursday: { breakfast: 'Bread, Butter, Eggs, Juice', lunch: 'Biryani, Raita, Salad', dinner: 'Chapati, Dal Makhani, Rice, Gulab Jamun' },
    Friday: { breakfast: 'Upma, Vada, Coffee', lunch: 'Rice, Kadhi, Aloo Gobi, Papad', dinner: 'Puri, Chana Masala, Rice, Ice Cream' },
    Saturday: { breakfast: 'Paratha, Curd, Tea', lunch: 'Rice, Dal, Paneer Tikka, Salad', dinner: 'Chapati, Mix Veg, Rice, Custard' },
    Sunday: { breakfast: 'Chole Bhature, Lassi', lunch: 'Special Thali', dinner: 'Chapati, Egg Curry / Paneer, Rice, Halwa' },
  },
  outPasses: [
    { id: 'OP001', date: '2026-08-15', reason: 'Home Visit - Independence Day', status: 'Approved', returnDate: '2026-08-17' },
    { id: 'OP002', date: '2026-08-10', reason: 'Medical Appointment', status: 'Approved', returnDate: '2026-08-10' },
  ],
};

export const placementDrives = [
  { id: 1, company: 'Infosys', role: 'Systems Engineer', package: '₹4.5 LPA', date: '2026-08-28', eligibility: 'CGPA ≥ 7.0, No active backlogs', status: 'Open', registered: true },
  { id: 2, company: 'TCS', role: 'Assistant Systems Engineer', package: '₹3.6 LPA', date: '2026-09-05', eligibility: 'CGPA ≥ 6.5', status: 'Open', registered: false },
  { id: 3, company: 'Wipro', role: 'Project Engineer', package: '₹3.8 LPA', date: '2026-09-10', eligibility: 'CGPA ≥ 6.0', status: 'Upcoming', registered: false },
  { id: 4, company: 'Microsoft', role: 'Software Development Engineer', package: '₹18 LPA', date: '2026-09-15', eligibility: 'CGPA ≥ 8.0, DSA proficiency', status: 'Upcoming', registered: false },
  { id: 5, company: 'Google', role: 'SDE Intern', package: '₹60K/month stipend', date: '2026-09-20', eligibility: 'CGPA ≥ 8.5, Competitive programming', status: 'Upcoming', registered: false },
  { id: 6, company: 'Deloitte', role: 'Analyst', package: '₹7.5 LPA', date: '2026-08-20', eligibility: 'CGPA ≥ 7.5', status: 'Completed', registered: true },
];

export const calendarEvents = [
  { date: today.toISOString().split('T')[0], title: 'DSA Assignment Due', type: 'assignment', color: '#f59e0b' },
  { date: today.toISOString().split('T')[0], title: 'ML Guest Lecture', type: 'event', color: '#8b5cf6' },
  { date: new Date(today.getTime() + 86400000).toISOString().split('T')[0], title: 'Emergency Drill', type: 'event', color: '#ef4444' },
  { date: new Date(today.getTime() + 2 * 86400000).toISOString().split('T')[0], title: 'AVL Tree Assignment Due', type: 'assignment', color: '#f59e0b' },
  { date: new Date(today.getTime() + 5 * 86400000).toISOString().split('T')[0], title: 'DBMS ER Diagram Due', type: 'assignment', color: '#f59e0b' },
  { date: new Date(today.getTime() + 5 * 86400000).toISOString().split('T')[0], title: 'PTM - Sem 5 CSE', type: 'event', color: '#3b82f6' },
  { date: new Date(today.getTime() + 7 * 86400000).toISOString().split('T')[0], title: 'ML Project Deadline', type: 'assignment', color: '#f59e0b' },
  { date: new Date(today.getTime() + 10 * 86400000).toISOString().split('T')[0], title: 'Mid-Sem Exams Begin', type: 'exam', color: '#ef4444' },
];

export const clubs = [
  { id: 1, name: 'Coding Club', members: 180, description: 'Weekly coding contests and workshops', joined: true },
  { id: 2, name: 'Robotics Society', members: 95, description: 'Build and compete with autonomous robots', joined: false },
  { id: 3, name: 'Literary Society', members: 120, description: 'Debates, poetry, and creative writing', joined: true },
  { id: 4, name: 'Photography Club', members: 75, description: 'Photo walks, exhibitions, and editing workshops', joined: false },
  { id: 5, name: 'Music Club', members: 110, description: 'Band performances, open mics, and music production', joined: false },
  { id: 6, name: 'Entrepreneurship Cell', members: 200, description: 'Startup mentoring, pitch competitions, and networking', joined: true },
];
