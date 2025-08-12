// File: src/pages/YCPPage.jsx
import React, { useState } from 'react';
import { Clock, Users, BookOpen, Target, Award, PlayCircle } from 'lucide-react';

const YCPPage = () => {
  const [selectedPath, setSelectedPath] = useState('online');

  const learningPaths = [
    {
      id: 'self-paced',
      title: 'SELF-PACED LEARNING',
      duration: '6 WEEKS',
      price: 'KSH 3,500',
      color: 'secondary-blue',
      features: [
        'Learn at your own pace',
        'Interactive digital content', 
        'Self-assessment tools',
        'Progress tracking',
        'Certificate upon completion'
      ]
    },
    {
      id: 'online',
      title: 'ONLINE CLASSES',
      duration: '8 WEEKS',
      price: 'KSH 10,000',
      color: 'neutral-pink',
      popular: true,
      features: [
        'Live weekly sessions',
        'Expert instructors',
        'Interactive group discussions',
        'Weekly assignments',
        'Peer collaboration'
      ]
    },
    {
      id: 'physical',
      title: 'PHYSICAL CLASSES',
      duration: '12 WEEKS',
      price: 'KSH 18,000',
      color: 'support-purple',
      features: [
        'In-person sessions',
        'Hands-on workshops',
        'Field trips and visits',
        'Networking opportunities',
        'Intensive mentorship'
      ]
    }
  ];

  const learningTopics = [
    {
      module: 1,
      title: 'Teens, the Law & Society',
      icon: '⚖️',
      color: 'secondary-blue',
      description: 'Understanding legal frameworks and societal structures',
      lessons: ['Legal Basics', 'Rights & Responsibilities', 'Social Justice']
    },
    {
      module: 2,
      title: 'Citizenship & Personal Development',
      icon: '🎯',
      color: 'primary-yellow',
      description: 'Building civic awareness and personal growth',
      lessons: ['Civic Duties', 'Personal Development', 'Community Engagement']
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
    <div className="pt-20 bg-black text-white">
      
      {/* Hero Section - HOMEPAGE STYLE */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          {/* Category Badge - SHARP */}
          <div className="mb-8">
            <span className="bg-red-600 text-white px-6 py-3 font-black text-lg tracking-widest">
              CONSTITUTIONAL EDUCATION
            </span>
          </div>
          
          <h1 
            className="text-8xl md:text-9xl font-black text-white mb-16 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            YOUNG CITIZENS<br/>
            PROGRAM
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-2xl md:text-3xl font-medium text-gray-300 leading-relaxed mb-16"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Promoting legal and constitutional literacy amongst teenagers and young adults. 
              Helping them maximize their potential as young citizens and guiding them on effective 
              community involvement.
            </p>
          </div>

          {/* CTA Buttons - HOMEPAGE STYLE */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white font-black px-12 py-6 text-xl tracking-widest transition-all">
              ENROLL NOW
            </button>
            <button className="bg-white hover:bg-gray-100 text-black font-black px-12 py-6 text-xl tracking-widest transition-all">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Learning Paths - HOMEPAGE STYLE */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-black text-white mb-6 leading-tight"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              SELECT YOUR <span className="text-red-600">LEARNING PATH</span>
            </h2>
            <p 
              className="text-xl text-gray-400 font-bold"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              CHOOSE THE FORMAT THAT WORKS BEST FOR YOUR SCHEDULE
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <div 
                key={path.id}
                className={`bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative ${
                  path.popular ? 'ring-4 ring-red-600' : ''
                }`}
              >
                {path.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 font-black text-sm">
                    ⭐ MOST POPULAR
                  </div>
                )}
                
                <h3 
                  className="text-2xl font-black text-gray-900 mb-4 text-center"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {path.title}
                </h3>
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-bold">{path.duration}</span>
                  </div>
                  
                  <div 
                    className="text-4xl font-black text-gray-900"
                    style={{fontFamily: 'Playfair Display, serif'}}
                  >
                    {path.price}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {path.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-green-600 font-black mt-1">✓</span>
                      <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-black text-lg tracking-wider transition-all">
                  ENROLL NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section - HOMEPAGE STYLE */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="bg-red-600 text-white px-6 py-3 font-black text-lg tracking-widest mb-8 inline-block">
              PROGRAM CURRICULUM
            </span>
            
            <h2 
              className="text-5xl font-black text-white mb-6"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              COMPREHENSIVE <span className="text-red-600">MODULES</span>
            </h2>
            <p 
              className="text-xl text-gray-400 font-bold"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              5 CORE MODULES COVERING ESSENTIAL CONSTITUTIONAL EDUCATION
            </p>
          </div>

          <div className="space-y-8">
            {learningTopics.map((topic) => (
              <div key={topic.module} className="bg-gray-900 p-8 hover:bg-gray-800 transition-all">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-red-600 flex items-center justify-center">
                      <span className="text-white font-black text-2xl">
                        {topic.module}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
                      <span className="bg-red-600 text-white px-4 py-2 font-black text-sm tracking-wider inline-block">
                        MODULE {topic.module}
                      </span>
                      <h3 
                        className="text-2xl font-black text-white"
                        style={{fontFamily: 'Space Grotesk, sans-serif'}}
                      >
                        {topic.title.toUpperCase()}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 font-medium mb-4">{topic.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {topic.lessons.map((lesson, idx) => (
                        <span key={idx} className="bg-gray-800 text-gray-300 px-4 py-2 font-medium text-sm">
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="bg-red-600 text-white p-4 hover:bg-red-700 transition-all">
                      <PlayCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Gain - HOMEPAGE STYLE */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <h2 
                className="text-5xl font-black text-white"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                WHAT YOU'LL <span className="text-red-600">GAIN</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-black p-6">
                  <h3 
                    className="text-2xl font-black text-white mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    BETTER UNDERSTANDING
                  </h3>
                  <p className="text-gray-300">Kenya's social, political, cultural and economic history</p>
                </div>

                <div className="bg-black p-6">
                  <h3 
                    className="text-2xl font-black text-white mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    GREATER SENSE OF PURPOSE
                  </h3>
                  <p className="text-gray-300">Appreciation of your rights, roles and responsibilities as young citizens</p>
                </div>

                <div className="bg-black p-6">
                  <h3 
                    className="text-2xl font-black text-white mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    CONSTITUTIONAL KNOWLEDGE
                  </h3>
                  <p className="text-gray-300">Increased knowledge on the Constitution of Kenya, 2010 and law making processes</p>
                </div>
              </div>
            </div>

            <div className="bg-red-600 p-8">
              <h3 
                className="text-3xl font-black text-white mb-6 text-center"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                JOIN 2,500+ STUDENTS
              </h3>
              <div className="text-center space-y-4">
                <div className="text-6xl font-black text-white" style={{fontFamily: 'Playfair Display, serif'}}>
                  100%
                </div>
                <p className="text-white font-bold text-xl">SATISFACTION RATE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - HOMEPAGE STYLE */}
      <section className="py-20 bg-red-600">
        <div className="max-w-6xl mx-auto text-center px-8">
          <h2 
            className="text-6xl font-black text-white mb-8 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            READY TO BECOME AN EMPOWERED CITIZEN?
          </h2>
          <p 
            className="text-2xl font-bold text-red-100 mb-12 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            JOIN THOUSANDS OF YOUNG KENYANS MAKING A DIFFERENCE
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="bg-black text-white px-16 py-6 font-black text-2xl tracking-widest hover:bg-gray-900 transition-all">
              ENROLL TODAY
            </button>
            <button className="bg-white text-red-600 px-16 py-6 font-black text-2xl tracking-widest hover:bg-gray-100 transition-all">
              GET MORE INFO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YCPPage;