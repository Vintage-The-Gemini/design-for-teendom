// File: frontend/src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  Bell,
  Search,
  Trophy
} from 'lucide-react';

const AdminLayout = ({ children, currentView, setCurrentView }) => {
  const { user, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'articles', name: 'Articles', icon: FileText },
    { id: 'categories', name: 'Categories', icon: Tags },
    { id: 'awards', name: 'Awards', icon: Trophy },
    ...(user?.role === 'admin' ? [{ id: 'users', name: 'Users', icon: Users }] : []),
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const NavItem = ({ item }) => (
    <button
      onClick={() => {
        setCurrentView(item.id);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
        currentView === item.id
          ? 'bg-red-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <item.icon className="w-5 h-5" />
      <span className="font-semibold">{item.name}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - FIXED WIDTH AND POSITION */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 lg:relative lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span 
                className="text-xl font-black text-gray-900"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                Teendom
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-semibold text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                  userMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => setCurrentView('settings')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div>
                <h1 
                  className="text-2xl font-black text-gray-900"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {currentView === 'dashboard' && 'Dashboard'}
                  {currentView === 'articles' && 'Articles Manager'}
                  {currentView === 'categories' && 'Categories Manager'}
                  {currentView === 'awards' && 'Awards Manager'}
                  {currentView === 'users' && 'Users Manager'}
                  {currentView === 'settings' && 'Settings'}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Badge - Desktop Only */}
              <div className="hidden lg:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-semibold text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;