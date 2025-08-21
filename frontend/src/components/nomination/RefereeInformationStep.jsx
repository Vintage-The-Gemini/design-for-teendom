// File: frontend/src/components/nomination/RefereeInformationStep.jsx
import React from 'react';

const RefereeInformationStep = ({ 
  formData, 
  handleNestedChange, 
  errors 
}) => {
  const positionOptions = [
    'Teacher',
    'Principal/Deputy Principal',
    'School Counselor',
    'Coach/Trainer',
    'Club Advisor',
    'Community Leader',
    'Religious Leader',
    'Employer/Supervisor',
    'Mentor',
    'Program Coordinator',
    'Social Worker',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">👨‍🏫 Referee Information</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="text-blue-800 font-semibold mb-2">📋 About the Referee:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Must be a non-family adult who knows the nominee well</li>
          <li>• Should be able to verify the nominee's achievements and character</li>
          <li>• Examples: Teacher, coach, mentor, community leader, employer</li>
          <li>• The referee may be contacted during the review process</li>
          <li>• Ensure you have their permission before providing their details</li>
        </ul>
      </div>

      {/* Referee Personal Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">Contact Information</h4>
        
        <div>
          <label className="block text-sm font-bold mb-2">Referee Full Name *</label>
          <input
            type="text"
            required
            value={formData.referee.name || ''}
            onChange={(e) => handleNestedChange('referee', 'name', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.refereeName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter referee's full name"
          />
          {errors.refereeName && (
            <p className="text-red-500 text-xs mt-1">{errors.refereeName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.referee.email || ''}
              onChange={(e) => handleNestedChange('referee', 'email', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                errors.refereeEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="referee@email.com"
            />
            {errors.refereeEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.refereeEmail}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.referee.phone || ''}
              onChange={(e) => handleNestedChange('referee', 'phone', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                errors.refereePhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="254XXXXXXXXX"
            />
            {errors.refereePhone && (
              <p className="text-red-500 text-xs mt-1">{errors.refereePhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">Professional Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Position/Title *</label>
            <select
              required
              value={formData.referee.position || ''}
              onChange={(e) => handleNestedChange('referee', 'position', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                errors.refereePosition ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Position</option>
              {positionOptions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            {errors.refereePosition && (
              <p className="text-red-500 text-xs mt-1">{errors.refereePosition}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Organization/Institution</label>
            <input
              type="text"
              value={formData.referee.organization || ''}
              onChange={(e) => handleNestedChange('referee', 'organization', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="School, company, or organization name"
            />
            <p className="text-xs text-gray-500 mt-1">
              Where the referee works or is affiliated
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Relationship to Nominee</label>
          <input
            type="text"
            value={formData.referee.relationship || ''}
            onChange={(e) => handleNestedChange('referee', 'relationship', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            placeholder="e.g., Mathematics teacher, Basketball coach, Youth program coordinator"
          />
          <p className="text-xs text-gray-500 mt-1">
            How does the referee know the nominee? What is their professional relationship?
          </p>
        </div>
      </div>

      {/* Permission Confirmation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-yellow-800 font-semibold mb-3">⚠️ Important Confirmation</h4>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.referee.hasPermission || false}
            onChange={(e) => handleNestedChange('referee', 'hasPermission', e.target.checked)}
            className="mt-1 w-4 h-4 text-red-600"
          />
          <span className="text-sm text-yellow-700">
            <strong>I confirm that I have obtained permission from this referee to provide their contact information</strong> 
            and that they are aware they may be contacted as part of the nomination verification process.
          </span>
        </label>
        {errors.refereePermission && (
          <p className="text-red-500 text-xs mt-2">{errors.refereePermission}</p>
        )}
      </div>

      {/* Referee Guidelines */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h5 className="font-semibold text-green-800 mb-2">✅ Good Referee Examples:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
          <div>
            <p className="font-medium mb-1">Academic Categories:</p>
            <ul className="space-y-1">
              <li>• Subject teacher</li>
              <li>• Academic coordinator</li>
              <li>• Research supervisor</li>
              <li>• Competition organizer</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1">Other Categories:</p>
            <ul className="space-y-1">
              <li>• Sports coach/trainer</li>
              <li>• Club advisor</li>
              <li>• Community leader</li>
              <li>• Project supervisor</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What Referees Should Expect */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-700 mb-2">📞 What the Referee Should Expect:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• They may receive an email or phone call from our team</li>
          <li>• They will be asked to verify the nominee's achievements</li>
          <li>• They may be asked to provide additional character references</li>
          <li>• The conversation will be brief and professional</li>
          <li>• Their response will help us make fair judging decisions</li>
          <li>• All referee information is kept confidential</li>
        </ul>
      </div>

      {/* Referee Summary */}
      {formData.referee.name && formData.referee.email && formData.referee.position && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-blue-800 font-semibold mb-2">📋 Referee Summary</h4>
          <div className="space-y-1 text-sm text-blue-700">
            <p><strong>Name:</strong> {formData.referee.name}</p>
            <p><strong>Position:</strong> {formData.referee.position}</p>
            <p><strong>Organization:</strong> {formData.referee.organization || 'Not specified'}</p>
            <p><strong>Email:</strong> {formData.referee.email}</p>
            <p><strong>Phone:</strong> {formData.referee.phone}</p>
            <p><strong>Relationship:</strong> {formData.referee.relationship || 'Not specified'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefereeInformationStep;