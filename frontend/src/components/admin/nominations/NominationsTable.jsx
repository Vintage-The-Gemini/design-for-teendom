// File path: src/components/admin/nominations/NominationsTable.jsx

import React, { useState, useEffect } from 'react';
import { 
  Eye, CheckCircle, XCircle, Clock, AlertTriangle, User, Mail, Phone, 
  MapPin, Award, Calendar, FileText, MoreHorizontal, ChevronLeft, 
  ChevronRight, Check, X, Trash2, Download, Search, Filter, RefreshCw
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // FIXED: Get proper image URL from your multiple storage systems
  const getAccessibleImageUrl = (nomination) => {
    const baseUrl = 'http://localhost:5000';
    
    // Priority 1: Cloudinary URL (best)
    if (nomination.cloudinary?.photo?.url) {
      return nomination.cloudinary.photo.url;
    }
    
    // Priority 2: Admin access URLs (your working system)
    if (nomination.adminAccessUrls?.nomineePhoto) {
      return nomination.adminAccessUrls.nomineePhoto.startsWith('http') 
        ? nomination.adminAccessUrls.nomineePhoto
        : `${baseUrl}${nomination.adminAccessUrls.nomineePhoto}`;
    }
    
    // Priority 3: Local server file
    if (nomination.files?.photo?.filename) {
      return `${baseUrl}/uploads/nominations/${nomination.files.photo.filename}`;
    }
    
    // Priority 4: Files URL (non-blob)
    if (nomination.files?.photo?.url && !nomination.files.photo.url.startsWith('blob:')) {
      return nomination.files.photo.url.startsWith('http') 
        ? nomination.files.photo.url 
        : `${baseUrl}${nomination.files.photo.url}`;
    }
    
    // Priority 5: Direct nomineePhoto field
    if (nomination.nomineePhoto && !nomination.nomineePhoto.startsWith('blob:')) {
      return nomination.nomineePhoto.startsWith('http') 
        ? nomination.nomineePhoto 
        : `${baseUrl}/uploads/nominations/${nomination.nomineePhoto}`;
    }
    
    return null;
  };

  // FIXED: Fetch nominations - try multiple endpoints
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...filters
      });

      // Your backend has these possible endpoints
      const endpoints = [
        `http://localhost:5000/api/admin/nominations?${params}`,
        `http://localhost:5000/api/admin/awards/nominations?${params}`,
        `http://localhost:5000/api/nominations?${params}`
      ];

      let response;
      let workingEndpoint;

      for (const endpoint of endpoints) {
        try {
          console.log(`🔍 Trying: ${endpoint}`);
          
          response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              ...(token && { 'Authorization': `Bearer ${token}` }),
              'Content-Type': 'application/json'
            }
          });

          console.log(`📡 Response: ${response.status} from ${endpoint}`);

          if (response.ok) {
            workingEndpoint = endpoint;
            break;
          }
        } catch (fetchError) {
          console.log(`❌ Failed: ${endpoint} - ${fetchError.message}`);
          continue;
        }
      }

      if (!response || !response.ok) {
        throw new Error(`All endpoints failed. Status: ${response?.status || 'No response'}`);
      }

      const data = await response.json();
      console.log(`✅ Success from: ${workingEndpoint}`, data);
      
      // Handle your backend response format
      let nominationsArray = [];
      
      if (data.status === 'success') {
        nominationsArray = data.data?.nominations || data.nominations || [];
        if (data.data?.pagination || data.pagination) {
          const pagination = data.data?.pagination || data.pagination;
          setTotalPages(Math.ceil(pagination.totalCount / itemsPerPage));
        }
      } else if (Array.isArray(data)) {
        nominationsArray = data;
      } else if (data.nominations) {
        nominationsArray = data.nominations;
      }

      console.log(`📊 Loaded ${nominationsArray.length} nominations`);
      setNominations(nominationsArray);
      
    } catch (err) {
      console.error('💥 Fetch error:', err);
      setError(err.message);
      setNominations([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when dependencies change
  useEffect(() => {
    fetchNominations();
  }, [filters, refreshTrigger, currentPage]);

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
      'needs-info': { color: 'bg-blue-100 text-blue-800', icon: AlertTriangle, label: 'Needs Info' }
    };
    
    const config = configs[status] || configs.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  // FIXED: Photo component that actually works
  const NomineePhoto = ({ nomination }) => {
    const [imageError, setImageError] = useState(false);
    const imageUrl = getAccessibleImageUrl(nomination);
    
    return (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={nomination.nominee?.firstName || nomination.nomineeName || 'Nominee'}
              className="h-10 w-10 rounded-full object-cover"
              onError={() => {
                console.log('❌ Image failed:', imageUrl);
                setImageError(true);
              }}
              onLoad={() => console.log('✅ Image loaded:', imageUrl)}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
              {(nomination.nominee?.firstName || nomination.nomineeName || 'N').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {nomination.nominee?.firstName ? 
              `${nomination.nominee.firstName} ${nomination.nominee.lastName}` : 
              nomination.nomineeName || 'Unknown'
            }
          </p>
          <p className="text-sm text-gray-500 truncate">
            {nomination.awardCategory || nomination.category || 'No category'}
          </p>
        </div>
      </div>
    );
  };

  // Actions menu
  const ActionsMenu = ({ nomination }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 z-20 mt-1 w-48 bg-white rounded-md shadow-lg border">
              <div className="py-1">
                <button
                  onClick={() => {
                    onNominationClick(nomination);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                
                {nomination.status !== 'approved' && (
                  <button
                    onClick={() => {
                      onStatusUpdate(nomination._id, 'approved', '');
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                )}
                
                {nomination.status !== 'rejected' && (
                  <button
                    onClick={() => {
                      onStatusUpdate(nomination._id, 'rejected', '');
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mr-2" />
          <span className="text-gray-600">Loading nominations...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Failed to Load Nominations</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchNominations}
            className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-300 text-red-700 text-sm font-medium rounded-md hover:bg-red-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Container - Added padding bottom for dropdown space */}
      <div className="overflow-x-auto pb-32">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nominee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                Nominator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nominations.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">No nominations found</p>
                  <button
                    onClick={fetchNominations}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Refresh Data
                  </button>
                </td>
              </tr>
            ) : (
              nominations.map((nomination) => (
                <tr key={nomination._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <NomineePhoto nomination={nomination} />
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="text-sm font-medium text-gray-900">
                      {nomination.awardCategory || nomination.category || 'No category'}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div>
                      <p className="text-sm text-gray-900">
                        {nomination.nominator?.firstName ? 
                          `${nomination.nominator.firstName} ${nomination.nominator.lastName}` :
                          nomination.nominatorName || 'Anonymous'
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        {nomination.nominator?.email || nomination.nominatorEmail || ''}
                      </p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={nomination.adminReview?.status || nomination.status || 'pending'} />
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {formatDate(nomination.createdAt || nomination.submittedAt)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ActionsMenu nomination={nomination} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationsTable;