// File: frontend/src/pages/AwardsPage.jsx
import React, { useState } from 'react';
import NominationForm from '../components/NominationForm';

const AwardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showNominationForm, setShowNominationForm] = useState(false);
  const [selectedCategoryForNomination, setSelectedCategoryForNomination] = useState('');

  const categories = [
    {
      name: 'Academic Excellence',
      icon: '🎓',
      description: 'Outstanding academic performance, scholarly achievements, and intellectual pursuits.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Leadership Excellence',
      icon: '👑',
      description: 'Exceptional leadership skills in school, community, or peer groups.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      name: 'Sports Excellence',
      icon: '🏆',
      description: 'Outstanding athletic performance and sportsmanship.',
      color: 'from-green-500 to-green-700'
    },
    {
      name: 'Arts & Creativity',
      icon: '🎨',
      description: 'Excellence in visual arts, performing arts, music, writing, or creative expression.',
      color: 'from-pink-500 to-pink-700'
    },
    {
      name: 'Innovation & Technology',
      icon: '💡',
      description: 'Creative problem-solving, technological innovation, or scientific discovery.',
      color: 'from-yellow-500 to-yellow-700'
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
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      name: 'Entrepreneurship',
      icon: '💼',
      description: 'Business innovation, startup creation, or entrepreneurial thinking.',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      name: 'Advocate for Change',
      icon: '✊',
      description: 'Championing social causes, human rights, or positive social change.',
      color: 'from-orange-500 to-orange-700'
    },
    {
      name: 'Cultural Ambassador',
      icon: '🌍',
      description: 'Promoting cultural understanding, diversity, and cross-cultural connections.',
      color: 'from-teal-500 to-teal-700'
    }
  ];

  // Handle nomination button click
  const handleNominate = (category = null) => {
    setSelectedCategoryForNomination(category ? category.name : '');
    setShowNominationForm(true);
    setSelectedCategory(null); // Close category modal if open
  };

  // Close nomination form
  const closeNominationForm = () => {
    setShowNominationForm(false);
    setSelectedCategoryForNomination('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-black mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              🏆 Teendom Awards 2025
            </h1>
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
              Celebrating Kenya's extraordinary teenagers - the thinkers, leaders, creators, 
              and changemakers between the ages of 13 to 19 who are leading change in their communities.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-red-100">Award Categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">13-19</div>
                  <div className="text-red-100">Age Range</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">Dec 6</div>
                  <div className="text-red-100">Awards Ceremony</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Awards Timeline
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow our structured process from nominations to the grand celebration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { phase: 'Pre-Awards', date: 'Aug - Sep 4', status: 'active' },
              { phase: 'Nominations', date: 'Sep 5 - 30', status: 'upcoming' },
              { phase: 'Judging', date: 'Oct 5 - Nov 5', status: 'upcoming' },
              { phase: 'Voting', date: 'Nov 8 - 21', status: 'upcoming' },
              { phase: 'Ceremony', date: 'Dec 6', status: 'upcoming' },
              { phase: 'Legacy', date: '2026', status: 'upcoming' }
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg text-center ${
                item.status === 'active' ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-100'
              }`}>
                <div className={`text-sm font-bold ${
                  item.status === 'active' ? 'text-red-700' : 'text-gray-600'
                }`}>
                  {item.phase}
                </div>
                <div className={`text-xs ${
                  item.status === 'active' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Award Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognizing excellence across diverse fields of teenage achievement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className={`h-20 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNominate(category);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Nominate
                    </button>
                    <button 
                      onClick={() => setSelectedCategory(category)}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Know an outstanding teenager who deserves recognition? 
            Nominate them today and help us celebrate the next generation of leaders!
          </p>
          
          <button
            onClick={() => handleNominate()}
            className="bg-white text-red-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🌟 START NOMINATION
          </button>
          
          <div className="mt-8 text-sm text-red-200">
            <p>Deadline: September 30, 2025 | Free to Submit | Self-nominations Welcome</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Who can be nominated?",
                answer: "Any teenager aged 13-19 (as of Dec 1, 2025) who is a Kenyan citizen or resident and making a positive impact in their community."
              },
              {
                question: "Can I nominate myself?",
                answer: "Yes! Self-nominations are welcome and encouraged. We believe teens should be empowered to share their own achievements."
              },
              {
                question: "Is there a nomination fee?",
                answer: "No, nominations are completely free. We believe recognition should be accessible to all deserving teenagers."
              },
              {
                question: "What do winners receive?",
                answer: "Winners receive national recognition, custom certificates, access to our alumni network, and a 12-month leadership development program."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`h-32 bg-gradient-to-r ${selectedCategory.color} flex items-center justify-center`}>
              <span className="text-6xl">{selectedCategory.icon}</span>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{selectedCategory.name}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedCategory.description}
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    handleNominate(selectedCategory);
                  }}
                  className="flex-1 py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Nominate for This Category
                </button>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Nomination Form Modal */}
      <NominationForm
        isOpen={showNominationForm}
        onClose={closeNominationForm}
        selectedCategory={selectedCategoryForNomination}
      />
    </div>
  );
};

export default AwardsPage;