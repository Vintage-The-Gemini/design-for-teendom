// File: frontend/src/pages/About.jsx

import React from 'react';
import { Target, Eye, Heart, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '11.6M', label: 'Target Young People (10-19yrs)', icon: '👥', color: 'blue-500' },
    { number: '2,500+', label: 'Students Reached', icon: '🎓', color: 'green-500' },
    { number: '1,500+', label: 'Constitution Guides Distributed', icon: '📚', color: 'yellow-500' },
    { number: '10+', label: 'Schools Engaged', icon: '🏫', color: 'pink-500' }
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Education First',
      description: 'We believe quality constitutional education is the foundation of active citizenship',
      color: 'blue-500',
      emoji: '📚'
    },
    {
      icon: Users,
      title: 'Youth Empowerment',
      description: 'Empowering young people with knowledge, skills, and platforms to participate meaningfully',
      color: 'purple-500',
      emoji: '💪'
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Creating positive change that ripples through families, schools, and communities',
      color: 'pink-500',
      emoji: '❤️'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Maintaining high standards in all our programs and educational materials',
      color: 'yellow-500',
      emoji: '🎯'
    }
  ];

  return (
    <div className="pt-20">
      
      {/* Hero Section - BOLD */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-300 via-white to-purple-300 relative overflow-hidden">
        
        {/* Bold decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-float shadow-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500 rounded-blob animate-bounce shadow-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            <div className="inline-flex items-center space-x-3 bg-green-500 text-white px-8 py-4 rounded-full font-display font-bold animate-bounce shadow-2xl border-4 border-green-700">
              <span className="text-2xl animate-pulse">🌟</span>
              <span className="text-lg font-black">About Teendom Africa</span>
            </div>
            
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-black text-blue-700">EMPOWERING</div>
              <div className="text-4xl lg:text-6xl font-display font-black text-gray-900">YOUNG</div>
              <div className="text-5xl lg:text-7xl font-display font-black text-pink-600" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.5)'}}>CITIZENS</div>
            </h1>
            
            <p className="text-xl text-gray-900 font-heading max-w-4xl mx-auto leading-relaxed font-bold">
              We are a social enterprise dedicated to developing informed and active citizenship among 
              Kenyan teenagers and young adults through constitutional education, mentorship, and recognition.
            </p>

            {/* Impact Stats - COLORFUL */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`bg-${stat.color} text-white rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-xl border-4 border-gray-800`}>
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-display font-black mb-2">{stat.number}</div>
                  <div className="font-heading font-bold text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - BOLD */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Mission */}
            <div className="text-center lg:text-left space-y-6">
              <div className="w-24 h-24 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-xl">
                <Target size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-black text-pink-600">Our Mission 🎯</h2>
              <p className="text-lg text-gray-800 font-heading leading-relaxed font-bold">
                To transform the lives of young people through educational resources and mentorship, 
                equipping them with the knowledge, skills, and values needed to shape a better future 
                for themselves and their communities.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center lg:text-left space-y-6">
              <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-xl">
                <Eye size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-black text-blue-600">Our Vision 👁️</h2>
              <p className="text-lg text-gray-800 font-heading leading-relaxed font-bold">
                To be a leading social enterprise for empowering young people in Kenya to develop 
                into a community of informed and active citizens who understand their rights, 
                use their voices responsibly, and contribute to the betterment of our societies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - COLORFUL */}
      <section className="py-20 bg-gradient-to-br from-yellow-200 to-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-black">
              <span className="text-purple-700">Our</span>{' '}
              <span className="text-yellow-600" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>Values</span>
              <span className="text-4xl ml-2">💎</span>
            </h2>
            <p className="text-xl text-gray-800 font-heading font-bold">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-24 h-24 bg-${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle shadow-xl border-4 border-gray-800`}>
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{value.emoji}</div>
                  <h3 className="text-xl font-display font-black text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-800 font-heading font-bold">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action - BOLD */}
      <section className="py-20 bg-purple-600 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full animate-pulse shadow-2xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 rounded-blob animate-float shadow-2xl"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            <h2 className="text-5xl lg:text-6xl font-display font-black text-white leading-tight">
              Join Our Mission
              <div className="flex justify-center space-x-3 mt-6">
                <span className="text-4xl animate-bounce">🤝</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.1s'}}>🇰🇪</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>💫</span>
              </div>
            </h2>
            
            <p className="text-xl text-purple-100 font-heading leading-relaxed font-bold">
              Help us build a generation of informed, active, and empowered young citizens. 
              Together, we can shape Kenya's future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-yellow-400 text-black px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-yellow-500 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl">
                <span className="text-3xl group-hover:animate-bounce">🤝</span>
                <span>Become a Partner</span>
                <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform duration-300" />
              </button>
              <button className="group border-4 border-white bg-white text-purple-600 px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl hover:scale-110">
                <span className="text-3xl group-hover:animate-bounce">📞</span>
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;