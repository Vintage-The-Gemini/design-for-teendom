// File path: src/components/admin/nominations/NominationDetailModal.jsx

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  ExternalLink,
  Heart,
  Users,
  Building
} from 'lucide-react';

const NominationDetailModal = ({ 
  isOpen, 
  onClose, 
  nomination, 
  onStatusUpdate,
  onDelete,
  loading = false 
}) => {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !nomination) return null;

  // FIXED: Get proper image URL using correct field names
  const getImageUrl = () => {
    const baseUrl = 'http://localhost:5000';
    
    // Priority 1: Cloudinary URL
    if (nomination.cloudinary?.photo?.url) {
      return nomination.cloudinary.photo.url;
    }
    
    // Priority 2: Admin access URLs
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
    
    return null;
  };

  const imageUrl = getImageUrl();

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: Clock,
        label: 'Pending Review' 
      },
      approved: { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: CheckCircle,
        label: 'Approved' 
      },
      rejected: { 
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: XCircle,
        label: 'Rejected' 
      }
    };
    
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(nomination.adminReview?.status || nomination.status);
  const StatusIcon = statusConfig.icon;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-end justify-center p-4 sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4 sm:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Nomination Details
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Status and Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className={`inline-flex items-center px-4 py-2 rounded-lg border ${statusConfig.color}`}>
                <StatusIcon className="h-4 w-4 mr-2" />
                <span className="font-medium">{statusConfig.label}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(nomination.adminReview?.status || nomination.status) !== 'approved' && (
                  <button
                    onClick={() => onStatusUpdate(nomination._id, 'approved', '')}
                    className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </button>
                )}
                {(nomination.adminReview?.status || nomination.status) !== 'rejected' && (
                  <button
                    onClick={() => onStatusUpdate(nomination._id, 'rejected', '')}
                    className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Nominee Photo */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Nominee Photo
                  </h3>
                  
                  <div className="flex justify-center">
                    <div className="relative">
                      {imageUrl ? (
                        <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-200 relative">
                          <img
                            src={imageUrl}
                            alt={nomination.nominee?.firstName ? 
                              `${nomination.nominee.firstName} ${nomination.nominee.lastName}` : 
                              nomination.nomineeName || 'Nominee'
                            }
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
                          />
                          {imageError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                              <span className="text-white text-4xl font-bold">
                                {(nomination.nominee?.firstName || nomination.nomineeName || 'N').charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-48 h-48 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">
                            {(nomination.nominee?.firstName || nomination.nomineeName || 'N').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {imageUrl && (
                    <div className="mt-4 text-center">
                      <a
                        href={imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Full Size
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Nominee Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-500" />
                    Nominee Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2">
                          {nomination.nominee?.firstName && nomination.nominee?.lastName ? 
                            `${nomination.nominee.firstName} ${nomination.nominee.middleName ? nomination.nominee.middleName + ' ' : ''}${nomination.nominee.lastName}` : 
                            nomination.nomineeName || 'Not provided'
                          }
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {nomination.nominee?.email || nomination.nomineeEmail || 'Not provided'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {nomination.nominee?.phone || nomination.nomineePhone || 'Not provided'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-purple-500" />
                          {nomination.awardCategory || nomination.category || 'Not specified'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {nomination.nominee?.location ? 
                            `${nomination.nominee.location.county}${nomination.nominee.location.subcounty ? `, ${nomination.nominee.location.subcounty}` : ''}` :
                            nomination.nomineeLocation || 'Not provided'
                          }
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          School/Organization
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-400" />
                          {nomination.nominee?.school?.name || nomination.nomineeOrganization || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nomination Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Why This Nominee Deserves Recognition
                  </h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {nomination.shortBio || nomination.nominationReason || 'No bio provided'}
                    </p>
                  </div>

                  {(nomination.achievements || nomination.specificAchievements) && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Key Achievements
                      </h4>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {nomination.achievements || nomination.specificAchievements}
                        </p>
                      </div>
                    </div>
                  )}

                  {(nomination.impact || nomination.impactStory) && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Impact Story
                      </h4>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {nomination.impact || nomination.impactStory}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Nominator Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Nominator Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2">
                        {nomination.nominator?.firstName && nomination.nominator?.lastName ? 
                          `${nomination.nominator.firstName} ${nomination.nominator.lastName}` :
                          nomination.nominatorName || 'Anonymous'
                        }
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {nomination.nominator?.email || nomination.nominatorEmail || 'Not provided'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {nomination.nominator?.phone || nomination.nominatorPhone || 'Not provided'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship to Nominee
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2">
                        {nomination.nominator?.relationship || nomination.relationship || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submission Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-gray-500" />
                    Submission Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Submission Date
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(nomination.createdAt || nomination.submittedAt)}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Submission ID
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2 font-mono">
                        {nomination.submissionId || nomination._id}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2">
                        {nomination.nominee?.age || 'Not provided'}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 rounded-md px-3 py-2">
                        {nomination.nominee?.nationality?.replace('-', ' ') || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 sm:px-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-500">
                Last updated: {formatDate(nomination.updatedAt || nomination.createdAt)}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={onClose}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationDetailModal;