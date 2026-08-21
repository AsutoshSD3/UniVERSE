// Mock data for Parent portal — linked to student STU001 (Arjun Mehta)
import { studentAttendance, studentMarks, feeDetails, hostelInfo } from './mockStudentData';

export const wardInfo = {
  name: 'Arjun Mehta',
  enrollmentNo: 'CSE/2023/1042',
  department: 'Computer Science & Engineering',
  semester: 5,
  section: 'A',
  hostelBlock: 'Block A - Room 304',
  bloodGroup: 'B+',
};

// Re-export student data as ward data
export const wardAttendance = studentAttendance;
export const wardMarks = studentMarks;
export const wardFees = feeDetails;
export const wardHostel = hostelInfo;

export const parentMessages = [
  { id: 'MSG001', from: 'Dr. Priya Sharma', role: 'Associate Professor - CSE', subject: 'Attendance Improvement Needed', message: 'Dear Mr. Mehta, Arjun\'s attendance in Computer Networks (CS304) is currently at 68.4%. Please encourage him to attend regularly to maintain the 75% minimum requirement.', date: '2026-08-20', read: false, replies: [] },
  { id: 'MSG002', from: 'Mr. Suresh Kumar', role: 'Hostel Warden - Block A', subject: 'Weekend Out-Pass Approved', message: 'Arjun\'s out-pass for the Independence Day weekend has been approved. Please ensure he returns by Sunday evening.', date: '2026-08-14', read: true, replies: [{ from: 'You', message: 'Thank you for the confirmation. He will return by 6 PM on Sunday.', date: '2026-08-14' }] },
  { id: 'MSG003', from: 'Prof. Anil Gupta', role: 'Professor - CSE', subject: 'DBMS Project Team Update', message: 'Arjun has been selected as team lead for the DBMS mini-project. The project involves designing a complete hospital management database.', date: '2026-08-12', read: true, replies: [] },
  { id: 'MSG004', from: 'Placement Cell', role: 'Training & Placement Office', subject: 'Placement Season Update', message: 'Arjun is eligible for the upcoming Infosys and TCS placement drives. Please ensure all documents are updated in the portal.', date: '2026-08-10', read: true, replies: [] },
];

export const busTracking = {
  routeNo: 'R-12',
  routeName: 'Sector 62 → University Campus',
  busNo: 'UP-80-BT-4521',
  driver: 'Ram Prasad',
  driverPhone: '+91 99887 65432',
  stops: [
    { name: 'Sector 62 Terminal', time: '7:30 AM', status: 'departed' },
    { name: 'Sector 63 Market', time: '7:40 AM', status: 'departed' },
    { name: 'City Mall Junction', time: '7:55 AM', status: 'departed' },
    { name: 'Highway Toll Gate', time: '8:10 AM', status: 'current' },
    { name: 'University Main Gate', time: '8:25 AM', status: 'upcoming' },
    { name: 'Academic Block Stop', time: '8:30 AM', status: 'upcoming' },
  ],
  eta: '8:25 AM',
  currentLocation: 'Highway Toll Gate',
  lastUpdate: new Date().toLocaleTimeString(),
};

export const paymentReminders = [
  { id: 1, title: 'Lab & Library Fee Due', amount: 8000, dueDate: '2026-09-01', status: 'upcoming' },
  { id: 2, title: 'Exam Fee Due', amount: 5000, dueDate: '2026-09-15', status: 'upcoming' },
  { id: 3, title: 'Transport Fee Due', amount: 12000, dueDate: '2026-09-20', status: 'upcoming' },
];

// Aliases used by parent pages
export const parentWard = wardInfo;
export const busLocation = busTracking;
export { feeDetails };


