// File: frontend/src/pages/About.jsx

import React from 'react';
import { Target, Eye, Heart, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '11.6M', label: 'Target Young People (10-19yrs)', icon: '👥', color: 'teen-blue' },
    { number: '2,500+', label: 'Students Reached', icon: '🎓', color: 'teen-green' },
    { number: '1,500+', label: 'Constitution Guides Distributed', icon: '📚', color: 'teen-orange' },
    { number: '10+', label: 'Schools Engaged', icon: '🏫', color: 'teen-pink' }
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Education First',
      description: 'We believe quality constitutional education is the foundation of active citizenship',
      color: 'teen-blue',
      emoji: '📚'
    },
    {
      icon: Users,
      title: 'Youth Empowerment',
      description: 'Empowering young people with knowledge, skills, and platforms to participate meaningfully',
      color: 'teen-purple',
      emoji: '💪'
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Creating positive change that ripples through families, schools, and communities',
      color: 'teen-pink',
      emoji: '❤️'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Maintaining high standards in all our programs and educational materials',
      color: 'teen-orange',
      emoji: '🎯'
    }
  ];

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-blue/10 via-white to-teen-purple/10 relative overflow-hidden">
        
        {/* Decorations */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-teen-yellow/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-teen-pink/15 rounded-blob animate-bounce"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            <div className="inline-flex items-center space-x-3 bg-teen-green text-white px-6 py-3 rounded-full font-display font-bold animate-bounce shadow-xl">
              <span className="text-xl animate-pulse">🌟</span>
              <span>About Teendom Africa</span>
            </div>
            
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-bold text-teen-blue">EMPOWERING</div>
              <div className="text-4xl lg:text-6xl font-display font-bold text-gray-800">YOUNG</div>
              <div className="text-5xl lg:text-7xl font-display font-bold text-teen-pink">CITIZENS</div>
            </h1>
            
            <p className="text-xl text-gray-600 font-heading max-w-4xl mx-auto leading-relaxed">
              We are a social enterprise dedicated to developing informed and active citizenship among 
              Kenyan teenagers and young adults through constitutional education, mentorship, and recognition.
            </p>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className={`card-${stat.color.split('-')[1]} hover:shadow-xl transition-all duration-300`}>
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className={`text-2xl font-display font-bold text-${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-gray-600 text-sm font-heading font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Mission */}
            <div className="text-center lg:text-left space-y-6">
              <div className="w-20 h-20 bg-teen-pink rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-lg">
                <Target size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-bold text-teen-pink">Our Mission 🎯</h2>
              <p className="text-lg text-gray-600 font-heading leading-relaxed">
                To transform the lives of young people through educational resources and mentorship, 
                equipping them with the knowledge, skills, and values needed to shape a better future 
                for themselves and their communities.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center lg:text-left space-y-6">
              <div className="w-20 h-20 bg-teen-blue rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-lg">
                <Eye size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-bold text-teen-blue">Our Vision 👁️</h2>
              <p className="text-lg text-gray-600 font-heading leading-relaxed">
                To be a leading social enterprise for empowering young people in Kenya to develop 
                into a community of informed and active citizens who understand their rights, 
                use their voices responsibly, and contribute to the betterment of our societies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-teen-yellow/10 to-teen-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-purple">Our</span>{' '}
              <span className="text-teen-orange">Values</span>
              <span className="text-3xl ml-2">💎</span>
            </h2>
            <p className="text-xl text-gray-600 font-heading">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle shadow-lg`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <div className="text-3xl mb-4 group-hover:animate-bounce">{value.emoji}</div>
                  <h3 className="text-xl font-display font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 font-heading">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-teen-purple relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-40 h-40 bg-teen-yellow/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-teen-pink/20 rounded-blob animate-float"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              Join Our Mission
              <div className="flex justify-center space-x-2 mt-4">
                <span className="text-3xl animate-bounce">🤝</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.1s'}}>🇰🇪</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>💫</span>
              </div>
            </h2>
            
            <p className="text-xl text-purple-100 font-heading leading-relaxed">
              Help us build a generation of informed, active, and empowered young citizens. 
              Together, we can shape Kenya's future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-teen-purple px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-yellow hover:text-gray-800 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                <span className="text-xl group-hover:animate-bounce">🤝</span>
                <span>Become a Partner</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-white hover:text-teen-purple transition-all duration-300 flex items-center justify-center space-x-3">
                <span className="text-xl group-hover:animate-bounce">📞</span>
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