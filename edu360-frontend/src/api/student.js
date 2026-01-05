const API_URL = 'http://localhost:8080/students';

export const getStudentProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch student profile.');
  }
  return response.json();
};

export const isProfileFound = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      return true;
    }

    if (response.status === 404) {
      return false;
    }

    throw new Error(`Error checking profile: ${response.status}`);
  } catch (error) {
    console.error("isProfileFound error:", error);
    return false;
  }
};


export const updateStudentProfile = async (token, profileData) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    throw new Error('Failed to update student profile.');
  }
  return response.json();
};

export const getStudentActivities = async (token) => {
  const response = await fetch(`${API_URL}/activities`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch student activities.');
  }
  return response.json();
};

export const uploadStudentActivity = async (token, activityData) => {
  const response = await fetch(`${API_URL}/activities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activityData),
  });
  if (!response.ok) {
    throw new Error('Failed to upload activity.');
  }
  return response.json();
};