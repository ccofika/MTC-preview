import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setAdminUser(null);
        setIsLoading(false);
        return;
      }

      // Verify token with backend
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsAuthenticated(true);
          setAdminUser(data.data);
        } else {
          throw new Error('Invalid token');
        }
      } else {
        throw new Error('Token verification failed');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // Clear invalid token
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setIsAuthenticated(false);
      setAdminUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { token, user } = data.data;
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        setIsAuthenticated(true);
        setAdminUser(user);
        
        return { success: true, user };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Neispravni podaci za prijavu. Molimo proverite korisničko ime i lozinku.');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  return {
    isAuthenticated,
    isLoading,
    adminUser,
    login,
    logout,
    checkAuthStatus
  };
};

export default useAuth;