import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import StudentDashboard from './components/student/StudentDashboard';
import AdminPostForm from './components/admin/AdminPostForm';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentProfileForm from './components/student/StudentProfileForm';
import TeacherProfileForm from './components/teacher/TeacherProfileForm';
import StudentActivities from './components/student/StudentActivities';
import PendingActivities from './components/teacher/PendingActivities';
import CreatePostForm from './components/teacher/CreatePostForm';
import Navbar from './components/common/Navbar';
import Profile from './pages/Profile';
import MyPosts from './components/student/MyPosts';
import VerifiedActivities from './components/teacher/VerifiedActivities';
import UploadActivityForm from './components/student/UploadActivityForm';

// NEW: A component to handle the redirection logic after login
const DashboardRedirect = () => {
  const { user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return '/login'; // Fallback
    switch (user.role) {
      case 'STUDENT':
        return '/student/dashboard';
      case 'TEACHER':
        return '/teacher/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  // Here's the key: You need a way to check if the profile exists.
  // We'll add this check inside the ProtectedRoute component for robustness.
  return <Navigate to={getDashboardPath()} replace />;
};

function App() {
  const { user } = useAuth(); // No need for isProfileComplete here anymore

  return (
    <>
      <Navbar />
      <div className="p-4 container mx-auto mt-16">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* New entry point for authenticated users */}
          <Route path="/" element={<DashboardRedirect />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile-setup" element={
              user?.role === 'STUDENT' ? <StudentProfileForm /> : <TeacherProfileForm />
            } />

            <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<Profile role="STUDENT" />} />
              <Route path="/student/activities" element={<StudentActivities />} />
              <Route path="/student/upload-activity" element={<UploadActivityForm />} />
              <Route path="/posts/my" element={<MyPosts />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/profile" element={<Profile role="TEACHER" />} />
              <Route path="/teacher/pending" element={<PendingActivities />} />
              <Route path="/teacher/verified" element={<VerifiedActivities />} />
              <Route path="/posts/create" element={<CreatePostForm />} />
              
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/post" element={<CreatePostForm />} />
              <Route path="/admin/post" element={<AdminPostForm />} />
            </Route>
          </Route>

          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </div>
    </>
  );
}

export default App;