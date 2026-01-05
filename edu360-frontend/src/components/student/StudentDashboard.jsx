import { Link } from 'react-router-dom';
import MyPosts from './MyPosts';
import StudentActivities from './StudentActivities';

const StudentDashboard = () => {
  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center">Student Dashboard</h1>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/posts/my"
          className="p-6 bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <h2 className="text-xl font-bold text-blue-600">View Posts</h2>
          <p className="mt-2 text-gray-700">See all the latest news and announcements from teachers and admins.</p>
        </Link>
        <Link
          to="/student/activities"
          className="p-6 bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <h2 className="text-xl font-bold text-green-600">My Activities</h2>
          <p className="mt-2 text-gray-700">Track the status of your uploaded certificates and activities.</p>
        </Link>
        <Link
          to="/student/upload-activity"
          className="p-6 bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <h2 className="text-xl font-bold text-purple-600">Upload Certificate/Activity</h2>
          <p className="mt-2 text-gray-700">Submit new activities for validation and approval.</p>
        </Link>
      </div>

      {/* Recent Posts */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Posts</h2>
        <MyPosts limit={3} />
      </div>

      {/* Recent Activities */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Your Recent Activities</h2>
        <StudentActivities limit={3} />
      </div>
    </div>
  );
};

export default StudentDashboard;
