// File: frontend/src/components/nomination/NominationStatementStep.jsx
import React, { useState, useEffect } from 'react';

const NominationStatementStep = ({ 
  formData, 
  setFormData,
  errors 
}) => {
  const [wordCounts, setWordCounts] = useState({
    shortBio: 0,
    achievements: 0,
    impact: 0,
    whyDeserveAward: 0,
    additionalInfo: 0
  });

  // Count words in text
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Update word counts when form data changes
  useEffect(() => {
    setWordCounts({
      shortBio: countWords(formData.shortBio || ''),
      achievements: countWords(formData.achievements || ''),
      impact: countWords(formData.impact || ''),
      whyDeserveAward: countWords(formData.whyDeserveAward || ''),
      additionalInfo: countWords(formData.additionalInfo || '')
    });
  }, [formData.shortBio, formData.achievements, formData.impact, formData.whyDeserveAward, formData.additionalInfo]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">📝 Nomination Statement</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="text-blue-800 font-semibold mb-2">✍️ Writing Tips:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Be specific with examples and achievements</li>
          <li>• Use concrete numbers and measurable results where possible</li>
          <li>• Focus on impact and how the nominee made a difference</li>
          <li>• Write in a compelling but factual manner</li>
          <li>• Proofread for grammar and spelling</li>
        </ul>
      </div>

      {/* Short Bio */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold">Short Bio (Maximum 250 words) *</label>
          <span className={`text-xs ${
            wordCounts.shortBio > 250 ? 'text-red-600 font-bold' : 'text-gray-500'
          }`}>
            {wordCounts.shortBio}/250 words
          </span>
        </div>
        <textarea
          required
          rows={4}
          value={formData.shortBio || ''}
          onChange={(e) => handleChange('shortBio', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none ${
            errors.shortBio || wordCounts.shortBio > 250 ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Provide a brief introduction to the nominee - who they are, their background, and what makes them special..."
        />
        {(errors.shortBio || wordCounts.shortBio > 250) && (
          <p className="text-red-500 text-xs">
            {errors.shortBio || 'Bio exceeds 250 word limit'}
          </p>
        )}
        <p className="text-xs text-gray-500">
          Brief background about the nominee - their interests, personality, and what drives them.
        </p>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold">Key Achievements *</label>
          <span className="text-xs text-gray-500">{wordCounts.achievements} words</span>
        </div>
        <textarea
          required
          rows={5}
          value={formData.achievements || ''}
          onChange={(e) => handleChange('achievements', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none ${
            errors.achievements ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="List and describe the nominee's key achievements relevant to the selected category. Include specific examples, dates, and any recognition received..."
        />
        {errors.achievements && (
          <p className="text-red-500 text-xs">{errors.achievements}</p>
        )}
        <p className="text-xs text-gray-500">
          Specific accomplishments, awards, recognition, competitions won, projects completed, etc.
        </p>
      </div>

      {/* Impact Statement */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold">Impact & Influence (300-500 words) *</label>
          <span className={`text-xs ${
            wordCounts.impact < 300 || wordCounts.impact > 500 ? 'text-red-600 font-bold' : 'text-green-600'
          }`}>
            {wordCounts.impact}/300-500 words
          </span>
        </div>
        <textarea
          required
          rows={6}
          value={formData.impact || ''}
          onChange={(e) => handleChange('impact', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none ${
            errors.impact || wordCounts.impact < 300 || wordCounts.impact > 500 ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe the nominee's impact on their community, school, peers, or society. How have they made a difference? What positive changes have they brought about? Include specific examples and testimonials if available..."
        />
        {(errors.impact || wordCounts.impact < 300 || wordCounts.impact > 500) && (
          <p className="text-red-500 text-xs">
            {errors.impact || 
             (wordCounts.impact < 300 ? 'Impact statement must be at least 300 words' : 
              'Impact statement must not exceed 500 words')}
          </p>
        )}
        <p className="text-xs text-gray-500">
          This is the most important section. Describe how the nominee has made a positive difference and influenced others.
        </p>
      </div>

      {/* Why Deserve Award */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold">Why They Deserve This Award (Optional)</label>
          <span className="text-xs text-gray-500">{wordCounts.whyDeserveAward} words</span>
        </div>
        <textarea
          rows={4}
          value={formData.whyDeserveAward || ''}
          onChange={(e) => handleChange('whyDeserveAward', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none"
          placeholder="Explain why this nominee stands out and deserves recognition. What makes them exceptional compared to their peers?..."
        />
        <p className="text-xs text-gray-500">
          Additional compelling reasons why the nominee should be recognized with this award.
        </p>
      </div>

      {/* Additional Information */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-bold">Additional Information (Optional)</label>
          <span className="text-xs text-gray-500">{wordCounts.additionalInfo} words</span>
        </div>
        <textarea
          rows={3}
          value={formData.additionalInfo || ''}
          onChange={(e) => handleChange('additionalInfo', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 resize-none"
          placeholder="Any other relevant information, future goals, challenges overcome, or unique circumstances..."
        />
        <p className="text-xs text-gray-500">
          Any other relevant details that would help the judges understand the nominee better.
        </p>
      </div>

      {/* Writing Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">📋 Writing Guidelines:</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>Be Specific:</strong> Use concrete examples rather than general statements</li>
          <li>• <strong>Show Impact:</strong> Explain how actions led to positive outcomes</li>
          <li>• <strong>Use Numbers:</strong> Include statistics, quantities, or measurable results</li>
          <li>• <strong>Tell Stories:</strong> Narrative examples are more compelling than lists</li>
          <li>• <strong>Stay Relevant:</strong> Focus on achievements related to your selected category</li>
          <li>• <strong>Be Honest:</strong> Provide accurate information that can be verified</li>
        </ul>
      </div>

      {/* Sample Phrases */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h5 className="font-semibold text-green-800 mb-2">💡 Strong Impact Phrases:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-700">
          <div>
            <p>• "Increased participation by X%"</p>
            <p>• "Raised KSh X for charity"</p>
            <p>• "Mentored X students"</p>
            <p>• "Led a team of X people"</p>
          </div>
          <div>
            <p>• "Organized an event for X participants"</p>
            <p>• "Improved performance from X to Y"</p>
            <p>• "Created a solution that helped X people"</p>
            <p>• "Achieved top X% in competition"</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <h5 className="font-semibold text-gray-700 mb-2">📊 Completion Status:</h5>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Key Achievements:</span>
            <span className={wordCounts.achievements > 0 ? 'text-green-600' : 'text-red-600'}>
              {wordCounts.achievements > 0 ? '✅ Complete' : '❌ Required'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Impact Statement:</span>
            <span className={wordCounts.impact >= 300 && wordCounts.impact <= 500 ? 'text-green-600' : 'text-red-600'}>
              {wordCounts.impact >= 300 && wordCounts.impact <= 500 ? '✅ Complete' : '❌ Required (300-500 words)'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Why Deserve Award:</span>
            <span className="text-gray-500">Optional</span>
          </div>
          <div className="flex justify-between">
            <span>Additional Info:</span>
            <span className="text-gray-500">Optional</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NominationStatementStep;