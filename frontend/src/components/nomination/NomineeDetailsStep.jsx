// File: frontend/src/components/nomination/NomineeDetailsStep.jsx
import React from 'react';

const NomineeDetailsStep = ({ 
  formData, 
  handleNestedChange, 
  handleDeepNestedChange, 
  errors, 
  setErrors 
}) => {
  // All 47 Kenyan Counties
  const kenyanCounties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet',
    'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado',
    'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga',
    'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia',
    'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit',
    'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi',
    'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
    'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
    'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu',
    'Vihiga', 'Wajir', 'West Pokot'
  ];

  const schoolLevels = [
    'Primary School',
    'Secondary School', 
    'College/University',
    'Technical/Vocational',
    'Other'
  ];

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

  // Handle Date of Birth Change
  const handleDateOfBirthChange = (value) => {
    const age = calculateAge(value);
    handleNestedChange('nominee', 'dateOfBirth', value);
    handleNestedChange('nominee', 'age', age.toString());
    
    // Validate age range
    if (age < 13 || age > 19) {
      setErrors(prev => ({
        ...prev,
        age: 'Nominee must be between 13-19 years old'
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.age;
        return newErrors;
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">👤 Nominee Information</h3>
      
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">First Name *</label>
          <input
            type="text"
            required
            value={formData.nominee.firstName}
            onChange={(e) => handleNestedChange('nominee', 'firstName', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">Middle Name</label>
          <input
            type="text"
            value={formData.nominee.middleName}
            onChange={(e) => handleNestedChange('nominee', 'middleName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            placeholder="Enter middle name (optional)"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">Last Name *</label>
          <input
            type="text"
            required
            value={formData.nominee.lastName}
            onChange={(e) => handleNestedChange('nominee', 'lastName', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Date of Birth, Age, and Gender */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">Date of Birth *</label>
          <input
            type="date"
            required
            value={formData.nominee.dateOfBirth}
            onChange={(e) => handleDateOfBirthChange(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.dateOfBirth || errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            max={new Date().toISOString().split('T')[0]} // Cannot be future date
          />
          {(errors.dateOfBirth || errors.age) && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth || errors.age}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">Age (as of Dec 1, 2025)</label>
          <input
            type="number"
            value={formData.nominee.age}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            placeholder="Auto-calculated"
          />
          <p className="text-xs text-gray-500 mt-1">Automatically calculated from date of birth</p>
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">Gender *</label>
          <select
            required
            value={formData.nominee.gender}
            onChange={(e) => handleNestedChange('nominee', 'gender', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">Email Address *</label>
          <input
            type="email"
            required
            value={formData.nominee.email}
            onChange={(e) => handleNestedChange('nominee', 'email', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="nominee@email.com or guardian's email if under 18"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Use nominee's email or guardian's email if nominee is under 18
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            value={formData.nominee.phone}
            onChange={(e) => handleNestedChange('nominee', 'phone', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="254XXXXXXXXX"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Include country code (254 for Kenya)
          </p>
        </div>
      </div>

      {/* Nationality and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">Nationality *</label>
          <select
            required
            value={formData.nominee.nationality}
            onChange={(e) => handleNestedChange('nominee', 'nationality', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.nationality ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Nationality</option>
            <option value="kenyan-citizen">Kenyan Citizen</option>
            <option value="kenyan-resident">Kenyan Resident</option>
          </select>
          {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">County of Residence *</label>
          <select
            required
            value={formData.nominee.county}
            onChange={(e) => handleNestedChange('nominee', 'county', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 ${
              errors.county ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select County</option>
            {kenyanCounties.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
          {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
        </div>
      </div>

      {/* Additional Location Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-2">Sub-County</label>
          <input
            type="text"
            value={formData.nominee.subcounty}
            onChange={(e) => handleNestedChange('nominee', 'subcounty', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            placeholder="Enter sub-county (optional)"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">Ward</label>
          <input
            type="text"
            value={formData.nominee.ward}
            onChange={(e) => handleNestedChange('nominee', 'ward', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            placeholder="Enter ward (optional)"
          />
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
              value={formData.nominee.school.name}
              onChange={(e) => handleDeepNestedChange('nominee', 'school', 'name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="Enter school name (if applicable)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Education Level</label>
            <select
              value={formData.nominee.school.level}
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
              value={formData.nominee.school.grade}
              onChange={(e) => handleDeepNestedChange('nominee', 'school', 'grade', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="e.g., Form 4, Year 2, Grade 12"
            />
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2">📋 Important Notes:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Ensure all information is accurate as it will be used for verification</li>
          <li>• For nominees under 18, use parent/guardian email and phone where specified</li>
          <li>• School information is optional but recommended for verification purposes</li>
          <li>• Age must be between 13-19 years as of December 1, 2025</li>
        </ul>
      </div>
    </div>
  );
};

export default NomineeDetailsStep;