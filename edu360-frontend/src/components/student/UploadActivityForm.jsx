import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadStudentActivity } from '../../api/student';

const activityTypes = ['CERTIFICATE', 'INTERNSHIP', 'WORKSHOP', 'COMPETITION', 'VOLUNTEERING', 'OTHERS'];

const UploadActivityForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    type: 'CERTIFICATE',
    title: '',
    description: '',
    activityDate: '',
    provider: '',
    fileUrl: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadStudentActivity(token, formData);
      setMessage('Activity submitted for validation!');
      setFormData({
        type: 'CERTIFICATE',
        title: '',
        description: '',
        activityDate: '',
        provider: '',
        fileUrl: '',
      });
    } catch (error) {
      setMessage('Failed to upload activity.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Upload Certificate / Activity</h2>
        {message && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center shadow-sm">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Activity Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            >
              {activityTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="activityDate"
              value={formData.activityDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Provider</label>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">File URL (Certificate Link)</label>
            <input
              type="text"
              name="fileUrl"
              value={formData.fileUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-blue-600 font-semibold shadow-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Submit for Validation
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadActivityForm;
