// File: src/pages/Awards.jsx

import React, { useState } from 'react';
import { Calendar, Users, Trophy, Star, ArrowRight, CheckCircle } from 'lucide-react';

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
    { date: 'August 2025', event: 'Nominations Open', status: 'upcoming' },
    { date: 'October 2025', event: 'Nomination Deadline', status: 'upcoming' },
    { date: 'November 2025', event: 'Judging & Shortlisting', status: 'upcoming' },
    { date: 'December 2025', event: 'Awards Ceremony', status: 'upcoming' }
  ];

  const judges = [
    {
      name: 'Dr. Sarah Kimani',
      role: 'Constitutional Lawyer',
      organization: 'Supreme Court of Kenya',
      image: '👩‍⚖️'
    },
    {
      name: 'Prof. James Ochieng',
      role: 'Education Expert',
      organization: 'University of Nairobi',
      image: '👨‍🏫'
    },
    {
      name: 'Grace Wanjiku',
      role: 'Youth Development Specialist',
      organization: 'UNICEF Kenya',
      image: '👩‍💼'
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-yellow/20 via-teen-orange/10 to-teen-pink/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teen-pink to-teen-purple text-white px-6 py-2 rounded-full font-bold mb-6 animate-bounce">
              🏆 FIRST EDITION - DECEMBER 2025
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6 leading-tight">
              <span className="gradient-text">TEENDOM</span><br/>
              <span className="text-gray-800">AWARDS</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Celebrating Kenya's Teen Changemakers - A national initiative honoring exceptional 
              teenagers who are leading change in their communities.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-teen-blue mb-2">100+</div>
                <div className="text-gray-600">Changemakers to Recognize</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-teen-pink mb-2">1M+</div>
                <div className="text-gray-600">Teens to Reach</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-teen-orange mb-2">6</div>
                <div className="text-gray-600">Award Categories</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-teen-blue to-teen-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                🌟 Nominate a Teen
              </button>
              <button className="border-2 border-teen-pink text-teen-pink px-8 py-4 rounded-full font-bold text-lg hover:bg-teen-pink hover:text-white transition-all">
                📋 Download Criteria
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Award Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Award Categories
            </h2>
            <p className="text-xl text-gray-600">
              Six categories celebrating different forms of teen excellence and impact
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Selected Category Details */}
          {selectedCategoryData && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className={`w-20 h-20 bg-${selectedCategoryData.color} rounded-2xl flex items-center justify-center text-4xl mb-6`}>
                    {selectedCategoryData.icon}
                  </div>
                  <h3 className="text-3xl font-bold font-display text-gray-800 mb-4">{selectedCategoryData.name}</h3>
                  <p className="text-lg text-gray-600 mb-8">{selectedCategoryData.description}</p>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Judging Criteria:</h4>
                  <ul className="space-y-3">
                    {selectedCategoryData.criteria.map((criterion, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle size={20} className={`text-${selectedCategoryData.color}`} />
                        <span className="text-gray-700">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`bg-gradient-to-br from-${selectedCategoryData.color}/20 to-${selectedCategoryData.color}/5 rounded-3xl p-8`}>
                  <div className="text-center">
                    <div className="text-6xl mb-6">{selectedCategoryData.icon}</div>
                    <h4 className="text-2xl font-bold font-display text-gray-800 mb-4">
                      Ready to Nominate?
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Know a teen making impact in {selectedCategoryData.name.toLowerCase()}? 
                      Nominate them for recognition!
                    </p>
                    <button className={`bg-${selectedCategoryData.color} text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition-all`}>
                      Nominate for {selectedCategoryData.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-r from-teen-purple/10 to-teen-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Awards Timeline
            </h2>
            <p className="text-xl text-gray-600">
              Key dates for the Teendom Awards 2025
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
                  item.status === 'upcoming' ? 'bg-teen-blue' : 'bg-gray-300'
                }`}>
                  <Calendar size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold font-display text-gray-800 mb-2">{item.event}</h3>
                <p className="text-teen-blue font-semibold">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Judges Panel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Our Esteemed Judges
            </h2>
            <p className="text-xl text-gray-600">
              Expert panel ensuring fair and comprehensive evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {judges.map((judge, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all">
                <div className="text-6xl mb-4">{judge.image}</div>
                <h3 className="text-xl font-bold font-display text-gray-800 mb-2">{judge.name}</h3>
                <p className="text-teen-blue font-semibold mb-1">{judge.role}</p>
                <p className="text-gray-600 text-sm">{judge.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Beyond Awards */}
      <section className="py-20 bg-gradient-to-br from-teen-yellow/20 to-teen-orange/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-display gradient-text mb-8">
                Beyond the Awards
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '🏕️',
                    title: 'Teencamps',
                    description: 'Exclusive leadership and skills development camps for finalists'
                  },
                  {
                    icon: '🎯',
                    title: 'Mentorship Programs',
                    description: 'Connect with industry leaders and experienced professionals'
                  },
                  {
                    icon: '📺',
                    title: 'Media Exposure',
                    description: 'Feature stories and interviews showcasing your impact'
                  },
                  {
                    icon: '💼',
                    title: 'Life Skills Training',
                    description: 'Workshops on entrepreneurship, communication, and leadership'
                  },
                  {
                    icon: '🌐',
                    title: 'Network Building',
                    description: 'Connect with like-minded teens and change-makers across Kenya'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-3xl">{benefit.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-gray-800 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teen-pink to-teen-purple rounded-3xl p-12 text-white text-center shadow-2xl">
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-3xl font-bold font-display mb-4">Join the Movement!</h3>
                <p className="text-pink-100 mb-8">
                  Be part of a national celebration of teen brilliance, purpose, and hope.
                </p>
                <div className="space-y-4">
                  <button className="w-full bg-white text-teen-purple px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    🌟 Nominate a Teen
                  </button>
                  <button className="w-full border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-teen-purple transition-all">
                    💼 Become a Partner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Join us in celebrating and supporting Kenya's next generation of leaders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: 'In-kind Support',
                icon: '🤝',
                color: 'teen-blue',
                examples: ['Venues', 'Event kits', 'Airtime', 'Meals & transport', 'Technology'],
                impact: 'Direct event support'
              },
              {
                type: 'Strategic Support',
                icon: '💡',
                color: 'teen-purple',
                examples: ['Training', 'Mentorship', 'Advocacy', 'Professional services', 'Expertise'],
                impact: 'Capacity building'
              },
              {
                type: 'Financial Sponsorship',
                icon: '💰',
                color: 'teen-orange',
                examples: ['Event sponsors', 'Category sponsors', 'Ceremony co-hosts', 'Prize funding'],
                impact: 'Program sustainability'
              }
            ].map((partnership, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className={`w-16 h-16 bg-${partnership.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                  {partnership.icon}
                </div>
                <h3 className="text-2xl font-bold font-display text-gray-800 mb-4">{partnership.type}</h3>
                <p className={`text-${partnership.color} font-semibold mb-4`}>{partnership.impact}</p>
                
                <ul className="space-y-2 mb-6">
                  {partnership.examples.map((example, exIndex) => (
                    <li key={exIndex} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-${partnership.color} rounded-full`}></div>
                      <span className="text-gray-600 text-sm">{example}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full bg-${partnership.color} text-white py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all`}>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-teen-blue to-teen-purple">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-white mb-6">
            Know a Teen Changemaker?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Nominations open soon! Help us recognize and celebrate the incredible teenagers 
            who are making a difference in communities across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teen-blue px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all inline-flex items-center space-x-2">
              <span>🌟 Get Notified When Nominations Open</span>
              <ArrowRight size={20} />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-teen-blue transition-all">
              📞 Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;