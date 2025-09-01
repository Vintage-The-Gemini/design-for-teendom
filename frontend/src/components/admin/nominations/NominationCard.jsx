// File: frontend/src/components/admin/nominations/NominationCard.jsx

import React, { useState } from 'react';
import { Eye, Check, X, AlertCircle, Trash2, MoreVertical, User, Mail, Phone, MapPin, Award, Calendar } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import { resolveImageUrl } from '../../../utils/imageUtils';

const NominationCard = ({ nomination, onView, onUpdateStatus, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = resolveImageUrl(nomination);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await onUpdateStatus(nomination._id, newStatus);
      setDropdownOpen(false);
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const birth = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    return `${age} years`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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
                {nomination.nominee?.firstName || 'N/A'} {nomination.nominee?.lastName || ''}
              </h3>
              <p className="text-sm text-gray-600">ID: {nomination.submissionId}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatAge(nomination.nominee?.dateOfBirth)}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {nomination.nominee?.county || 'N/A'}
                </span>
                <span className="flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  {nomination.awardCategory || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center space-x-2">
            <StatusBadge 
              status={nomination.status} 
              adminStatus={nomination.adminReview?.status} 
            />
            
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
                  <div className="py-1">
                    <button
                      onClick={() => onView(nomination)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={() => handleStatusUpdate('approved')}
                      className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate('rejected')}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate('needs-info')}
                      className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Needs Info
                    </button>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={() => onDelete(nomination._id)}
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

        {/* Contact and Bio */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {nomination.nominee?.email && (
              <span className="flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                {nomination.nominee.email}
              </span>
            )}
            {nomination.nominee?.phone && (
              <span className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {nomination.nominee.phone}
              </span>
            )}
          </div>

          {nomination.shortBio && (
            <div className="text-sm text-gray-600">
              <p className="line-clamp-2">
                {nomination.shortBio.length > 150 
                  ? `${nomination.shortBio.substring(0, 150)}...`
                  : nomination.shortBio
                }
              </p>
            </div>
          )}

          <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
            <span>Submitted: {formatDate(nomination.submittedAt)}</span>
            {nomination.adminReview?.reviewDate && (
              <span>Reviewed: {formatDate(nomination.adminReview.reviewDate)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationCard;