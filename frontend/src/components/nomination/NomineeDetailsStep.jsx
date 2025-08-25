// File: frontend/src/components/nomination/NomineeDetailsStep.jsx
import React from 'react';

const NomineeDetailsStep = ({ 
  formData, 
  setFormData, 
  handleNestedChange, 
  handleDeepNestedChange, 
  errors, 
  setErrors 
}) => {
  // CORRECTED: Exact enum values that match database schema
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  // CORRECTED: Exact enum values with hyphens
  const nationalityOptions = [
    { value: 'kenyan-citizen', label: 'Kenyan Citizen' },
    { value: 'kenyan-resident', label: 'Kenyan Resident' }
  ];

  // CORRECTED: Exact school level enum values
  const schoolLevels = [
    'Primary School',
    'Secondary School', 
    'College/University',
    'Technical/Vocational',
    'Other'
  ];

  // All 47 Counties in Kenya
  const counties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
    'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
    'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos',
    'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a',
    'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
    'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia',
    'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
  ];

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Handle date of birth change and auto-calculate age
  const handleDateOfBirthChange = (dateOfBirth) => {
    handleNestedChange('nominee', 'dateOfBirth', dateOfBirth);
    const calculatedAge = calculateAge(dateOfBirth);
    handleNestedChange('nominee', 'age', calculatedAge);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">👤 Nominee Details</h3>
        <p className="text-gray-600">Please provide complete and accurate information about the nominee</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📋 Personal Information</h4>
        
        {/* Name Fields */}
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
          </div>
        </div>

        {/* Date of Birth and Age */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Date of Birth *</label>
            <input
              type="date"
              value={formData.nominee.dateOfBirth || ''}
              onChange={(e) => handleDateOfBirthChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              max="2012-12-01"
              min="2002-01-01"
              required
            />
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
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📞 Contact Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.nominee.email}
              onChange={(e) => handleNestedChange('nominee', 'email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.nominee.phone}
              onChange={(e) => handleNestedChange('nominee', 'phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="+254XXXXXXXXX"
              required
            />
          </div>
        </div>

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
        </div>
      </div>

      {/* Location Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📍 Location Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">County *</label>
            <select
              value={formData.nominee.county || ''}
              onChange={(e) => handleNestedChange('nominee', 'county', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select County</option>
              {counties.map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>
          
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

      {/* School Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">🏫 School/Institution Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">School/Institution Name</label>
            <input
              type="text"
              value={formData.nominee.school?.name || ''}
              onChange={(e) => handleDeepNestedChange('nominee', 'school', 'name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter school name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Education Level</label>
            <select
              value={formData.nominee.school?.level || ''}
              onChange={(e) => handleDeepNestedChange('nominee', 'school', 'level', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Level</option>
              {schoolLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Current Class/Form/Grade/Year</label>
            <input
              type="text"
              value={formData.nominee.school?.grade || ''}
              onChange={(e) => handleDeepNestedChange('nominee', 'school', 'grade', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="e.g., Form 4, Year 2, Grade 12"
            />
          </div>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📸 Nominee Photo *</h4>
        <div>
          <label className="block text-sm font-bold mb-2">Upload Recent Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleNestedChange('nominee', 'photoFile', file);
                // Create preview URL
                const photoURL = URL.createObjectURL(file);
                handleNestedChange('nominee', 'photo', photoURL);
              }
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            required
          />
          {formData.nominee.photo && (
            <div className="mt-2">
              <img 
                src={formData.nominee.photo} 
                alt="Nominee photo preview" 
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2">📋 Important Notes:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Ensure all information is accurate as it will be used for verification</li>
          <li>• For nominees under 18, parent/guardian consent is required</li>
          <li>• School information helps with verification processes</li>
          <li>• Age must be between 13-19 years as of December 1, 2025</li>
          <li>• Photo should be recent and clear (passport-style preferred)</li>
        </ul>
      </div>
    </div>
  );
};

export default NomineeDetailsStep;