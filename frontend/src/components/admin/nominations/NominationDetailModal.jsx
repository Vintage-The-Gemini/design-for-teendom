// File: frontend/src/components/admin/nominations/NominationDetailModal.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, User, Calendar, Mail, Phone, MapPin, School, FileText, Award,
  Clock, Check, AlertTriangle, Trash2, Download, Eye, MessageSquare,
  CheckCircle, XCircle, ExternalLink
} from 'lucide-react';

const NominationDetailModal = ({ nomination, isOpen, onClose, onStatusUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [newStatus, setNewStatus] = useState('pending');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (nomination) {
      setReviewNotes(nomination.adminReview?.notes || '');
      setNewStatus(nomination.adminReview?.status || 'pending');
      setImageError(false);
    }
  }, [nomination]);

  if (!isOpen || !nomination) return null;

  // FIXED: Smart image URL resolution with multiple fallbacks
  const getImageUrl = () => {
    const baseUrl = 'http://localhost:5000';
    
    // Priority 1: Cloudinary URL (best quality, fast CDN)
    if (nomination.cloudinary?.photo?.url) {
      return nomination.cloudinary.photo.url;
    }
    
    // Priority 2: Admin access URLs (designed for admin viewing)
    if (nomination.adminAccessUrls?.nomineePhoto) {
      return nomination.adminAccessUrls.nomineePhoto.startsWith('http') 
        ? nomination.adminAccessUrls.nomineePhoto
        : `${baseUrl}${nomination.adminAccessUrls.nomineePhoto}`;
    }
    
    // Priority 3: Local server file (backup storage)
    if (nomination.files?.photo?.filename) {
      return `${baseUrl}/uploads/nominations/${nomination.files.photo.filename}`;
    }
    
    // Priority 4: Any non-blob URL in files
    if (nomination.files?.photo?.url && !nomination.files.photo.url.startsWith('blob:')) {
      return nomination.files.photo.url.startsWith('http') 
        ? nomination.files.photo.url 
        : `${baseUrl}${nomination.files.photo.url}`;
    }
    
    // Fallback: Placeholder
    return '/placeholder-photo.jpg';
  };

  const imageUrl = getImageUrl();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStatusUpdate = async () => {
    if (newStatus === nomination.adminReview?.status) return;
    
    setLoading(true);
    try {
      await onStatusUpdate(nomination._id, newStatus, reviewNotes);
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update nomination status');
    } finally {
      setLoading(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const configs = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' },
      'needs-info': { bg: 'bg-blue-100', text: 'text-blue-800', icon: AlertTriangle, label: 'Needs Info' }
    };
    
    const config = configs[status] || configs.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-2 md:px-4 py-4 flex items-start justify-center">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden my-4">
          
          {/* Header */}
          <div className="bg-red-600 text-white p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <Award className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold truncate">
                    {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                  </h3>
                  <p className="text-red-100 text-sm truncate">
                    {nomination.awardCategory} • {nomination.submissionId}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <StatusBadge status={nomination.adminReview?.status || 'pending'} />
                <button
                  onClick={onClose}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-[60vh] md:max-h-[65vh] overflow-y-auto">
            <div className="p-4 md:p-6 space-y-6">
              
              {/* ENHANCED: Nominee Section with FIXED Image Display */}
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-red-600" />
                  Nominee Information
                </h4>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
                    
                    {/* FIXED: Photo Display with Multiple Fallbacks */}
                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                      <div className="relative group">
                        <img
                          src={imageUrl}
                          alt={`${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover border-4 border-white shadow-lg"
                          onError={(e) => {
                            console.error('Image load failed:', e.target.src);
                            setImageError(true);
                            e.target.src = '/placeholder-photo.jpg';
                          }}
                          onLoad={() => setImageError(false)}
                        />
                        
                        {/* Storage Type Indicator */}
                        <div className="absolute -top-2 -right-2">
                          {nomination.cloudinary?.photo?.url ? (
                            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg" title="Cloudinary CDN">
                              CLOUD
                            </div>
                          ) : nomination.files?.photo?.filename ? (
                            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg" title="Local Server">
                              LOCAL
                            </div>
                          ) : (
                            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg" title="No Image">
                              ERROR
                            </div>
                          )}
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <a
                              href={imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              title="View Full Size"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            <a
                              href={imageUrl}
                              download={`${nomination.nominee?.firstName}_${nomination.nominee?.lastName}_photo.jpg`}
                              className="bg-white text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                              title="Download Image"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image Details Card */}
                      <div className="mt-3 bg-white rounded-lg p-3 border text-xs">
                        <h6 className="font-semibold text-gray-700 mb-2">Image Details</h6>
                        <div className="space-y-1 text-gray-600">
                          <div className="flex justify-between">
                            <span>Cloudinary:</span>
                            <span className={nomination.cloudinary?.photo?.url ? 'text-green-600 font-medium' : 'text-red-500'}>
                              {nomination.cloudinary?.photo?.url ? 'Available' : 'Not Found'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Local Backup:</span>
                            <span className={nomination.files?.photo?.filename ? 'text-green-600 font-medium' : 'text-red-500'}>
                              {nomination.files?.photo?.filename ? 'Available' : 'Not Found'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className={imageError ? 'text-red-500' : 'text-green-600 font-medium'}>
                              {imageError ? 'Load Error' : 'Loading OK'}
                            </span>
                          </div>
                        </div>
                        {nomination.cloudinary?.photo?.url && (
                          <div className="mt-2 pt-2 border-t">
                            <span className="text-gray-500">URL:</span>
                            <p className="text-xs text-blue-600 break-all mt-1">
                              {nomination.cloudinary.photo.url.substring(0, 50)}...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-3">
                          <div>
                            <span className="block font-medium text-gray-600 mb-1">Full Name</span>
                            <p className="text-gray-900 font-medium">
                              {nomination.nominee?.firstName} {nomination.nominee?.middleName} {nomination.nominee?.lastName}
                            </p>
                          </div>
                          <div>
                            <span className="block font-medium text-gray-600 mb-1">Age & Gender</span>
                            <p className="text-gray-900">{nomination.nominee?.age} years old, {nomination.nominee?.gender}</p>
                          </div>
                          <div>
                            <span className="block font-medium text-gray-600 mb-1">Contact</span>
                            <div className="space-y-1">
                              <p className="text-gray-900 flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                {nomination.nominee?.email}
                              </p>
                              <p className="text-gray-900 flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                {nomination.nominee?.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="block font-medium text-gray-600 mb-1">Location</span>
                            <p className="text-gray-900 flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              {nomination.nominee?.county}, {nomination.nominee?.subcounty}
                            </p>
                          </div>
                          <div>
                            <span className="block font-medium text-gray-600 mb-1">Education</span>
                            <p className="text-gray-900 flex items-center">
                              <School className="w-4 h-4 mr-2 text-gray-400" />
                              {nomination.nominee?.school?.name || 'Not specified'}
                            </p>
                            {nomination.nominee?.school?.level && (
                              <p className="text-gray-600 text-sm ml-6">{nomination.nominee.school.level}</p>
                            )}
                          </div>
                          <div>
                            <span className="block font-medium text-gray-600 mb-1">Nationality</span>
                            <p className="text-gray-900 capitalize">{nomination.nominee?.nationality?.replace('-', ' ')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Nomination Content */}
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-600" />
                  Nomination Statement
                </h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Short Bio</h5>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {nomination.shortBio || 'No biography provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Key Achievements</h5>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                        {nomination.achievements || 'No achievements listed'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Impact Statement</h5>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                        {nomination.impact || 'No impact statement provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Why Deserves Award</h5>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                        {nomination.whyDeserveAward || 'No statement provided'}
                      </p>
                    </div>
                  </div>

                  {nomination.additionalInfo && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">Additional Information</h5>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                          {nomination.additionalInfo}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Nominator Information */}
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Nominator Information</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Name:</span>
                      <p className="text-gray-900">
                        {nomination.nominator?.firstName} {nomination.nominator?.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Relationship:</span>
                      <p className="text-gray-900 capitalize">{nomination.nominator?.relationship}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <p className="text-gray-900">{nomination.nominator?.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <p className="text-gray-900">{nomination.nominator?.phone}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Referee Information */}
              {nomination.referee && (
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Referee Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Name:</span>
                        <p className="text-gray-900">{nomination.referee.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Position:</span>
                        <p className="text-gray-900">{nomination.referee.position}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Organization:</span>
                        <p className="text-gray-900">{nomination.referee.organization}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Contact:</span>
                        <p className="text-gray-900">{nomination.referee.email}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Files & Supporting Documents */}
              {(nomination.supportingFiles?.length > 0 || nomination.files?.supportingFiles?.length > 0) && (
                <section>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Supporting Documents</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {nomination.files?.supportingFiles?.length || 0} supporting files uploaded
                    </p>
                    <div className="text-xs text-gray-500">
                      Files are stored securely and available for review
                    </div>
                  </div>
                </section>
              )}

              {/* Submission Metadata */}
              <section>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Submitted:</span>
                      <p className="text-gray-900">{formatDate(nomination.createdAt)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Category:</span>
                      <p className="text-gray-900">{nomination.awardCategory}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Submission ID:</span>
                      <p className="text-gray-900 font-mono text-xs">{nomination.submissionId}</p>
                    </div>
                  </div>
                  
                  {nomination.adminReview?.reviewDate && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="font-medium text-gray-600">Last Reviewed:</span>
                      <p className="text-gray-900">{formatDate(nomination.adminReview.reviewDate)}</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* ENHANCED Footer - Admin Actions */}
          <div className="bg-gray-50 border-t p-4 md:p-6 space-y-4">
            
            {/* Review Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Notes
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Add notes about this nomination..."
              />
            </div>

            {/* Status Update Actions */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="needs-info">Needs Info</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleStatusUpdate}
                  disabled={loading || newStatus === nomination.adminReview?.status}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>{loading ? 'Updating...' : 'Update Status'}</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
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