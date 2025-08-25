// File: frontend/src/components/nomination/NominatorDetailsStep.jsx
import React from 'react';

const NominatorDetailsStep = ({ 
  formData, 
  setFormData, 
  handleNestedChange, 
  errors, 
  setErrors 
}) => {
  // CORRECTED: Exact enum values that match database schema (lowercase)
  const relationshipOptions = [
    { value: 'parent', label: 'Parent' },
    { value: 'guardian', label: 'Guardian' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'friend', label: 'Friend' },
    { value: 'self', label: 'Self-Nomination' },
    { value: 'other', label: 'Other' }
  ];

  // Handle self-nomination toggle
  const handleSelfNomination = (isSelf) => {
    handleNestedChange('nominator', 'isSelfNomination', isSelf);
    
    if (isSelf) {
      // Auto-populate nominator fields with nominee data
      handleNestedChange('nominator', 'firstName', formData.nominee.firstName);
      handleNestedChange('nominator', 'lastName', formData.nominee.lastName);
      handleNestedChange('nominator', 'email', formData.nominee.email);
      handleNestedChange('nominator', 'phone', formData.nominee.phone);
      handleNestedChange('nominator', 'relationship', 'self');
      handleNestedChange('nominator', 'organization', formData.nominee.school?.name || '');
    } else {
      // Clear nominator fields when not self-nomination
      handleNestedChange('nominator', 'firstName', '');
      handleNestedChange('nominator', 'lastName', '');
      handleNestedChange('nominator', 'email', '');
      handleNestedChange('nominator', 'phone', '');
      handleNestedChange('nominator', 'relationship', '');
      handleNestedChange('nominator', 'organization', '');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">👥 Nominator Information</h3>
        <p className="text-gray-600">Please provide details about the person making this nomination</p>
      </div>

      {/* Self-Nomination Toggle */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.nominator.isSelfNomination || false}
            onChange={(e) => handleSelfNomination(e.target.checked)}
            className="h-5 w-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
          />
          <span className="text-lg font-semibold text-gray-700">
            📝 This is a self-nomination (I am nominating myself)
          </span>
        </label>
        <p className="text-sm text-gray-600 mt-2 ml-8">
          Check this if you are nominating yourself for this award
        </p>
      </div>

      {/* Nominator Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">
          {formData.nominator.isSelfNomination ? '✅ Your Details (Auto-filled)' : '👤 Nominator Details'}
        </h4>
        
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">First Name *</label>
            <input
              type="text"
              value={formData.nominator.firstName || ''}
              onChange={(e) => handleNestedChange('nominator', 'firstName', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                formData.nominator.isSelfNomination ? 'bg-gray-50' : ''
              }`}
              placeholder="Enter first name"
              readOnly={formData.nominator.isSelfNomination}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Last Name *</label>
            <input
              type="text"
              value={formData.nominator.lastName || ''}
              onChange={(e) => handleNestedChange('nominator', 'lastName', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                formData.nominator.isSelfNomination ? 'bg-gray-50' : ''
              }`}
              placeholder="Enter last name"
              readOnly={formData.nominator.isSelfNomination}
              required
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.nominator.email || ''}
              onChange={(e) => handleNestedChange('nominator', 'email', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                formData.nominator.isSelfNomination ? 'bg-gray-50' : ''
              }`}
              placeholder="Enter email address"
              readOnly={formData.nominator.isSelfNomination}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.nominator.phone || ''}
              onChange={(e) => handleNestedChange('nominator', 'phone', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                formData.nominator.isSelfNomination ? 'bg-gray-50' : ''
              }`}
              placeholder="+254XXXXXXXXX"
              readOnly={formData.nominator.isSelfNomination}
              required
            />
          </div>
        </div>

        {/* Relationship to Nominee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Relationship to Nominee *</label>
            <select
              value={formData.nominator.relationship || ''}
              onChange={(e) => handleNestedChange('nominator', 'relationship', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                formData.nominator.isSelfNomination ? 'bg-gray-50' : ''
              }`}
              disabled={formData.nominator.isSelfNomination}
              required
            >
              <option value="">Select Relationship</option>
              {relationshipOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">
              Organization/Institution
              {formData.nominator.isSelfNomination ? ' (School)' : ''}
            </label>
            <input
              type="text"
              value={formData.nominator.organization || ''}
              onChange={(e) => handleNestedChange('nominator', 'organization', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                formData.nominator.isSelfNomination ? 'bg-gray-50' : ''
              }`}
              placeholder={
                formData.nominator.isSelfNomination 
                  ? "School/Institution name (auto-filled)"
                  : "Enter organization/institution"
              }
              readOnly={formData.nominator.isSelfNomination}
            />
          </div>
        </div>
      </div>

      {/* Additional Information for Non-Self Nominations */}
      {!formData.nominator.isSelfNomination && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-semibold text-blue-800 mb-2">👥 For Third-Party Nominations:</h5>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• You must have the nominee's permission to nominate them</li>
            <li>• Provide accurate contact information as you may be contacted for verification</li>
            <li>• Ensure you have sufficient knowledge of the nominee's achievements</li>
            <li>• The nominee will be notified of this nomination via email</li>
          </ul>
        </div>
      )}

      {/* Self-Nomination Information */}
      {formData.nominator.isSelfNomination && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h5 className="font-semibold text-green-800 mb-2">✅ Self-Nomination Guidelines:</h5>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Self-nominations are encouraged and welcome</li>
            <li>• Be honest and specific about your achievements</li>
            <li>• Provide concrete examples and measurable impacts</li>
            <li>• You'll still need to provide referee information in later steps</li>
          </ul>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-800 mb-2">📋 Important Notes:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• All nominators must provide valid contact information</li>
          <li>• You may be contacted to verify the nomination details</li>
          <li>• Ensure you have permission from the nominee if this is not a self-nomination</li>
          <li>• Multiple nominations for the same person are allowed but not necessary</li>
        </ul>
      </div>
    </div>
  );
};

export default NominatorDetailsStep;