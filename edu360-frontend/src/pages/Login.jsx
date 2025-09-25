import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login: authLogin, isProfileComplete } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      authLogin(token);
      const user = jwtDecode(token);

      if (user.role === 'STUDENT' || user.role === 'TEACHER') {
        const complete = await isProfileComplete(token);
        if (!complete) {
          navigate('/profile-setup');
          return;
        }
      }

      switch (user.role) {
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
        case 'TEACHER':
          navigate('/teacher/dashboard');
          break;
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setMessage('Login failed. Check your email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-2xl"></div>

      {/* Login card */}
      <div className="relative bg-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/30">
        <div className="flex flex-col items-center mb-8">
          
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md">Login</h2>
          <p className="text-white/80 mt-2 text-center">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {message && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded shadow-sm text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Go to Register */}
        <p className="mt-6 text-center text-white/90">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-yellow-300 font-semibold hover:underline hover:text-yellow-200 transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
