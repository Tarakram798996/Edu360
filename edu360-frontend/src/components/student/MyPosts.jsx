import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyPosts } from '../../api/posts';

const MyPosts = ({ limit }) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMyPosts(token);
        setPosts(limit ? data.slice(0, limit) : data);
      } catch (e) {
        setError('Failed to fetch posts.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token, limit]);

  if (loading)
    return <div className="text-center text-gray-600 mt-6">Loading posts...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-6">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
            <p className="text-gray-700 mt-2">{post.content}</p>
            <p className="text-sm text-gray-500 mt-4">
              Posted by <span className="font-medium">{post.createdBy?.email}</span> on{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No posts available.</p>
      )}
    </div>
  );
};

export default MyPosts;
