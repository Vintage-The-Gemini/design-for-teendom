// File: frontend/src/components/admin/AdminPanel.jsx
import React, { useState } from 'react';
import { AdminAuthProvider, useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';

// Simple inline AwardsManager component for now
const AwardsManager = () => {
  console.log('🏆 AwardsManager component is rendering!');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              🏆 Teendom Awards 2025
            </h1>
            <p className="text-red-100">Recognizing and celebrating outstanding teenagers</p>
            <div className="mt-2 text-red-200 text-sm">
              ✅ Awards Manager is working correctly!
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-red-200 text-sm">Nominations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10</div>
              <div className="text-red-200 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-red-200 text-sm">Judges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Nominations</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Award Categories</p>
              <p className="text-2xl font-bold">10</p>
            </div>
            <svg className="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Active Judges</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Votes</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <svg className="w-8 h-8 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Awards Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Awards Timeline 2025</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Pre-Awards', period: 'Aug - Sep 4', status: 'completed' },
            { name: 'Nominations', period: 'Sep 5 - 30', status: 'active' },
            { name: 'Judging', period: 'Oct 5 - Nov 5', status: 'upcoming' },
            { name: 'Voting', period: 'Nov 8 - 24', status: 'upcoming' },
            { name: 'Ceremony', period: 'Dec 6', status: 'upcoming' },
            { name: 'Legacy', period: 'Dec 7 - 2026', status: 'upcoming' }
          ].map((phase, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                  phase.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {phase.status === 'completed' ? '✓' : phase.status === 'active' ? '⏳' : '📅'}
                  <span className="ml-1 capitalize">{phase.status}</span>
                </span>
              </div>
              <p className="text-sm text-gray-600">{phase.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Award Categories */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Award Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Advocate for Change',
            'Sports Excellence', 
            'Academic Excellence',
            'Arts & Creativity',
            'Leadership Excellence',
            'Community Service',
            'Innovation & Technology',
            'Environmental Champion',
            'Entrepreneurship',
            'Cultural Ambassador'
          ].map((category, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{category}</h4>
                  <p className="text-sm text-gray-600">0 nominations</p>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
            📝 Create Award Category
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            👥 Manage Judges
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
            📊 View Nominations
          </button>
        </div>
      </div>
    </div>
  );
};

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
      case 'awards':
        return <AwardsManager />;
      case 'users':
        return user.role === 'admin' ? <UsersManager /> : <div className="bg-white rounded-xl shadow-lg p-8 text-center"><h2 className="text-xl font-bold text-red-600">Access Denied</h2><p className="text-gray-600 mt-2">You need admin privileges to access this section.</p></div>;
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
