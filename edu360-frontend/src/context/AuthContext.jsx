import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { isProfileFound } from '../api/student';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const markProfileUpdated = () => setProfileUpdated((prev) => !prev);
  
  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (e) {
        console.error('Failed to decode token:', e);
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isProfileComplete = async (jwtToken) => {
  return await isProfileFound(jwtToken);
  };

  const value = {
    token,
    user,
    login,
    logout,
    isProfileComplete,
    markProfileUpdated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};