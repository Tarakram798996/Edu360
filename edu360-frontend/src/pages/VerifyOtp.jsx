import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../api/auth';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Email not found. Please go back to register.');
      return;
    }
    try {
      const responseMessage = await verifyOtp(email, otp);
      setMessage(responseMessage);
      if (responseMessage.includes('registered successfully')) {
        navigate('/login');
      }
    } catch (error) {
      setMessage('OTP verification failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>
        <p className="text-center mb-6 text-gray-700">An OTP has been sent to your email.</p>

        {message && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded shadow-sm text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-green-600 font-semibold shadow-lg hover:bg-green-500 hover:text-white transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
