// File: frontend/src/components/admin/nominations/NominationDetailModal.jsx

import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, MapPin, School, Award, FileText, 
  ExternalLink, Calendar, Clock, CheckCircle, XCircle 
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { resolveImageUrl } from '../../../utils/imageUtils';

const NominationDetailModal = ({ nomination, isOpen, onClose, onUpdateStatus, onDelete }) => {
  const [activeTab, setActiveTab] = useState('nominee');
  const [statusNotes, setStatusNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  if (!isOpen || !nomination) return null;

  const imageUrl = resolveImageUrl(nomination);

  const handleStatusUpdate = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await onUpdateStatus(nomination._id, newStatus, statusNotes);
      setStatusNotes('');
      onClose();
    } catch (error) {
      console.error('Status update failed:', error);
    } finally {
      setUpdatingStatus(false);
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

  const tabs = [
    { id: 'nominee', label: 'Nominee Details', icon: User },
    { id: 'nomination', label: 'Nomination Content', icon: FileText },
    { id: 'nominator', label: 'Nominator', icon: Mail },
    { id: 'referee', label: 'Referee', icon: ExternalLink },
    { id: 'review', label: 'Review Status', icon: CheckCircle }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {nomination.nominee?.firstName || 'N/A'} {nomination.nominee?.lastName || ''}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>ID: {nomination.submissionId}</span>
                <span>Category: {nomination.awardCategory}</span>
                <span>Phase: {nomination.phase}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <StatusBadge 
                status={nomination.status} 
                adminStatus={nomination.adminReview?.status} 
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2 inline" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'nominee' && (
            <div className="space-y-6">
              {/* Photo and Basic Info */}
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Nominee"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100" style={{ display: imageUrl ? 'none' : 'flex' }}>
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.firstName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.lastName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.middleName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{formatDate(nomination.nominee?.dateOfBirth)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.age || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.nationality || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Location</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.location?.county || nomination.nominee?.county || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-County</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.location?.subcounty || nomination.nominee?.subcounty || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.location?.ward || nomination.nominee?.ward || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* School Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Education</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.school?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Level</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.nominee?.school?.level || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nomination' && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Award Category</label>
                <p className="text-sm text-gray-900 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {nomination.awardCategory || 'N/A'}
                </p>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Short Biography</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {nomination.shortBio || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Key Achievements</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {nomination.achievements || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Community Impact</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {nomination.impact || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Why They Deserve This Award</label>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {nomination.whyDeserveAward || 'N/A'}
                  </p>
                </div>
              </div>

              {nomination.additionalInfo && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">Additional Information</label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {nomination.additionalInfo}
                    </p>
                  </div>
                </div>
              )}

              {/* Social Media Links */}
              {nomination.socialMediaLinks && Object.values(nomination.socialMediaLinks).some(link => link) && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">Social Media Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(nomination.socialMediaLinks).map(([platform, url]) => (
                      url && (
                        <div key={platform} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                          <span className="text-sm font-medium capitalize text-gray-700">{platform}:</span>
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline text-sm flex items-center"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Profile
                          </a>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'nominator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomination Type</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {nomination.nominator?.isSelfNomination ? 'Self-nomination' : 'Third-party nomination'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {nomination.nominator?.relationship || 'N/A'}
                  </p>
                </div>
              </div>

              {!nomination.nominator?.isSelfNomination && (
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Nominator Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {nomination.nominator?.firstName || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {nomination.nominator?.lastName || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {nomination.nominator?.email || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                        {nomination.nominator?.phone || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'referee' && (
            <div className="space-y-6">
              {nomination.referee ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.referee.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.referee.position || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.referee.organization || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.referee.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{nomination.referee.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Permission</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                      {nomination.referee.allowContact ? 'Yes, allowed to contact' : 'No contact allowed'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No referee information provided</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'review' && (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-lg font-medium text-blue-900 mb-2">Current Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">System Status</label>
                    <p className="text-sm text-blue-900">{nomination.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Phase</label>
                    <p className="text-sm text-blue-900">{nomination.phase}</p>
                  </div>
                </div>
              </div>

              {/* Admin Review */}
              {nomination.adminReview && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Admin Review</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review Status</label>
                      <p className="text-sm text-gray-900">{nomination.adminReview.status || 'Pending'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reviewed</label>
                      <p className="text-sm text-gray-900">{nomination.adminReview.reviewed ? 'Yes' : 'No'}</p>
                    </div>
                    {nomination.adminReview.reviewDate && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Review Date</label>
                        <p className="text-sm text-gray-900">{formatDate(nomination.adminReview.reviewDate)}</p>
                      </div>
                    )}
                    {nomination.adminReview.notes && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <p className="text-sm text-gray-900 bg-white p-2 rounded border">{nomination.adminReview.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Timeline</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Submitted:</span>
                    <span className="text-sm text-gray-900">{formatDate(nomination.submittedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Created:</span>
                    <span className="text-sm text-gray-900">{formatDate(nomination.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Last Updated:</span>
                    <span className="text-sm text-gray-900">{formatDate(nomination.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              ID: {nomination.submissionId} • Submitted: {formatDate(nomination.submittedAt)}
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Add review notes (optional)"
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-sm w-64"
              />
              
              <button
                onClick={() => handleStatusUpdate('approved')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
              >
                Approve
              </button>
              
              <button
                onClick={() => handleStatusUpdate('needs-info')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 disabled:opacity-50"
              >
                Needs Info
              </button>
              
              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={updatingStatus}
                className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
              >
                Reject
              </button>
              
              <button
                onClick={() => onDelete(nomination._id)}
                className="px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
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

export default NominationDetailModal;