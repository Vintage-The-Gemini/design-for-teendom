// File: frontend/src/components/nomination/NomineeDetailsStep.jsx - FIXED
// Email, phone, and school are now OPTIONAL for minors

import React from 'react';

const NomineeDetailsStep = ({ formData, handleNestedChange, errors }) => {
  
  // Calculate if nominee is a minor (under 18)
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (value) => {
    handleNestedChange('nominee', 'dateOfBirth', value);
    if (value) {
      const calculatedAge = calculateAge(value);
      handleNestedChange('nominee', 'age', calculatedAge);
    }
  };

  const isMinor = formData.nominee.age < 18;

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const nationalityOptions = [
    { value: 'kenyan-citizen', label: 'Kenyan Citizen' },
    { value: 'kenyan-resident', label: 'Kenyan Resident' }
  ];

  const schoolLevels = [
    'Primary School',
    'Secondary School',
    'College/University', 
    'Technical/Vocational',
    'Other'
  ];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">👤 Nominee Information</h3>
        <p className="text-gray-600 mt-2">Please provide details about the person being nominated</p>
        {isMinor && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              📝 <strong>Minor Detected:</strong> Email, phone, and school details are optional for nominees under 18
            </p>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">🆔 Personal Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">First Name *</label>
            <input
              type="text"
              value={formData.nominee.firstName}
              onChange={(e) => handleNestedChange('nominee', 'firstName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter first name"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Middle Name</label>
            <input
              type="text"
              value={formData.nominee.middleName || ''}
              onChange={(e) => handleNestedChange('nominee', 'middleName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter middle name (optional)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Last Name *</label>
            <input
              type="text"
              value={formData.nominee.lastName}
              onChange={(e) => handleNestedChange('nominee', 'lastName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter last name"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Date of Birth *</label>
            <input
              type="date"
              value={formData.nominee.dateOfBirth}
              onChange={(e) => handleDateOfBirthChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              max="2012-12-01"
              min="2002-01-01"
              required
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Age *</label>
            <input
              type="number"
              value={formData.nominee.age || ''}
              onChange={(e) => handleNestedChange('nominee', 'age', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 bg-gray-50"
              placeholder="Auto-calculated"
              min="13"
              max="19"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Gender *</label>
            <select
              value={formData.nominee.gender || ''}
              onChange={(e) => handleNestedChange('nominee', 'gender', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>
        </div>
      </div>

      {/* Contact Information - UPDATED: Optional for minors */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">
          📞 Contact Information
          {isMinor && <span className="text-sm font-normal text-blue-600 ml-2">(Optional for minors)</span>}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">
              Email Address {!isMinor && '*'}
              {isMinor && <span className="text-sm font-normal text-gray-500 ml-1">(Optional)</span>}
            </label>
            <input
              type="email"
              value={formData.nominee.email || ''}
              onChange={(e) => handleNestedChange('nominee', 'email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder={isMinor ? "Enter email (optional)" : "Enter email address"}
              required={!isMinor}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">
              Phone Number {!isMinor && '*'}
              {isMinor && <span className="text-sm font-normal text-gray-500 ml-1">(Optional)</span>}
            </label>
            <input
              type="tel"
              value={formData.nominee.phone || ''}
              onChange={(e) => handleNestedChange('nominee', 'phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder={isMinor ? "+254XXXXXXXXX (optional)" : "+254XXXXXXXXX"}
              required={!isMinor}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Nationality and Location */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">🌍 Nationality & Location</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Nationality *</label>
            <select
              value={formData.nominee.nationality || ''}
              onChange={(e) => handleNestedChange('nominee', 'nationality', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select Nationality</option>
              {nationalityOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">County *</label>
            <input
              type="text"
              value={formData.nominee.county || ''}
              onChange={(e) => handleNestedChange('nominee', 'county', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter county"
              required
            />
            {errors.county && <p className="text-red-500 text-sm mt-1">{errors.county}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Sub-County</label>
            <input
              type="text"
              value={formData.nominee.subcounty || ''}
              onChange={(e) => handleNestedChange('nominee', 'subcounty', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter sub-county (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Ward</label>
            <input
              type="text"
              value={formData.nominee.ward || ''}
              onChange={(e) => handleNestedChange('nominee', 'ward', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter ward (optional)"
            />
          </div>
        </div>
      </div>

      {/* Education Information - UPDATED: Optional for all */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">
          🎓 Education Information 
          <span className="text-sm font-normal text-gray-500 ml-2">(Optional - some nominees may not be in school)</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">School Name</label>
            <input
              type="text"
              value={formData.nominee.school?.name || ''}
              onChange={(e) => handleNestedChange('nominee', 'school', { ...formData.nominee.school, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter school name (optional)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">School Level</label>
            <select
              value={formData.nominee.school?.level || ''}
              onChange={(e) => handleNestedChange('nominee', 'school', { ...formData.nominee.school, level: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select level (optional)</option>
              {schoolLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Grade/Class</label>
            <input
              type="text"
              value={formData.nominee.school?.grade || ''}
              onChange={(e) => handleNestedChange('nominee', 'school', { ...formData.nominee.school, grade: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="e.g., Form 4, Year 2 (optional)"
            />
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Note:</span> School information is optional. Some outstanding teens may be self-educated, homeschooled, or taking a gap year.
          </p>
        </div>
      </div>

      {/* Display validation errors */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <h5 className="font-semibold text-red-800 mb-2">Please fix the following:</h5>
          <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NomineeDetailsStep;