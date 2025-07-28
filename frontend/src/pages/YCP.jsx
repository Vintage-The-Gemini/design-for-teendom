// File: frontend/src/pages/YCP.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Target, Clock, CheckCircle, Star, Award, PlayCircle, Download } from 'lucide-react';

const YCP = () => {
  const [selectedPath, setSelectedPath] = useState('online');

  const learningPaths = [
    {
      id: 'self-paced',
      title: 'Self-Paced Learning',
      duration: '6 weeks',
      icon: BookOpen,
      color: 'teen-yellow',
      price: 'FREE',
      emoji: '📖',
      features: [
        'Learn at your own pace',
        'Interactive modules',
        'Audio & video presentations',
        'Digital certificate',
        'Access to resource library',
        'Community forum access'
      ],
      popular: false
    },
    {
      id: 'online',
      title: 'Online Classes',
      duration: '8 weeks',
      icon: Users,
      color: 'teen-blue',
      price: 'KSH 2,500',
      emoji: '💻',
      features: [
        'Live weekly sessions',
        'Expert facilitators',
        'Peer discussions',
        'Industry guest speakers',
        'Group projects',
        'Mentorship opportunities'
      ],
      popular: true
    },
    {
      id: 'physical',
      title: 'Physical Classes',
      duration: '12 weeks',
      icon: Target,
      color: 'teen-pink',
      price: 'KSH 4,000',
      emoji: '🏫',
      features: [
        'In-person sessions',
        'Hands-on activities',
        'Community visits',
        'Court visits',
        'Networking events',
        'Leadership workshops'
      ],
      popular: false
    }
  ];

  const topics = [
    {
      module: 1,
      title: 'Teens, the Law & Society',
      icon: '⚖️',
      color: 'teen-yellow',
      description: 'Understanding how law impacts teenage life and society',
      lessons: ['Introduction to Law', 'Rights and Responsibilities', 'Law in Daily Life']
    },
    {
      module: 2,
      title: 'Citizenship & Personal Development',
      icon: '🏛️',
      color: 'teen-blue',
      description: 'Building strong citizenship foundations and personal growth',
      lessons: ['What is Citizenship?', 'Personal Development', 'Community Engagement']
    },
    {
      module: 3,
      title: 'Leadership and Volunteerism',
      icon: '👑',
      color: 'teen-purple',
      description: 'Developing leadership skills and community service mindset',
      lessons: ['Leadership Styles', 'Volunteer Opportunities', 'Project Management']
    },
    {
      module: 4,
      title: 'Human Rights & Children Participation',
      icon: '✊',
      color: 'teen-pink',
      description: 'Understanding fundamental rights and meaningful participation',
      lessons: ['Human Rights Framework', 'Children Rights', 'Participation Mechanisms']
    },
    {
      module: 5,
      title: 'Government and Public Service',
      icon: '🏢',
      color: 'teen-green',
      description: 'How government works and opportunities in public service',
      lessons: ['Government Structure', 'Public Service', 'Civic Engagement']
    }
  ];

  const selectedPathData = learningPaths.find(path => path.id === selectedPath);

  return (
    <div className="pt-20">
      
      {/* Hero Section - Super Colorful! */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-blue/10 via-white to-teen-green/10 relative overflow-hidden">
        
        {/* Floating decorations */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-teen-yellow/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teen-pink/15 rounded-blob animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-teen-purple/20 rounded-full animate-wiggle"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-3 bg-teen-green text-white px-6 py-3 rounded-full font-display font-bold animate-bounce shadow-xl">
              <span className="text-xl animate-pulse">📚</span>
              <span>Constitutional Education Program</span>
              <span className="text-xl animate-pulse">🎓</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                <span className="text-teen-blue hover:text-teen-purple transition-colors duration-500 cursor-default">
                  YOUNG CITIZENS
                </span>
              </div>
              <div className="text-4xl lg:text-6xl font-display font-bold leading-tight">
                <span className="text-teen-pink hover:text-teen-orange transition-colors duration-500 cursor-default">
                  PROGRAM
                </span>
              </div>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 font-heading max-w-4xl mx-auto leading-relaxed">
              Promoting legal and constitutional literacy amongst teenagers and young adults. 
              Helping them maximize their potential as young citizens and guiding them on 
              effective community involvement.
            </p>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card-blue transform hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-display font-bold text-teen-blue mb-2">2,500+</div>
                <div className="text-gray-600 font-heading font-semibold">Students Reached</div>
                <div className="text-2xl mt-2">🎓</div>
              </div>
              <div className="card-pink transform hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-display font-bold text-teen-pink mb-2">10+</div>
                <div className="text-gray-600 font-heading font-semibold">Schools Engaged</div>
                <div className="text-2xl mt-2">🏫</div>
              </div>
              <div className="card-orange transform hover:scale-110 transition-all duration-300">
                <div className="text-4xl font-display font-bold text-teen-orange mb-2">20</div>
                <div className="text-gray-600 font-heading font-semibold">Learning Modules</div>
                <div className="text-2xl mt-2">📚</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Selection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-purple">Choose Your</span>{' '}
              <span className="text-teen-orange">Learning Path</span>
              <span className="text-3xl ml-2">🛤️</span>
            </h2>
            <p className="text-xl text-gray-600 font-heading">
              Select the format that works best for your schedule and learning style
            </p>
          </div>

          {/* Path Selection Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {learningPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={`px-6 py-4 rounded-2xl font-display font-bold transition-all duration-300 flex items-center space-x-3 shadow-lg ${
                  selectedPath === path.id
                    ? `bg-${path.color} text-white scale-110 shadow-xl`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                <span className="text-xl">{path.emoji}</span>
                <span>{path.title}</span>
              </button>
            ))}
          </div>

          {/* Selected Path Details */}
          {selectedPathData && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12 mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side - Details */}
                <div className="space-y-6">
                  <div className={`w-20 h-20 bg-${selectedPathData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <selectedPathData.icon size={40} className="text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-gray-800">
                    {selectedPathData.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`bg-${selectedPathData.color}/20 rounded-full px-4 py-2 text-${selectedPathData.color} font-display font-bold`}>
                      <Clock size={16} className="inline mr-2" />
                      {selectedPathData.duration}
                    </div>
                    <div className={`bg-${selectedPathData.color} text-white rounded-full px-4 py-2 font-display font-bold`}>
                      {selectedPathData.price}
                    </div>
                    {selectedPathData.popular && (
                      <div className="bg-teen-pink text-white rounded-full px-4 py-2 font-display font-bold animate-pulse">
                        ⭐ Popular
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3">
                    {selectedPathData.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-teen-green" />
                        <span className="text-gray-700 font-heading">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side - CTA */}
                <div className={`bg-${selectedPathData.color}/10 rounded-3xl p-8 text-center space-y-6`}>
                  <div className="text-6xl">{selectedPathData.emoji}</div>
                  <h4 className="text-2xl font-display font-bold text-gray-800">
                    Ready to Start?
                  </h4>
                  <p className="text-gray-600 font-heading">
                    Join thousands of young Kenyans building their civic knowledge!
                  </p>
                  <button className={`w-full bg-${selectedPathData.color} text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-3`}>
                    <span>Enroll Now</span>
                    <span className="text-xl">🚀</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* All Learning Paths Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => {
              const IconComponent = path.icon;
              return (
                <div key={path.id} className={`card relative hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group border-t-4 border-${path.color} ${
                  path.popular ? 'ring-2 ring-teen-pink/50' : ''
                }`}>
                  
                  {path.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teen-pink text-white px-6 py-2 rounded-full font-display font-bold text-sm animate-bounce">
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <div className={`w-20 h-20 bg-${path.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-lg`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">{path.title}</h3>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock size={16} className={`text-${path.color}`} />
                    <span className="text-gray-600 font-heading font-semibold">{path.duration}</span>
                  </div>
                  
                  <div className="text-3xl font-display font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <span>{path.price}</span>
                    <span className="text-2xl">{path.emoji}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {path.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle size={16} className="text-teen-green" />
                        <span className="text-gray-600 text-sm font-heading">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full bg-${path.color} text-white py-3 rounded-2xl font-display font-bold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2`}>
                    <span>Enroll Now</span>
                    <span className="text-lg">🎯</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-gradient-to-br from-teen-purple/10 to-teen-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-blue">Program</span>{' '}
              <span className="text-teen-pink">Curriculum</span>
              <span className="text-3xl ml-2">📚</span>
            </h2>
            <p className="text-xl text-gray-600 font-heading">
              20 comprehensive modules covering essential constitutional and civic education
            </p>
          </div>

          {/* Topics Grid */}
          <div className="space-y-6">
            {topics.map((topic, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-500 group">
                <div className="flex items-start space-x-6">
                  
                  {/* Topic Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 bg-${topic.color} rounded-2xl flex items-center justify-center text-3xl group-hover:animate-bounce shadow-lg`}>
                      {topic.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className={`bg-${topic.color} text-white px-4 py-2 rounded-full text-sm font-display font-bold`}>
                        Module {topic.module}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-gray-800">{topic.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 font-heading">{topic.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <span key={lessonIndex} className={`bg-${topic.color}/10 text-${topic.color} px-3 py-1 rounded-full text-sm font-heading font-semibold border border-${topic.color}/20`}>
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <button className={`bg-${topic.color} text-white p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg group-hover:animate-wiggle`}>
                      <PlayCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-bold flex items-center space-x-3">
                <span className="text-teen-purple">What You'll</span>
                <span className="text-teen-orange">Gain</span>
                <span className="text-3xl animate-bounce">🎯</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '🧠',
                    title: 'Better Understanding',
                    description: "Kenya's social, political, cultural and economic history",
                    color: 'teen-blue'
                  },
                  {
                    icon: '💪',
                    title: 'Greater Sense of Purpose',
                    description: 'Appreciation of your rights, roles and responsibilities as young citizens',
                    color: 'teen-pink'
                  },
                  {
                    icon: '📖',
                    title: 'Constitutional Knowledge',
                    description: 'Increased knowledge on the Constitution of Kenya, 2010 and law making processes',
                    color: 'teen-green'
                  },
                  {
                    icon: '🤝',
                    title: 'Expert Access',
                    description: 'Access to industry experts, legal advice and referral services',
                    color: 'teen-orange'
                  }
                ].map((gain, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className={`w-16 h-16 bg-${gain.color} rounded-2xl flex items-center justify-center text-2xl group-hover:animate-bounce shadow-lg`}>
                      {gain.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-bold text-gray-800 group-hover:text-gray-900">{gain.title}</h3>
                      <p className="text-gray-600 font-heading">{gain.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - CTA Card */}
            <div className="relative">
              <div className="bg-teen-blue rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-blob animate-float"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="text-6xl animate-bounce">🎓</div>
                  <h3 className="text-3xl font-display font-bold">Ready to Start?</h3>
                  <p className="text-blue-100 font-heading leading-relaxed">
                    Join thousands of young Kenyans who are already building their civic knowledge and leadership skills.
                  </p>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-white text-teen-blue px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-yellow hover:text-gray-800 hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-3">
                      <span className="text-xl">🚀</span>
                      <span>Enroll Today</span>
                    </button>
                    
                    <button className="w-full border-2 border-white text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-white hover:text-teen-blue transition-all duration-300 flex items-center justify-center space-x-3">
                      <Download size={20} />
                      <span>Download Brochure</span>
                      <span className="text-xl">📋</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-teen-yellow/10 to-teen-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-orange">What Students</span>{' '}
              <span className="text-teen-pink">Say</span>
              <span className="text-3xl ml-2">💬</span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aisha M.',
                school: 'Alliance High School',
                quote: 'The YCP opened my eyes to how I can make a difference in my community. I now understand my rights and responsibilities as a young Kenyan.',
                rating: 5,
                color: 'teen-blue',
                emoji: '😊'
              },
              {
                name: 'Brian K.',
                school: 'Lenana School',
                quote: 'Learning about the Constitution was fun and engaging. The facilitators made complex topics easy to understand.',
                rating: 5,
                color: 'teen-green',
                emoji: '🤓'
              },
              {
                name: 'Grace W.',
                school: 'Community Member',
                quote: 'This program gave me confidence to speak up about issues affecting young people in my community.',
                rating: 5,
                color: 'teen-pink',
                emoji: '💪'
              }
            ].map((testimonial, index) => (
              <div key={index} className={`card border-l-4 border-${testimonial.color} hover:shadow-xl transition-all duration-500 group`}>
                
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className={`text-${testimonial.color} fill-current group-hover:animate-bounce`} style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-700 mb-6 italic font-heading leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-${testimonial.color} rounded-full flex items-center justify-center text-xl`}>
                    {testimonial.emoji}
                  </div>
                  <div>
                    <div className="font-display font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 font-heading">{testimonial.school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default YCP;