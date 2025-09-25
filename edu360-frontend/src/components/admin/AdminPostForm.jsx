import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPost } from '../../api/posts';

const AdminPostForm = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, content, global: true }; // mark post as global
      await createPost(token, postData);
      setMessage('✅ Post published successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to create post. Only admins can post globally.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 p-6">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Create Global Announcement 🌐
        </h2>

        {message && (
          <p
            className={`p-3 mb-5 rounded text-center shadow-sm ${
              message.includes('✅')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter a clear title"
              className="w-full px-4 py-3 rounded-lg bg-white/60 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              required
              placeholder="Write the announcement details..."
              className="w-full px-4 py-3 rounded-lg bg-white/60 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Publish Global Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPostForm;
