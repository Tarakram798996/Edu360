import { Link } from 'react-router-dom';
import MyPosts from '../student/MyPosts';

const AdminDashboard = () => {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard </h1>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Create Global Post */}
        <Link
          to="/admin/post"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-purple-600">
            Create Global Post
          </h2>
          <p className="mt-2 text-gray-600">
            Announcements visible to all students and teachers.
          </p>
        </Link>

        {/* Add Teacher */}
        <Link
          to="/admin/add-teacher"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-green-600">
            Add Teacher
          </h2>
          <p className="mt-2 text-gray-600">
            Register a new teacher account.
          </p>
        </Link>

        {/* Remove Student / Teacher */}
        <Link
          to="/admin/remove-user"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-red-600">
            Remove Student / Teacher
          </h2>
          <p className="mt-2 text-gray-600">
            Delete student or teacher accounts.
          </p>
        </Link>

      </div>

      {/* Posts */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <MyPosts />
      </div>
    </div>
  );
};

export default AdminDashboard;
