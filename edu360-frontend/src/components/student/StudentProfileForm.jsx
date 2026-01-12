import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStudentProfile, updateStudentProfile } from '../../api/student';

const StudentProfileForm = () => {
  const { token, markProfileUpdated } = useAuth();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  // 🔹 Fetch existing profile (EDIT MODE)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getStudentProfile(token);
        if (data) {
          setFormData({
            fullName: data.fullName || '',
            regNo: data.regNo || '',
            year: data.year || '',
            sem: data.sem || '',
            cgpa: data.cgpa || '',
            dept: data.dept || '',
            sec: data.sec || '',
          });
          setIsEdit(true);
        }
      } catch (err) {
        // No profile exists → CREATE MODE
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateStudentProfile(token, {
        ...formData,
        year: Number(formData.year),
        sem: Number(formData.sem),
        cgpa: Number(formData.cgpa),
      });

      markProfileUpdated();
      navigate('/student/dashboard', { replace: true });
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 border">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isEdit ? 'Edit Student Portfolio' : 'Complete Student Profile'}
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          {/* Register Number */}
          <InputField
            label="Register Number"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
          />

          {/* Year */}
          <InputField
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
          />

          {/* Semester */}
          <InputField
            label="Semester"
            name="sem"
            type="number"
            value={formData.sem}
            onChange={handleChange}
          />

          {/* CGPA */}
          <InputField
            label="CGPA"
            name="cgpa"
            type="number"
            step="0.01"
            value={formData.cgpa}
            onChange={handleChange}
          />

          {/* Department */}
          <InputField
            label="Department"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
          />

          {/* Section */}
          <InputField
            label="Section"
            name="sec"
            value={formData.sec}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              {isEdit ? 'Update Portfolio' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfileForm;

/* ---------------- Reusable Input ---------------- */

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  step,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      step={step}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);
