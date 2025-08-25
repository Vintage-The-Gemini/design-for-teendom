// File: frontend/src/components/nomination/NominationStatementStep.jsx
import React, { useState, useEffect } from 'react';

const NominationStatementStep = ({ formData, setFormData, errors, setErrors }) => {
  // Word count states
  const [shortBioWordCount, setShortBioWordCount] = useState(0);
  const [achievementsWordCount, setAchievementsWordCount] = useState(0);
  const [impactWordCount, setImpactWordCount] = useState(0);
  const [whyDeserveWordCount, setWhyDeserveWordCount] = useState(0);
  const [additionalInfoWordCount, setAdditionalInfoWordCount] = useState(0);

  // Count words function
  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Update word counts when content changes
  useEffect(() => {
    setShortBioWordCount(countWords(formData.shortBio));
    setAchievementsWordCount(countWords(formData.achievements));
    setImpactWordCount(countWords(formData.impact));
    setWhyDeserveWordCount(countWords(formData.whyDeserveAward));
    setAdditionalInfoWordCount(countWords(formData.additionalInfo));
  }, [formData.shortBio, formData.achievements, formData.impact, formData.whyDeserveAward, formData.additionalInfo]);

  // Handle text area changes with real-time word counting
  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear any existing errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Get word count status (color and text)
  const getWordCountStatus = (current, min, max) => {
    if (min && current < min) {
      return { color: 'text-red-500', text: `Minimum ${min} words required` };
    } else if (max && current > max) {
      return { color: 'text-red-500', text: `Maximum ${max} words exceeded` };
    } else if (min && current >= min) {
      return { color: 'text-green-500', text: 'Good length' };
    }
    return { color: 'text-gray-500', text: 'Optional' };
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">📝 Nomination Statements</h3>
        <p className="text-gray-600">Please provide detailed information about the nominee's achievements and impact</p>
      </div>

      {/* Short Bio */}
      <div className="space-y-2">
        <label className="block text-sm font-bold mb-2">
          📋 Short Bio * (Max 250 words)
        </label>
        <textarea
          value={formData.shortBio || ''}
          onChange={(e) => handleTextChange('shortBio', e.target.value)}
          className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none"
          placeholder="Provide a brief overview of the nominee (who they are, their background, current status)"
          maxLength={1500}
          required
        />
        <div className="flex justify-between text-sm">
          <span className={getWordCountStatus(shortBioWordCount, null, 250).color}>
            {shortBioWordCount} words - {getWordCountStatus(shortBioWordCount, null, 250).text}
          </span>
          <span className="text-gray-400">Character limit: 1500</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-2">
        <label className="block text-sm font-bold mb-2">
          🏆 Key Achievements *
        </label>
        <textarea
          value={formData.achievements || ''}
          onChange={(e) => handleTextChange('achievements', e.target.value)}
          className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none"
          placeholder="List the nominee's key achievements, awards, recognitions, and accomplishments relevant to the award category"
          required
        />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{achievementsWordCount} words</span>
          <span className="text-gray-400">Be specific and include dates where possible</span>
        </div>
      </div>

      {/* Impact Statement - CRITICAL: 300+ words required by database */}
      <div className="space-y-2">
        <label className="block text-sm font-bold mb-2">
          💥 Impact Statement * (Minimum 300 words)
        </label>
        <textarea
          value={formData.impact || ''}
          onChange={(e) => handleTextChange('impact', e.target.value)}
          className="w-full h-40 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none"
          placeholder="Describe the specific impact the nominee has made in their community, school, or field. Include concrete examples, numbers, and measurable outcomes where possible."
          required
        />
        <div className="flex justify-between text-sm">
          <span className={getWordCountStatus(impactWordCount, 300, null).color}>
            {impactWordCount} words - {getWordCountStatus(impactWordCount, 300, null).text}
          </span>
          <span className="text-gray-400">Be detailed and specific</span>
        </div>
        {impactWordCount < 300 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">
              ⚠️ This field requires at least 300 words. Currently: {impactWordCount} words. 
              Please provide more detailed information about the nominee's impact.
            </p>
          </div>
        )}
      </div>

      {/* Why Deserve Award */}
      <div className="space-y-2">
        <label className="block text-sm font-bold mb-2">
          ⭐ Why Does This Person Deserve This Award? *
        </label>
        <textarea
          value={formData.whyDeserveAward || ''}
          onChange={(e) => handleTextChange('whyDeserveAward', e.target.value)}
          className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none"
          placeholder="Explain why this nominee deserves this specific award. What makes them stand out from other potential nominees?"
          required
        />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{whyDeserveWordCount} words</span>
          <span className="text-gray-400">Connect achievements to award criteria</span>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <label className="block text-sm font-bold mb-2">
          📄 Additional Information (Optional)
        </label>
        <textarea
          value={formData.additionalInfo || ''}
          onChange={(e) => handleTextChange('additionalInfo', e.target.value)}
          className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none"
          placeholder="Any additional information that supports this nomination (community service, leadership roles, special circumstances, etc.)"
        />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">{additionalInfoWordCount} words</span>
          <span className="text-gray-400">Optional but helpful</span>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">🔗 Social Media Links (Optional)</h4>
        <p className="text-sm text-gray-600">Provide links to the nominee's social media profiles if relevant to their achievements</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Twitter/X</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.twitter || ''}
              onChange={(e) => handleTextChange('socialMediaLinks', {
                ...formData.socialMediaLinks,
                twitter: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://twitter.com/username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Instagram</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.instagram || ''}
              onChange={(e) => handleTextChange('socialMediaLinks', {
                ...formData.socialMediaLinks,
                instagram: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://instagram.com/username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Facebook</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.facebook || ''}
              onChange={(e) => handleTextChange('socialMediaLinks', {
                ...formData.socialMediaLinks,
                facebook: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://facebook.com/username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">LinkedIn</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.linkedin || ''}
              onChange={(e) => handleTextChange('socialMediaLinks', {
                ...formData.socialMediaLinks,
                linkedin: e.target.value
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold mb-2">Other Links</label>
          <input
            type="url"
            value={formData.socialMediaLinks?.other || ''}
            onChange={(e) => handleTextChange('socialMediaLinks', {
              ...formData.socialMediaLinks,
              other: e.target.value
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            placeholder="Any other relevant website or profile"
          />
        </div>
      </div>

      {/* Writing Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2">✍️ Writing Guidelines:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Be specific:</strong> Include dates, numbers, and concrete examples</li>
          <li>• <strong>Focus on impact:</strong> How did their actions benefit others or create change?</li>
          <li>• <strong>Use active voice:</strong> "She organized..." rather than "An event was organized..."</li>
          <li>• <strong>Quantify when possible:</strong> "Improved test scores by 15%" vs "Improved test scores"</li>
          <li>• <strong>Stay relevant:</strong> Focus on achievements related to the selected award category</li>
          <li>• <strong>Impact statement is crucial:</strong> This carries significant weight in judging</li>
        </ul>
      </div>

      {/* Validation Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-800 mb-2">📊 Section Status:</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div className={`flex items-center space-x-2 ${formData.shortBio ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.shortBio ? '✅' : '❌'}</span>
            <span>Short Bio</span>
          </div>
          <div className={`flex items-center space-x-2 ${formData.achievements ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.achievements ? '✅' : '❌'}</span>
            <span>Achievements</span>
          </div>
          <div className={`flex items-center space-x-2 ${impactWordCount >= 300 ? 'text-green-600' : 'text-red-500'}`}>
            <span>{impactWordCount >= 300 ? '✅' : '❌'}</span>
            <span>Impact (300+ words)</span>
          </div>
          <div className={`flex items-center space-x-2 ${formData.whyDeserveAward ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.whyDeserveAward ? '✅' : '❌'}</span>
            <span>Why Deserve</span>
          </div>
          <div className={`flex items-center space-x-2 text-green-600`}>
            <span>✅</span>
            <span>Additional Info</span>
          </div>
          <div className={`flex items-center space-x-2 text-green-600`}>
            <span>✅</span>
            <span>Social Media</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationStatementStep;