// File: frontend/src/components/admin/NominationsStatsHeader.jsx
import { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

const NominationsStatsHeader = ({ refreshTrigger = 0 }) => {
  const [stats, setStats] = useState({
    overview: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0
    },
    recent: [],
    categoryBreakdown: [],
    loading: true
  });
  const [error, setError] = useState(null);

  // Fetch stats from API
  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));
      setError(null);

      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/nominations/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setStats({
          ...data.data,
          loading: false
        });
      } else {
        throw new Error(data.message || 'Failed to fetch stats');
      }
    } catch (err) {
      console.error('Error fetching nomination stats:', err);
      setError(err.message);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  // Fetch stats on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  // Format date helper
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Stat Card Component
  const StatCard = ({ icon: Icon, title, value, description, color, trend }) => (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 sm:p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color.replace('border-l-', 'text-').replace('-500', '-600')}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.loading ? '...' : value}</p>
          </div>
        </div>
        {trend && (
          <div className="hidden sm:flex items-center space-x-1 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">{trend}</span>
          </div>
        )}
      </div>
      {description && (
        <p className="text-xs sm:text-sm text-gray-500 mt-2 truncate">{description}</p>
      )}
    </div>
  );

  // Quick Action Button Component
  const QuickActionButton = ({ icon: Icon, label, onClick, color = "brand-red" }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm space-x-2 text-sm sm:text-base`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-red-800">Unable to Load Statistics</h3>
        </div>
        <p className="text-red-700 mt-1">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nominations Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Review and manage Teendom Awards 2025 nominations
          </p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
          <QuickActionButton
            icon={FileText}
            label="Export Data"
            onClick={() => window.open('/api/admin/nominations/export', '_blank')}
          />
          <QuickActionButton
            icon={Users}
            label="Bulk Actions"
            onClick={() => console.log('Open bulk actions')}
            color="green"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          icon={Users}
          title="Total Nominations"
          value={stats.overview.total}
          description="All submitted nominations"
          color="border-l-red-600"
          trend={stats.overview.total > 0 ? "+2.3% this week" : null}
        />
        
        <StatCard
          icon={Clock}
          title="Pending Review"
          value={stats.overview.pending}
          description="Awaiting admin review"
          color="border-l-yellow-600"
        />
        
        <StatCard
          icon={CheckCircle}
          title="Approved"
          value={stats.overview.approved}
          description="Ready for judging"
          color="border-l-green-600"
        />
        
        <StatCard
          icon={XCircle}
          title="Rejected"
          value={stats.overview.rejected}
          description="Not eligible/incomplete"
          color="border-l-red-600"
        />
      </div>

      {/* Recent Activity & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Recent Nominations */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-red-600" />
            Recent Submissions
          </h3>
          
          {stats.loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : stats.recent.length > 0 ? (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {stats.recent.map((nomination, index) => (
                <div key={nomination._id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {nomination.awardCategory} • {nomination.submissionId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(nomination.submittedAt || nomination.createdAt)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    nomination.adminReview?.status === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : nomination.adminReview?.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {nomination.adminReview?.status || 'pending'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No recent nominations</p>
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-red-600" />
            Nominations by Category
          </h3>
          
          {stats.loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
              ))}
            </div>
          ) : stats.categoryBreakdown.length > 0 ? (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {stats.categoryBreakdown.map((category, index) => (
                <div key={category._id || index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {category._id || 'Uncategorized'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{category.count}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((category.count / Math.max(...stats.categoryBreakdown.map(c => c.count), 1)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No category data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NominationsStatsHeader;