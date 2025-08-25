// File: frontend/src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import {
  Home,
  FileText,
  Award,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  TrendingUp,
  Folder,
  UserCheck
} from 'lucide-react';

const AdminLayout = ({ children, currentView, setCurrentView }) => {
  const { user, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      color: 'text-gray-600',
      hoverColor: 'hover:text-red-600'
    },
    {
      id: 'nominations',
      label: 'Nominations',
      icon: Award,
      color: 'text-gray-600',
      hoverColor: 'hover:text-red-600',
      badge: 'NEW'
    },
    {
      id: 'articles',
      label: 'Articles',
      icon: FileText,
      color: 'text-gray-600',
      hoverColor: 'hover:text-red-600'
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Folder,
      color: 'text-gray-600',
      hoverColor: 'hover:text-red-600'
    },
    {
      id: 'awards',
      label: 'Awards',
      icon: Calendar,
      color: 'text-gray-600',
      hoverColor: 'hover:text-red-600'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      color: 'text-gray-600',
      hoverColor: 'hover:text-red-600',
      adminOnly: true
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'text-gray-600',
      hoverColor: 'hover:text-red-600'
    }
  ];

  const handleMenuClick = (itemId) => {
    setCurrentView(itemId);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.id === currentView);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-red-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-black text-lg">T</span>
            </div>
            <div>
              <div className="text-lg font-black" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Teendom
              </div>
              <div className="text-xs text-red-100">Admin Panel</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-red-200 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'Admin User'}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email}
              </div>
              <div className="text-xs text-red-600 font-medium capitalize">
                {user?.role || 'admin'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            // Hide admin-only items for non-admin users
            if (item.adminOnly && user?.role !== 'admin') return null;

            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-red-600 text-white shadow-md' 
                    : `${item.color} ${item.hoverColor} hover:bg-red-50`
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && !isActive && (
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900 p-2 -ml-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-black text-gray-900" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  {getPageTitle()}
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Manage your {getPageTitle().toLowerCase()} here
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">0</div>
                  <div className="text-gray-500">Nominations</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">0</div>
                  <div className="text-gray-500">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">7</div>
                  <div className="text-gray-500">Categories</div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;