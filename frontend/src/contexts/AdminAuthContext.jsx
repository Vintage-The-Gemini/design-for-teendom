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

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (adminApi.isAuthenticated()) {
          const response = await adminApi.getCurrentUser();
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        adminApi.removeToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await adminApi.login(email, password);
      
      if (response.data?.user) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      
      throw new Error('Login failed - no user data received');
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await adminApi.logout();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      adminApi.removeToken();
      setUser(null);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await adminApi.updateProfile(profileData);
      if (response.data?.user) {
        setUser(response.data.user);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await adminApi.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  // Check if user is admin
  const isAdmin = () => hasRole('admin');

  // Check if user can edit (admin or editor)
  const canEdit = () => hasRole(['admin', 'editor']);

  // Check if user is judge
  const isJudge = () => hasRole('judge');

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    changePassword,
    hasRole,
    isAdmin,
    canEdit,
    isJudge,
    isAuthenticated: !!user,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};