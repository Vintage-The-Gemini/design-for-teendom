// File: frontend/src/components/admin/NominationsTable.jsx
import { useState, useEffect } from 'react';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  FileText,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Trash2,
  Download
} from 'lucide-react';

const NominationsTable = ({ 
  filters = {}, 
  onNominationClick, 
  onStatusUpdate, 
  onBulkAction,
  refreshTrigger = 0 
}) => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 20
  });

  // Fetch nominations from API
  const fetchNominations = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...filters
      });

      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/nominations?${params}`, {
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
        setNominations(data.data.nominations);
        setPagination(data.pagination);
      } else {
        throw new Error(data.message || 'Failed to fetch nominations');
      }
    } catch (err) {
      console.error('Error fetching nominations:', err);
      setError(err.message);
      setNominations([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch nominations when filters change or component mounts
  useEffect(() => {
    fetchNominations(1);
  }, [filters, refreshTrigger]);

  // Format date helper
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
      'needs-info': { color: 'bg-blue-100 text-blue-800', icon: AlertTriangle, label: 'Needs Info' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  // Handle checkbox selection
  const handleSelectItem = (nominationId) => {
    setSelectedItems(prev => 
      prev.includes(nominationId) 
        ? prev.filter(id => id !== nominationId)
        : [...prev, nominationId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === nominations.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(nominations.map(n => n._id));
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchNominations(newPage);
    }
  };

  // Handle quick status update
  const handleQuickStatusUpdate = async (nominationId, newStatus) => {
    try {
      await onStatusUpdate(nominationId, newStatus, '');
      // Refresh the current page
      fetchNominations(pagination.currentPage);
    } catch (error) {
      console.error('Quick status update failed:', error);
    }
  };

  // Bulk actions handler
  const handleBulkAction = async (action) => {
    if (selectedItems.length === 0) {
      alert('Please select nominations first');
      return;
    }

    try {
      await onBulkAction(selectedItems, action);
      setSelectedItems([]);
      fetchNominations(pagination.currentPage);
    } catch (error) {
      console.error('Bulk action failed:', error);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-red-800">Unable to Load Nominations</h3>
        </div>
        <p className="text-red-700 mt-2">{error}</p>
        <button
          onClick={() => fetchNominations(pagination.currentPage)}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      
      {/* Table Header with Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-red-50 border-b border-red-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-red-900">
                {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => handleBulkAction('approve')}
                className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                <Check className="w-4 h-4 mr-1" />
                Approve
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Reject
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="inline-flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
              <button
                onClick={() => setSelectedItems([])}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-2 sm:px-4 py-3">
                <input
                  type="checkbox"
                  checked={nominations.length > 0 && selectedItems.length === nominations.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
              </th>
              <th className="text-left px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nominee
              </th>
              <th className="hidden sm:table-cell text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="hidden md:table-cell text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="text-left px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="hidden lg:table-cell text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nominator
              </th>
              <th className="text-right px-2 sm:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              // Loading skeleton
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </td>
                </tr>
              ))
            ) : nominations.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan="7" className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <FileText className="w-12 h-12 text-gray-300" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No nominations found</h3>
                      <p className="text-gray-500">
                        {Object.values(filters).some(v => v && v !== 'all') 
                          ? 'Try adjusting your filters' 
                          : 'Nominations will appear here once submitted'
                        }
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              // Nomination rows
              nominations.map((nomination) => (
                <tr key={nomination._id} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Checkbox */}
                  <td className="px-2 sm:px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(nomination._id)}
                      onChange={() => handleSelectItem(nomination._id)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </td>

                  {/* Nominee Info */}
                  <td className="px-2 sm:px-4 py-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {/* Photo */}
                      <div className="flex-shrink-0">
                        {(nomination.nominee.photo || nomination.files?.photo || nomination.cloudinary?.photo) ? (
                          <img
                            src={
                              // Priority: Cloudinary URL first, then files structure, then fallback
                              nomination.cloudinary?.photo?.url ||
                              nomination.files?.photo?.url ||
                              (nomination.nominee.photo?.startsWith('https://') ? nomination.nominee.photo : null) ||
                              (nomination.nominee.photo ? `http://localhost:5000/uploads/nominations/${nomination.nominee.photo}` : null)
                            }
                            alt={`${nomination.nominee.firstName} ${nomination.nominee.lastName}`}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200"
                            onError={(e) => {
                              console.error('Table image failed to load:', e.target.src);
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 items-center justify-center ${
                            (nomination.nominee.photo || nomination.files?.photo || nomination.cloudinary?.photo) ? 'hidden' : 'flex'
                          }`}
                        >
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                        </div>
                      </div>
                      
                      {/* Name and details */}
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {nomination.nominee.firstName} {nomination.nominee.lastName}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 space-y-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{nomination.nominee.email}</span>
                          </div>
                          <div className="sm:hidden text-xs text-gray-500">
                            {nomination.awardCategory}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category - Hidden on mobile */}
                  <td className="hidden sm:table-cell px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {nomination.awardCategory}
                      </span>
                    </div>
                  </td>

                  {/* Submitted Date - Hidden on mobile */}
                  <td className="hidden md:table-cell px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(nomination.createdAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {nomination.submissionId}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-2 sm:px-4 py-4">
                    <StatusBadge status={nomination.adminReview?.status || 'pending'} />
                  </td>

                  {/* Nominator - Hidden on mobile and tablet */}
                  <td className="hidden lg:table-cell px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {nomination.nominator.firstName} {nomination.nominator.lastName}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {nomination.nominator.relationship}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-2 sm:px-4 py-4 text-right space-x-2">
                    <div className="flex items-center justify-end space-x-1">
                      
                      {/* Quick Actions - Hidden on mobile */}
                      {nomination.adminReview?.status !== 'approved' && (
                        <button
                          onClick={() => handleQuickStatusUpdate(nomination._id, 'approved')}
                          className="hidden sm:block p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                          title="Quick Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      {nomination.adminReview?.status !== 'rejected' && (
                        <button
                          onClick={() => handleQuickStatusUpdate(nomination._id, 'rejected')}
                          className="hidden sm:block p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                          title="Quick Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}

                      {/* View Details */}
                      <button
                        onClick={() => onNominationClick(nomination)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && nominations.length > 0 && pagination.totalPages > 1 && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of{' '}
              {pagination.totalCount} results
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, pagination.currentPage - 2) + i;
                  if (pageNumber > pagination.totalPages) return null;
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-1 text-sm rounded ${
                        pageNumber === pagination.currentPage
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationsTable;