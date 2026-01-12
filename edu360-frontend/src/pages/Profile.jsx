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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [role, token]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (role === 'STUDENT') await updateStudentProfile(token, profileData);
      else await updateTeacherProfile(token, profileData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading profile...</div>;
  if (!profileData) return <div className="text-center mt-20">No profile found</div>;

  const { activities, user, ...basicInfo } = profileData;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

        {message && (
          <p className="bg-green-100 text-green-700 p-3 rounded text-center mb-6">
            {message}
          </p>
        )}

        {/* BASIC INFO */}
        {!isEditing ? (
          <div className="space-y-4">
            {Object.entries(basicInfo).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="capitalize text-gray-600">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}

            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(basicInfo).map(([key, value]) => (
              <div key={key}>
                <label className="block mb-1 capitalize text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={['year', 'sem', 'cgpa'].includes(key) ? 'number' : 'text'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            ))}

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ACTIVITIES (PORTFOLIO) */}
        {role === 'STUDENT' && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Portfolio Activities</h3>

            {activities?.length === 0 && (
              <p className="text-gray-500">No activities added yet.</p>
            )}

            {activities?.map((activity) => (
              <div
                key={activity.id}
                className="border rounded-lg p-4 mb-4"
              >
                <p><strong>Title:</strong> {activity.title}</p>
                <p><strong>Type:</strong> {activity.type}</p>
                <p><strong>Provider:</strong> {activity.provider}</p>
                <p><strong>Status:</strong> {activity.status}</p>

                {activity.verifiedBy && (
                  <p>
                    <strong>Verified By:</strong> {activity.verifiedBy.fullName}
                  </p>
                )}

                <a
                  href={activity.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Certificate
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
