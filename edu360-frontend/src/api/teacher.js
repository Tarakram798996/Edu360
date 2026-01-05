const API_URL = 'http://localhost:8080/teachers';

export const getTeacherProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch teacher profile.');
  return response.json();
};

export const isProfileFound = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) return true;
    if (response.status === 404) return false;

    throw new Error(`Error checking profile: ${response.status}`);
  } catch (error) {
    console.error("isProfileFound error:", error);
    return false;
  }
};

export const createTeacherProfile = async (token, profileData) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error('Failed to create teacher profile.');
  return response.json();
};

export const updateTeacherProfile = async (token, profileData) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error('Failed to update teacher profile.');
  return response.json();
};


export const getPendingActivities = async (token) => {
  const response = await fetch(`${API_URL}/activities/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pending activities.');
  }
  return response.json();
};

export const getVerifiedActivities = async (token) => {
  const response = await fetch(`${API_URL}/activities/verified`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch verified activities.');
  }
  return response.json();
};

export const approveActivity = async (token, activityId) => {
  const response = await fetch(`${API_URL}/activities/${activityId}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to approve activity.');
  }
  return response.json();
};

export const rejectActivity = async (token, activityId) => {
  const response = await fetch(`${API_URL}/activities/${activityId}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to reject activity.');
  }
  return response.json();
};