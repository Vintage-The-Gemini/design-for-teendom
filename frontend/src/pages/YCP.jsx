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
      color: 'yellow-500',
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
      color: 'blue-500',
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
      color: 'pink-500',
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
      color: 'yellow-500',
      description: 'Understanding how law impacts teenage life and society',
      lessons: ['Introduction to Law', 'Rights and Responsibilities', 'Law in Daily Life']
    },
    {
      module: 2,
      title: 'Citizenship & Personal Development',
      icon: '🏛️',
      color: 'blue-500',
      description: 'Building strong citizenship foundations and personal growth',
      lessons: ['What is Citizenship?', 'Personal Development', 'Community Engagement']
    },
    {
      module: 3,
      title: 'Leadership and Volunteerism',
      icon: '👑',
      color: 'purple-500',
      description: 'Developing leadership skills and community service mindset',
      lessons: ['Leadership Styles', 'Volunteer Opportunities', 'Project Management']
    },
    {
      module: 4,
      title: 'Human Rights & Children Participation',
      icon: '✊',
      color: 'pink-500',
      description: 'Understanding fundamental rights and meaningful participation',
      lessons: ['Human Rights Framework', 'Children Rights', 'Participation Mechanisms']
    },
    {
      module: 5,
      title: 'Government and Public Service',
      icon: '🏢',
      color: 'red-500',
      description: 'How government works and opportunities in public service',
      lessons: ['Government Structure', 'Public Service', 'Civic Engagement']
    }
  ];

  const selectedPathData = learningPaths.find(path => path.id === selectedPath);

  return (
    <div className="pt-20">
      
      {/* Hero Section - BOLD & COLORFUL */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-300 via-white to-yellow-300 relative overflow-hidden">
        
        {/* Bold decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-float shadow-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-pink-500 rounded-blob animate-bounce shadow-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-500 rounded-full animate-wiggle shadow-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            {/* Badge - BOLD */}
            <div className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full font-display font-bold animate-bounce shadow-2xl border-4 border-blue-800">
              <span className="text-2xl animate-pulse">📚</span>
              <span className="text-lg font-black">Constitutional Education Program</span>
              <span className="text-2xl animate-pulse">🎓</span>
            </div>
            
            {/* Main Heading - SUPER BOLD */}
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-black leading-tight">
                <span className="text-blue-700 hover:text-purple-700 transition-colors duration-500 cursor-default">
                  YOUNG CITIZENS
                </span>
              </div>
              <div className="text-4xl lg:text-6xl font-display font-black leading-tight">
                <span className="text-yellow-600 hover:text-red-600 transition-colors duration-500 cursor-default" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.5)'}}>
                  PROGRAM
                </span>
              </div>
            </h1>
            
            {/* Description - BOLD */}
            <p className="text-xl text-gray-900 font-heading max-w-4xl mx-auto leading-relaxed font-bold">
              Promoting legal and constitutional literacy amongst teenagers and young adults. 
              Helping them maximize their potential as young citizens and guiding them on 
              effective community involvement.
            </p>

            {/* Stats Cards - COLORFUL */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-blue-500 text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-blue-700">
                <div className="text-4xl font-display font-black mb-2">2,500+</div>
                <div className="font-heading font-bold">Students Reached</div>
                <div className="text-3xl mt-2">🎓</div>
              </div>
              <div className="bg-yellow-500 text-black rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-yellow-700">
                <div className="text-4xl font-display font-black mb-2">10+</div>
                <div className="font-heading font-bold">Schools Engaged</div>
                <div className="text-3xl mt-2">🏫</div>
              </div>
              <div className="bg-red-500 text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-red-700">
                <div className="text-4xl font-display font-black mb-2">20</div>
                <div className="font-heading font-bold">Learning Modules</div>
                <div className="text-3xl mt-2">📚</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths - COLORFUL PRICING */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-black">
              <span className="text-purple-700">Choose Your</span>{' '}
              <span className="text-yellow-600" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>Learning Path</span>
              <span className="text-4xl ml-2">🛤️</span>
            </h2>
            <p className="text-xl text-gray-800 font-heading font-bold">
              Select the format that works best for your schedule and learning style
            </p>
          </div>

          {/* All Learning Paths Grid - WITH PRICING */}
          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => {
              const IconComponent = path.icon;
              return (
                <div key={path.id} className={`bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 group border-t-8 border-${path.color} ${
                  path.popular ? 'ring-4 ring-pink-400 ring-opacity-50' : ''
                }`}>
                  
                  {path.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-full font-display font-black text-sm animate-bounce shadow-xl">
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <div className={`w-24 h-24 bg-${path.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-xl`}>
                    <IconComponent size={40} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-black text-gray-900 mb-4">{path.title}</h3>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock size={20} className={`text-${path.color}`} />
                    <span className="text-gray-700 font-heading font-bold">{path.duration}</span>
                  </div>
                  
                  <div className="text-4xl font-display font-black text-gray-900 mb-6 flex items-center space-x-3">
                    <span>{path.price}</span>
                    <span className="text-3xl">{path.emoji}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {path.features.map((feature, index) => {
                      const iconSets = {
                        'self-paced': ['⏰', '🎮', '🎧', '🏆', '📖', '💬'],
                        'online': ['📹', '👨‍🏫', '🗣️', '🎤', '👥', '🤝'],
                        'physical': ['🏛️', '🎯', '🌍', '⚖️', '🤝', '👑']
                      };
                      const icons = iconSets[path.id] || ['✨', '🌟', '⭐', '💫', '🎉', '🎊'];
                      return (
                        <li key={index} className="flex items-center space-x-3">
                          <span className="text-lg">{icons[index]}</span>
                          <span className="text-gray-700 font-heading font-bold text-sm">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  <button className={`w-full bg-${path.color} text-white py-4 rounded-2xl font-display font-black hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-2`}>
                    <span>Enroll Now</span>
                    <span className="text-xl">🎯</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section - COLORFUL */}
      <section className="py-20 bg-gradient-to-br from-purple-200 to-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-black">
              <span className="text-blue-700">Program</span>{' '}
              <span className="text-pink-600" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>Curriculum</span>
              <span className="text-4xl ml-2">📚</span>
            </h2>
            <p className="text-xl text-gray-800 font-heading font-bold">
              20 comprehensive modules covering essential constitutional and civic education
            </p>
          </div>

          {/* Topics Grid - BOLD CARDS */}
          <div className="space-y-6">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-start space-x-6">
                  
                  {/* Topic Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-24 h-24 bg-${topic.color} rounded-2xl flex items-center justify-center text-4xl group-hover:animate-bounce shadow-xl`}>
                      {topic.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className={`bg-${topic.color} text-white px-4 py-2 rounded-full font-display font-black`}>
                        Module {topic.module}
                      </span>
                      <h3 className="text-2xl font-display font-black text-gray-900">{topic.title}</h3>
                    </div>
                    
                    <p className="text-gray-700 font-heading font-bold">{topic.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <span key={lessonIndex} className={`bg-${topic.color}/20 text-${topic.color} px-4 py-2 rounded-full font-heading font-bold border-2 border-${topic.color}/40`}>
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <button className={`bg-${topic.color} text-white p-4 rounded-full hover:scale-110 transition-all duration-300 shadow-xl group-hover:animate-wiggle`}>
                      <PlayCircle size={28} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Gain Section - BOLD */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-display font-black flex items-center space-x-3">
                <span className="text-purple-700">What You'll</span>
                <span className="text-yellow-600" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>Gain</span>
                <span className="text-4xl animate-bounce">🎯</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '🧠',
                    title: 'Better Understanding',
                    description: "Kenya's social, political, cultural and economic history",
                    color: 'blue-500'
                  },
                  {
                    icon: '💪',
                    title: 'Greater Sense of Purpose',
                    description: 'Appreciation of your rights, roles and responsibilities as young citizens',
                    color: 'pink-500'
                  },
                  {
                    icon: '📖',
                    title: 'Constitutional Knowledge',
                    description: 'Increased knowledge on the Constitution of Kenya, 2010 and law making processes',
                    color: 'green-500'
                  },
                  {
                    icon: '🤝',
                    title: 'Expert Access',
                    description: 'Access to industry experts, legal advice and referral services',
                    color: 'yellow-500'
                  }
                ].map((gain, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className={`w-20 h-20 bg-${gain.color} rounded-2xl flex items-center justify-center text-3xl group-hover:animate-bounce shadow-xl`}>
                      {gain.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-black text-gray-900 group-hover:text-gray-700">{gain.title}</h3>
                      <p className="text-gray-700 font-heading font-bold">{gain.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - CTA Card */}
            <div className="relative">
              <div className="bg-blue-600 rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-blob animate-float"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="text-8xl animate-bounce">🎓</div>
                  <h3 className="text-3xl font-display font-black">Ready to Start?</h3>
                  <p className="text-blue-100 font-heading font-bold leading-relaxed">
                    Join thousands of young Kenyans who are already building their civic knowledge and leadership skills.
                  </p>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-yellow-400 text-black px-8 py-4 rounded-2xl font-display font-black text-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center space-x-3">
                      <span className="text-2xl">🚀</span>
                      <span>Enroll Today</span>
                    </button>
                    
                    <button className="w-full border-4 border-white text-white px-8 py-4 rounded-2xl font-display font-black text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-3">
                      <Download size={24} />
                      <span>Download Brochure</span>
                      <span className="text-2xl">📋</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - COLORFUL */}
      <section className="py-20 bg-gradient-to-br from-yellow-200 to-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-black">
              <span className="text-yellow-700">What Students</span>{' '}
              <span className="text-pink-600">Say</span>
              <span className="text-4xl ml-2">💬</span>
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
                color: 'blue-500',
                emoji: '😊'
              },
              {
                name: 'Brian K.',
                school: 'Lenana School',
                quote: 'Learning about the Constitution was fun and engaging. The facilitators made complex topics easy to understand.',
                rating: 5,
                color: 'green-500',
                emoji: '🤓'
              },
              {
                name: 'Grace W.',
                school: 'Community Member',
                quote: 'This program gave me confidence to speak up about issues affecting young people in my community.',
                rating: 5,
                color: 'pink-500',
                emoji: '💪'
              }
            ].map((testimonial, index) => (
              <div key={index} className={`bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group border-l-8 border-${testimonial.color}`}>
                
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={24} className={`text-${testimonial.color} fill-current group-hover:animate-bounce`} style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-800 mb-6 italic font-heading font-bold leading-relaxed text-lg">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-${testimonial.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                    {testimonial.emoji}
                  </div>
                  <div>
                    <div className="font-display font-black text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 font-heading font-bold">{testimonial.school}</div>
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