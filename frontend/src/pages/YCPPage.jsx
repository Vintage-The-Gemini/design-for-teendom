
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
      color: 'primary-yellow',
      price: 'KSH 3,500',
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
      color: 'secondary-blue',
      price: 'KSH 10,000',
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
      color: 'neutral-pink',
      price: 'KSH 18,000',
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
      color: 'primary-yellow',
      description: 'Understanding how law impacts teenage life and society',
      lessons: ['Introduction to Law', 'Rights and Responsibilities', 'Law in Daily Life']
    },
    {
      module: 2,
      title: 'Citizenship & Personal Development',
      icon: '🏛️',
      color: 'secondary-blue',
      description: 'Building strong citizenship foundations and personal growth',
      lessons: ['What is Citizenship?', 'Personal Development', 'Community Engagement']
    },
    {
      module: 3,
      title: 'Leadership and Volunteerism',
      icon: '👑',
      color: 'support-purple',
      description: 'Developing leadership skills and community service mindset',
      lessons: ['Leadership Styles', 'Volunteer Opportunities', 'Project Management']
    },
    {
      module: 4,
      title: 'Human Rights & Children Participation',
      icon: '✊',
      color: 'neutral-pink',
      description: 'Understanding fundamental rights and meaningful participation',
      lessons: ['Human Rights Framework', 'Children Rights', 'Participation Mechanisms']
    },
    {
      module: 5,
      title: 'Government and Public Service',
      icon: '🏢',
      color: 'accent-red',
      description: 'How government works and opportunities in public service',
      lessons: ['Government Structure', 'Public Service', 'Civic Engagement']
    }
  ];

  const selectedPathData = learningPaths.find(path => path.id === selectedPath);

  return (
    <div className="pt-20">
      
      {/* Hero Section - BOLD & COLORFUL */}
      <section className="py-16 lg:py-24 bg-secondary-blue-light relative overflow-hidden">
        
        {/* Subtle decorations */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-primary-yellow/60 rounded-full shadow-lg"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-neutral-pink/50 rounded-blob shadow-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-support-purple/60 rounded-full shadow-lg"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            
            {/* Badge - BOLD */}
            <div className="inline-flex items-center space-x-2 bg-secondary-blue text-white px-4 sm:px-6 py-3 rounded-full font-display font-bold shadow-xl">
              <span className="text-lg sm:text-xl">📚</span>
              <span className="text-sm sm:text-base font-black">Constitutional Education Program</span>
              <span className="text-lg sm:text-xl">🎓</span>
            </div>
            
            {/* Main Heading - RESPONSIVE */}
            <h1 className="space-y-2">
              <div className="text-3xl sm:text-5xl lg:text-7xl font-display font-black leading-tight">
                <span className="text-secondary-blue">
                  YOUNG CITIZENS
                </span>
              </div>
              <div className="text-2xl sm:text-4xl lg:text-6xl font-display font-black leading-tight">
                <span className="text-primary-yellow">
                  PROGRAM
                </span>
              </div>
            </h1>
            
            {/* Description - RESPONSIVE */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-900 font-heading max-w-4xl mx-auto leading-relaxed font-bold px-4">
              Promoting legal and constitutional literacy amongst teenagers and young adults. 
              Helping them maximize their potential as young citizens and guiding them on 
              effective community involvement.
            </p>

            {/* Stats Cards - RESPONSIVE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
              <div className="bg-secondary-blue/80 text-white rounded-3xl p-4 sm:p-6 shadow-xl">
                <div className="text-2xl sm:text-4xl font-display font-black mb-2">2,500+</div>
                <div className="font-heading font-bold text-sm sm:text-base">Students Reached</div>
                <div className="text-xl sm:text-3xl mt-2">🎓</div>
              </div>
              <div className="bg-primary-yellow/90 text-gray-900 rounded-3xl p-4 sm:p-6 shadow-xl">
                <div className="text-2xl sm:text-4xl font-display font-black mb-2">10+</div>
                <div className="font-heading font-bold text-sm sm:text-base">Schools Engaged</div>
                <div className="text-xl sm:text-3xl mt-2">🏫</div>
              </div>
              <div className="bg-accent-red/80 text-white rounded-3xl p-4 sm:p-6 shadow-xl">
                <div className="text-2xl sm:text-4xl font-display font-black mb-2">20</div>
                <div className="font-heading font-bold text-sm sm:text-base">Learning Modules</div>
                <div className="text-xl sm:text-3xl mt-2">📚</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths - RESPONSIVE PRICING */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - RESPONSIVE */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-support-purple text-white px-4 sm:px-6 py-3 rounded-full font-display font-bold shadow-lg">
              <span className="text-lg sm:text-xl">🛤️</span>
              <span className="text-sm sm:text-base font-black">Choose Your Learning Path</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-black space-y-1">
              <div className="text-support-purple">THREE AMAZING</div>
              <div className="text-primary-yellow">LEARNING OPTIONS</div>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-900 font-heading font-bold px-4">
              Select the format that works best for your schedule and learning style
            </p>
          </div>

          {/* All Learning Paths Grid - RESPONSIVE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {learningPaths.map((path) => {
              const IconComponent = path.icon;
              return (
                <div key={path.id} className={`bg-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group relative ${
                  path.popular ? 'ring-2 ring-neutral-pink ring-opacity-50' : ''
                }`}>
                  
                  {path.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-neutral-pink text-white px-4 py-2 rounded-full font-display font-black text-xs sm:text-sm shadow-lg">
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-${path.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                    <IconComponent size={32} className="text-white sm:w-10 sm:h-10" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-black text-gray-900 mb-3 sm:mb-4">{path.title}</h3>
                  
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <Clock size={16} className={`text-${path.color} sm:w-5 sm:h-5`} />
                    <span className="text-gray-700 font-heading font-bold text-sm sm:text-base">{path.duration}</span>
                  </div>
                  
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-gray-900 mb-4 sm:mb-6 flex items-center space-x-2">
                    <span>{path.price}</span>
                    <span className="text-xl sm:text-2xl lg:text-3xl">{path.emoji}</span>
                  </div>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {path.features.map((feature, index) => {
                      const iconSets = {
                        'self-paced': ['⏰', '🎮', '🎧', '🏆', '📖', '💬'],
                        'online': ['📹', '👨‍🏫', '🗣️', '🎤', '👥', '🤝'],
                        'physical': ['🏛️', '🎯', '🌍', '⚖️', '🤝', '👑']
                      };
                      const icons = iconSets[path.id] || ['✨', '🌟', '⭐', '💫', '🎉', '🎊'];
                      return (
                        <li key={index} className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-sm sm:text-base">{icons[index]}</span>
                          <span className="text-gray-700 font-heading font-bold text-xs sm:text-sm">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  <button className={`w-full bg-${path.color}/90 text-white py-3 sm:py-4 rounded-2xl font-display font-black text-sm sm:text-base hover:bg-${path.color} transition-all duration-300 shadow-lg flex items-center justify-center space-x-2`}>
                    <span>Enroll Now</span>
                    <span className="text-base sm:text-xl">🎯</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section - RESPONSIVE */}
      <section className="py-16 lg:py-20 bg-support-purple-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - RESPONSIVE */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-accent-red text-white px-4 sm:px-6 py-3 rounded-full font-display font-bold shadow-lg">
              <span className="text-lg sm:text-xl">📚</span>
              <span className="text-sm sm:text-base font-black">Program Curriculum</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-black space-y-1">
              <div className="text-secondary-blue">COMPREHENSIVE</div>
              <div className="text-neutral-pink">MODULES</div>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-900 font-heading font-bold px-4">
              20 comprehensive modules covering essential constitutional and civic education
            </p>
          </div>

          {/* Topics Grid - RESPONSIVE CARDS */}
          <div className="space-y-4 sm:space-y-6">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  
                  {/* Topic Icon - RESPONSIVE */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-${topic.color}/80 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl shadow-lg`}>
                      {topic.icon}
                    </div>
                  </div>
                  
                  {/* Content - RESPONSIVE */}
                  <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <span className={`bg-${topic.color}/80 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-display font-black text-sm sm:text-base inline-block`}>
                        Module {topic.module}
                      </span>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-black text-gray-900">{topic.title}</h3>
                    </div>
                    
                    <p className="text-gray-700 font-heading font-bold text-sm sm:text-base">{topic.description}</p>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <span key={lessonIndex} className={`bg-${topic.color}/20 text-${topic.color} px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full font-heading font-bold text-xs sm:text-sm`}>
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button - RESPONSIVE */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <button className={`bg-${topic.color}/80 text-white p-3 sm:p-4 rounded-full hover:bg-${topic.color} transition-all duration-300 shadow-lg`}>
                      <PlayCircle size={20} className="sm:w-7 sm:h-7" />
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
                <span className="text-support-purple">What You'll</span>
                <span className="text-primary-yellow">Gain</span>
                <span className="text-4xl animate-bounce">🎯</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '🧠',
                    title: 'Better Understanding',
                    description: "Kenya's social, political, cultural and economic history",
                    color: 'secondary-blue'
                  },
                  {
                    icon: '💪',
                    title: 'Greater Sense of Purpose',
                    description: 'Appreciation of your rights, roles and responsibilities as young citizens',
                    color: 'neutral-pink'
                  },
                  {
                    icon: '📖',
                    title: 'Constitutional Knowledge',
                    description: 'Increased knowledge on the Constitution of Kenya, 2010 and law making processes',
                    color: 'primary-yellow'
                  },
                  {
                    icon: '🤝',
                    title: 'Expert Access',
                    description: 'Access to industry experts, legal advice and referral services',
                    color: 'accent-red'
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
              <div className="bg-secondary-blue rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-blob animate-float"></div>
                
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <div className="text-4xl sm:text-6xl lg:text-8xl">🎓</div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black">Ready to Start?</h3>
                  <p className="text-blue-100 font-heading font-bold leading-relaxed text-sm sm:text-base">
                    Join thousands of young Kenyans who are already building their civic knowledge and leadership skills.
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <button className="w-full bg-primary-yellow/90 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-display font-black text-sm sm:text-base lg:text-lg hover:bg-primary-yellow transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 sm:space-x-3">
                      <span className="text-lg sm:text-2xl">🚀</span>
                      <span>Enroll Today</span>
                    </button>
                    
                    <button className="w-full border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-display font-black text-sm sm:text-base lg:text-lg hover:bg-white hover:text-secondary-blue transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3">
                      <Download size={16} className="sm:w-6 sm:h-6" />
                      <span>Download Brochure</span>
                      <span className="text-lg sm:text-2xl">📋</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - RESPONSIVE */}
      <section className="py-16 lg:py-20 bg-primary-yellow-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header - RESPONSIVE */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-neutral-pink text-white px-4 sm:px-6 py-3 rounded-full font-display font-bold shadow-lg">
              <span className="text-lg sm:text-xl">💬</span>
              <span className="text-sm sm:text-base font-black">What Students Say</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-black space-y-1">
              <div className="text-primary-yellow">STUDENT</div>
              <div className="text-neutral-pink">TESTIMONIALS</div>
            </h2>
          </div>

          {/* Testimonials Grid - RESPONSIVE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'Aisha M.',
                school: 'Alliance High School',
                quote: 'The YCP opened my eyes to how I can make a difference in my community. I now understand my rights and responsibilities as a young Kenyan.',
                rating: 5,
                color: 'secondary-blue',
                emoji: '😊'
              },
              {
                name: 'Brian K.',
                school: 'Lenana School',
                quote: 'Learning about the Constitution was fun and engaging. The facilitators made complex topics easy to understand.',
                rating: 5,
                color: 'primary-yellow',
                emoji: '🤓'
              },
              {
                name: 'Grace W.',
                school: 'Community Member',
                quote: 'This program gave me confidence to speak up about issues affecting young people in my community.',
                rating: 5,
                color: 'neutral-pink',
                emoji: '💪'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                
                {/* Stars - RESPONSIVE */}
                <div className="flex justify-center lg:justify-start space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className={`text-${testimonial.color} fill-current sm:w-6 sm:h-6`} />
                  ))}
                </div>
                
                {/* Quote - RESPONSIVE */}
                <p className="text-gray-800 mb-4 sm:mb-6 italic font-heading font-bold leading-relaxed text-sm sm:text-base lg:text-lg text-center lg:text-left">
                  "{testimonial.quote}"
                </p>
                
                {/* Author - RESPONSIVE */}
                <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-${testimonial.color}/80 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl shadow-lg`}>
                    {testimonial.emoji}
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="font-display font-black text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-gray-600 font-heading font-bold text-xs sm:text-sm">{testimonial.school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - RESPONSIVE */}
      <section className="py-16 lg:py-20 bg-support-purple/90 relative overflow-hidden">
        
        {/* Subtle background decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary-yellow/40 rounded-full shadow-lg"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-neutral-pink/40 rounded-blob shadow-lg"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-6 lg:space-y-8">
            
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display font-black text-white leading-tight">
              Transform Your Future Today!
              <div className="flex justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl">🚀</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl">🇰🇪</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl">✨</span>
              </div>
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-purple-100 font-heading leading-relaxed font-bold px-4">
              Join the movement of informed young citizens. Your voice matters, 
              your future is bright, and your community needs you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="group bg-primary-yellow/90 text-gray-900 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl font-display font-black text-lg sm:text-xl hover:bg-primary-yellow hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 sm:space-x-4 shadow-xl">
                <span className="text-2xl sm:text-3xl">📚</span>
                <span>Enroll Now</span>
              </button>
              <button className="group bg-white text-support-purple px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl font-display font-black text-lg sm:text-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-3 sm:space-x-4 shadow-xl">
                <span className="text-2xl sm:text-3xl">📞</span>
                <span>Get More Info</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YCP;