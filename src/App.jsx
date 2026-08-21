import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import DashboardLayout from './components/Layout/DashboardLayout';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentTimetable from './pages/student/Timetable';
import StudentAttendance from './pages/student/Attendance';
import StudentAcademics from './pages/student/Academics';
import StudentAssignments from './pages/student/Assignments';
import StudentFees from './pages/student/Fees';
import StudentHostel from './pages/student/Hostel';
import StudentPlacement from './pages/student/Placement';
import StudentServices from './pages/student/Services';
import StudentCampusMap from './pages/student/CampusMap';
import StudentEmergency from './pages/student/Emergency';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyClasses from './pages/faculty/Classes';
import FacultyAttendanceUpload from './pages/faculty/AttendanceUpload';
import FacultyMarksUpload from './pages/faculty/MarksUpload';
import FacultyTimetable from './pages/faculty/Timetable';
import FacultyStudentIssues from './pages/faculty/StudentIssues';
import FacultyResearch from './pages/faculty/Research';
import FacultyLeaveManagement from './pages/faculty/LeaveManagement';
import FacultyPayslips from './pages/faculty/Payslips';

// Parent Pages
import ParentDashboard from './pages/parent/Dashboard';
import ParentAttendance from './pages/parent/Attendance';
import ParentAcademics from './pages/parent/Academics';
import ParentFees from './pages/parent/Fees';
import ParentHostel from './pages/parent/Hostel';
import ParentMessages from './pages/parent/Messages';
import ParentBusTracking from './pages/parent/BusTracking';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return children;
};

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={`/${user?.role}/dashboard`} replace />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Student Portal Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="timetable" element={<StudentTimetable />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="academics" element={<StudentAcademics />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="hostel" element={<StudentHostel />} />
        <Route path="placement" element={<StudentPlacement />} />
        <Route path="services" element={<StudentServices />} />
        <Route path="campus-map" element={<StudentCampusMap />} />
        <Route path="emergency" element={<StudentEmergency />} />
      </Route>

      {/* Faculty Portal Routes */}
      <Route path="/faculty" element={
        <ProtectedRoute allowedRoles={['faculty']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="classes" element={<FacultyClasses />} />
        <Route path="attendance-upload" element={<FacultyAttendanceUpload />} />
        <Route path="marks-upload" element={<FacultyMarksUpload />} />
        <Route path="timetable" element={<FacultyTimetable />} />
        <Route path="student-issues" element={<FacultyStudentIssues />} />
        <Route path="research" element={<FacultyResearch />} />
        <Route path="leave" element={<FacultyLeaveManagement />} />
        <Route path="payslips" element={<FacultyPayslips />} />
      </Route>

      {/* Parent Portal Routes */}
      <Route path="/parent" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="attendance" element={<ParentAttendance />} />
        <Route path="academics" element={<ParentAcademics />} />
        <Route path="fees" element={<ParentFees />} />
        <Route path="hostel" element={<ParentHostel />} />
        <Route path="messages" element={<ParentMessages />} />
        <Route path="bus-tracking" element={<ParentBusTracking />} />
      </Route>

      {/* Guest Portal Routes - Placeholders */}
      <Route path="/guest" element={
        <ProtectedRoute allowedRoles={['guest']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<div>Guest Dashboard (Coming Soon)</div>} />
        {/* We will build these next */}
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
