// Mock data for Faculty portal
const today = new Date();

export const facultyClasses = [
  { id: 'CLS001', subject: 'Data Structures & Algorithms', code: 'CS301', section: 'A', semester: 5, students: 62, room: 'CSE-201' },
  { id: 'CLS002', subject: 'Machine Learning', code: 'CS305', section: 'A', semester: 5, students: 58, room: 'CSE-201' },
  { id: 'CLS003', subject: 'Data Structures & Algorithms', code: 'CS301', section: 'B', semester: 5, students: 60, room: 'CSE-203' },
];

export const facultyTimetable = {
  Monday: [
    { time: '9:00 - 10:00', subject: 'DSA (Sec A)', code: 'CS301', room: 'CSE-201', type: 'Lecture' },
    { time: '11:15 - 12:15', subject: 'ML (Sec A)', code: 'CS305', room: 'CSE-201', type: 'Lecture' },
    { time: '2:00 - 3:00', subject: 'DSA (Sec B)', code: 'CS301', room: 'CSE-203', type: 'Lecture' },
  ],
  Tuesday: [
    { time: '10:00 - 11:00', subject: 'ML (Sec A)', code: 'CS305', room: 'CSE-201', type: 'Lecture' },
    { time: '11:15 - 12:15', subject: 'DSA (Sec A)', code: 'CS301', room: 'CSE-201', type: 'Lecture' },
  ],
  Wednesday: [
    { time: '10:00 - 12:00', subject: 'ML Lab (Sec A)', code: 'CS305', room: 'Lab-5', type: 'Lab' },
    { time: '2:00 - 3:00', subject: 'DSA (Sec B)', code: 'CS301', room: 'CSE-203', type: 'Lecture' },
  ],
  Thursday: [
    { time: '9:00 - 10:00', subject: 'DSA (Sec A)', code: 'CS301', room: 'CSE-201', type: 'Lecture' },
    { time: '11:15 - 12:15', subject: 'ML (Sec A)', code: 'CS305', room: 'CSE-201', type: 'Lecture' },
    { time: '3:00 - 4:00', subject: 'Office Hours', code: '-', room: 'CSE-205', type: 'Office' },
  ],
  Friday: [
    { time: '10:00 - 11:00', subject: 'ML (Sec A)', code: 'CS305', room: 'CSE-201', type: 'Lecture' },
    { time: '11:15 - 1:15', subject: 'DSA Lab (Sec A)', code: 'CS301', room: 'Lab-2', type: 'Lab' },
  ],
  Saturday: [
    { time: '10:00 - 11:00', subject: 'DSA (Sec B)', code: 'CS301', room: 'CSE-203', type: 'Lecture' },
  ],
};

export const studentsList = [
  { id: 'STU001', name: 'Arjun Mehta', rollNo: 'CSE/2023/1042', attendance: 90.5, cgpa: 8.33 },
  { id: 'STU002', name: 'Sneha Krishnan', rollNo: 'CSE/2023/1015', attendance: 95.2, cgpa: 9.1 },
  { id: 'STU003', name: 'Rahul Verma', rollNo: 'CSE/2023/1028', attendance: 72.1, cgpa: 7.2 },
  { id: 'STU004', name: 'Ananya Gupta', rollNo: 'CSE/2023/1033', attendance: 88.4, cgpa: 8.7 },
  { id: 'STU005', name: 'Mohammed Faiz', rollNo: 'CSE/2023/1007', attendance: 68.9, cgpa: 6.8 },
  { id: 'STU006', name: 'Priya Nair', rollNo: 'CSE/2023/1051', attendance: 92.0, cgpa: 8.9 },
  { id: 'STU007', name: 'Karthik Rajan', rollNo: 'CSE/2023/1019', attendance: 84.3, cgpa: 7.8 },
  { id: 'STU008', name: 'Divya Sharma', rollNo: 'CSE/2023/1044', attendance: 91.7, cgpa: 8.5 },
  { id: 'STU009', name: 'Vikash Singh', rollNo: 'CSE/2023/1062', attendance: 55.2, cgpa: 5.9 },
  { id: 'STU010', name: 'Meera Joshi', rollNo: 'CSE/2023/1038', attendance: 97.1, cgpa: 9.4 },
  { id: 'STU011', name: 'Aditya Kumar', rollNo: 'CSE/2023/1023', attendance: 76.5, cgpa: 7.5 },
  { id: 'STU012', name: 'Tanya Desai', rollNo: 'CSE/2023/1056', attendance: 89.3, cgpa: 8.1 },
];

export const studentIssues = [
  { id: 'ISS001', student: 'Rahul Verma', rollNo: 'CSE/2023/1028', subject: 'Low Attendance Warning', description: 'Attendance below 75% in DSA. Need counseling.', status: 'open', priority: 'high', date: '2026-08-19', category: 'Attendance' },
  { id: 'ISS002', student: 'Mohammed Faiz', rollNo: 'CSE/2023/1007', subject: 'Assignment Extension Request', description: 'Requesting 2-day extension for ML project due to medical reasons.', status: 'open', priority: 'medium', date: '2026-08-20', category: 'Academic' },
  { id: 'ISS003', student: 'Vikash Singh', rollNo: 'CSE/2023/1062', subject: 'Academic Decline Alert', description: 'CGPA dropped from 6.5 to 5.9. Multiple missed classes.', status: 'in-progress', priority: 'high', date: '2026-08-18', category: 'Performance' },
  { id: 'ISS004', student: 'Arjun Mehta', rollNo: 'CSE/2023/1042', subject: 'Project Mentoring Request', description: 'Wants guidance on final year project topic selection.', status: 'resolved', priority: 'low', date: '2026-08-15', category: 'Mentoring' },
  { id: 'ISS005', student: 'Sneha Krishnan', rollNo: 'CSE/2023/1015', subject: 'Re-evaluation Request', description: 'Requesting re-evaluation of Internal Test 2 - CS301.', status: 'open', priority: 'medium', date: '2026-08-21', category: 'Academic' },
];

export const researchPublications = [
  { id: 1, title: 'Deep Learning Approaches for Medical Image Segmentation', journal: 'IEEE Trans. on Medical Imaging', year: 2026, citations: 12, status: 'Published', type: 'Journal' },
  { id: 2, title: 'Federated Learning for Privacy-Preserving Healthcare', conference: 'NeurIPS 2025', year: 2025, citations: 28, status: 'Published', type: 'Conference' },
  { id: 3, title: 'Explainable AI in Autonomous Vehicles', journal: 'Springer AI Review', year: 2025, citations: 8, status: 'Published', type: 'Journal' },
  { id: 4, title: 'Graph Neural Networks for Social Network Analysis', conference: 'AAAI 2026', year: 2026, citations: 0, status: 'Under Review', type: 'Conference' },
  { id: 5, title: 'Patent: Adaptive Learning Rate Scheduler for Transformers', year: 2026, citations: 0, status: 'Filed', type: 'Patent' },
];

export const leaveRecords = [
  { id: 'LV001', type: 'Casual Leave', from: '2026-08-05', to: '2026-08-06', days: 2, reason: 'Personal work', status: 'Approved', substitute: 'Prof. Anil Gupta' },
  { id: 'LV002', type: 'Academic Leave', from: '2026-07-20', to: '2026-07-22', days: 3, reason: 'IEEE Conference - Delhi', status: 'Approved', substitute: 'Dr. Meena Iyer' },
  { id: 'LV003', type: 'Medical Leave', from: '2026-08-25', to: '2026-08-26', days: 2, reason: 'Medical appointment', status: 'Pending', substitute: 'TBD' },
];

export const leaveBalance = {
  casual: { total: 12, used: 4, remaining: 8 },
  academic: { total: 15, used: 5, remaining: 10 },
  medical: { total: 10, used: 0, remaining: 10 },
  earned: { total: 30, used: 0, remaining: 30 },
};

export const payslips = [
  { month: 'July 2026', basic: 65000, hra: 19500, da: 13000, special: 8000, grossSalary: 105500, pf: 7800, tax: 8500, insurance: 1200, totalDeductions: 17500, netSalary: 88000 },
  { month: 'June 2026', basic: 65000, hra: 19500, da: 13000, special: 8000, grossSalary: 105500, pf: 7800, tax: 8500, insurance: 1200, totalDeductions: 17500, netSalary: 88000 },
  { month: 'May 2026', basic: 65000, hra: 19500, da: 13000, special: 8000, grossSalary: 105500, pf: 7800, tax: 8500, insurance: 1200, totalDeductions: 17500, netSalary: 88000 },
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const todaysFacultyClasses = facultyTimetable[dayNames[today.getDay()]] || [];

export const facultyIssues = studentIssues;

export const facultyTasks = [
  { id: 'T001', title: 'Grade Midterm Papers', status: 'Pending', deadline: '2026-08-25' },
  { id: 'T002', title: 'Submit Course Plan', status: 'Completed', deadline: '2026-08-10' }
];

export const todayEvents = [
  { id: 'E001', title: 'Department Meeting', time: '4:00 PM', location: 'Meeting Room 1' }
];

// Aliases used by faculty pages
export const facultyResearch = researchPublications;
export const facultyLeave = leaveRecords.map(r => ({
  ...r,
  fromDate: r.from,
  toDate: r.to,
}));
export const facultyPayslips = payslips.map(p => ({
  month: p.month,
  basic: p.basic,
  allowances: p.hra + p.da + p.special,
  deductions: p.totalDeductions,
  net: p.netSalary,
}));


