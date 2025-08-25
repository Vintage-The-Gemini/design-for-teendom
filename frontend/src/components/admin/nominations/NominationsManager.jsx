// File: frontend/src/components/admin/nominations/NominationsManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Award,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Camera,
  Paperclip,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import adminApi from '../../../services/adminApi';

const NominationsManager = () => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: '',
    page: 1,
    limit: 20
  });

  // Award categories
  const categories = [
    'Advocate for Change',
    'Sports Excellence',
    'Academic Excellence',
    'Arts & Creativity',
    'Leadership Excellence',
    'Community Service',
    'Innovation & Technology',
    'Environmental Champion',
    'Entrepreneurship',
    'Cultural Ambassador'
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'submitted', label: 'Submitted', color: 'blue' },
    { value: 'under-review', label: 'Under Review', color: 'yellow' },
    { value: 'finalist', label: 'Finalist', color: 'green' },
    { value: 'winner', label: 'Winner', color: 'purple' },
    { value: 'rejected', label: 'Rejected', color: 'red' }
  ];

  const adminStatusOptions = [
    { value: 'pending', label: 'Pending Review', color: 'yellow' },
    { value: 'approved', label: 'Approved', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'needs-info', label: 'Needs Info', color: 'orange' }
  ];

  useEffect(() => {
    loadNominations();
    loadStats();
  }, [filters]);

  const loadNominations = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getNominations({
        ...filters,
        page: filters.page,
        limit: filters.limit
      });
      
      setNominations(response.data.nominations || []);
      setStats(response.statistics || {});
    } catch (error) {
      console.error('Failed to load nominations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await adminApi.makeRequest('/admin/nominations/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleStatusUpdate = async (nominationId, newStatus, notes = '') => {
    try {
      await adminApi.makeRequest(`/admin/nominations/${nominationId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: newStatus,
          notes: notes,
          sendNotification: true
        })
      });
      
      // Refresh nominations
      loadNominations();
      
      // Show success message
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status, adminStatus) => {
    const statusConfig = statusOptions.find(s => s.value === status) || statusOptions[0];
    const adminConfig = adminStatusOptions.find(s => s.value === adminStatus);
    
    return (
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${statusConfig.color}-100 text-${statusConfig.color}-800`}>
          {statusConfig.label}
        </span>
        {adminConfig && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${adminConfig.color}-100 text-${adminConfig.color}-800`}>
            {adminConfig.label}
          </span>
        )}
      </div>
    );
  };

  const openNominationDetails = async (nomination) => {
    try {
      const response = await adminApi.makeRequest(`/admin/nominations/${nomination._id}`);
      setSelectedNomination(response.data.nomination);
      setShowDetails(true);
    } catch (error) {
      console.error('Failed to load nomination details:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading nominations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Nominations Management
            </h1>
            <p className="text-red-100">Review and manage award nominations</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">{stats.overview?.total || 0}</div>
            <div className="text-red-100">Total Nominations</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">{stats.overview?.pending || 0}</div>
                <div className="text-red-100 text-sm">Pending Review</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-300" />
              <div>
                <div className="text-2xl font-bold">{stats.overview?.approved || 0}</div>
                <div className="text-red-100 text-sm">Approved</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-300" />
              <div>
                <div className="text-2xl font-bold">{stats.overview?.rejected || 0}</div>
                <div className="text-red-100 text-sm">Rejected</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-300" />
              <div>
                <div className="text-2xl font-bold">{stats.overview?.total || 0}</div>
                <div className="text-red-100 text-sm">All Entries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">Filter Nominations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search nominations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          {/* Status Filter */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Nominations Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nominee
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nominations.map((nomination) => (
                <tr key={nomination._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {nomination.nominee?.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {nomination.submissionId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {nomination.awardCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(nomination.submittedAt || nomination.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(nomination.status, nomination.adminReview?.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openNominationDetails(nomination)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {!nomination.adminReview?.status || nomination.adminReview?.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(nomination._id, 'approved')}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(nomination._id, 'rejected')}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-500 px-2">
                          {nomination.adminReview?.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {nominations.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No nominations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>

      {/* Nomination Details Modal */}
      {showDetails && selectedNomination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-red-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedNomination.nominee?.firstName} {selectedNomination.nominee?.lastName}
                  </h2>
                  <p className="text-red-100">
                    {selectedNomination.awardCategory} • {selectedNomination.submissionId}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white hover:text-gray-300 p-2"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Actions */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Quick Actions:</span>
                {(!selectedNomination.adminReview?.status || selectedNomination.adminReview?.status === 'pending') ? (
                  <>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedNomination._id, 'approved');
                        setShowDetails(false);
                      }}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedNomination._id, 'rejected');
                        setShowDetails(false);
                      }}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedNomination._id, 'needs-info', 'Please provide additional information');
                        setShowDetails(false);
                      }}
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Request Info
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-600 px-4 py-2 bg-gray-200 rounded-lg">
                    Status: {selectedNomination.adminReview?.status} by {selectedNomination.adminReview?.reviewer?.name || 'System'}
                  </span>
                )}
              </div>

              {/* Nominee Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Nominee Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-900">
                        {selectedNomination.nominee?.firstName} {selectedNomination.nominee?.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Age:</span>
                      <span className="ml-2 text-gray-900">{selectedNomination.nominee?.age || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Gender:</span>
                      <span className="ml-2 text-gray-900 capitalize">{selectedNomination.nominee?.gender || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{selectedNomination.nominee?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{selectedNomination.nominee?.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{selectedNomination.nominee?.location?.county || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{selectedNomination.nominee?.school?.level || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Nominator Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-900">
                        {selectedNomination.nominator?.firstName} {selectedNomination.nominator?.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Relationship:</span>
                      <span className="ml-2 text-gray-900 capitalize">{selectedNomination.nominator?.relationship || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{selectedNomination.nominator?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{selectedNomination.nominator?.phone || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nomination Content */}
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Short Biography</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedNomination.shortBio || 'No biography provided'}</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">Achievements</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedNomination.achievements || 'No achievements provided'}</p>
                </div>

                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-teal-900 mb-2">Impact</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedNomination.impact || 'No impact statement provided'}</p>
                </div>

                {/* Referee Information */}
                {selectedNomination.referee && (
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-2">Referee Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-900">{selectedNomination.referee.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Position:</span>
                        <span className="ml-2 text-gray-900">{selectedNomination.referee.position || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{selectedNomination.referee.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{selectedNomination.referee.phone || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Files Section */}
              {selectedNomination.files && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Paperclip className="w-5 h-5" />
                    Attached Files
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nominee Photo */}
                    {selectedNomination.files.photo && (
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <Camera className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-gray-900">Nominee Photo</div>
                            <div className="text-sm text-gray-500">
                              {selectedNomination.files.photo.filename || 'nominee-photo.jpg'}
                            </div>
                            {selectedNomination.files.photo.size && (
                              <div className="text-xs text-gray-400">
                                {(selectedNomination.files.photo.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            )}
                          </div>
                        </div>
                        <button 
                          className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                          onClick={() => window.open(selectedNomination.files.photo.url, '_blank')}
                        >
                          View Photo
                        </button>
                      </div>
                    )}

                    {/* Supporting Files */}
                    {selectedNomination.files.supportingFiles && selectedNomination.files.supportingFiles.length > 0 && 
                      selectedNomination.files.supportingFiles.map((file, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <Paperclip className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium text-gray-900">Supporting File {index + 1}</div>
                            <div className="text-sm text-gray-500">{file.filename || `file-${index + 1}`}</div>
                            {file.size && (
                              <div className="text-xs text-gray-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            )}
                          </div>
                        </div>
                        <button 
                          className="mt-2 text-green-600 hover:text-green-800 text-sm font-medium"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          Download File
                        </button>
                      </div>
                    ))}

                    {/* No files message */}
                    {(!selectedNomination.files.photo && (!selectedNomination.files.supportingFiles || selectedNomination.files.supportingFiles.length === 0)) && (
                      <div className="col-span-2 text-center text-gray-500 py-6">
                        <Paperclip className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No files attached to this nomination</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Admin Review Section */}
              {selectedNomination.adminReview && selectedNomination.adminReview.reviewed && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Admin Review</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className="ml-2 text-gray-900 capitalize">{selectedNomination.adminReview.status}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Reviewed By:</span>
                      <span className="ml-2 text-gray-900">{selectedNomination.adminReview.reviewer?.name || 'System'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Review Date:</span>
                      <span className="ml-2 text-gray-900">{formatDate(selectedNomination.adminReview.reviewDate)}</span>
                    </div>
                    {selectedNomination.adminReview.notes && (
                      <div>
                        <span className="font-medium text-gray-700">Notes:</span>
                        <p className="mt-1 text-gray-900 bg-white p-2 rounded border">{selectedNomination.adminReview.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submission Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Submission Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Submission ID:</span>
                    <span className="ml-2 text-gray-900 font-mono">{selectedNomination.submissionId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Submitted:</span>
                    <span className="ml-2 text-gray-900">{formatDate(selectedNomination.submittedAt || selectedNomination.createdAt)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Current Status:</span>
                    <span className="ml-2 text-gray-900 capitalize">{selectedNomination.status}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phase:</span>
                    <span className="ml-2 text-gray-900 capitalize">{selectedNomination.phase || 'nomination'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NominationsManager;