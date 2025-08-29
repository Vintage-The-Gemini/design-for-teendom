// File: frontend/src/components/admin/nominations/NominationDetailModal.jsx

import React, { useState, useEffect } from 'react';
import { 
  X, User, Calendar, Mail, Phone, MapPin, School, FileText, Award,
  Clock, CheckCircle, XCircle, AlertTriangle, Trash2, Download, Eye, MessageSquare,
  ExternalLink, Image as ImageIcon, CloudDownload, Server, AlertCircle
} from 'lucide-react';

const NominationDetailModal = ({ nomination, isOpen, onClose, onStatusUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [newStatus, setNewStatus] = useState('pending');
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (nomination) {
      setReviewNotes(nomination.adminReview?.notes || '');
      setNewStatus(nomination.adminReview?.status || 'pending');
      setImageError(false);
      setImageLoading(true);
    }
  }, [nomination]);

  if (!isOpen || !nomination) return null;

  // ONLY use Cloudinary URLs - ignore everything else
  const getImageUrl = () => {
    console.log('🔍 Resolving image URL for nomination:', nomination.submissionId);
    
    // ONLY accept Cloudinary URLs
    if (nomination.nominee?.photo && 
        typeof nomination.nominee.photo === 'string' && 
        nomination.nominee.photo.includes('cloudinary')) {
      console.log('✅ Using Cloudinary URL:', nomination.nominee.photo);
      return nomination.nominee.photo;
    }
    
    console.log('❌ No Cloudinary image URL found for:', nomination.submissionId);
    console.log('Photo data:', nomination.nominee?.photo);
    return null;
  };

  const imageUrl = getImageUrl();

  const handleStatusUpdate = async (status) => {
    setLoading(true);
    try {
      await onStatusUpdate(nomination._id, status, reviewNotes);
      setNewStatus(status);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl px-6 py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Nomination Details
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-mono">
                {nomination.submissionId}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Nominee Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Nominee Photo & Basic Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Nominee Information
                </h3>
                
                <div className="flex items-start space-x-6">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    {imageError || !imageUrl ? (
                      <div className="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">No image available</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={`${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`}
                          className="w-32 h-32 rounded-xl object-cover border-2 border-gray-200 shadow-md"
                          onError={() => setImageError(true)}
                          onLoad={() => setImageLoading(false)}
                        />
                        {imageLoading && (
                          <div className="absolute inset-0 bg-gray-200 rounded-xl flex items-center justify-center">
                            <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full" />
                          </div>
                        )}
                        {imageUrl.includes('cloudinary') && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                            <CloudDownload className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {nomination.nominee?.firstName} {nomination.nominee?.middleName} {nomination.nominee?.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {nomination.nominee?.age} years old • {nomination.nominee?.gender} • {nomination.nominee?.nationality}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                        Born: {new Date(nomination.nominee?.dateOfBirth).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-purple-600" />
                        {nomination.nominee?.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-purple-600" />
                        {nomination.nominee?.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                        {nomination.nominee?.location?.city}, {nomination.nominee?.location?.county}
                      </div>
                    </div>

                    {nomination.nominee?.school && (
                      <div className="flex items-center text-sm text-gray-600">
                        <School className="w-4 h-4 mr-2 text-purple-600" />
                        {nomination.nominee.school.name} - {nomination.nominee.school.level}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Award Category */}
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  Award Category
                </h3>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="text-xl font-bold text-purple-800">{nomination.awardCategory}</h4>
                </div>
              </div>

              {/* Nomination Content */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Short Biography
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {nomination.shortBio}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-green-600" />
                    Key Achievements
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {nomination.achievements}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                    Impact Statement
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {nomination.impact}
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
                    Why They Deserve This Award
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {nomination.whyDeserveAward}
                  </p>
                </div>

                {nomination.additionalInfo && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-gray-600" />
                      Additional Information
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {nomination.additionalInfo}
                    </p>
                  </div>
                )}
              </div>

              {/* Supporting Files */}
              {nomination.supportingFiles && nomination.supportingFiles.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Download className="w-5 h-5 mr-2 text-green-600" />
                    Supporting Files ({nomination.supportingFiles.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nomination.supportingFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {file.originalName || `File ${index + 1}`}
                          </span>
                        </div>
                        {file.url && (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Status & Actions */}
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(nomination.adminReview?.status || nomination.status)}`}>
                  {nomination.adminReview?.status || nomination.status || 'pending'}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>Submitted:</strong> {formatDate(nomination.createdAt)}</p>
                  {nomination.updatedAt !== nomination.createdAt && (
                    <p><strong>Updated:</strong> {formatDate(nomination.updatedAt)}</p>
                  )}
                </div>
              </div>

              {/* Image Source Info */}
              {imageUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Image Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Source:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        imageUrl.includes('cloudinary') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {imageUrl.includes('cloudinary') ? 'Cloudinary CDN' : 'Local Server'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">✅ Available</span>
                    </div>
                    <a
                      href={imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Full Image
                    </a>
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
                
                <div className="space-y-4">
                  {/* Review Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Notes
                    </label>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Add your review notes..."
                    />
                  </div>

                  {/* Status Update Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStatusUpdate('approved')}
                      disabled={loading}
                      className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('under-review')}
                      disabled={loading}
                      className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Under Review
                    </button>
                    <button
                      onClick={() => handleStatusUpdate('rejected')}
                      disabled={loading}
                      className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                  </div>

                  {/* Delete Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => onDelete(nomination)}
                      disabled={loading}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Nomination
                    </button>
                  </div>
                </div>
              </div>

              {/* Nominator Info */}
              {nomination.nominator && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    Nominated By
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {nomination.nominator.firstName} {nomination.nominator.lastName}</p>
                    <p><strong>Email:</strong> {nomination.nominator.email}</p>
                    <p><strong>Phone:</strong> {nomination.nominator.phone}</p>
                    <p><strong>Organization:</strong> {nomination.nominator.organization}</p>
                    <p><strong>Relationship:</strong> {nomination.nominator.relationshipToNominee}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationDetailModal;