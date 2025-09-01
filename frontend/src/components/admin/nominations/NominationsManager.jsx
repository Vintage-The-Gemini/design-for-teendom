// File: frontend/src/components/admin/nominations/NominationsManager.jsx

import React, { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, FileText, Clock, CheckCircle, XCircle, AlertTriangle, AlertCircle,
  Eye, Check, X, Trash2, MoreVertical, User, Mail, Phone, MapPin, Award, Calendar,
  ExternalLink, School
} from 'lucide-react';
import adminApi from '../../../services/adminApi';

// Image URL resolver
const resolveImageUrl = (nomination) => {
  if (!nomination) return null;
  
  if (nomination.nominee?.photo && nomination.nominee.photo.includes('cloudinary')) {
    return nomination.nominee.photo;
  }
  if (nomination.photo && nomination.photo.includes('cloudinary')) {
    return nomination.photo;
  }
  return null;
};

// Status Badge Component
const StatusBadge = ({ status, adminStatus }) => {
  let config = { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Unknown' };

  if (adminStatus) {
    switch (adminStatus) {
      case 'approved':
        config = { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' };
        break;
      case 'rejected':
        config = { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' };
        break;
      case 'needs-info':
        config = { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle, label: 'Needs Info' };
        break;
      default:
        config = { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Pending' };
    }
  } else {
    switch (status) {
      case 'submitted':
        config = { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Submitted' };
        break;
      case 'approved':
        config = { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' };
        break;
      case 'rejected':
        config = { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' };
        break;
    }
  }

  const IconComponent = config.icon;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <IconComponent className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

// Nomination Card
const NominationCard = ({ nomination, onView, onUpdateStatus, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = resolveImageUrl(nomination);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await onUpdateStatus(nomination._id, newStatus);
      setDropdownOpen(false);
    } catch (error) {
      alert(`Failed to update: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Photo */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {imageUrl && !imageError ? (
                <img
                  src={imageUrl}
                  alt="Nominee"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {nomination.nominee?.firstName} {nomination.nominee?.lastName}
              </h3>
              <p className="text-sm text-gray-600">ID: {nomination.submissionId}</p>
              <div className="text-xs text-gray-500">
                <div>Category: {nomination.awardCategory}</div>
                <div>Age: {nomination.nominee?.age}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <StatusBadge status={nomination.status} adminStatus={nomination.adminReview?.status} />
            
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                disabled={updating}
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onView(nomination);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    
                    <hr className="my-1" />
                    
                    <button
                      onClick={() => handleStatusUpdate('approved')}
                      disabled={updating}
                      className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50 disabled:opacity-50"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {updating ? 'Updating...' : 'Approve'}
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate('rejected')}
                      disabled={updating}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {updating ? 'Updating...' : 'Reject'}
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate('needs-info')}
                      disabled={updating}
                      className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 disabled:opacity-50"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Needs Info
                    </button>
                    
                    <hr className="my-1" />
                    
                    <button
                      onClick={() => {
                        onDelete(nomination._id);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Info */}
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            <strong>Email:</strong> {nomination.nominee?.email}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Phone:</strong> {nomination.nominee?.phone}
          </div>
          {nomination.shortBio && (
            <div className="text-sm text-gray-600">
              <strong>Bio:</strong> {nomination.shortBio.substring(0, 100)}...
            </div>
          )}
          <div className="text-xs text-gray-500 pt-2 border-t">
            Submitted: {formatDate(nomination.submittedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Detail Modal
const DetailModal = ({ nomination, isOpen, onClose, onUpdateStatus, onDelete }) => {
  const [activeTab, setActiveTab] = useState('nominee');
  const [statusNotes, setStatusNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  
  if (!isOpen || !nomination) return null;

  const imageUrl = resolveImageUrl(nomination);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await onUpdateStatus(nomination._id, newStatus, statusNotes);
      setStatusNotes('');
      onClose();
    } catch (error) {
      alert(`Failed to update: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {nomination.nominee?.firstName} {nomination.nominee?.lastName}
              </h2>
              <p className="text-sm text-gray-600">
                ID: {nomination.submissionId} • Category: {nomination.awardCategory}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <StatusBadge status={nomination.status} adminStatus={nomination.adminReview?.status} />
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'nominee', label: 'Nominee Details' },
              { id: 'content', label: 'Nomination Content' },
              { id: 'contacts', label: 'Contacts' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto">
          {activeTab === 'nominee' && (
            <div className="space-y-6">
              <div className="flex space-x-6">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Nominee" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.age}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nationality</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.nationality}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">County</label>
                    <p className="text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.county}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Award Category</label>
                <p className="text-gray-900 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {nomination.awardCategory}
                </p>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Biography</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-900 whitespace-pre-wrap">{nomination.shortBio}</p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Achievements</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-900 whitespace-pre-wrap">{nomination.achievements}</p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Community Impact</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-900 whitespace-pre-wrap">{nomination.impact}</p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Why They Deserve Award</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-900 whitespace-pre-wrap">{nomination.whyDeserveAward}</p>
                </div>
              </div>

              {nomination.additionalInfo && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Additional Info</label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-gray-900 whitespace-pre-wrap">{nomination.additionalInfo}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Nominator</h4>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <p className="text-gray-900">{nomination.nominator?.isSelfNomination ? 'Self-nomination' : 'Third-party'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">{nomination.nominator?.firstName} {nomination.nominator?.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{nomination.nominator?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Relationship</label>
                      <p className="text-gray-900">{nomination.nominator?.relationship}</p>
                    </div>
                  </div>
                </div>
              </div>

              {nomination.referee && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Referee</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="text-gray-900">{nomination.referee.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <p className="text-gray-900">{nomination.referee.position}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Organization</label>
                        <p className="text-gray-900">{nomination.referee.organization}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{nomination.referee.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {nomination.socialMediaLinks && Object.values(nomination.socialMediaLinks).some(link => link) && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Social Media</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(nomination.socialMediaLinks).map(([platform, url]) => (
                      url && (
                        <div key={platform} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <span className="font-medium capitalize">{platform}</span>
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View
                          </a>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Submitted: {formatDate(nomination.submittedAt)}
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Review notes..."
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                className="px-3 py-2 border rounded text-sm w-48"
              />
              
              <button
                onClick={() => handleStatusUpdate('approved')}
                disabled={updating}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Approve'}
              </button>
              
              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={updating}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Reject'}
              </button>
              
              <button
                onClick={() => onDelete(nomination._id)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Manager Component
const NominationsManager = () => {
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    needsInfo: 0
  });

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    adminStatus: 'all',
    category: 'all',
    sortBy: 'submittedAt',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  });

  // Options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const adminStatusOptions = [
    { value: 'all', label: 'All Review Statuses' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'needs-info', label: 'Needs Info' }
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
    { value: 'Social Impact', label: 'Social Impact' },
    { value: 'Entrepreneurship', label: 'Entrepreneurship' }
  ];

  // Fetch nominations
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching nominations with filters:', filters);
      
      const response = await adminApi.getNominations(filters);
      
      if (response?.status === 'success' && response.data?.nominations) {
        setNominations(response.data.nominations);
        console.log(`✅ Loaded ${response.data.nominations.length} nominations`);
      } else {
        console.log('⚠️ No nominations in response');
        setNominations([]);
      }
    } catch (err) {
      console.error('❌ Failed to fetch nominations:', err);
      setError(`Failed to load nominations: ${err.message}`);
      setNominations([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await adminApi.getNominationStats();
      if (response?.status === 'success' && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('❌ Failed to fetch stats:', err);
    }
  };

  // Load data
  useEffect(() => {
    fetchNominations();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchNominations();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  // Handle status updates with better error handling
  const handleUpdateStatus = async (nominationId, newStatus, notes = '') => {
    try {
      console.log('🔄 Frontend: Starting status update', { nominationId, newStatus, notes });
      
      const response = await adminApi.updateNominationStatus(nominationId, newStatus, notes);
      
      if (response?.status === 'success') {
        console.log('✅ Frontend: Status update successful');
        
        // Update local state
        setNominations(prev =>
          prev.map(nom =>
            nom._id === nominationId
              ? {
                  ...nom,
                  status: response.data.nomination.status,
                  phase: response.data.nomination.phase,
                  adminReview: response.data.nomination.adminReview,
                  updatedAt: response.data.nomination.updatedAt
                }
              : nom
          )
        );
        
        // Refresh stats
        fetchStats();
        
        console.log('✅ Local state updated successfully');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('❌ Frontend: Status update failed:', error);
      throw error; // Re-throw so component can handle it
    }
  };

  // Handle deletion
  const handleDelete = async (nominationId) => {
    if (!confirm('Are you sure you want to delete this nomination? This action cannot be undone.')) {
      return;
    }

    try {
      console.log('🗑️ Frontend: Starting deletion', nominationId);
      
      const response = await adminApi.deleteNomination(nominationId);
      
      if (response?.status === 'success') {
        console.log('✅ Frontend: Deletion successful');
        
        setNominations(prev => prev.filter(nom => nom._id !== nominationId));
        
        if (selectedNomination?._id === nominationId) {
          setDetailModalOpen(false);
          setSelectedNomination(null);
        }
        
        fetchStats();
      }
    } catch (error) {
      console.error('❌ Frontend: Deletion failed:', error);
      alert(`Failed to delete nomination: ${error.message}`);
    }
  };

  // Handle view
  const handleView = (nomination) => {
    console.log('👁️ Viewing nomination:', nomination.submissionId);
    setSelectedNomination(nomination);
    setDetailModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nominations Management</h1>
        <p className="text-gray-600">Review and manage all nominations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Needs Info</p>
              <p className="text-2xl font-bold text-orange-600">{stats.needsInfo}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search nominations..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.adminStatus}
            onChange={(e) => handleFilterChange('adminStatus', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {adminStatusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              fetchNominations();
              fetchStats();
            }}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Results */}
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
          <button 
            onClick={() => {
              setError(null);
              fetchNominations();
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="bg-white rounded-lg shadow border p-8 text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading nominations...</p>
        </div>
      ) : nominations.length === 0 ? (
        <div className="bg-white rounded-lg shadow border p-8 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No nominations found</p>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {nominations.map((nomination) => (
            <NominationCard
              key={nomination._id}
              nomination={nomination}
              onView={handleView}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {detailModalOpen && selectedNomination && (
        <DetailModal
          nomination={selectedNomination}
          isOpen={detailModalOpen}
          onClose={() => {
            setDetailModalOpen(false);
            setSelectedNomination(null);
          }}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default NominationsManager;