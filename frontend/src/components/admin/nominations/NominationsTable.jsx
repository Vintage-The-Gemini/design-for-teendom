// File: frontend/src/components/admin/nominations/NominationsTable.jsx
import React, { useState, useEffect } from 'react';
import { 
  Eye, Clock, CheckCircle, XCircle, Trash2, User, Mail, Phone, 
  MapPin, Award, Search, Filter, ChevronLeft, ChevronRight,
  AlertTriangle, ExternalLink, Download, Image as ImageIcon
} from 'lucide-react';

const NominationsTable = ({ 
  filters = {}, 
  onNominationClick, 
  onStatusUpdate, 
  onDelete,
  refreshTrigger = 0 
}) => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageErrors, setImageErrors] = useState({});
  const itemsPerPage = 10;

  // FIXED: Enhanced image URL resolution based on your actual data structure
  const getImageUrl = (nomination) => {
    console.log('🖼️ Resolving image for nomination:', nomination.submissionId);
    
    // Priority 1: Cloudinary CDN URL (WORKS - you have this!)
    if (nomination.cloudinary?.photo?.url) {
      console.log('✅ Using Cloudinary URL:', nomination.cloudinary.photo.url);
      return nomination.cloudinary.photo.url;
    }
    
    // Priority 2: Cloudinary HTTPS URL (secure_url)
    if (nomination.cloudinary?.photo?.secure_url) {
      console.log('✅ Using Cloudinary HTTPS URL:', nomination.cloudinary.photo.secure_url);
      return nomination.cloudinary.photo.secure_url;
    }
    
    // Priority 3: Admin access URLs (currently empty but checking)
    if (nomination.adminAccessUrls?.nomineePhoto) {
      const adminUrl = nomination.adminAccessUrls.nomineePhoto;
      const fullUrl = adminUrl.startsWith('http') ? adminUrl : `http://localhost:5000${adminUrl}`;
      console.log('✅ Using admin access URL:', fullUrl);
      return fullUrl;
    }
    
    // Priority 4: Local server file (WORKS - you have this!)
    if (nomination.files?.photo?.filename) {
      const localUrl = `http://localhost:5000/uploads/nominations/${nomination.files.photo.filename}`;
      console.log('✅ Using local file URL:', localUrl);
      return localUrl;
    }
    
    // Priority 5: File URL with proper base (WORKS - you have this!)
    if (nomination.files?.photo?.url) {
      const fileUrl = nomination.files.photo.url.startsWith('http') 
        ? nomination.files.photo.url 
        : `http://localhost:5000${nomination.files.photo.url}`;
      console.log('✅ Using file URL:', fileUrl);
      return fileUrl;
    }
    
    console.log('❌ No valid image URL found');
    return 'https://via.placeholder.com/150x150?text=No+Image';
  };

  // FIXED: Handle missing image data gracefully
  const handleImageError = (nominationId, imageUrl) => {
    console.log(`❌ Image failed to load for ${nominationId}:`, imageUrl);
    setImageErrors(prev => ({
      ...prev,
      [nominationId]: true
    }));
  };

  // FIXED: Handle all possible object structures  
  const formatField = (field) => {
    if (!field) return 'Not provided';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      // Handle school objects with name, level, grade
      if (field.name || field.level || field.grade) {
        const parts = [];
        if (field.name) parts.push(field.name);
        if (field.level) parts.push(field.level);
        if (field.grade) parts.push(field.grade);
        return parts.join(' - ') || 'Not provided';
      }
      // Handle location objects
      if (field.county || field.subcounty || field.ward) {
        const parts = [];
        if (field.ward) parts.push(field.ward);
        if (field.subcounty) parts.push(field.subcounty);
        if (field.county) parts.push(field.county);
        return parts.join(', ') || 'Not provided';
      }
      // Handle any other object safely
      try {
        return Object.values(field).filter(v => v).join(' - ') || 'Not provided';
      } catch {
        return 'Not provided';
      }
    }
    return String(field);
  };

  // Fetch nominations with better error handling
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...filters
      });

      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Admin session expired. Please login again.');
      }

      console.log('📊 Fetching nominations with params:', Object.fromEntries(params));

      const response = await fetch(`http://localhost:5000/api/admin/nominations?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Fetched nominations:', data);

      if (data.status === 'success' && data.data?.nominations) {
        setNominations(data.data.nominations);
        setTotalPages(data.pagination?.totalPages || 1);
        
        // Log image availability for debugging
        data.data.nominations.forEach(nomination => {
          console.log(`📋 Nomination ${nomination.submissionId} image status:`, {
            hasCloudinary: !!nomination.cloudinary?.photo?.url,
            hasAdminUrl: !!nomination.adminAccessUrls?.nomineePhoto,
            hasLocalFile: !!nomination.files?.photo?.filename,
            resolvedUrl: getImageUrl(nomination)
          });
        });
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

  // Delete nomination
  const handleDelete = async (nominationId) => {
    if (!confirm('Are you sure you want to permanently delete this nomination? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/nominations/${nominationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete nomination: ${response.status}`);
      }

      // Remove from local state
      setNominations(prev => prev.filter(nom => nom._id !== nominationId));
      
      // Call parent callback if provided
      if (onDelete) {
        onDelete(nominationId);
      }

      console.log('✅ Nomination deleted successfully');
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert('Failed to delete nomination: ' + error.message);
    }
  };

  // Status update
  const handleStatusUpdate = async (nominationId, status, notes = '') => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/nominations/${nominationId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, notes })
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }

      // Refresh the nominations list
      fetchNominations();
      
      if (onStatusUpdate) {
        onStatusUpdate(nominationId, status);
      }

      console.log('✅ Status updated successfully');
    } catch (error) {
      console.error('❌ Status update error:', error);
      alert('Failed to update status: ' + error.message);
    }
  };

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'needs-info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Status icon helper
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'needs-info': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Effects
  useEffect(() => {
    fetchNominations();
  }, [currentPage, filters, refreshTrigger]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading nominations...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Nominations</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchNominations}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (nominations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Nominations Found</h3>
          <p className="text-gray-600">No nominations match your current filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Nominations ({nominations.length})
          </h3>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nominee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nominations.map((nomination) => {
              const imageUrl = getImageUrl(nomination);
              const hasImageError = imageErrors[nomination._id];
              
              return (
                <tr key={nomination._id} className="hover:bg-gray-50">
                  {/* Nominee Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        {hasImageError ? (
                          <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        ) : (
                          <img
                            src={imageUrl}
                            alt={`${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`}
                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                            onError={() => handleImageError(nomination._id, imageUrl)}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatField(nomination.nominee?.email)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm text-gray-900">
                        {nomination.awardCategory || 'Not specified'}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(nomination.adminReview?.status || 'pending')}`}>
                      {getStatusIcon(nomination.adminReview?.status || 'pending')}
                      <span className="ml-1 capitalize">
                        {nomination.adminReview?.status || 'pending'}
                      </span>
                    </span>
                  </td>

                  {/* Submitted Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(nomination.submittedAt || nomination.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* View Details */}
                      <button
                        onClick={() => onNominationClick && onNominationClick(nomination)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Quick Actions */}
                      {nomination.adminReview?.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(nomination._id, 'approved')}
                            className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(nomination._id, 'rejected')}
                            className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      {/* Delete - Red Theme */}
                      <button
                        onClick={() => handleDelete(nomination._id)}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50 p-1 rounded transition-colors"
                        title="Delete Nomination"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Showing page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationsTable;