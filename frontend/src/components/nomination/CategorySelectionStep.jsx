// File: frontend/src/components/nomination/CategorySelectionStep.jsx
import React from 'react';

const CategorySelectionStep = ({ 
  formData, 
  setFormData,
  errors 
}) => {
  const categories = [
    {
      name: 'Academic Excellence',
      icon: '🎓',
      description: 'Outstanding academic performance, scholarly achievements, and intellectual pursuits.',
      examples: 'High grades, academic competitions, research projects, scholarships',
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Leadership Excellence', 
      icon: '👑',
      description: 'Exceptional leadership skills in school, community, or peer groups.',
      examples: 'Student government, club leadership, team captain, organizing events',
      color: 'from-purple-500 to-purple-700'
    },
    {
      name: 'Sports Excellence',
      icon: '🏆',
      description: 'Outstanding athletic performance and sportsmanship.',
      examples: 'Competition wins, team achievements, coaching others, sports innovation',
      color: 'from-green-500 to-green-700'
    },
    {
      name: 'Arts & Creativity',
      icon: '🎨',
      description: 'Excellence in visual arts, performing arts, music, writing, or creative expression.',
      examples: 'Art exhibitions, performances, creative writing, music composition',
      color: 'from-pink-500 to-pink-700'
    },
    {
      name: 'Innovation & Technology',
      icon: '💡',
      description: 'Creative problem-solving, technological innovation, or scientific discovery.',
      examples: 'App development, inventions, coding projects, tech solutions',
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      name: 'Community Service',
      icon: '🤝',
      description: 'Dedication to helping others and making a positive impact in the community.',
      examples: 'Volunteer work, charity initiatives, helping vulnerable groups',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Environmental Champion',
      icon: '🌱',
      description: 'Environmental conservation, sustainability initiatives, and climate action.',
      examples: 'Tree planting, clean-up drives, environmental awareness campaigns',
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      name: 'Entrepreneurship',
      icon: '💼',
      description: 'Business innovation, startup creation, or entrepreneurial thinking.',
      examples: 'Starting a business, innovative business ideas, economic impact',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      name: 'Advocate for Change',
      icon: '✊',
      description: 'Championing social causes, human rights, or positive social change.',
      examples: 'Social justice campaigns, advocacy work, raising awareness',
      color: 'from-orange-500 to-orange-700'
    },
    {
      name: 'Cultural Ambassador',
      icon: '🌍',
      description: 'Promoting cultural understanding, diversity, and cross-cultural connections.',
      examples: 'Cultural events, international exchanges, promoting unity',
      color: 'from-teal-500 to-teal-700'
    }
  ];

  const handleCategorySelect = (categoryName) => {
    setFormData(prev => ({
      ...prev,
      awardCategory: categoryName
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">🏆 Award Category Selection</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="text-blue-800 font-semibold mb-2">📋 How to Choose:</h4>
        <p className="text-sm text-blue-700">
          Select the category that best represents the nominee's primary area of excellence. 
          Read each description carefully and choose the one that most closely matches their achievements and impact.
          You can change your selection at any time during the nomination process.
        </p>
      </div>

      {/* Pre-selected Category Notice */}
      {formData.awardCategory && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="text-green-800 font-semibold mb-2">✅ Currently Selected:</h4>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">
              {categories.find(cat => cat.name === formData.awardCategory)?.icon}
            </span>
            <div>
              <p className="font-medium text-green-700">{formData.awardCategory}</p>
              <p className="text-sm text-green-600">
                {categories.find(cat => cat.name === formData.awardCategory)?.description}
              </p>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">
            You can select a different category below if this doesn't match best.
          </p>
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategorySelect(category.name)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md group ${
              formData.awardCategory === category.name
                ? 'border-red-500 bg-red-50 shadow-md ring-2 ring-red-200'
                : 'border-gray-300 bg-white hover:border-red-300 hover:bg-red-25'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`text-3xl transition-transform duration-200 ${
                formData.awardCategory === category.name ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                {category.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-lg mb-2 flex items-center ${
                  formData.awardCategory === category.name ? 'text-red-700' : 'text-gray-800'
                }`}>
                  {category.name}
                  {formData.awardCategory === category.name && (
                    <span className="ml-2 text-red-600 text-xl">✓</span>
                  )}
                </h4>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {category.description}
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <strong>Examples:</strong> {category.examples}
                </div>
                
                {/* Selection Indicator */}
                {formData.awardCategory === category.name && (
                  <div className="mt-3 text-xs text-red-600 font-medium bg-red-100 px-2 py-1 rounded">
                    ✓ SELECTED - This nominee will be considered for {category.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Display */}
      {errors.category && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">❌ {errors.category}</p>
        </div>
      )}

      {/* Selection Summary */}
      {formData.awardCategory && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-gray-800 font-semibold mb-2">📊 Your Selection Summary:</h4>
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl">
              {categories.find(cat => cat.name === formData.awardCategory)?.icon}
            </span>
            <div>
              <p className="font-medium text-gray-700 text-lg">{formData.awardCategory}</p>
              <p className="text-sm text-gray-600">
                {categories.find(cat => cat.name === formData.awardCategory)?.description}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600 bg-white p-3 rounded border">
            <p><strong>What this means:</strong> Your nomination will be evaluated specifically within the {formData.awardCategory} category. 
            Judges will assess the nominee's achievements, impact, and potential based on criteria relevant to this category.</p>
          </div>
        </div>
      )}

      {/* Additional Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">💡 Selection Guidelines:</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Choose the category where the nominee has made their most significant impact</li>
          <li>• If the nominee excels in multiple areas, select their primary strength</li>
          <li>• Consider the specific achievements you'll describe in the nomination statement</li>
          <li>• Each nominee can only be nominated for ONE category per year</li>
          <li>• Make sure you have sufficient evidence to support your category choice</li>
          <li>• All categories are equally prestigious - choose based on fit, not preference</li>
        </ul>
      </div>

      {/* Category Statistics */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-700 mb-2">📊 About the Categories:</h5>
        <p className="text-sm text-gray-600 mb-2">
          All categories are equally prestigious and competitive. Winners are selected based on the quality of 
          achievements and impact within each specific category, not by comparing across categories.
        </p>
        <div className="text-xs text-gray-500 bg-white p-2 rounded">
          <strong>Remember:</strong> You can change your category selection until you submit the final nomination.
        </div>
      </div>

      {/* Progress Indicator */}
      {!formData.awardCategory && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">👆 Please select a category above to continue</p>
        </div>
      )}
    </div>
  );
};

export default CategorySelectionStep;