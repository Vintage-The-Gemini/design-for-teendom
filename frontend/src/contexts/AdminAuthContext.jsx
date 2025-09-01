// File: frontend/src/contexts/AdminAuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import adminApi from '../services/adminApi';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      const storedToken = localStorage.getItem('adminToken');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);

      // Test if token is valid by making a request
      try {
        const userData = await adminApi.getCurrentUser();
        if (userData?.data?.user || userData?.user) {
          const userInfo = userData.data?.user || userData.user;
          setUser(userInfo);
          console.log('✅ Admin authenticated:', userInfo);
        } else {
          throw new Error('Invalid user data');
        }
      } catch (authError) {
        console.warn('❌ Token invalid, removing:', authError);
        adminApi.removeToken();
        setToken(null);
        setUser(null);
      }

    } catch (error) {
      console.error('❌ Auth check failed:', error);
      setError(error.message);
      adminApi.removeToken();
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminApi.login(credentials);

      if (response?.token && response?.user) {
        setToken(response.token);
        setUser(response.user);
        return { success: true, user: response.user };
      } else {
        throw new Error('Invalid login response');
      }

    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await adminApi.logout();
      setToken(null);
      setUser(null);
      setError(null);
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!(token && user),
    login,
    logout,
    checkAuth,
    isAdmin: user?.role === 'admin',
    isEditor: user?.role === 'editor' || user?.role === 'admin',
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};