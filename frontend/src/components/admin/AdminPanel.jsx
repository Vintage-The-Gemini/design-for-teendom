// File: frontend/src/components/admin/AdminPanel.jsx
import React, { useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import NominationsManager from './nominations/NominationsManager';

// Placeholder components for other admin sections
const ArticlesManager = () => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-black mb-4">Articles Manager</h2>
    <p className="text-gray-600">Article management interface coming soon...</p>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-blue-900">Create Article</h3>
        <p className="text-blue-700 text-sm">Rich text editor with image upload</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-bold text-green-900">Manage Existing</h3>
        <p className="text-green-700 text-sm">Edit, delete, toggle featured status</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-bold text-purple-900">Analytics</h3>
        <p className="text-purple-700 text-sm">View performance metrics</p>
      </div>
    </div>
  </div>
);

const CategoriesManager = () => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-black mb-4">Categories Manager</h2>
    <p className="text-gray-600">Category management interface coming soon...</p>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-bold text-yellow-900">Create Categories</h3>
        <p className="text-yellow-700 text-sm">Add new categories with colors and icons</p>
      </div>
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-bold text-indigo-900">Manage Categories</h3>
        <p className="text-indigo-700 text-sm">Edit existing categories and settings</p>
      </div>
    </div>
  </div>
);

const SettingsManager = () => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-black mb-4">Settings</h2>
    <p className="text-gray-600">System settings and configuration...</p>
    <div className="mt-6 space-y-4">
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="font-bold text-red-900">System Maintenance</h3>
        <p className="text-red-700 text-sm">Database cleanup, cache management</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-900">User Management</h3>
        <p className="text-blue-700 text-sm">Manage admin users and permissions</p>
      </div>
    </div>
  </div>
);

// Main Admin Panel Content (wrapped by auth provider)
const AdminPanelContent = () => {
  const { user, loading, isAuthenticated } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated || !user) {
    return <AdminLogin />;
  }

  // Render section based on active selection
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'nominations':
        return <NominationsManager />;
      case 'articles':
        return <ArticlesManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <AdminDashboard />;
    }
  };

  // Authenticated - show admin interface
  return (
    <AdminLayout 
      user={user}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderActiveSection()}
    </AdminLayout>
  );
};

// Main Admin Panel component with auth provider wrapper
const AdminPanel = () => {
  return (
    <AdminAuthProvider>
      <AdminPanelContent />
    </AdminAuthProvider>
  );
};

export default AdminPanel;