import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getVerifiedActivities } from '../../api/teacher';
import { CheckCircle } from 'lucide-react';

const VerifiedActivities = () => {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getVerifiedActivities(token);
        setActivities(data);
      } catch (e) {
        setError('Failed to fetch verified activities.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [token]);

  if (loading) return <div className="text-center py-8">Loading verified activities...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
        <CheckCircle size={24} className="text-green-500" />
        Verified Activities
      </h2>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="p-5 bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                {activity.status}
              </span>
            </div>
            <p className="text-gray-600">Student: {activity.student.fullName}</p>
            <p className="text-gray-500 text-sm mt-1">Verified on: {new Date(activity.verifiedAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No activities have been verified by you yet.</p>
      )}
    </div>
  );
};

export default VerifiedActivities;
