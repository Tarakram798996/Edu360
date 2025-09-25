import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { updateStudentProfile } from '../../api/student';

const StudentProfileForm = () => {
  const { token, user, markProfileUpdated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    regNo: '',
    year: '',
    sem: '',
    cgpa: '',
    dept: '',
    sec: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudentProfile(token, formData);
      markProfileUpdated();
      navigate('/student/dashboard',{ replace: true });
    } catch (error) {
      setMessage('Failed to create profile. Please try again.');
    }
  };

  return (
    <div className="pt-0"> 
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-10 border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Complete Your Student Profile
        </h2>

        {message && (
          <p className="bg-red-100 text-red-700 p-3 mb-6 rounded-md text-center font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={['year', 'sem', 'cgpa'].includes(key) ? 'number' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default StudentProfileForm;
