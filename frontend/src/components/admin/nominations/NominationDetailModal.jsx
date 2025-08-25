// File: frontend/src/components/admin/nominations/NominationDetailModal.jsx
import React from 'react';
import {
  XCircle,
  CheckCircle,
  AlertTriangle,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Camera,
  Paperclip
} from 'lucide-react';

const QuickActions = ({ nomination, onApprove, onReject, onRequestInfo, onClose }) => {
  const isReviewed = nomination.adminReview?.status && nomination.adminReview?.status !== 'pending';

  if (isReviewed) {
    return (
      <span className="text-sm text-gray-600 px-4 py-2 bg-gray-200 rounded-lg">
        Status: {nomination.adminReview?.status} by {nomination.adminReview?.reviewer?.name || 'System'}
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          onApprove(nomination._id);
          onClose();
        }}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <CheckCircle className="w-4 h-4" />
        Approve
      </button>
      <button
        onClick={() => {
          onReject(nomination._id);
          onClose();
        }}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <XCircle className="w-4 h-4" />
        Reject
      </button>
      <button
        onClick={() => {
          onRequestInfo(nomination._id, 'Please provide additional information');
          onClose();
        }}
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <AlertTriangle className="w-4 h-4" />
        Request Info
      </button>
    </>
  );
};

const PersonInfoCard = ({ title, person, icon: Icon, bgColor, textColor }) => (
  <div className={`${bgColor} rounded-lg p-4`}>
    <h3 className={`text-lg font-semibold ${textColor} mb-4 flex items-center gap-2`}>
      <Icon className="w-5 h-5" />
      {title}
    </h3>
    <div className="space-y-3 text-sm">
      <div>
        <span className="font-medium text-gray-700">Name:</span>
        <span className="ml-2 text-gray-900">
          {person?.firstName} {person?.lastName}
        </span>
      </div>
      {person?.age && (
        <div>
          <span className="font-medium text-gray-700">Age:</span>
          <span className="ml-2 text-gray-900">{person.age}</span>
        </div>
      )}
      {person?.gender && (
        <div>
          <span className="font-medium text-gray-700">Gender:</span>
          <span className="ml-2 text-gray-900 capitalize">{person.gender}</span>
        </div>
      )}
      {person?.relationship && (
        <div>
          <span className="font-medium text-gray-700">Relationship:</span>
          <span className="ml-2 text-gray-900 capitalize">{person.relationship}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500" />
        <span className="text-gray-900">{person?.email}</span>
      </div>
      {person?.phone && (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-gray-900">{person.phone}</span>
        </div>
      )}
      {person?.location?.county && (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-900">{person.location.county}</span>
        </div>
      )}
      {person?.school?.level && (
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-gray-500" />
          <span className="text-gray-900">{person.school.level}</span>
        </div>
      )}
    </div>
  </div>
);

const ContentSection = ({ title, content, bgColor, textColor }) => (
  <div className={`${bgColor} rounded-lg p-4`}>
    <h3 className={`text-lg font-semibold ${textColor} mb-2`}>{title}</h3>
    <p className="text-gray-700 leading-relaxed">{content || `No ${title.toLowerCase()} provided`}</p>
  </div>
);

const FilesSection = ({ files }) => {
  if (!files || (!files.photo && (!files.supportingFiles || files.supportingFiles.length === 0))) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Paperclip className="w-5 h-5" />
          Attached Files
        </h3>
        <div className="text-center text-gray-500 py-6">
          <Paperclip className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No files attached to this nomination</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Paperclip className="w-5 h-5" />
        Attached Files
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nominee Photo */}
        {files.photo && (
          <div className