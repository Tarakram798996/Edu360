import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/30">
        
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Login
        </h2>

        {message && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded shadow-sm text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-blue-600 font-semibold shadow-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
