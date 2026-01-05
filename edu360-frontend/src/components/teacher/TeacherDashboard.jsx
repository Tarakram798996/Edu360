import { Link } from 'react-router-dom';
import PendingActivities from './PendingActivities';
import CreatePostForm from './CreatePostForm';
import { ClipboardList, CheckCircle, Edit3 } from 'lucide-react';

const TeacherDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Dashboard </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/teacher/pending"
          className="block p-6 bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList className="text-orange-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Pending Activities</h2>
          </div>
          <p className="text-gray-600">Review and validate student certificates and activities.</p>
        </Link>

        <Link
          to="/teacher/verified"
          className="block p-6 bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Verified Activities</h2>
          </div>
          <p className="text-gray-600">See the list of activities you have already approved.</p>
        </Link>

        <Link
          to="/posts/create"
          className="block p-6 bg-white/20 backdrop-blur-md border border-white/25 rounded-2xl shadow-lg hover:shadow-xl transition"
        >
          <div className="flex items-center gap-3 mb-2">
            <Edit3 className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Create Post</h2>
          </div>
          <p className="text-gray-600">Post an announcement or event for your students.</p>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Pending Activities</h2>
        <PendingActivities limit={3} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
