import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createTeacherProfile, updateTeacherProfile, isProfileFound } from '../../api/teacher';
import { User } from 'lucide-react';

const TeacherProfileForm = () => {
    const { token, markProfileUpdated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dept: '',
    sec: '',
    year: '',
  });
  const [message, setMessage] = useState('');
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      const exists = await isProfileFound(token);
      setProfileExists(exists);
    };
    checkProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profileExists) {
        await updateTeacherProfile(token, formData);
        setMessage('Profile updated successfully!');
      } else {
        await createTeacherProfile(token, formData);
        setMessage('Profile created successfully!');
      }
      markProfileUpdated();
      navigate('/teacher/dashboard');
    } catch (error) {
      setMessage('Failed to save profile. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 rounded-2xl shadow-lg bg-white/20 backdrop-blur-md border border-white/25">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <User size={24} /> Complete Your Teacher Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Department</label>
          <input
            type="text"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Section</label>
          <input
            type="text"
            name="sec"
            value={formData.sec}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Save Profile
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default TeacherProfileForm;
