// File: frontend/src/components/admin/nominations/NominationsManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, RefreshCw, Download, Trash2, Users, 
  Award, Clock, CheckCircle, XCircle, AlertTriangle,
  Eye, Settings, BarChart, Image as ImageIcon
} from 'lucide-react';
import NominationsTable from './NominationsTable';
import NominationDetailModal from './NominationDetailModal';
import adminApi from '../../../services/adminApi';

const NominationsManager = () => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [stats, setStats] = useState({});
  const [imageTestResults, setImageTestResults] = useState({});

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    adminStatus: 'all',
    category: 'all',
    sortBy: 'submittedAt',
    sortOrder: 'desc',
    page: 1
  });

  // Available filter options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const adminStatusOptions = [
    { value: 'all', label: 'All Review Statuses' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'needs-info', label: 'Needs More Info' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Arts & Creativity', label: 'Arts & Creativity' },
    { value: 'Sports Excellence', label: 'Sports Excellence' },
    { value: 'Academic Achievement', label: 'Academic Achievement' },
    { value: 'Community Service', label: 'Community Service' },
    { value: 'Leadership', label: 'Leadership' },
    { value: 'Innovation & Technology', label: 'Innovation & Technology' },
    { value: 'Environmental Advocacy', label: 'Environmental Advocacy' },
    { value: 'Social Impact', label: 'Social Impact' }
  ];

  // Fetch nominations with enhanced error handling
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching nominations with filters:', filters);
      
      const response = await adminApi.getNominations(filters);
      
      if (response.status === 'success' && response.data?.nominations) {
        setNominations(response.data.nominations);
        
        // Test image accessibility for debugging
        testImageAccessibility(response.data.nominations);
        
        console.log(`✅ Loaded ${response.data.nominations.length} nominations`);
      } else {
        setNominations([]);
      }
    } catch (error) {
      console.error('❌ Failed to fetch nominations:', error);
      setError(error.message);
      setNominations([]);
    } finally {
      setLoading(false);
    }
  };

  // Test image accessibility for debugging
  const testImageAccessibility = async (nominations) => {
    const results = {};
    
    for (const nomination of nominations.slice(0, 5)) { // Test first 5 only
      const imageUrl = adminApi.resolveImageUrl(nomination);
      if (imageUrl) {
        try {
          const isAccessible = await adminApi.testImageUrl(imageUrl);
          results[nomination._id] = {
            url: imageUrl,
            accessible: isAccessible,
            source: getImageSourceType(nomination)
          };
        } catch (error) {
          results[nomination._id] = {
            url: imageUrl,
            accessible: false,
            error: error.message,
            source: getImageSourceType(nomination)
          };
        }
      }
    }
    
    setImageTestResults(results);
    console.log('🧪 Image accessibility test results:', results);
  };

  // Get image source type
  const getImageSourceType = (nomination) => {
    if (nomination.cloudinary?.photo?.url) return 'cloudinary';
    if (nomination.adminAccessUrls?.nomineePhoto) return 'admin-url';
    if (nomination.files?.photo?.filename) return 'local-file';
    return 'none';
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const response = await adminApi.getNominationStats();
      if (response.status === 'success') {
        setStats(response.data || {});
      }
    } catch (error) {
      console.error('❌ Failed to fetch stats:', error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  // Handle nomination click
  const handleNominationClick = (nomination) => {
    setSelectedNomination(nomination);
    setShowDetailModal(true);
  };

  // Handle status update
  const handleStatusUpdate = (nominationId, status, notes) => {
    console.log('✅ Status updated for:', nominationId, status);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh
  };

  // Handle nomination deletion
  const handleNominationDelete = (nominationId) => {
    console.log('🗑️ Nomination deleted:', nominationId);
    setNominations(prev => prev.filter(nom => nom._id !== nominationId));
    setShowDetailModal(false);
  };

  // Refresh data
  const handleRefresh = () => {
    console.log('🔄 Refreshing data...');
    setRefreshTrigger(prev => prev + 1);
    fetchStats();
  };

  // Test Cloudinary connection
  const testCloudinaryConnection = async () => {
    try {
      console.log('☁️ Testing Cloudinary connection...');
      const response = await adminApi.testCloudinary();
      console.log('☁️ Cloudinary test result:', response);
      alert(`Cloudinary Status: ${response.status === 'success' ? 'Connected ✅' : 'Failed ❌'}`);
    } catch (error) {
      console.error('❌ Cloudinary test failed:', error);
      alert(`Cloudinary test failed: ${error.message}`);
    }
  };

  // Export nominations data
  const exportNominations = async () => {
    try {
      console.log('📊 Exporting nominations data...');
      // In a real app, this would generate and download a CSV/Excel file
      const exportData = nominations.map(nom => ({
        'Submission ID': nom.submissionId,
        'Nominee Name': `${nom.nominee?.firstName} ${nom.nominee?.lastName}`,
        'Email': nom.nominee?.email,
        'Category': nom.awardCategory,
        'Status': nom.status,
        'Admin Review': nom.adminReview?.status || 'pending',
        'Submitted Date': new Date(nom.submittedAt || nom.createdAt).toLocaleDateString(),
        'Has Image': !!adminApi.resolveImageUrl(nom)
      }));
      
      console.log('📋 Export data prepared:', exportData);
      alert(`Export prepared for ${exportData.length} nominations. (In production, this would download a file)`);
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert('Export failed: ' + error.message);
    }
  };

  // Effects
  useEffect(() => {
    fetchNominations();
  }, [filters, refreshTrigger]);

  useEffect(() => {
    fetchStats();
  }, []);

  // Get stats display data
  const getStatsData = () => [
    {
      title: 'Total Nominations',
      value: stats.total || 0,
      icon: <Users className="w-5 h-5" />,
      color: 'blue'
    },
    {
      title: 'Pending Review',
      value: stats.pending || 0,
      icon: <Clock className="w-5 h-5" />,
      color: 'yellow'
    },
    {
      title: 'Approved',
      value: stats.approved || 0,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'green'
    },
    {
      title: 'Rejected',
      value: stats.rejected || 0,
      icon: <XCircle className="w-5 h-5" />,
      color: 'red'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Nominations Management</h2>
          <p className="text-gray-600 mt-1">
            Review and manage award nominations with enhanced image support
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={testCloudinaryConnection}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
            title="Test Cloudinary Connection"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Test Images
          </button>
          
          <button
            onClick={exportNominations}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
            title="Export Nominations Data"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStatsData().map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Test Results Debug Panel */}
      {Object.keys(imageTestResults).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
            Image Accessibility Test Results (Debug)
          </h3>
          <div className="space-y-2">
            {Object.entries(imageTestResults).map(([nominationId, result]) => (
              <div key={nominationId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${result.accessible ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="font-mono text-sm">{nominationId}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    result.source === 'cloudinary' ? 'bg-green-100 text-green-800' :
                    result.source === 'admin-url' ? 'bg-blue-100 text-blue-800' :
                    result.source === 'local-file' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {result.source}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {result.accessible ? '✅ Accessible' : '❌ Failed'}
                  {result.error && <span className="ml-2 text-red-600">({result.error})</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search nominations..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          {/* Admin Status Filter */}
          <select
            value={filters.adminStatus}
            onChange={(e) => handleFilterChange('adminStatus', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {adminStatusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="submittedAt">Date Submitted</option>
            <option value="nominee.lastName">Nominee Name</option>
            <option value="awardCategory">Category</option>
            <option value="adminReview.status">Review Status</option>
          </select>

          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Nominations Table */}
      <NominationsTable
        filters={filters}
        onNominationClick={handleNominationClick}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleNominationDelete}
        refreshTrigger={refreshTrigger}
      />

      {/* Nomination Detail Modal */}
      {showDetailModal && selectedNomination && (
        <NominationDetailModal
          nomination={selectedNomination}
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedNomination(null);
          }}
          onStatusUpdate={handleStatusUpdate}
          onDelete={handleNominationDelete}
        />
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">Error: {error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationsManager;