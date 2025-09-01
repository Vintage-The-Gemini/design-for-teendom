// File: frontend/src/contexts/AdminAuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://design-for-teendom-backend.onrender.com';

  // Make API request with proper headers
  const makeAuthRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const token = localStorage.getItem('adminToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log(`🌐 Auth Request: ${config.method || 'GET'} ${url}`);
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  };

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking authentication...');
      setLoading(true);
      setError(null);

      const storedToken = localStorage.getItem('adminToken');
      
      if (!storedToken) {
        console.log('❌ No token found in localStorage');
        setLoading(false);
        return;
      }

      console.log('🔑 Token found, verifying with backend...');
      setToken(storedToken);

      // Try to get current user with the stored token
      const response = await makeAuthRequest('/auth/me');
      
      if (response.status === 'success' && response.data?.user) {
        const userData = response.data.user;
        setUser(userData);
        console.log('✅ Admin authenticated:', userData);
      } else if (response.user) {
        // Alternative response format
        setUser(response.user);
        console.log('✅ Admin authenticated (alt format):', response.user);
      } else {
        throw new Error('Invalid user data in response');
      }

    } catch (error) {
      console.error('❌ Auth check failed:', error);
      
      // Clear invalid token
      localStorage.removeItem('adminToken');
      setToken(null);
      setUser(null);
      setError(null); // Don't show error for failed auth check
      
      console.log('🧹 Cleared invalid token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('🔐 Attempting admin login...');
      setLoading(true);
      setError(null);

      const response = await makeAuthRequest('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response?.token && response?.user) {
        localStorage.setItem('adminToken', response.token);
        setToken(response.token);
        setUser(response.user);
        console.log('✅ Login successful:', response.user);
        return { success: true, user: response.user };
      } else {
        throw new Error('Invalid login response format');
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
      console.log('📤 Logging out admin...');
      
      // Try to call logout endpoint
      try {
        await makeAuthRequest('/auth/logout', { method: 'POST' });
      } catch (logoutError) {
        console.warn('⚠️ Logout API call failed (continuing anyway):', logoutError);
      }
      
      // Clear local state regardless of API call result
      localStorage.removeItem('adminToken');
      setToken(null);
      setUser(null);
      setError(null);
      
      console.log('✅ Admin logged out successfully');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Logout error:', error);
      
      // Still clear local state even if API fails
      localStorage.removeItem('adminToken');
      setToken(null);
      setUser(null);
      
      return { success: false, error: error.message };
    }
  };

  // Check auth on component mount
  useEffect(() => {
    checkAuth();
  }, []);

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