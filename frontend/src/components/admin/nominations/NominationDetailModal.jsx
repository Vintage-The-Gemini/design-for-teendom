// File: frontend/src/components/admin/nominations/NominationDetailModal.jsx

import React, { useState, useEffect } from 'react';
import { 
  X, User, Calendar, Mail, Phone, MapPin, School, FileText, Award,
  Clock, CheckCircle, XCircle, AlertTriangle, Trash2, Download, Eye, MessageSquare,
  ExternalLink, Image as ImageIcon, Cloud, Server, AlertCircle
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
        <div className="inline-block w-full max-w-6xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div>
              <h3 className="text-2xl font-bold leading-6 text-gray-900">
                Nomination Details
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                ID: {nomination.submissionId} | Submitted: {formatDate(nomination.submittedAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Nominee Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Nominee Header */}
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
                          <Cloud className="w-3 h-3" />
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
                      {nomination.nominee?.age} years old • {nomination.nominee?.gender}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{nomination.nominee?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{nomination.nominee?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{nomination.nominee?.address?.city}, {nomination.nominee?.address?.country}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <School className="w-4 h-4 text-gray-400" />
                      <span>{nomination.nominee?.school?.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category & Statement */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-lg">{nomination.category}</span>
                </div>
                
                {nomination.statement && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Nomination Statement</h5>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{nomination.statement}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Nominator Info */}
              {nomination.nominator && (
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Nominated by
                  </h5>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">{nomination.nominator.firstName} {nomination.nominator.lastName}</span>
                      </div>
                      <div className="text-gray-600">{nomination.nominator.email}</div>
                      <div className="text-gray-600">{nomination.nominator.phone}</div>
                      <div className="text-gray-600">{nomination.nominator.relationship}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Supporting Files */}
              {nomination.files && (
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Supporting Documents
                  </h5>
                  <div className="space-y-2">
                    {Object.entries(nomination.files).map(([key, file]) => (
                      <div key={key} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{key}</span>
                          {file.cloudinary && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              <Cloud className="w-3 h-3 mr-1" />
                              Cloudinary
                            </span>
                          )}
                        </div>
                        {(file.cloudinary || file.local) && (
                          <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span className="text-xs">Download</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Admin Actions */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Current Status</h5>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(nomination.adminReview?.status || 'pending')}`}>
                  {nomination.adminReview?.status === 'approved' && <CheckCircle className="w-4 h-4 mr-2" />}
                  {nomination.adminReview?.status === 'rejected' && <XCircle className="w-4 h-4 mr-2" />}
                  {nomination.adminReview?.status === 'under-review' && <Clock className="w-4 h-4 mr-2" />}
                  {(!nomination.adminReview?.status || nomination.adminReview?.status === 'pending') && <AlertTriangle className="w-4 h-4 mr-2" />}
                  {nomination.adminReview?.status || 'Pending'}
                </div>
              </div>

              {/* Review Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                  placeholder="Add your review notes here..."
                />
              </div>

              {/* Status Actions */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Actions</h5>
                <div className="space-y-2">
                  <button
                    onClick={() => handleStatusUpdate('approved')}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('under-review')}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Under Review</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>

              {/* Delete Action */}
              <div className="border-t pt-4">
                <button
                  onClick={() => onDelete && onDelete(nomination._id)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-red-600 rounded-lg hover:bg-red-50 border border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Nomination</span>
                </button>
              </div>

              {/* Submission Info */}
              <div className="text-xs text-gray-500 space-y-1">
                <div>Submitted: {formatDate(nomination.submittedAt)}</div>
                <div>ID: {nomination.submissionId}</div>
                {nomination.adminReview?.updatedAt && (
                  <div>Last Updated: {formatDate(nomination.adminReview.updatedAt)}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationDetailModal;