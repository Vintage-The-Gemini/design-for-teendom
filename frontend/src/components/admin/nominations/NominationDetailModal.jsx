// File: frontend/src/components/admin/NominationDetailModal.jsx
import { useState } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  FileText, 
  Award,
  Clock,
  Check,
  AlertTriangle,
  Trash2,
  Download,
  Eye,
  MessageSquare
} from 'lucide-react';

const NominationDetailModal = ({ nomination, isOpen, onClose, onStatusUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [reviewNotes, setReviewNotes] = useState(nomination?.adminReview?.notes || '');
  const [newStatus, setNewStatus] = useState(nomination?.adminReview?.status || 'pending');

  if (!isOpen || !nomination) return null;

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format date helper
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === nomination.adminReview?.status) return;
    
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

  // Handle delete
  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(nomination._id);
      setShowConfirmDelete(false);
      onClose();
    } catch (error) {
      console.error('Error deleting nomination:', error);
      alert('Failed to delete nomination');
    } finally {
      setLoading(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', icon: Check, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: X, label: 'Rejected' },
      'needs-info': { color: 'bg-blue-100 text-blue-800', icon: AlertTriangle, label: 'Needs Info' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.label}
      </span>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal */}
            <div 
              className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-red-600 text-white p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6" />
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold truncate">
                        {nomination.nominee.firstName} {nomination.nominee.lastName}
                      </h3>
                      <p className="text-red-100 text-sm sm:text-base">
                        {nomination.awardCategory} • {nomination.submissionId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={nomination.adminReview?.status || 'pending'} />
                    <button
                      onClick={onClose}
                      className="text-white hover:text-red-200 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                  
                  {/* Nominee Information */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-red-600" />
                      Nominee Information
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Full Name:</span>
                          <span>
                            {nomination.nominee.firstName} {nomination.nominee.middleName} {nomination.nominee.lastName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Date of Birth:</span>
                          <span>
                            {formatDate(nomination.nominee.dateOfBirth)} 
                            ({calculateAge(nomination.nominee.dateOfBirth)} years old)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Gender:</span>
                          <span className="capitalize">{nomination.nominee.gender}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Email:</span>
                          <a href={`mailto:${nomination.nominee.email}`} className="text-red-600 hover:underline truncate">
                            {nomination.nominee.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Phone:</span>
                          <span>{nomination.nominee.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Nationality:</span>
                          <span className="capitalize">{nomination.nominee.nationality?.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Location:</span>
                          <span>
                            {nomination.nominee.location?.ward && `${nomination.nominee.location.ward}, `}
                            {nomination.nominee.location?.subcounty && `${nomination.nominee.location.subcounty}, `}
                            {nomination.nominee.location?.county}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <School className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">School:</span>
                          <span>
                            {nomination.nominee.school?.name || 'N/A'}
                            {nomination.nominee.school?.level && ` (${nomination.nominee.school.level})`}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Grade/Class:</span>
                          <span>{nomination.nominee.school?.grade || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Nominator Information */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-red-600" />
                      Nominator Information
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Name:</span>
                        <span>{nomination.nominator.firstName} {nomination.nominator.lastName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Email:</span>
                        <a href={`mailto:${nomination.nominator.email}`} className="text-red-600 hover:underline">
                          {nomination.nominator.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Phone:</span>
                        <span>{nomination.nominator.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Relationship:</span>
                        <span className="capitalize">{nomination.nominator.relationship}</span>
                      </div>
                      {nomination.nominator.organization && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Organization:</span>
                          <span>{nomination.nominator.organization}</span>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Content Sections */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-red-600" />
                      Nomination Content
                    </h4>
                    <div className="space-y-6">
                      
                      {/* Short Bio */}
                      {nomination.shortBio && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Short Biography</h5>
                          <p className="text-gray-700 leading-relaxed">{nomination.shortBio}</p>
                          <small className="text-gray-500">{nomination.shortBio.length} words</small>
                        </div>
                      )}

                      {/* Achievements */}
                      {nomination.achievements && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Key Achievements</h5>
                          <p className="text-gray-700 leading-relaxed">{nomination.achievements}</p>
                        </div>
                      )}

                      {/* Impact Statement */}
                      {nomination.impact && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Impact Statement</h5>
                          <p className="text-gray-700 leading-relaxed">{nomination.impact}</p>
                          <small className="text-gray-500">{nomination.impact.length} words</small>
                        </div>
                      )}

                      {/* Why Deserve Award */}
                      {nomination.whyDeserveAward && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Why They Deserve This Award</h5>
                          <p className="text-gray-700 leading-relaxed">{nomination.whyDeserveAward}</p>
                        </div>
                      )}

                      {/* Additional Information */}
                      {nomination.additionalInfo && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Additional Information</h5>
                          <p className="text-gray-700 leading-relaxed">{nomination.additionalInfo}</p>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Referee Information */}
                  {nomination.referee && (
                    <section>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-red-600" />
                        Referee Information
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Name:</span>
                          <span>{nomination.referee.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Email:</span>
                          <a href={`mailto:${nomination.referee.email}`} className="text-red-600 hover:underline">
                            {nomination.referee.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Position:</span>
                          <span>{nomination.referee.position}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Organization:</span>
                          <span>{nomination.referee.organization}</span>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Files and Media */}
                  {(nomination.nominee.photo || nomination.files?.photo || nomination.supportingFiles?.length > 0 || nomination.files?.supportingFiles?.length > 0) && (
                    <section>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Download className="w-5 h-5 mr-2 text-red-600" />
                        Files & Media
                      </h4>
                      <div className="space-y-4">
                        {/* Nominee Photo */}
                        {(nomination.nominee.photo || nomination.files?.photo || nomination.cloudinary?.photo) && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-2">Nominee Photo</h5>
                            <div className="flex items-start space-x-4">
                              <div className="relative">
                                <img 
                                  src={
                                    // Priority: Cloudinary URL first, then files structure, then fallback
                                    nomination.cloudinary?.photo?.url ||
                                    nomination.files?.photo?.url ||
                                    (nomination.nominee.photo?.startsWith('https://') ? nomination.nominee.photo : null) ||
                                    (nomination.nominee.photo ? `http://localhost:5000/uploads/nominations/${nomination.nominee.photo}` : null)
                                  }
                                  alt={`${nomination.nominee.firstName} ${nomination.nominee.lastName}`}
                                  className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200 shadow-md"
                                  onError={(e) => {
                                    console.error('Image failed to load:', e.target.src);
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                  }}
                                />
                                <div 
                                  className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 items-center justify-center flex-col text-gray-500 text-sm hidden"
                                  id="fallback-image"
                                >
                                  <User className="w-8 h-8 mb-2" />
                                  <span>Image not found</span>
                                  <small className="mt-1 text-center text-xs">
                                    {nomination.cloudinary?.photo?.publicId || 
                                     nomination.files?.photo?.filename || 
                                     nomination.nominee.photo}
                                  </small>
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-2">
                                  {nomination.cloudinary?.photo?.publicId || 
                                   nomination.files?.photo?.filename || 
                                   nomination.nominee.photo || 'nominee-photo.jpg'}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                  Uploaded with nomination on {formatDate(nomination.createdAt)}
                                  {nomination.cloudinary?.photo && (
                                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                      ☁️ Cloudinary
                                    </span>
                                  )}
                                </p>
                                
                                {/* Debug info */}
                                <div className="text-xs text-gray-500 mb-3 p-2 bg-yellow-50 rounded">
                                  <strong>Debug Info:</strong><br/>
                                  <strong>Cloudinary:</strong> {nomination.cloudinary?.photo?.url || 'Not found'}<br/>
                                  <strong>Files:</strong> {nomination.files?.photo?.url || 'Not found'}<br/>
                                  <strong>Nominee:</strong> {nomination.nominee.photo || 'Not found'}<br/>
                                  <strong>Final URL:</strong> {
                                    nomination.cloudinary?.photo?.url ||
                                    nomination.files?.photo?.url ||
                                    (nomination.nominee.photo?.startsWith('https://') ? nomination.nominee.photo : null) ||
                                    (nomination.nominee.photo ? `http://localhost:5000/uploads/nominations/${nomination.nominee.photo}` : 'No URL available')
                                  }
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <a 
                                    href={
                                      nomination.cloudinary?.photo?.url ||
                                      nomination.files?.photo?.url ||
                                      (nomination.nominee.photo?.startsWith('https://') ? nomination.nominee.photo : null) ||
                                      (nomination.nominee.photo ? `http://localhost:5000/uploads/nominations/${nomination.nominee.photo}` : '#')
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm transition-colors"
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Full Size
                                  </a>
                                  <a 
                                    href={
                                      nomination.cloudinary?.photo?.url ||
                                      nomination.files?.photo?.url ||
                                      (nomination.nominee.photo?.startsWith('https://') ? nomination.nominee.photo : null) ||
                                      (nomination.nominee.photo ? `http://localhost:5000/uploads/nominations/${nomination.nominee.photo}` : '#')
                                    }
                                    download={`${nomination.nominee.firstName}_${nomination.nominee.lastName}_photo.jpg`}
                                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-sm transition-colors"
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Supporting Files */}
                        {(nomination.supportingFiles?.length > 0 || nomination.files?.supportingFiles?.length > 0 || nomination.cloudinary?.supportingFiles?.length > 0) && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-2">Supporting Documents</h5>
                            <div className="space-y-2">
                              {/* Handle different data structures for supporting files */}
                              {(nomination.cloudinary?.supportingFiles || nomination.files?.supportingFiles || nomination.supportingFiles || []).map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-white rounded p-3">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-gray-500" />
                                    <div>
                                      <span className="font-medium block">
                                        {file.publicId || file.filename || file.originalName || `Document ${index + 1}`}
                                      </span>
                                      {file.cloudinary && (
                                        <small className="text-blue-600">☁️ Stored in Cloudinary</small>
                                      )}
                                    </div>
                                  </div>
                                  <a 
                                    href={
                                      file.url || 
                                      (file.filename ? `http://localhost:5000/uploads/nominations/${file.filename}` : '#')
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-red-600 hover:underline text-sm"
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Social Media Links */}
                  {nomination.socialMediaLinks && Object.keys(nomination.socialMediaLinks).length > 0 && (
                    <section>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        {Object.entries(nomination.socialMediaLinks).map(([platform, url]) => (
                          url && (
                            <div key={platform} className="flex items-center space-x-2">
                              <span className="font-medium capitalize">{platform}:</span>
                              <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-red-600 hover:underline"
                              >
                                {url}
                              </a>
                            </div>
                          )
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Submission Metadata */}
                  <section>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Submitted:</span>
                        <span>{formatDate(nomination.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Status:</span>
                        <StatusBadge status={nomination.adminReview?.status || 'pending'} />
                      </div>
                      {nomination.adminReview?.reviewDate && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Last Reviewed:</span>
                          <span>{formatDate(nomination.adminReview.reviewDate)}</span>
                        </div>
                      )}
                    </div>
                  </section>

                </div>
              </div>

              {/* Footer - Admin Actions */}
              <div className="bg-gray-50 p-4 sm:p-6 border-t space-y-4">
                {/* Review Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Notes
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Add notes about this nomination..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">Status:</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="needs-info">Needs Info</option>
                      </select>
                    </div>
                    <button
                      onClick={handleStatusUpdate}
                      disabled={loading || newStatus === nomination.adminReview?.status}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <Check className="w-4 h-4" />
                      <span>{loading ? 'Updating...' : 'Update Status'}</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => setShowConfirmDelete(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold">Confirm Delete</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this nomination? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NominationDetailModal;