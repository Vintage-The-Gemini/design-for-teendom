// File: frontend/src/components/nomination/RefereeInformationStep.jsx
import React from 'react';

const RefereeInformationStep = ({ 
  formData, 
  setFormData, 
  handleNestedChange, 
  errors, 
  setErrors 
}) => {
  // CORRECTED: Exact enum values that match database schema (lowercase)
  const relationshipOptions = [
    { value: 'teacher', label: 'Teacher' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'parent', label: 'Parent/Guardian' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">👨‍🏫 Referee Information</h3>
        <p className="text-gray-600">Please provide details of someone who can vouch for this nomination</p>
      </div>

      {/* Referee Requirements */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">📋 Referee Requirements:</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Must be someone who knows the nominee well (teacher, mentor, supervisor, etc.)</li>
          <li>• Cannot be a family member (unless parent/guardian for minors)</li>
          <li>• Should be able to speak to the nominee's achievements and character</li>
          <li>• Will be contacted to verify the nomination details</li>
          <li>• Must provide accurate contact information</li>
        </ul>
      </div>

      {/* Referee Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">👤 Referee Details</h4>
        
        {/* Name */}
        <div>
          <label className="block text-sm font-bold mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.referee?.name || ''}
            onChange={(e) => handleNestedChange('referee', 'name', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            placeholder="Enter referee's full name"
            required
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.referee?.email || ''}
              onChange={(e) => handleNestedChange('referee', 'email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter referee's email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.referee?.phone || ''}
              onChange={(e) => handleNestedChange('referee', 'phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="+254XXXXXXXXX"
              required
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Position/Title *</label>
            <input
              type="text"
              value={formData.referee?.position || ''}
              onChange={(e) => handleNestedChange('referee', 'position', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="e.g., Head Teacher, Principal, Manager"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Organization/Institution *</label>
            <input
              type="text"
              value={formData.referee?.organization || ''}
              onChange={(e) => handleNestedChange('referee', 'organization', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="e.g., School name, Company, Organization"
              required
            />
          </div>
        </div>

        {/* Relationship to Nominee */}
        <div>
          <label className="block text-sm font-bold mb-2">Relationship to Nominee *</label>
          <select
            value={formData.referee?.relationship || ''}
            onChange={(e) => handleNestedChange('referee', 'relationship', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Relationship</option>
            {relationshipOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h5 className="font-semibold text-red-800 mb-2">⚠️ Important Notice:</h5>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• The referee will be contacted by email to verify this nomination</li>
          <li>• Please ensure the referee is aware they may be contacted</li>
          <li>• Providing false referee information may result in disqualification</li>
          <li>• The referee should be available for contact during the review period</li>
        </ul>
      </div>

      {/* Guidelines */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-800 mb-2">📋 Good Referee Examples:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-green-600">✅ Appropriate Referees:</p>
            <ul className="space-y-1 mt-2">
              <li>• Current or former teachers</li>
              <li>• School principals/administrators</li>
              <li>• Club supervisors/coaches</li>
              <li>• Community leaders</li>
              <li>• Mentors or supervisors</li>
              <li>• Project coordinators</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-red-600">❌ Inappropriate Referees:</p>
            <ul className="space-y-1 mt-2">
              <li>• Family members (except parents for minors)</li>
              <li>• Close friends without professional relationship</li>
              <li>• People who don't know the nominee well</li>
              <li>• Anyone with conflict of interest</li>
              <li>• The nominator themselves</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeInformationStep;