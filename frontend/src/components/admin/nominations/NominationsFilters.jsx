// File: frontend/src/components/admin/NominationsFilters.jsx
import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  Users,
  Award,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  SortAsc,
  SortDesc,
  RotateCcw
} from 'lucide-react';

const NominationsFilters = ({ onFiltersChange, totalResults = 0 }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    adminStatus: 'all',
    sortBy: 'submittedAt',
    sortOrder: 'desc',
    dateRange: 'all'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Award Categories - you can also fetch these from API
  const defaultCategories = [
    'Academic Excellence',
    'Sports & Athletics', 
    'Creative Arts',
    'Community Service',
    'Leadership',
    'Innovation & Technology',
    'Environmental Champion',
    'Health & Wellness'
  ];

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' && data.data?.categories) {
          setCategories(data.data.categories.map(cat => cat.name));
        } else {
          setCategories(defaultCategories);
        }
      } else {
        setCategories(defaultCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(defaultCategories);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      category: 'all',
      adminStatus: 'all',
      sortBy: 'submittedAt',
      sortOrder: 'desc',
      dateRange: 'all'
    });
    setShowAdvanced(false);
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.search !== '' || 
           filters.status !== 'all' || 
           filters.category !== 'all' || 
           filters.adminStatus !== 'all' ||
           filters.dateRange !== 'all';
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    handleFilterChange('sortOrder', filters.sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 mb-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Filter className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Filter Nominations
          </h3>
          {totalResults > 0 && (
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {totalResults} results
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              showAdvanced 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Advanced
          </button>
          {hasActiveFilters() && (
            <button
              onClick={resetFilters}
              className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search nominations..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
          />
          {filters.search && (
            <button
              onClick={() => handleFilterChange('search', '')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Admin Status */}
        <div className="relative">
          <select
            value={filters.adminStatus}
            onChange={(e) => handleFilterChange('adminStatus', e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="all">All Status</option>
            <option value="pending">⏳ Pending Review</option>
            <option value="approved">✅ Approved</option>
            <option value="rejected">❌ Rejected</option>
            <option value="needs-info">⚠️ Needs Info</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Category */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
            disabled={loadingCategories}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                🏆 {category}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="submittedAt">📅 Submission Date</option>
              <option value="nominee.firstName">👤 Nominee Name</option>
              <option value="awardCategory">🏆 Category</option>
              <option value="adminReview.reviewDate">🔍 Review Date</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <button
            onClick={toggleSortOrder}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            title={`Sort ${filters.sortOrder === 'desc' ? 'Ascending' : 'Descending'}`}
          >
            {filters.sortOrder === 'desc' ? (
              <SortDesc className="w-4 h-4 text-gray-600" />
            ) : (
              <SortAsc className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t pt-4 space-y-4">
          <h4 className="font-medium text-gray-900 mb-3">Advanced Filters</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            
            {/* Nomination Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomination Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">📝 Submitted</option>
                <option value="under-review">👀 Under Review</option>
                <option value="finalist">⭐ Finalist</option>
                <option value="winner">🏆 Winner</option>
                <option value="rejected">❌ Rejected</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submission Period
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Time</option>
                <option value="today">📅 Today</option>
                <option value="week">📆 This Week</option>
                <option value="month">📊 This Month</option>
                <option value="quarter">📈 This Quarter</option>
              </select>
            </div>

            {/* Quick Stats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Actions
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('adminStatus', 'pending')}
                  className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium hover:bg-yellow-200 transition-colors"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Pending Only
                </button>
                <button
                  onClick={() => handleFilterChange('dateRange', 'today')}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Today's
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tags */}
          {hasActiveFilters() && (
            <div className="pt-3 border-t">
              <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                    Search: "{filters.search}"
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.adminStatus !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                    Status: {filters.adminStatus}
                    <button
                      onClick={() => handleFilterChange('adminStatus', 'all')}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange('category', 'all')}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.status !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                    Nomination Status: {filters.status}
                    <button
                      onClick={() => handleFilterChange('status', 'all')}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.dateRange !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                    Period: {filters.dateRange}
                    <button
                      onClick={() => handleFilterChange('dateRange', 'all')}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NominationsFilters;