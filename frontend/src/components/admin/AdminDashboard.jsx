// File: frontend/src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import adminApi from '../../services/adminApi';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Eye, 
  Star, 
  TrendingUp,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch article statistics
      const statsResponse = await adminApi.getArticleStats();
      setStats(statsResponse.data);

      // Fetch recent articles
      const articlesResponse = await adminApi.getArticles({ 
        limit: 5, 
        sortBy: 'createdAt', 
        sortOrder: 'desc' 
      });
      setRecentArticles(articlesResponse.data.articles || []);

    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="font-bold text-red-900">Error Loading Dashboard</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 
              className="text-3xl font-black mb-2"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              {getGreeting()}, {user?.name}! 👋
            </h1>
            <p className="text-white/90 text-lg font-medium">
              Welcome back to the Teendom Admin Panel
            </p>
            <div className="flex items-center space-x-4 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Role: {user?.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Last login: {user?.lastLogin ? formatDate(user.lastLogin) : 'First time'}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-white/20">
              {new Date().getDate()}
            </div>
            <div className="text-white/80 font-semibold">
              {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Total Articles</p>
                <p className="text-3xl font-black text-gray-900">{stats.stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">All content</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Published</p>
                <p className="text-3xl font-black text-green-600">{stats.stats.published}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">
                {stats.stats.total > 0 ? Math.round((stats.stats.published / stats.stats.total) * 100) : 0}% of total
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Featured</p>
                <p className="text-3xl font-black text-yellow-600">{stats.stats.featured}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">Highlighted content</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-semibold">Drafts</p>
                <p className="text-3xl font-black text-orange-600">{stats.stats.drafts}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">Unpublished content</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 
              className="text-xl font-black text-gray-900"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              Recent Articles
            </h2>
          </div>
          <div className="p-6">
            {recentArticles.length > 0 ? (
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="bg-gray-200 px-2 py-1 rounded text-xs font-medium">
                          {article.category}
                        </span>
                        <span>{formatDate(article.createdAt)}</span>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views || 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {article.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      <div className={`w-3 h-3 rounded-full ${
                        article.published ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No recent articles found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Category Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 
                className="text-xl font-black text-gray-900"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                Quick Actions
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-bold text-left flex items-center space-x-3 transition-colors">
                <FileText className="w-5 h-5" />
                <span>Create New Article</span>
              </button>
              
              {user?.role === 'admin' && (
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-left flex items-center space-x-3 transition-colors">
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </button>
              )}
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-bold text-left flex items-center space-x-3 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>View Analytics</span>
              </button>
            </div>
          </div>

          {/* Category Statistics */}
          {stats?.categoryStats && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 
                  className="text-xl font-black text-gray-900"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  Categories
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {stats.categoryStats.slice(0, 5).map((category, index) => (
                    <div key={category._id} className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{category._id}</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 rounded-full h-2 w-20">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{
                              width: `${Math.min((category.count / Math.max(...stats.categoryStats.map(c => c.count))) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 w-8 text-right">
                          {category.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 
                className="text-xl font-black text-gray-900"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                System Status
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Backend API</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">File Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;