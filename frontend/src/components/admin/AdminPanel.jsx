// File: frontend/src/components/admin/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { AdminAuthProvider, useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import NominationsManager from './nominations/NominationsManager';
import ArticlesManager from './ArticlesManager'; // IMPORT THE REAL ARTICLES MANAGER

// Placeholder components for other admin sections
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
  
  // FIXED: Use URL pathname to persist active section across refreshes
  const [activeSection, setActiveSection] = useState(() => {
    const path = window.location.pathname;
    if (path.includes('/nominations')) return 'nominations';
    if (path.includes('/articles')) return 'articles';
    if (path.includes('/categories')) return 'categories';
    if (path.includes('/settings')) return 'settings';
    
    // Also check localStorage as fallback
    const saved = localStorage.getItem('adminActiveSection');
    return saved || 'dashboard';
  });

  // Update URL when section changes
  useEffect(() => {
    const newPath = activeSection === 'dashboard' ? 
      '/admin' : `/admin/${activeSection}`;
    
    // Update URL without page reload
    window.history.pushState(null, '', newPath);
    
    // Save to localStorage
    localStorage.setItem('adminActiveSection', activeSection);
  }, [activeSection]);

  const handleSectionChange = (section) => {
    console.log('🔄 Switching to section:', section);
    setActiveSection(section);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Helper function to render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'nominations':
        return <NominationsManager />;
      case 'articles':
        return <ArticlesManager />; // NOW USES THE REAL COMPONENT
      case 'categories':
        return <CategoriesManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        console.warn('⚠️ Unknown section:', activeSection, '- defaulting to dashboard');
        return <AdminDashboard />;
    }
  };

  // Authenticated - show admin interface
  return (
    <AdminLayout 
      user={user}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      <div className="space-y-6">
        {/* Debug info in development */}
        {import.meta.env.DEV && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>Debug:</strong> Active Section = {activeSection} | 
              Saved = {localStorage.getItem('adminActiveSection')}
            </p>
          </div>
        )}
        
        {renderActiveSection()}
      </div>
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