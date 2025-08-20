// File: frontend/src/components/admin/AdminPanel.jsx
import React, { useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';

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
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-bold text-red-900">Organize</h3>
        <p className="text-red-700 text-sm">Drag-and-drop reordering</p>
      </div>
    </div>
  </div>
);

const UsersManager = () => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-black mb-4">Users Manager</h2>
    <p className="text-gray-600">User management interface coming soon...</p>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-bold text-indigo-900">Create Users</h3>
        <p className="text-indigo-700 text-sm">Add admin, editor, judge roles</p>
      </div>
      <div className="bg-pink-50 p-4 rounded-lg">
        <h3 className="font-bold text-pink-900">Manage Access</h3>
        <p className="text-pink-700 text-sm">Control permissions and status</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-gray-900">Activity</h3>
        <p className="text-gray-700 text-sm">Monitor user activity logs</p>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-black mb-4">Settings</h2>
    <p className="text-gray-600">System settings and configuration...</p>
    <div className="mt-6 space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-gray-900">Profile Settings</h3>
        <p className="text-gray-700 text-sm">Update your profile information and password</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-gray-900">System Configuration</h3>
        <p className="text-gray-700 text-sm">Site settings and preferences</p>
      </div>
    </div>
  </div>
);

const AdminPanelContent = () => {
  const { user, loading } = useAdminAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'articles':
        return <ArticlesManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'users':
        return user.role === 'admin' ? <UsersManager /> : <div>Access Denied</div>;
      case 'settings':
        return <Settings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout currentView={currentView} setCurrentView={setCurrentView}>
      {renderContent()}
    </AdminLayout>
  );
};

const AdminPanel = () => {
  return (
    <AdminAuthProvider>
      <AdminPanelContent />
    </AdminAuthProvider>
  );
};

export default AdminPanel;