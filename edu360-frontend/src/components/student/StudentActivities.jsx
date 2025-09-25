import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentActivities } from '../../api/student';

const StudentActivities = ({ limit }) => {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getStudentActivities(token);
        setActivities(limit ? data.slice(0, limit) : data);
      } catch (e) {
        setError('Failed to fetch activities.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [token, limit]);

  if (loading)
    return <div className="text-center text-gray-600 mt-6">Loading activities...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-6">{error}</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-6">
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="relative bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-800">{activity.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {activity.type}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(activity.status)}`}>
                {activity.status}
              </span>
            </div>
            <p className="text-gray-700 mt-3">{activity.description}</p>
            <p className="text-gray-500 mt-2 text-sm">
              Date: {new Date(activity.activityDate).toLocaleDateString()}
            </p>
            {activity.verifiedBy && (
              <p className="text-gray-500 mt-1 text-sm">
                Verified by: {activity.verifiedBy.fullName}
              </p>
            )}
            {activity.fileUrl && (
              <a
                href={activity.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-600 font-medium hover:underline"
              >
                View Certificate
              </a>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 mt-6">You have not submitted any activities yet.</p>
      )}
    </div>
  );
};

export default StudentActivities;
