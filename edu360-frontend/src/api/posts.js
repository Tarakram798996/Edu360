const API_URL = 'http://13.233.230.205:8080/posts';

export const createPost = async (token, postData) => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return response.text();
};

export const getMyPosts = async (token) => {
  const response = await fetch(`${API_URL}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch posts.');
  }
  return response.json();
};