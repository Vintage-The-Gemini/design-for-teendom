// File: frontend/src/pages/AwardsPage.jsx
import React, { useState } from 'react';
import NominationForm from '../components/NominationForm';

const AwardsPage = () => {
  const [showNominationForm, setShowNominationForm] = useState(false);
  const [selectedCategoryForNomination, setSelectedCategoryForNomination] = useState('');

  const categories = [
    {
      name: 'Academic Excellence',
      icon: '🎓',
      description: 'Outstanding academic performance, scholarly achievements, and intellectual pursuits.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Leadership Excellence',
      icon: '👑',
      description: 'Exceptional leadership skills in school, community, or peer groups.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Sports Excellence',
      icon: '🏆',
      description: 'Outstanding athletic performance and sportsmanship.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Arts & Creativity',
      icon: '🎨',
      description: 'Excellence in visual arts, performing arts, music, writing, or creative expression.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Innovation & Technology',
      icon: '💡',
      description: 'Creative problem-solving, technological innovation, or scientific discovery.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Community Service',
      icon: '🤝',
      description: 'Dedication to helping others and making a positive impact in the community.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Environmental Champion',
      icon: '🌱',
      description: 'Environmental conservation, sustainability initiatives, and climate action.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Entrepreneurship',
      icon: '💼',
      description: 'Business innovation, startup creation, or entrepreneurial thinking.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Advocate for Change',
      icon: '✊',
      description: 'Championing social causes, human rights, or positive social change.',
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Digital Impact',
      icon: '📱',
      description: 'Using digital platforms to inspire, educate, or mobilize audiences for good.',
      color: 'from-red-500 to-red-700'
    }
  ];

  // FIXED: Complete nomination button handler
  const handleNominate = (category = null) => {
    console.log('🎯 Nominate button clicked', category ? `for ${category}` : 'general');
    setSelectedCategoryForNomination(category || '');
    setShowNominationForm(true);
  };

  // Close nomination form
  const handleCloseForm = () => {
    console.log('❌ Closing nomination form');
    setShowNominationForm(false);
    setSelectedCategoryForNomination('');
  };

  return (
    <>
      <div className="pt-20 bg-white min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-red-600 rounded-full opacity-15"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-400 rounded-full opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-6 text-center relative">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-none tracking-tight">
              TEENDOM
              <br/>
              <span className="text-red-600">AWARDS</span>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed mb-12">
                Celebrating Kenya's outstanding teenagers - the thinkers, leaders, creators, and changemakers 
                between ages 13-19 who are shaping our future.
              </p>
              
              {/* Main Nominate Button */}
              <button
                onClick={() => handleNominate()}
                className="bg-red-600 text-white px-12 py-6 text-2xl font-bold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                🏆 NOMINATE NOW
              </button>
              
              <p className="text-gray-600 mt-6">
                Deadline: September 30th, 2025 | Ages 13-19 | Kenyan Citizens & Residents
              </p>
            </div>
          </div>
        </section>

        {/* Award Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">Award Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the category that best represents the nominee's achievements and impact
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <button
                      onClick={() => handleNominate(category.name)}
                      className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-700 transition-all duration-300"
                    >
                      Nominate for {category.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General Information */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">How to Nominate</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Choose Category</h3>
                <p className="text-gray-600 text-sm">Select the award category that best fits the nominee</p>
              </div>
              
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fill Form</h3>
                <p className="text-gray-600 text-sm">Complete the nomination form with detailed information</p>
              </div>
              
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Upload Files</h3>
                <p className="text-gray-600 text-sm">Add photos, certificates, and supporting documents</p>
              </div>
              
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 font-bold text-xl">4</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Submit</h3>
                <p className="text-gray-600 text-sm">Submit and receive confirmation via email</p>
              </div>
            </div>
            
            <button
              onClick={() => handleNominate()}
              className="bg-red-600 text-white px-8 py-4 text-xl font-bold rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Start Your Nomination
            </button>
          </div>
        </section>
      </div>

      {/* FIXED: Nomination Form Modal */}
      {showNominationForm && (
        <div className="fixed inset-0 z-50">
          <NominationForm
            isOpen={showNominationForm}
            onClose={handleCloseForm}
            selectedCategory={selectedCategoryForNomination}
          />
        </div>
      )}
    </>
  );
};

export default AwardsPage;