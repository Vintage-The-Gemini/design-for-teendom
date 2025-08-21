// File: frontend/src/components/nomination/NominatorDetailsStep.jsx
import React from 'react';

const NominatorDetailsStep = ({ 
  formData, 
  handleNestedChange, 
  errors 
}) => {
  const relationshipOptions = [
    'parent',
    'guardian', 
    'teacher',
    'mentor',
    'friend',
    'self',
    'other'
  ];

  const handleSelfNominationChange = (isSelf) => {
    handleNestedChange('nominator', 'isSelfNomination', isSelf);
    
    if (isSelf) {
      // Auto-fill nominator details with nominee details
      handleNestedChange('nominator', 'firstName', formData.nominee.firstName);
      handleNestedChange('nominator', 'lastName', formData.nominee.lastName);
      handleNestedChange('nominator', 'email', formData.nominee.email);
      handleNestedChange('nominator', 'phone', formData.nominee.phone);
      handleNestedChange('nominator', 'relationship', 'self');
    } else {
      // Clear nominator details
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
      <h3 className="text-xl font-bold mb-4 text-red-600">👥 Nominator Information</h3>
      
      {/* Self-Nomination Question */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Are you nominating yourself?</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="selfNomination"
              checked={formData.nominator.isSelfNomination === true}
              onChange={() => handleSelfNominationChange(true)}
              className="w-4 h-4 text-red-600"
            />
            <span className="text-sm font-medium">Yes, I am nominating myself</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="selfNomination"
              checked={formData.nominator.isSelfNomination === false}
              onChange={() => handleSelfNominationChange(false)}
              className="w-4 h-4 text-red-600"
            />
            <span className="text-sm font-medium">No, I am nominating someone else</span>
          </label>
        </div>
      </div>

      {/* Conditional Nominator Details */}
      {formData.nominator.isSelfNomination === false && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">Your Information (Nominator)</h4>
          
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Your First Name *</label>
              <input
                type="text"
                required
                value={formData.nominator.firstName}
                onChange={(e) => handleNestedChange('nominator', 'firstName', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                  errors.nominatorFirstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your first name"
              />
              {errors.nominatorFirstName && (
                <p className="text-red-500 text-xs mt-1">{errors.nominatorFirstName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Your Last Name *</label>
              <input
                type="text"
                required
                value={formData.nominator.lastName}
                onChange={(e) => handleNestedChange('nominator', 'lastName', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                  errors.nominatorLastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your last name"
              />
              {errors.nominatorLastName && (
                <p className="text-red-500 text-xs mt-1">{errors.nominatorLastName}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Your Email Address *</label>
              <input
                type="email"
                required
                value={formData.nominator.email}
                onChange={(e) => handleNestedChange('nominator', 'email', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                  errors.nominatorEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.nominatorEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.nominatorEmail}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                You will receive confirmation and updates at this email
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Your Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.nominator.phone}
                onChange={(e) => handleNestedChange('nominator', 'phone', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                  errors.nominatorPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="254XXXXXXXXX"
              />
              {errors.nominatorPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.nominatorPhone}</p>
              )}
            </div>
          </div>

          {/* Relationship and Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Your Relationship to Nominee *</label>
              <select
                required
                value={formData.nominator.relationship}
                onChange={(e) => handleNestedChange('nominator', 'relationship', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
                  errors.relationship ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Relationship</option>
                <option value="parent">Parent/Guardian</option>
                <option value="teacher">Teacher</option>
                <option value="mentor">Mentor/Coach</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
              {errors.relationship && (
                <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Your Organization/Institution</label>
              <input
                type="text"
                value={formData.nominator.organization}
                onChange={(e) => handleNestedChange('nominator', 'organization', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                placeholder="e.g., XYZ School, ABC Company (optional)"
              />
              <p className="text-xs text-gray-500 mt-1">
                School, company, or organization you're affiliated with (optional)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Self-Nomination Confirmation */}
      {formData.nominator.isSelfNomination === true && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-green-800 font-semibold mb-2">✅ Self-Nomination Confirmed</h4>
          <p className="text-sm text-green-700">
            Your information has been automatically filled from the nominee details. 
            You can proceed to the next step.
          </p>
          <div className="mt-3 text-sm text-green-600">
            <p><strong>Nominator:</strong> {formData.nominee.firstName} {formData.nominee.lastName}</p>
            <p><strong>Email:</strong> {formData.nominee.email}</p>
            <p><strong>Phone:</strong> {formData.nominee.phone}</p>
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">📋 Important Notes:</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Self-nominations are welcome and encouraged</li>
          <li>• If nominating someone else, ensure you have their permission</li>
          <li>• The nominator will receive all communication about the nomination</li>
          <li>• For nominees under 18, parental consent will be required in a later step</li>
          <li>• All information provided should be accurate and truthful</li>
        </ul>
      </div>
    </div>
  );
};

export default NominatorDetailsStep;