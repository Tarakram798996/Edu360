import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { isProfileFound as isStudentProfileFound } from '../../api/student';
import { isProfileFound as isTeacherProfileFound } from '../../api/teacher';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token, profileUpdated } = useAuth();
  const [profileComplete, setProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // current URL

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        let profileExists = false;

        if (user.role === 'STUDENT') {
          profileExists = await isStudentProfileFound(token);
        } else if (user.role === 'TEACHER') {
          profileExists = await isTeacherProfileFound(token);
        }

        setProfileComplete(profileExists);
      } catch (error) {
        setProfileComplete(false);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [user, token, profileUpdated]);

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // ✅ Fix: only redirect to profile-setup if not already there
  if ((user.role === 'STUDENT' || user.role === 'TEACHER') && !profileComplete && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
