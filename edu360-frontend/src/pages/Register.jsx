import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerStudent, registerTeacher, registerAdmin } from '../api/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let responseMessage;
      if (role === 'STUDENT') {
        responseMessage = await registerStudent(email, password);
      } else if (role === 'TEACHER') {
        responseMessage = await registerTeacher(email, password);
      } else {
        responseMessage = await registerAdmin(email, password);
      }

      setMessage(responseMessage);
      if (responseMessage.includes('OTP sent')) {
        navigate('/verify-otp', { state: { email } });
      }
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Register</h2>

        {message && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded shadow-sm text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-blue-600 font-semibold shadow-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
