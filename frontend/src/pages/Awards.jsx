// File: frontend/src/pages/Awards.jsx

import React, { useState } from 'react';
import { Calendar, Users, Trophy, Star, ArrowRight, CheckCircle, Award, Target } from 'lucide-react';

const Awards = () => {
  const [selectedCategory, setSelectedCategory] = useState('innovation');

  const categories = [
    {
      id: 'innovation',
      name: 'Innovation',
      icon: '💡',
      color: 'teen-blue',
      description: 'Recognizing young innovators creating solutions to community challenges',
      criteria: ['Original idea or solution', 'Community impact', 'Scalability potential', 'Innovation in approach']
    },
    {
      id: 'leadership',
      name: 'Leadership',
      icon: '👑',
      color: 'teen-purple',
      description: 'Celebrating young leaders driving positive change in their communities',
      criteria: ['Leadership demonstrated', 'Team building skills', 'Vision and execution', 'Inspiring others']
    },
    {
      id: 'arts',
      name: 'Arts & Culture',
      icon: '🎨',
      color: 'teen-pink',
      description: 'Honoring creative expression that promotes cultural heritage and social messages',
      criteria: ['Artistic excellence', 'Cultural significance', 'Social message', 'Community engagement']
    },
    {
      id: 'advocacy',
      name: 'Advocacy',
      icon: '📢',
      color: 'teen-orange',
      description: 'Recognizing young advocates fighting for important social causes',
      criteria: ['Issue awareness', 'Advocacy strategies', 'Policy influence', 'Community mobilization']
    },
    {
      id: 'environment',
      name: 'Environment',
      icon: '🌱',
      color: 'teen-green',
      description: 'Celebrating environmental champions protecting our planet',
      criteria: ['Environmental impact', 'Sustainability focus', 'Community involvement', 'Long-term vision']
    },
    {
      id: 'community',
      name: 'Community Impact',
      icon: '🤝',
      color: 'teen-yellow',
      description: 'Honoring teens making significant positive impact in their communities',
      criteria: ['Measurable impact', 'Community benefit', 'Collaboration skills', 'Sustainable approach']
    }
  ];

  const timeline = [
    { date: 'August 2025', event: 'Nominations Open', status: 'upcoming', icon: '📝', color: 'teen-blue' },
    { date: 'October 2025', event: 'Nomination Deadline', status: 'upcoming', icon: '⏰', color: 'teen-orange' },
    { date: 'November 2025', event: 'Judging & Shortlisting', status: 'upcoming', icon: '🎯', color: 'teen-purple' },
    { date: 'December 2025', event: 'Awards Ceremony', status: 'upcoming', icon: '🏆', color: 'teen-pink' }
  ];

  const judges = [
    {
      name: 'Dr. Sarah Kimani',
      role: 'Constitutional Lawyer',
      organization: 'Supreme Court of Kenya',
      emoji: '👩‍⚖️',
      color: 'teen-blue'
    },
    {
      name: 'Prof. James Ochieng',
      role: 'Education Expert',
      organization: 'University of Nairobi',
      emoji: '👨‍🏫',
      color: 'teen-green'
    },
    {
      name: 'Grace Wanjiku',
      role: 'Youth Development Specialist',
      organization: 'UNICEF Kenya',
      emoji: '👩‍💼',
      color: 'teen-pink'
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="pt-20">
      
      {/* Hero Section - Trophy & Celebration Theme */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-yellow/20 via-white to-teen-pink/20 relative overflow-hidden">
        
        {/* Floating decorations */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-teen-orange/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teen-purple/15 rounded-blob animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-teen-blue/20 rounded-full animate-wiggle"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            {/* Award Badge */}
            <div className="inline-flex items-center space-x-3 bg-teen-orange text-white px-6 py-3 rounded-full font-display font-bold animate-bounce shadow-xl">
              <span className="text-xl animate-pulse">🏆</span>
              <span>FIRST EDITION - DECEMBER 2025</span>
              <span className="text-xl animate-pulse">✨</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                <span className="text-teen-orange hover:text-teen-red transition-colors duration-500 cursor-default">
                  TEENDOM
                </span>
              </div>
              <div className="text-4xl lg:text-6xl font-display font-bold leading-tight">
                <span className="text-teen-pink hover:text-teen-purple transition-colors duration-500 cursor-default">
                  AWARDS
                </span>
              </div>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 font-heading max-w-4xl mx-auto leading-relaxed">
              <span className="text-teen-blue font-bold">Celebrating Kenya's Teen Changemakers</span> - 
              A national initiative honoring exceptional teenagers who are leading change in their communities.
            </p>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card-orange transform hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-display font-bold text-teen-orange mb-2">100+</div>
                <div className="text-gray-600 font-heading font-semibold">Changemakers to Recognize</div>
                <div className="text-2xl mt-2">🌟</div>
              </div>
              <div className="card-pink transform hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-display font-bold text-teen-pink mb-2">1M+</div>
                <div className="text-gray-600 font-heading font-semibold">Teens to Reach</div>
                <div className="text-2xl mt-2">📱</div>
              </div>
              <div className="card-blue transform hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-display font-bold text-teen-blue mb-2">6</div>
                <div className="text-gray-600 font-heading font-semibold">Award Categories</div>
                <div className="text-2xl mt-2">🏆</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-teen-orange text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-red hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                <span className="text-xl group-hover:animate-bounce">🌟</span>
                <span>Nominate a Teen</span>
              </button>
              <button className="group border-2 border-teen-pink text-teen-pink px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-pink hover:text-white transition-all duration-300 flex items-center justify-center space-x-3">
                <span className="text-xl group-hover:animate-bounce">📋</span>
                <span>Download Criteria</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Award Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-purple">Award</span>{' '}
              <span className="text-teen-orange">Categories</span>
              <span className="text-3xl ml-2">🎯</span>
            </h2>
            <p className="text-xl text-gray-600 font-heading">
              Six categories celebrating different forms of teen excellence and impact
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-display font-bold transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? `bg-${category.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Category Details */}
          {selectedCategoryData && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Content */}
                <div className="space-y-6">
                  <div className={`w-20 h-20 bg-${selectedCategoryData.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                    {selectedCategoryData.icon}
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-gray-800">{selectedCategoryData.name}</h3>
                  <p className="text-lg text-gray-600 font-heading">{selectedCategoryData.description}</p>
                  
                  <h4 className="text-xl font-display font-bold text-gray-800">Judging Criteria:</h4>
                  <ul className="space-y-3">
                    {selectedCategoryData.criteria.map((criterion, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle size={20} className={`text-${selectedCategoryData.color}`} />
                        <span className="text-gray-700 font-heading">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right CTA */}
                <div className={`bg-${selectedCategoryData.color}/10 rounded-3xl p-8 text-center space-y-6`}>
                  <div className="text-6xl">{selectedCategoryData.icon}</div>
                  <h4 className="text-2xl font-display font-bold text-gray-800">
                    Ready to Nominate?
                  </h4>
                  <p className="text-gray-600 font-heading">
                    Know a teen making impact in {selectedCategoryData.name.toLowerCase()}? 
                    Nominate them for recognition!
                  </p>
                  <button className={`w-full bg-${selectedCategoryData.color} text-white px-8 py-4 rounded-2xl font-display font-bold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2`}>
                    <span>Nominate for {selectedCategoryData.name}</span>
                    <span className="text-xl">🎯</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-teen-purple/10 to-teen-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-blue">Awards</span>{' '}
              <span className="text-teen-purple">Timeline</span>
              <span className="text-3xl ml-2">📅</span>
            </h2>
            <p className="text-xl text-gray-600 font-heading">
              Key dates for the Teendom Awards 2025
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle shadow-lg`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-gray-800 mb-2">{item.event}</h3>
                <p className={`text-${item.color} font-heading font-bold`}>{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Judges Panel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-green">Our Esteemed</span>{' '}
              <span className="text-teen-orange">Judges</span>
              <span className="text-3xl ml-2">⚖️</span>
            </h2>
            <p className="text-xl text-gray-600 font-heading">
              Expert panel ensuring fair and comprehensive evaluation
            </p>
          </div>

          {/* Judges Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {judges.map((judge, index) => (
              <div key={index} className={`card hover:shadow-xl transition-all duration-500 text-center border-t-4 border-${judge.color} group`}>
                <div className="text-6xl mb-4 group-hover:animate-bounce">{judge.emoji}</div>
                <h3 className="text-xl font-display font-bold text-gray-800 mb-2">{judge.name}</h3>
                <p className={`text-${judge.color} font-heading font-bold mb-1`}>{judge.role}</p>
                <p className="text-gray-600 text-sm font-heading">{judge.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teen-blue relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-teen-yellow/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-teen-pink/20 rounded-blob animate-float"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              Know a Teen Changemaker?
              <div className="flex justify-center space-x-2 mt-4">
                <span className="text-3xl animate-bounce">🌟</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.1s'}}>🏆</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
              </div>
            </h2>
            
            <p className="text-xl text-blue-100 font-heading leading-relaxed">
              Nominations open soon! Help us recognize and celebrate the incredible teenagers 
              who are making a difference in communities across Kenya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-teen-blue px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-yellow hover:text-gray-800 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                <span className="text-xl group-hover:animate-bounce">🌟</span>
                <span>Get Notified When Nominations Open</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-white hover:text-teen-blue transition-all duration-300 flex items-center justify-center space-x-3">
                <span className="text-xl group-hover:animate-bounce">🤝</span>
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;