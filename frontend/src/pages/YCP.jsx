import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Target, Clock, CheckCircle, Star, Award } from 'lucide-react';

const YCP = () => {
  const learningPaths = [
    {
      id: 1,
      title: 'Self-Paced Learning',
      duration: '6 weeks',
      icon: BookOpen,
      color: 'teen-yellow',
      price: 'Free',
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
      id: 2,
      title: 'Online Classes',
      duration: '8 weeks',
      icon: Users,
      color: 'teen-blue',
      price: 'Ksh 2,500',
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
      id: 3,
      title: 'Physical Classes',
      duration: '12 weeks',
      icon: Target,
      color: 'teen-pink',
      price: 'Ksh 4,000',
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
      description: 'Understanding how law impacts teenage life and society',
      lessons: ['Introduction to Law', 'Rights and Responsibilities', 'Law in Daily Life']
    },
    {
      module: 2,
      title: 'Citizenship & Personal Development',
      icon: '🏛️',
      description: 'Building strong citizenship foundations and personal growth',
      lessons: ['What is Citizenship?', 'Personal Development', 'Community Engagement']
    },
    {
      module: 3,
      title: 'Leadership and Volunteerism',
      icon: '👑',
      description: 'Developing leadership skills and community service mindset',
      lessons: ['Leadership Styles', 'Volunteer Opportunities', 'Project Management']
    },
    {
      module: 4,
      title: 'Human Rights & Children Participation',
      icon: '✊',
      description: 'Understanding fundamental rights and meaningful participation',
      lessons: ['Human Rights Framework', 'Children Rights', 'Participation Mechanisms']
    },
    {
      module: 5,
      title: 'Government and Public Service',
      icon: '🏢',
      description: 'How government works and opportunities in public service',
      lessons: ['Government Structure', 'Public Service', 'Civic Engagement']
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-blue/20 to-teen-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teen-yellow to-teen-orange text-white px-6 py-2 rounded-full font-bold mb-6 animate-bounce">
              📚 Constitutional Education Program
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6 leading-tight">
              <span className="gradient-text">YOUNG CITIZENS</span><br/>
              <span className="text-gray-800">PROGRAM</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Promoting legal and constitutional literacy amongst teenagers and young adults. 
              Helping them maximize their potential as young citizens and guiding them on 
              effective community involvement.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-teen-blue mb-2">2,500+</div>
                <div className="text-gray-600">Students Reached</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-teen-pink mb-2">10+</div>
                <div className="text-gray-600">Schools Engaged</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-teen-orange mb-2">20</div>
                <div className="text-gray-600">Learning Modules</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600">
              Select the format that works best for your schedule and learning style
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path) => {
              const IconComponent = path.icon;
              return (
                <div key={path.id} className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 hover:shadow-2xl transform hover:-translate-y-2 transition-all ${
                  path.popular ? 'border-teen-blue scale-105' : 'border-gray-100'
                }`}>
                  {path.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teen-pink to-teen-purple text-white px-6 py-2 rounded-full font-bold text-sm">
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 bg-gradient-to-r from-${path.color} to-teen-purple rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-display text-gray-800 mb-2">{path.title}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock size={16} className={`text-${path.color}`} />
                    <span className="text-gray-600">{path.duration}</span>
                  </div>
                  
                  <div className="text-3xl font-bold text-gray-800 mb-6">{path.price}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {path.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle size={16} className="text-teen-green" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full bg-gradient-to-r from-${path.color} to-teen-purple text-white py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all`}>
                    Enroll Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Program Curriculum
            </h2>
            <p className="text-xl text-gray-600">
              20 comprehensive modules covering essential constitutional and civic education
            </p>
          </div>

          <div className="space-y-6">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-teen-yellow to-teen-orange rounded-2xl flex items-center justify-center text-2xl">
                      {topic.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="bg-teen-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                        Module {topic.module}
                      </span>
                      <h3 className="text-2xl font-bold font-display text-gray-800">{topic.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <span key={lessonIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <button className="bg-teen-pink text-white p-2 rounded-full hover:scale-110 transition-all">
                      <Award size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className="py-20 bg-gradient-to-r from-teen-purple/20 to-teen-pink/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-display gradient-text mb-8">
                What You'll Gain
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '🧠',
                    title: 'Better Understanding',
                    description: "Kenya's social, political, cultural and economic history"
                  },
                  {
                    icon: '💪',
                    title: 'Greater Sense of Purpose',
                    description: 'Appreciation of your rights, roles and responsibilities as young citizens'
                  },
                  {
                    icon: '📖',
                    title: 'Constitutional Knowledge',
                    description: 'Increased knowledge on the Constitution of Kenya, 2010 and law making processes'
                  },
                  {
                    icon: '🤝',
                    title: 'Expert Access',
                    description: 'Access to industry experts, legal advice and referral services'
                  }
                ].map((gain, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-4xl">{gain.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-gray-800 mb-2">{gain.title}</h3>
                      <p className="text-gray-600">{gain.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teen-blue to-teen-purple rounded-3xl p-12 text-white text-center shadow-2xl">
                <div className="text-6xl mb-6">🎓</div>
                <h3 className="text-3xl font-bold font-display mb-4">Ready to Start?</h3>
                <p className="text-blue-100 mb-8">
                  Join thousands of young Kenyans who are already building their civic knowledge and leadership skills.
                </p>
                <button className="bg-white text-teen-blue px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  🚀 Enroll Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              What Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Aisha M.',
                school: 'Alliance High School',
                quote: 'The YCP opened my eyes to how I can make a difference in my community. I now understand my rights and responsibilities as a young Kenyan.',
                rating: 5
              },
              {
                name: 'Brian K.',
                school: 'Lenana School',
                quote: 'Learning about the Constitution was fun and engaging. The facilitators made complex topics easy to understand.',
                rating: 5
              },
              {
                name: 'Grace W.',
                school: 'Community Member',
                quote: 'This program gave me confidence to speak up about issues affecting young people in my community.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-teen-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.school}</div>
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