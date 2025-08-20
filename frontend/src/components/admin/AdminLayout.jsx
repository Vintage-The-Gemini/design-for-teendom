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
  Search
} from 'lucide-react';

const AdminLayout = ({ children, currentView, setCurrentView }) => {
  const { user, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'articles', name: 'Articles', icon: FileText },
    { id: 'categories', name: 'Categories', icon: Tags },
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
        <div className="flex flex-col h-full w-64">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">T</span>
              </div>
              <div>
                <h1 
                  className="text-xl font-black text-gray-900"
                  style={{fontFamily: 'Playfair Display, serif'}}
                >
                  Teendom
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navigation.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>

          {/* User Info */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-red-600">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - FLEX GROW TO FILL REMAINING SPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Page Title */}
              <div>
                <h1 
                  className="text-2xl font-black text-gray-900 capitalize"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {currentView}
                </h1>
                <p className="text-sm text-gray-500">
                  {currentView === 'dashboard' && 'Overview and statistics'}
                  {currentView === 'articles' && 'Manage your content'}
                  {currentView === 'categories' && 'Organize your content'}
                  {currentView === 'users' && 'Manage team members'}
                  {currentView === 'settings' && 'System configuration'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-red-600 text-sm">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentView('settings');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - SCROLLABLE */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;