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
      color: 'secondary-blue',
      description: 'Recognizing young innovators creating solutions to community challenges',
      criteria: ['Original idea or solution', 'Community impact', 'Scalability potential', 'Innovation in approach']
    },
    {
      id: 'leadership',
      name: 'Leadership',
      icon: '👑',
      color: 'support-purple',
      description: 'Celebrating young leaders driving positive change in their communities',
      criteria: ['Leadership demonstrated', 'Team building skills', 'Vision and execution', 'Inspiring others']
    },
    {
      id: 'arts',
      name: 'Arts',
      icon: '🎨',
      color: 'neutral-pink',
      description: 'Honoring creative expression that promotes cultural heritage and social messages',
      criteria: ['Artistic excellence', 'Cultural significance', 'Social message', 'Community engagement']
    },
    {
      id: 'advocacy',
      name: 'Advocacy',
      icon: '📢',
      color: 'accent-red',
      description: 'Recognizing young advocates fighting for important social causes',
      criteria: ['Issue awareness', 'Advocacy strategies', 'Policy influence', 'Community mobilization']
    },
    {
      id: 'environment',
      name: 'Environmental Action',
      icon: '🌱',
      color: 'primary-yellow',
      description: 'Celebrating environmental champions protecting our planet',
      criteria: ['Environmental impact', 'Sustainability focus', 'Community involvement', 'Long-term vision']
    }
  ];

  const timeline = [
    { date: 'August 2025', event: 'Nominations Open', status: 'upcoming', icon: '📝', color: 'secondary-blue' },
    { date: 'October 2025', event: 'Nomination Deadline', status: 'upcoming', icon: '⏰', color: 'accent-red' },
    { date: 'November 2025', event: 'Judging & Shortlisting', status: 'upcoming', icon: '🎯', color: 'support-purple' },
    { date: 'December 2025', event: 'Awards Ceremony', status: 'upcoming', icon: '🏆', color: 'primary-yellow' }
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="pt-20">
      
      {/* Hero Section - BOLD & COLORFUL */}
      <section className="py-20 lg:py-32 bg-primary-yellow relative overflow-hidden">
        
        {/* Bold floating decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent-red rounded-full animate-float shadow-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-secondary-blue rounded-blob animate-bounce shadow-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-neutral-pink rounded-full animate-wiggle shadow-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            {/* Award Badge - BOLD */}
            <div className="inline-flex items-center space-x-3 bg-accent-red text-white px-8 py-4 rounded-full font-display font-bold animate-bounce shadow-2xl">
              <span className="text-2xl animate-pulse">🏆</span>
              <span className="text-lg font-black">FIRST EDITION - DECEMBER 2025</span>
              <span className="text-2xl animate-pulse">✨</span>
            </div>
            
            {/* Main Heading - SUPER BOLD */}
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-black leading-tight">
                <span className="text-accent-red hover:text-support-purple transition-colors duration-500 cursor-default">
                  TEENDOM
                </span>
              </div>
              <div className="text-4xl lg:text-6xl font-display font-black leading-tight">
                <span className="text-secondary-blue hover:text-neutral-pink transition-colors duration-500 cursor-default">
                  AWARDS
                </span>
              </div>
            </h1>
            
            {/* Description - BOLD */}
            <p className="text-xl text-gray-900 font-heading max-w-4xl mx-auto leading-relaxed font-bold">
              <span className="text-white font-black bg-secondary-blue px-4 py-2 rounded-xl shadow-lg">Celebrating Kenya's Teen Changemakers</span> - 
              A national initiative honoring exceptional teenagers who are leading change in their communities.
            </p>

            {/* Impact Stats - COLORFUL */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-accent-red text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl">
                <div className="text-4xl font-display font-black mb-2">100+</div>
                <div className="font-heading font-bold">Changemakers to Recognize</div>
                <div className="text-3xl mt-2">🌟</div>
              </div>
              <div className="bg-secondary-blue text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl">
                <div className="text-4xl font-display font-black mb-2">1M+</div>
                <div className="font-heading font-bold">Teens to Reach</div>
                <div className="text-3xl mt-2">📱</div>
              </div>
              <div className="bg-support-purple text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl">
                <div className="text-4xl font-display font-black mb-2">5</div>
                <div className="font-heading font-bold">Award Categories</div>
                <div className="text-3xl mt-2">🏆</div>
              </div>
            </div>

            {/* CTA Buttons - BOLD */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-secondary-blue text-white px-10 py-5 rounded-2xl font-display font-black text-xl hover:bg-support-purple hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl">
                <span className="text-2xl group-hover:animate-bounce">🌟</span>
                <span>Nominate a Teen</span>
              </button>
              <button className="group bg-gray-900 text-primary-yellow px-10 py-5 rounded-2xl font-display font-black text-xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl">
                <span className="text-2xl group-hover:animate-bounce">📋</span>
                <span>Download Criteria</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Award Categories - COLORFUL CARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - BOLD */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-support-purple text-white px-8 py-4 rounded-full font-display font-bold shadow-xl animate-bounce">
              <span className="text-2xl animate-pulse">🎯</span>
              <span className="text-lg font-black">Award Categories</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-black space-y-2">
              <div className="text-support-purple">FIVE AMAZING</div>
              <div className="text-accent-red">CATEGORIES</div>
            </h2>
            
            <p className="text-xl text-gray-900 font-heading font-bold">
              Different forms of teen excellence and impact we celebrate
            </p>
          </div>

          {/* Category Tabs - COLORFUL WITH REDUCED MARGIN */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-3 rounded-2xl font-display font-black transition-all duration-300 flex items-center space-x-2 shadow-xl text-sm sm:text-base sm:px-6 sm:py-4 ${
                  selectedCategory === category.id
                    ? `bg-${category.color} text-white scale-110`
                    : `bg-white text-gray-800 hover:scale-105 border-2 border-gray-300 hover:border-${category.color}`
                }`}
              >
                <span className="text-lg sm:text-2xl">{category.icon}</span>
                <span className="hidden sm:block">{category.name}</span>
                <span className="sm:hidden font-bold">{category.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Selected Category Details - BOLD CARD WITH REDUCED MARGIN */}
          {selectedCategoryData && (
            <div className="bg-gray-50 rounded-3xl p-6 lg:p-8 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                
                {/* Left Content */}
                <div className="space-y-4">
                  <div className={`w-20 h-20 bg-${selectedCategoryData.color} rounded-2xl flex items-center justify-center text-3xl shadow-xl`}>
                    {selectedCategoryData.icon}
                  </div>
                  
                  <h3 className="text-3xl font-display font-black text-gray-900">{selectedCategoryData.name}</h3>
                  <p className="text-lg text-gray-800 font-heading font-bold">{selectedCategoryData.description}</p>
                  
                  <h4 className="text-xl font-display font-black text-gray-900 mt-4">Judging Criteria:</h4>
                  <ul className="space-y-3">
                    {selectedCategoryData.criteria.map((criterion, index) => {
                      const icons = ['✨', '🎯', '🚀', '💪'];
                      return (
                        <li key={index} className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-${selectedCategoryData.color} rounded-full flex items-center justify-center text-lg shadow-lg`}>
                            {icons[index]}
                          </div>
                          <span className="text-gray-800 font-heading font-bold">{criterion}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Right CTA - BOLD */}
                <div className="bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                  <div className="text-6xl animate-bounce">{selectedCategoryData.icon}</div>
                  <h4 className="text-2xl font-display font-black text-gray-900">
                    Ready to Nominate?
                  </h4>
                  <p className="text-gray-800 font-heading font-bold">
                    Know a teen making impact in {selectedCategoryData.name.toLowerCase()}? 
                    Nominate them for recognition!
                  </p>
                  <button className={`w-full bg-${selectedCategoryData.color} text-white px-6 py-4 rounded-2xl font-display font-black text-lg hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2`}>
                    <span>Nominate for {selectedCategoryData.name}</span>
                    <span className="text-xl">🎯</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline - COLORFUL */}
      <section className="py-20 bg-secondary-blue-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-neutral-pink text-white px-8 py-4 rounded-full font-display font-bold shadow-xl animate-bounce">
              <span className="text-2xl animate-pulse">📅</span>
              <span className="text-lg font-black">Awards Timeline</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-black space-y-2">
              <div className="text-secondary-blue">KEY DATES FOR</div>
              <div className="text-support-purple">TEENDOM AWARDS 2025</div>
            </h2>
          </div>

          {/* Timeline Grid - BOLD CARDS */}
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 bg-${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle shadow-2xl`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-display font-black text-gray-900 mb-3">{item.event}</h3>
                  <p className={`text-${item.color} font-heading font-black text-lg`}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action - BRIGHT & BOLD */}
      <section className="py-20 bg-support-purple relative overflow-hidden">
        
        {/* Bold background decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary-yellow rounded-full animate-pulse shadow-2xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-neutral-pink rounded-blob animate-float shadow-2xl"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            <h2 className="text-5xl lg:text-6xl font-display font-black text-white leading-tight">
              Know a Teen Changemaker?
              <div className="flex justify-center space-x-4 mt-6">
                <span className="text-5xl animate-bounce">🌟</span>
                <span className="text-5xl animate-bounce" style={{animationDelay: '0.1s'}}>🏆</span>
                <span className="text-5xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
              </div>
            </h2>
            
            <p className="text-2xl text-purple-100 font-heading leading-relaxed font-bold">
              Nominations open soon! Help us recognize and celebrate the incredible teenagers 
              who are making a difference in communities across Kenya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-primary-yellow text-gray-900 px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-primary-yellow-light hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl">
                <span className="text-3xl group-hover:animate-bounce">🌟</span>
                <span>Get Notified When Nominations Open</span>
                <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform duration-300" />
              </button>
              <button className="group bg-white text-support-purple px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-gray-100 hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl">
                <span className="text-3xl group-hover:animate-bounce">🤝</span>
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