// File: frontend/src/components/NominationForm.jsx
import React, { useState } from 'react';

const NominationForm = ({ isOpen, onClose, selectedCategory = '' }) => {
  const [formData, setFormData] = useState({
    // Nominee Info
    nomineeName: '',
    nomineeAge: '',
    nomineeEmail: '',
    nomineePhone: '',
    nomineeCounty: '',
    nomineeSchool: '',
    
    // Nominator Info  
    nominatorName: '',
    nominatorEmail: '',
    nominatorPhone: '',
    nominatorRelation: '',
    
    // Award Details
    category: selectedCategory,
    
    // Nomination Details
    shortBio: '',
    achievements: '',
    whyDeserveAward: '',
    
    // Files
    nomineePhoto: null,
    supportingFiles: [],
    
    // Referee
    refereeName: '',
    refereeEmail: '',
    refereePhone: '',
    refereePosition: '',
    
    // Consent
    consentAccurate: false,
    consentPermission: false,
    consentParental: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kiambu', 'Machakos', 
    'Meru', 'Nyeri', 'Thika', 'Kakamega', 'Kitui', 'Garissa', 'Kericho'
  ];

  const categories = [
    'Academic Excellence', 'Leadership Excellence', 'Sports Excellence',
    'Arts & Creativity', 'Innovation & Technology', 'Community Service',
    'Environmental Champion', 'Entrepreneurship', 'Advocate for Change', 
    'Cultural Ambassador'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, files) => {
    if (field === 'nomineePhoto') {
      setFormData(prev => ({ ...prev, nomineePhoto: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, supportingFiles: Array.from(files) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'supportingFiles' && formData[key].length > 0) {
          formData[key].forEach(file => {
            submitData.append('supportingFiles', file);
          });
        } else if (key === 'nomineePhoto' && formData[key]) {
          submitData.append('nomineePhoto', formData[key]);
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      console.log('Submitting nomination:', formData);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('🎉 Nomination submitted successfully! You will receive confirmation shortly.');
      onClose();
      
    } catch (error) {
      alert('❌ Error submitting nomination. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Teendom Awards 2025 - Nomination</h2>
              <p className="text-red-100">Submit your nomination below</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-red-200 text-2xl">×</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Selected Category */}
          {selectedCategory && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-900">Selected Category: {selectedCategory}</h3>
            </div>
          )}

          {/* Nominee Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">👤 Nominee Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.nomineeName}
                  onChange={(e) => handleChange('nomineeName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                  placeholder="First and Last Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Age *</label>
                <input
                  type="number"
                  required
                  min="13"
                  max="19"
                  value={formData.nomineeAge}
                  onChange={(e) => handleChange('nomineeAge', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.nomineeEmail}
                  onChange={(e) => handleChange('nomineeEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.nomineePhone}
                  onChange={(e) => handleChange('nomineePhone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">County *</label>
                <select
                  required
                  value={formData.nomineeCounty}
                  onChange={(e) => handleChange('nomineeCounty', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select County</option>
                  {kenyanCounties.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">School/Institution</label>
                <input
                  type="text"
                  value={formData.nomineeSchool}
                  onChange={(e) => handleChange('nomineeSchool', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Nominator Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">👥 Your Information (Nominator)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.nominatorName}
                  onChange={(e) => handleChange('nominatorName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Your Email *</label>
                <input
                  type="email"
                  required
                  value={formData.nominatorEmail}
                  onChange={(e) => handleChange('nominatorEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Your Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.nominatorPhone}
                  onChange={(e) => handleChange('nominatorPhone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Relationship to Nominee *</label>
                <select
                  required
                  value={formData.nominatorRelation}
                  onChange={(e) => handleChange('nominatorRelation', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Relationship</option>
                  <option value="parent">Parent/Guardian</option>
                  <option value="teacher">Teacher</option>
                  <option value="mentor">Mentor</option>
                  <option value="peer">Fellow Student</option>
                  <option value="community">Community Member</option>
                  <option value="self">Self Nomination</option>
                </select>
              </div>
            </div>
          </div>

          {/* Award Category */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">🏆 Award Category</h3>
            <select
              required
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Nomination Statement */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">📝 Nomination Statement</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Short Bio (max 250 words) *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.shortBio}
                  onChange={(e) => handleChange('shortBio', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                  placeholder="Tell us about the nominee's background and interests..."
                  maxLength={1750}
                />
                <p className="text-xs text-gray-500">{formData.shortBio.length}/250 words</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Key Achievements *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.achievements}
                  onChange={(e) => handleChange('achievements', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                  placeholder="List the nominee's key achievements and accomplishments..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Why They Deserve This Award (300-500 words) *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.whyDeserveAward}
                  onChange={(e) => handleChange('whyDeserveAward', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                  placeholder="Explain in detail why this teenager deserves to win this award..."
                  minLength={300}
                  maxLength={3500}
                />
                <p className="text-xs text-gray-500">{formData.whyDeserveAward.length} characters (min 300)</p>
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">📎 Supporting Documents</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Nominee Photo *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('nomineePhoto', e.target.files)}
                    className="w-full"
                    required
                  />
                  {formData.nomineePhoto && (
                    <p className="text-sm text-green-600 mt-2">✅ {formData.nomineePhoto.name}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Supporting Files (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
                    onChange={(e) => handleFileUpload('supportingFiles', e.target.files)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Upload certificates, photos, videos, or other supporting documents
                  </p>
                  {formData.supportingFiles.length > 0 && (
                    <div className="mt-2">
                      {formData.supportingFiles.map((file, index) => (
                        <p key={index} className="text-sm text-green-600">✅ {file.name}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Referee Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">👨‍🏫 Referee Information</h3>
            <p className="text-sm text-gray-600 mb-4">
              Provide details of a non-family adult (teacher, coach, mentor, etc.) who can vouch for the nominee.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Referee Name *</label>
                <input
                  type="text"
                  required
                  value={formData.refereeName}
                  onChange={(e) => handleChange('refereeName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Referee Position *</label>
                <input
                  type="text"
                  required
                  value={formData.refereePosition}
                  onChange={(e) => handleChange('refereePosition', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                  placeholder="e.g. Math Teacher at ABC School"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Referee Email *</label>
                <input
                  type="email"
                  required
                  value={formData.refereeEmail}
                  onChange={(e) => handleChange('refereeEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Referee Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.refereePhone}
                  onChange={(e) => handleChange('refereePhone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">📋 Consent & Declaration</h3>
            <div className="space-y-3">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentAccurate}
                  onChange={(e) => handleChange('consentAccurate', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">I confirm that all information provided is accurate and truthful.</span>
              </label>
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  checked={formData.consentPermission}
                  onChange={(e) => handleChange('consentPermission', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">I have obtained permission from the nominee to submit this nomination.</span>
              </label>
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.consentParental}
                  onChange={(e) => handleChange('consentParental', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm">If nominee is under 18, I confirm parental/guardian consent has been obtained.</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </span>
              ) : (
                '🚀 Submit Nomination'
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NominationForm;