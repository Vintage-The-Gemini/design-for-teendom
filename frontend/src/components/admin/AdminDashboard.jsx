// File: frontend/src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, Award, TrendingUp, Eye, Calendar, 
  CheckCircle, Clock, AlertTriangle, BarChart3 
} from 'lucide-react';
import adminApi from '../../services/adminApi';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    nominations: { total: 0, pending: 0, approved: 0, rejected: 0 },
    articles: { total: 0, published: 0, draft: 0, views: 0 },
    categories: { total: 0 },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch nominations stats
      let nominationStats = { total: 0, pending: 0, approved: 0, rejected: 0 };
      try {
        const nominationsResponse = await adminApi.getNominationStats();
        if (nominationsResponse.status === 'success') {
          nominationStats = nominationsResponse.data;
        }
      } catch (error) {
        console.warn('Failed to fetch nomination stats:', error);
      }

      // Try to fetch articles stats (may not exist)
      let articleStats = { total: 0, published: 0, draft: 0, views: 0 };
      try {
        const articlesResponse = await adminApi.getArticles({ limit: 1 });
        if (articlesResponse.status === 'success') {
          articleStats.total = articlesResponse.totalCount || 0;
        }
      } catch (error) {
        console.warn('Articles stats not available:', error);
      }

      // Try to fetch categories
      let categoriesStats = { total: 0 };
      try {
        const categoriesResponse = await adminApi.getCategories();
        if (categoriesResponse.status === 'success') {
          categoriesStats.total = categoriesResponse.results || 0;
        }
      } catch (error) {
        console.warn('Categories stats not available:', error);
      }

      setDashboardData({
        nominations: nominationStats,
        articles: articleStats,
        categories: categoriesStats,
        recentActivity: []
      });

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Nominations',
      value: dashboardData.nominations.total,
      icon: <Users className="w-8 h-8" />,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Pending Review',
      value: dashboardData.nominations.pending,
      icon: <Clock className="w-8 h-8" />,
      color: 'yellow',
      change: '+5%'
    },
    {
      title: 'Approved',
      value: dashboardData.nominations.approved,
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'Articles',
      value: dashboardData.articles.total,
      icon: <FileText className="w-8 h-8" />,
      color: 'purple',
      change: '+3%'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">Error loading dashboard: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to the Teendom Admin Panel</p>
        </div>
        
        <button
          onClick={fetchDashboardData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm text-${stat.color}-600 mt-2`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Review Nominations</p>
                  <p className="text-sm text-blue-700">{dashboardData.nominations.pending} pending review</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">Create Article</p>
                  <p className="text-sm text-green-700">Write a new blog post</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-purple-900">Manage Categories</p>
                  <p className="text-sm text-purple-700">Add or edit categories</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-green-900">Database</span>
              </div>
              <span className="text-green-600 text-sm">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-green-900">File Storage</span>
              </div>
              <span className="text-green-600 text-sm">Available</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="font-medium text-yellow-900">Image CDN</span>
              </div>
              <span className="text-yellow-600 text-sm">Testing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No recent activity to display</p>
          <p className="text-sm mt-1">Activity will appear here as users interact with the system</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;