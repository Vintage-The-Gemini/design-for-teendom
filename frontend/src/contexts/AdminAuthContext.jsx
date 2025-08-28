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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!adminApi.isAuthenticated()) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await adminApi.verifyToken();
      if (response.status === 'success' && response.user) {
        setUser(response.user);
        console.log('✅ Admin authenticated:', response.user.email);
      } else {
        setUser(null);
        adminApi.removeToken();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      adminApi.removeToken();
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔐 Attempting admin login...');
      
      const response = await adminApi.login(credentials);
      
      if (response.status === 'success' && response.user) {
        setUser(response.user);
        console.log('✅ Admin login successful:', response.user.email);
        return { success: true, user: response.user };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Admin login failed:', error);
      setError(error.message);
      setUser(null);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await adminApi.logout();
      setUser(null);
      setError(null);
      console.log('✅ Admin logged out');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      setUser(null);
      adminApi.removeToken();
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};