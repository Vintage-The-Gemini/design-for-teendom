// File: frontend/src/pages/AwardsPage.jsx
import React, { useState, useEffect } from 'react';

const AwardsPage = () => {
  const [currentPhase, setCurrentPhase] = useState('pre-awards');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showNominationForm, setShowNominationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      name: "Advocate for Change",
      icon: "📢",
      color: "from-red-500 to-red-600",
      description: "Recognizing teenagers who actively work to create positive social change in their communities through advocacy, activism, and community engagement."
    },
    {
      name: "Sports Excellence", 
      icon: "⚽",
      color: "from-blue-500 to-blue-600",
      description: "Celebrating outstanding athletic achievement, sportsmanship, and dedication to sports among teenagers."
    },
    {
      name: "Academic Excellence",
      icon: "🎓", 
      color: "from-green-500 to-green-600",
      description: "Honoring exceptional academic achievement, intellectual curiosity, and scholarly pursuits."
    },
    {
      name: "Arts & Creativity",
      icon: "🎨",
      color: "from-purple-500 to-purple-600", 
      description: "Recognizing outstanding artistic talent, creative expression, and innovation in various art forms."
    },
    {
      name: "Leadership Excellence",
      icon: "👑",
      color: "from-yellow-500 to-yellow-600",
      description: "Celebrating exceptional leadership qualities, vision, and the ability to inspire and guide others."
    },
    {
      name: "Community Service",
      icon: "🤝",
      color: "from-indigo-500 to-indigo-600",
      description: "Honoring dedication to community service, volunteerism, and making a positive impact in local communities."
    },
    {
      name: "Innovation & Technology", 
      icon: "💻",
      color: "from-cyan-500 to-cyan-600",
      description: "Recognizing innovative use of technology, technological creativity, and contributions to the digital world."
    },
    {
      name: "Environmental Champion",
      icon: "🌱", 
      color: "from-emerald-500 to-emerald-600",
      description: "Celebrating commitment to environmental protection, sustainability, and conservation efforts."
    },
    {
      name: "Entrepreneurship",
      icon: "💼",
      color: "from-orange-500 to-orange-600", 
      description: "Honoring young entrepreneurs, business innovators, and those showing exceptional business acumen."
    },
    {
      name: "Cultural Ambassador",
      icon: "🎭",
      color: "from-pink-500 to-pink-600",
      description: "Recognizing promotion and preservation of cultural heritage, traditions, and cross-cultural understanding."
    }
  ];

  const timeline = [
    { name: "Pre-Awards", period: "Aug - Sep 4", status: "completed", icon: "🛠️" },
    { name: "Nominations", period: "Sep 5 - 30", status: "active", icon: "📝" },
    { name: "Judging", period: "Oct 5 - Nov 5", status: "upcoming", icon: "👥" },
    { name: "Voting", period: "Nov 8 - 24", status: "upcoming", icon: "🗳️" },
    { name: "Ceremony", period: "Dec 6", status: "upcoming", icon: "🏆" },
    { name: "Legacy", period: "Dec 7 - 2026", status: "upcoming", icon: "🌟" }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const phases = [
          { id: 'pre-awards', start: new Date('2025-08-01'), end: new Date('2025-09-04') },
          { id: 'nominations', start: new Date('2025-09-05'), end: new Date('2025-09-30') },
          { id: 'judging', start: new Date('2025-10-05'), end: new Date('2025-11-05') },
          { id: 'voting', start: new Date('2025-11-08'), end: new Date('2025-11-24') },
          { id: 'ceremony', start: new Date('2025-12-06'), end: new Date('2025-12-06') },
          { id: 'post-awards', start: new Date('2025-12-07'), end: new Date('2026-12-31') }
        ];

        const active = phases.find(phase => today >= phase.start && today <= phase.end);
        if (active) {
          setCurrentPhase(active.id);
        }
      } catch (error) {
        console.error('Failed to load awards data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleNominate = (category = null) => {
    setSelectedCategory(category);
    setShowNominationForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading Teendom Awards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              🏆 TEENDOM AWARDS 2025
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-4xl mx-auto">
              Recognizing and celebrating outstanding teenagers who are making a difference in their communities
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">📝</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold">Current Phase: Nominations Season</h3>
                  <p className="text-red-100">September 5 - 30</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNominate()}
              className="bg-white text-red-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🌟 NOMINATE NOW
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-12" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Awards Timeline
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((phase, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-6 transition-all duration-300 ${getStatusColor(phase.status)}`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{phase.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{phase.name}</h3>
                    <p className="text-sm opacity-75">{phase.period}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(phase.status)}`}>
                    {phase.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Award Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Ten categories celebrating different aspects of teenage excellence and contribution to society
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div className={`h-24 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <span className="text-4xl">{category.icon}</span>
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

      {showNominationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-red-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">🏆 Nomination Form</h2>
                <button
                  onClick={() => setShowNominationForm(false)}
                  className="text-white hover:text-red-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <h3 className="text-lg font-bold">Nomination Form is Working!</h3>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Nominee Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter nominee name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Why do they deserve this award? *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="Tell us why they should win..."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700"
                  >
                    Submit Nomination
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNominationForm(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;