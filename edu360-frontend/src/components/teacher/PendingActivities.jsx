import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPendingActivities, approveActivity, rejectActivity } from '../../api/teacher';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const PendingActivities = ({ limit }) => {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchActivities = async () => {
    try {
      const data = await getPendingActivities(token);
      setActivities(limit ? data.slice(0, limit) : data);
    } catch (e) {
      setError('Failed to fetch activities.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [token, limit]);

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') {
        await approveActivity(token, id);
      } else {
        await rejectActivity(token, id);
      }
      fetchActivities();
    } catch (e) {
      setError(`Failed to ${action} activity.`);
      console.error(e);
    }
  };

  if (loading) return <div className="text-center mt-4 text-gray-500">Loading pending activities...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  const getStatus = (status) => {
    switch (status) {
      case 'APPROVED':
        return { text: 'Approved', color: 'text-green-600', icon: <CheckCircle className="inline mr-1" size={16} /> };
      case 'REJECTED':
        return { text: 'Rejected', color: 'text-red-600', icon: <XCircle className="inline mr-1" size={16} /> };
      default:
        return { text: 'Pending', color: 'text-yellow-600', icon: <Clock className="inline mr-1" size={16} /> };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {activities.length > 0 ? (
        activities.map((activity) => {
          const status = getStatus(activity.status);
          return (
            <div
              key={activity.id}
              className="p-6 bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{activity.title}</h3>
              <p className="text-gray-600 mb-1">Type: <span className="font-medium">{activity.type}</span></p>
              <p className="text-gray-600 mb-1">Student: <span className="font-medium">{activity.student.fullName}</span></p>
              <p className={`mb-2 font-medium ${status.color}`}>
                {status.icon} {status.text}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAction(activity.id, 'approve')}
                  className="flex-1 py-2 px-4 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(activity.id, 'reject')}
                  className="flex-1 py-2 px-4 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 col-span-full">No pending activities to review.</p>
      )}
    </div>
  );
};

export default PendingActivities;
