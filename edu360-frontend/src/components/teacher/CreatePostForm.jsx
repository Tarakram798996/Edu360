import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPost } from '../../api/posts';

const CreatePostForm = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { title, content };
      const response = await createPost(token, postData);
      setMessage(response);
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage('Failed to create post. Only teachers and admins can post.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a New Post</h2>
        {message && (
          <p className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center shadow-sm">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-blue-600 font-semibold shadow-lg hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
