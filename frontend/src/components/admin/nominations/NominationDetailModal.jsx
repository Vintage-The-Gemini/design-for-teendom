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

  // FIXED: Enhanced image URL resolution based on your actual data structure
  const getImageUrl = () => {
    console.log('🔍 Resolving image URL for nomination:', nomination.submissionId);
    
    // Priority 1: Cloudinary CDN URL (YOU HAVE THIS!)
    if (nomination.cloudinary?.photo?.url) {
      console.log('✅ Using Cloudinary URL:', nomination.cloudinary.photo.url);
      return nomination.cloudinary.photo.url;
    }
    
    // Priority 2: Cloudinary HTTPS URL (secure_url - YOU HAVE THIS TOO!)
    if (nomination.cloudinary?.photo?.secure_url) {
      console.log('✅ Using Cloudinary HTTPS URL:', nomination.cloudinary.photo.secure_url);
      return nomination.cloudinary.photo.secure_url;
    }
    
    // Priority 3: Admin access URLs (currently empty in your data)
    if (nomination.adminAccessUrls?.nomineePhoto) {
      const adminUrl = nomination.adminAccessUrls.nomineePhoto;
      const fullUrl = adminUrl.startsWith('http') ? adminUrl : `http://localhost:5000${adminUrl}`;
      console.log('✅ Using admin access URL:', fullUrl);
      return fullUrl;
    }
    
    // Priority 4: Local server file (YOU HAVE THIS!)
    if (nomination.files?.photo?.filename) {
      const localUrl = `http://localhost:5000/uploads/nominations/${nomination.files.photo.filename}`;
      console.log('✅ Using local file URL:', localUrl);
      return localUrl;
    }
    
    // Priority 5: File URL with proper base (YOU HAVE THIS!)
    if (nomination.files?.photo?.url) {
      const fileUrl = nomination.files.photo.url.startsWith('http') 
        ? nomination.files.photo.url 
        : `http://localhost:5000${nomination.files.photo.url}`;
      console.log('✅ Using file URL:', fileUrl);
      return fileUrl;
    }
    
    console.log('❌ No valid image URL found');
    return 'https://via.placeholder.com/400x400?text=No+Image';
  };

  // Get image source type for display
  const getImageSourceType = () => {
    if (nomination.cloudinary?.photo?.url) {
      return { type: 'cloudinary', label: 'Cloudinary CDN', color: 'green', icon: <CloudDownload className="w-3 h-3" /> };
    }
    if (nomination.adminAccessUrls?.nomineePhoto) {
      return { type: 'admin', label: 'Admin URL', color: 'blue', icon: <ExternalLink className="w-3 h-3" /> };
    }
    if (nomination.files?.photo?.filename) {
      return { type: 'local', label: 'Local Server', color: 'yellow', icon: <Server className="w-3 h-3" /> };
    }
    return { type: 'error', label: 'No Image', color: 'red', icon: <AlertCircle className="w-3 h-3" /> };
  };

  // FIXED: Handle all possible object structures
  const formatField = (field) => {
    if (!field) return 'Not provided';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      // Handle location objects
      if (field.county || field.subcounty || field.ward) {
        const parts = [];
        if (field.ward) parts.push(field.ward);
        if (field.subcounty) parts.push(field.subcounty);
        if (field.county) parts.push(field.county);
        return parts.join(', ') || 'Not provided';
      }
      // Handle school objects with name, level, grade
      if (field.name || field.level || field.grade) {
        const parts = [];
        if (field.name) parts.push(field.name);
        if (field.level) parts.push(field.level);
        if (field.grade) parts.push(field.grade);
        return parts.join(' - ') || 'Not provided';
      }
      // Handle any other object
      try {
        return Object.values(field).filter(v => v).join(' - ') || 'Not provided';
      } catch {
        return 'Not provided';
      }
    }
    return String(field);
  };

  const imageUrl = getImageUrl();
  const imageSource = getImageSourceType();

  // Handle status update
  const handleStatusUpdate = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/admin/nominations/${nomination._id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus,
          notes: reviewNotes,
          sendNotification: true
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Status updated:', result);

      // Call parent callback
      if (onStatusUpdate) {
        onStatusUpdate(nomination._id, newStatus, reviewNotes);
      }

      // Close modal
      onClose();
    } catch (error) {
      console.error('❌ Status update error:', error);
      alert('Failed to update status: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion
  const handleDelete = async () => {
    const confirmMessage = `Are you sure you want to permanently delete this nomination for ${nomination.nominee?.firstName} ${nomination.nominee?.lastName}? This action cannot be undone.`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/admin/nominations/${nomination._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete nomination: ${response.status}`);
      }

      console.log('✅ Nomination deleted');

      // Call parent callback
      if (onDelete) {
        onDelete(nomination._id);
      }

      // Close modal
      onClose();
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert('Failed to delete nomination: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Submission ID: {nomination.submissionId}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto space-y-6">
            
            {/* Nominee Information with FIXED Image Display */}
            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Nominee Information
              </h4>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
                  
                  {/* FIXED: Enhanced Photo Display */}
                  <div className="flex-shrink-0 mx-auto lg:mx-0">
                    <div className="relative group">
                      {imageError || imageSource.type === 'error' ? (
                        <div className="w-40 h-40 rounded-xl bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No Image</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {imageLoading && (
                            <div className="absolute inset-0 w-40 h-40 rounded-xl bg-gray-200 animate-pulse flex items-center justify-center">
                              <div className="text-sm text-gray-500">Loading...</div>
                            </div>
                          )}
                          <img
                            src={imageUrl}
                            alt={`${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`}
                            className={`w-40 h-40 rounded-xl object-cover border-4 border-white shadow-lg ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                            onLoad={() => {
                              setImageLoading(false);
                              setImageError(false);
                              console.log('✅ Image loaded successfully:', imageUrl);
                            }}
                            onError={(e) => {
                              console.error('❌ Image failed to load:', e.target.src);
                              setImageLoading(false);
                              setImageError(true);
                              e.target.style.display = 'none';
                            }}
                          />
                        </>
                      )}
                      
                      {/* Image Source Indicator */}
                      <div className="absolute -top-2 -right-2">
                        <div className={`bg-${imageSource.color}-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg flex items-center space-x-1`} title={imageSource.label}>
                          {imageSource.icon}
                          <span>{imageSource.type.toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      {!imageError && imageSource.type !== 'error' && (
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
                      )}
                    </div>
                    
                    {/* Image Technical Details */}
                    <div className="mt-4 bg-white rounded-lg p-3 border text-xs">
                      <h6 className="font-semibold text-gray-700 mb-2">Image Details</h6>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between">
                          <span>Source:</span>
                          <span className={`text-${imageSource.color}-600 font-medium`}>
                            {imageSource.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cloudinary:</span>
                          <span className={nomination.cloudinary?.photo?.url ? 'text-green-600 font-medium' : 'text-red-500'}>
                            {nomination.cloudinary?.photo?.url ? '✓ Available' : '✗ Not Available'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Local File:</span>
                          <span className={nomination.files?.photo?.filename ? 'text-green-600 font-medium' : 'text-red-500'}>
                            {nomination.files?.photo?.filename ? '✓ Available' : '✗ Not Available'}
                          </span>
                        </div>
                        {nomination.cloudinary?.photo?.publicId && (
                          <div className="flex justify-between">
                            <span>Public ID:</span>
                            <span className="text-blue-600 font-mono text-xs">
                              {nomination.cloudinary.photo.publicId}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-gray-900 font-medium">
                          {nomination.nominee?.firstName} {nomination.nominee?.lastName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                        <p className="text-gray-900 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {nomination.nominee?.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone Number</label>
                        <p className="text-gray-900 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {nomination.nominee?.phone || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <p className="text-gray-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {formatField(nomination.nominee?.location)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">School/Organization</label>
                        <p className="text-gray-900 flex items-center">
                          <School className="w-4 h-4 mr-2 text-gray-400" />
                          {formatField(nomination.nominee?.school)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Award Category</label>
                        <p className="text-gray-900 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-purple-500" />
                          {nomination.awardCategory}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Nomination Details */}
            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Nomination Details
              </h4>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Why is this person deserving of this award?</label>
                    <div className="mt-1 p-3 bg-white rounded border text-gray-900 whitespace-pre-wrap">
                      {nomination.nominationReason || 'Not provided'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Supporting Evidence/Examples</label>
                    <div className="mt-1 p-3 bg-white rounded border text-gray-900 whitespace-pre-wrap">
                      {nomination.supportingEvidence || 'Not provided'}
                    </div>
                  </div>

                  {nomination.supportingFiles && nomination.supportingFiles.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Supporting Files</label>
                      <div className="mt-2 space-y-2">
                        {nomination.supportingFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <span className="text-sm text-gray-900">{file.originalName || `File ${index + 1}`}</span>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Nominator Information */}
            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-600" />
                Nominator Information
              </h4>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">
                      {nomination.nominator?.firstName} {nomination.nominator?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{nomination.nominator?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Relationship to Nominee</label>
                    <p className="text-gray-900">{nomination.nominator?.relationship || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{nomination.nominator?.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Submission Info */}
            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Submission Information
              </h4>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submitted Date</label>
                    <p className="text-gray-900">
                      {new Date(nomination.submittedAt || nomination.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Submission ID</label>
                    <p className="text-gray-900 font-mono">{nomination.submissionId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Status</label>
                    <p className="text-gray-900 capitalize">{nomination.status}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ADMIN ACTIONS - Review Only, No Edit */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Status Selection */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Review Status:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={loading}
                >
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="needs-info">Needs More Info</option>
                </select>
              </div>

              {/* Review Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes (optional)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add any notes about your review decision..."
                  disabled={loading}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button
                    onClick={handleStatusUpdate}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Update Status
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>

                {/* DELETE BUTTON - Red Theme */}
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                  title="Permanently delete this nomination"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Nomination
                </button>
              </div>

              {/* Current Review Status Display */}
              {nomination.adminReview?.reviewed && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h6 className="font-medium text-blue-900">Previous Review</h6>
                      <p className="text-sm text-blue-800 mt-1">
                        Status: <span className="font-medium capitalize">{nomination.adminReview.status}</span>
                      </p>
                      {nomination.adminReview.notes && (
                        <p className="text-sm text-blue-700 mt-1 bg-white p-2 rounded border">
                          "{nomination.adminReview.notes}"
                        </p>
                      )}
                      <p className="text-xs text-blue-600 mt-2">
                        Reviewed on {new Date(nomination.adminReview.reviewDate).toLocaleDateString()}
                      </p>
                    </div>
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