// File: frontend/src/components/admin/nominations/NominationsTable.jsx

import React, { useState, useEffect } from 'react';
import { 
  Eye, Clock, CheckCircle, XCircle, Trash2, User, Mail, Phone, 
  MapPin, Award, Search, Filter, ChevronLeft, ChevronRight,
  AlertTriangle, ExternalLink, Download, Image as ImageIcon, RefreshCw
} from 'lucide-react';
import adminApi from '../../../services/adminApi';

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

  // FIXED: Use adminApi service instead of direct fetch
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy: filters.sortBy || 'submittedAt',
        sortOrder: filters.sortOrder || 'desc'
      };
      
      if (filters.search) params.search = filters.search;
      if (filters.status && filters.status !== 'all') params.status = filters.status;
      if (filters.adminStatus && filters.adminStatus !== 'all') params.adminStatus = filters.adminStatus;
      if (filters.category && filters.category !== 'all') params.category = filters.category;

      // Use adminApi service (which works)
      const data = await adminApi.getNominations(params);
      
      console.log('✅ Fetched nominations via adminApi:', data);
      
      setNominations(data.data?.nominations || []);
      setTotalPages(Math.ceil((data.pagination?.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error('❌ Error fetching nominations:', error);
      setError(error.message || 'Failed to load nominations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNominations();
  }, [currentPage, filters, refreshTrigger]);

  const handleImageError = (nominationId) => {
    setImageErrors(prev => ({
      ...prev,
      [nominationId]: true
    }));
  };

  const handleImageLoad = (nominationId) => {
    setImageErrors(prev => ({
      ...prev,
      [nominationId]: false
    }));
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'under-review': return 'text-yellow-600 bg-yellow-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'under-review': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-gray-600">Loading nominations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
          <div>
            <h3 className="text-red-800 font-medium">Error Loading Nominations</h3>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
        <button
          onClick={fetchNominations}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Nominations ({nominations.length})
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchNominations}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                // ONLY use Cloudinary URLs - ignore everything else
                let imageUrl = null;
                
                // Check if nominee.photo is a Cloudinary URL
                if (nomination.nominee?.photo && 
                    typeof nomination.nominee.photo === 'string' && 
                    nomination.nominee.photo.includes('cloudinary')) {
                  imageUrl = nomination.nominee.photo;
                }
                
                const hasImageError = imageErrors[nomination._id];
                
                return (
                  <tr key={nomination._id} className="hover:bg-gray-50">
                    {/* Nominee Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {hasImageError || !imageUrl ? (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="w-6 h-6 text-gray-400" />
                            </div>
                          ) : (
                            <img
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                              src={imageUrl}
                              alt={`${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`}
                              onError={() => handleImageError(nomination._id)}
                              onLoad={() => handleImageLoad(nomination._id)}
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {nomination.nominee?.age} years • {nomination.nominee?.nationality}
                          </div>
                          <div className="text-xs text-gray-400 font-mono">
                            {nomination.submissionId}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm text-gray-900">{nomination.awardCategory}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(nomination.adminReview?.status || nomination.status)}`}>
                        {getStatusIcon(nomination.adminReview?.status || nomination.status)}
                        <span className="ml-1 capitalize">
                          {nomination.adminReview?.status || nomination.status || 'pending'}
                        </span>
                      </div>
                    </td>

                    {/* Submitted Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(nomination.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onNominationClick(nomination)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {imageUrl && (
                          <a
                            href={imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="View Cloudinary Image"
                          >
                            <ImageIcon className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => onDelete(nomination)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {nominations.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No nominations found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg shadow">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationsTable;