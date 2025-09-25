import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getStudentProfile, updateStudentProfile } from '../api/student.js';
import { getTeacherProfile, updateTeacherProfile } from '../api/teacher.js';

const Profile = ({ role }) => {
  const { token } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let data;
        if (role === 'STUDENT') data = await getStudentProfile(token);
        else if (role === 'TEACHER') data = await getTeacherProfile(token);
        setProfileData(data);
      } catch (error) {
        setMessage('Failed to fetch profile.');
        console.error('Fetch profile error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [role, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (role === 'STUDENT') await updateStudentProfile(token, profileData);
      else if (role === 'TEACHER') await updateTeacherProfile(token, profileData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update profile.');
      console.error('Update profile error:', error);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  if (loading)
    return <div className="text-center text-gray-600 mt-20">Loading profile...</div>;
  if (!profileData)
    return (
      <div className="text-center text-red-500 mt-20">
        No profile data found. Please complete your profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">My Profile</h2>

        {message && (
          <p className="bg-green-100 text-green-700 p-3 mb-6 rounded-md text-center font-medium">
            {message}
          </p>
        )}

        {!isEditing ? (
          <div className="space-y-6">
            {Object.entries(profileData)
              .filter(([key]) => key !== 'user')
              .map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <p className="text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                  <p className="text-gray-800 font-semibold">{value}</p>
                </div>
              ))}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-5">
            {Object.entries(profileData)
              .filter(([key]) => key !== 'user')
              .map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={['cgpa', 'year', 'sem'].includes(key) ? 'number' : 'text'}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  />
                </div>
              ))}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
