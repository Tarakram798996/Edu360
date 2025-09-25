import { Link } from 'react-router-dom';
import MyPosts from '../student/MyPosts';

const AdminDashboard = () => {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/post"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-purple-600">Create Global Post</h2>
          <p className="mt-2 text-gray-600">
            Post announcements visible to all students and teachers.
          </p>
        </Link>
      </div>

      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <MyPosts />
      </div>
    </div>
  );
};

export default AdminDashboard;
