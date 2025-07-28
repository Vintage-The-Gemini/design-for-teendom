// File: frontend/src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Target, CheckCircle, Sparkles, Heart, Star } from 'lucide-react';

const Home = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  const floatingEmojis = ['🎓', '📚', '🏆', '🌟', '🎯', '💫', '🚀', '✨'];

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    
    // Rotating emoji effect
    const emojiTimer = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % floatingEmojis.length);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(emojiTimer);
    };
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section - BOLD AND VISIBLE! */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-yellow-300 via-yellow-100 to-blue-300">
        
        {/* BIG, BOLD Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-float shadow-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-500 rounded-blob animate-bounce shadow-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-pink-500 rounded-full animate-wiggle shadow-2xl"></div>
        <div className="absolute top-60 right-1/3 w-24 h-24 bg-red-500 rounded-blob animate-float shadow-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              
              {/* Animated Badge - BOLD */}
              <div className="inline-flex items-center space-x-3 bg-yellow-400 text-black px-8 py-4 rounded-full font-display font-bold animate-bounce shadow-2xl border-4 border-yellow-600">
                <span className="text-2xl animate-pulse">🇰🇪</span>
                <span className="text-lg font-black">Empowering Kenyan Youth</span>
                <span className="text-2xl animate-pulse">✨</span>
              </div>
              
              {/* Main Heading - SUPER BOLD & DARK */}
              <h1 className="space-y-2">
                <div className="text-5xl lg:text-7xl font-display font-black leading-tight">
                  <span className="text-blue-700 hover:text-purple-700 transition-colors duration-500 cursor-default">
                    NURTURING
                  </span>
                </div>
                <div className="text-4xl lg:text-6xl font-display font-black leading-tight">
                  <span className="text-gray-900 hover:text-red-600 transition-colors duration-500 cursor-default">
                    THE NEXT
                  </span>
                </div>
                <div className="text-5xl lg:text-7xl font-display font-black leading-tight">
                  <span className="text-orange-600 hover:text-yellow-600 transition-colors duration-500 cursor-default" style={{textShadow: '4px 4px 8px rgba(0,0,0,0.6)'}}>
                    GENERATION
                  </span>
                </div>
              </h1>
              
              {/* Description - DARK & BOLD */}
              <p className="text-xl text-gray-900 font-heading leading-relaxed font-bold">
                Empowering young people to develop into a community of 
                <span className="text-white px-4 py-2 bg-blue-600 rounded-xl mx-2 shadow-lg font-black">
                  informed and active citizens
                </span>
                through constitutional education and mentorship.
              </p>

              {/* Impact Stats - COLORFUL & BOLD */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-500 text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-blue-700">
                  <div className={`text-4xl font-display font-black transition-all duration-1000 ${animateStats ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    2,500+
                  </div>
                  <div className="text-sm font-heading font-bold">Young People</div>
                  <div className="text-2xl mt-2">🎓</div>
                </div>
                <div className="bg-yellow-500 text-black rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-yellow-700">
                  <div className={`text-4xl font-display font-black transition-all duration-1000 delay-200 ${animateStats ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    1,500+
                  </div>
                  <div className="text-sm font-heading font-bold">Constitution Guides</div>
                  <div className="text-2xl mt-2">📚</div>
                </div>
                <div className="bg-red-500 text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl border-4 border-red-700">
                  <div className={`text-4xl font-display font-black transition-all duration-1000 delay-400 ${animateStats ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    10+
                  </div>
                  <div className="text-sm font-heading font-bold">Schools</div>
                  <div className="text-2xl mt-2">🏫</div>
                </div>
              </div>

              {/* CTA Buttons - BIG & BOLD */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ycp"
                  className="group bg-blue-600 text-white px-10 py-5 rounded-2xl font-display font-black text-xl hover:bg-purple-600 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl"
                >
                  <span className="text-2xl group-hover:animate-bounce">🚀</span>
                  <span>Start Learning</span>
                  <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-300" />
                </Link>
                <Link
                  to="/about"
                  className="group border-4 border-yellow-500 bg-yellow-400 text-black px-10 py-5 rounded-2xl font-display font-black text-xl hover:bg-yellow-500 hover:border-yellow-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:scale-110"
                >
                  <BookOpen size={24} className="group-hover:animate-wiggle" />
                  <span>Learn More</span>
                  <span className="text-2xl group-hover:animate-bounce">📖</span>
                </Link>
              </div>
            </div>

            {/* Right Illustration - COLORFUL & BOLD */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                
                {/* Main decorative blob - BOLD */}
                <div className="absolute inset-0 bg-yellow-400 rounded-blob animate-pulse shadow-2xl"></div>
                <div className="absolute inset-4 bg-blue-400 rounded-blob animate-float shadow-xl"></div>
                <div className="absolute inset-8 bg-pink-400 rounded-blob animate-wiggle shadow-lg"></div>
                
                {/* Floating emojis - BIGGER */}
                <div className="absolute top-10 right-10 text-8xl animate-float">
                  {floatingEmojis[currentEmoji]}
                </div>
                <div className="absolute bottom-20 left-10 text-7xl animate-bounce">👩‍🎓</div>
                <div className="absolute top-1/2 left-1/4 text-6xl animate-wiggle">⚖️</div>
                <div className="absolute bottom-1/3 right-1/4 text-7xl animate-float">🧑‍🎓</div>
                
                {/* Constitution book mockup - BOLD */}
                <div className="absolute bottom-10 right-10 bg-white p-6 rounded-3xl shadow-2xl transform rotate-12 hover:rotate-6 transition-all duration-300 border-4 border-blue-500">
                  <div className="w-32 h-40 bg-blue-600 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl">
                    <div className="text-center p-3">
                      <div className="text-white font-display font-black text-sm leading-tight">
                        TEENS<br/>GUIDE<br/>
                        <span className="text-yellow-300 text-base">CONSTITUTION</span>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                {/* Floating achievement badges - COLORFUL */}
                <div className="absolute top-1/4 left-1/3 bg-white p-4 rounded-full shadow-2xl animate-bounce border-4 border-green-500">
                  <Star size={32} className="text-green-500" />
                </div>
                <div className="absolute top-3/4 left-1/4 bg-white p-4 rounded-full shadow-2xl animate-float border-4 border-purple-500">
                  <Heart size={32} className="text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - BOLD COLORS */}
      <section className="py-20 bg-white relative overflow-hidden">
        
        {/* Bold background decorations */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-200 rounded-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header - BOLD */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-blue-500 text-white px-8 py-4 rounded-full font-display font-bold shadow-xl animate-bounce">
              <span className="text-2xl animate-pulse">📚</span>
              <span className="text-lg font-black">What We Do</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-black space-y-2">
              <div className="text-blue-700">CONSTITUTIONAL</div>
              <div className="text-yellow-600" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.4)'}}>EDUCATION</div>
              <div className="text-gray-900">FOR YOUTH</div>
            </h2>
            
            <p className="text-xl text-gray-800 font-heading max-w-3xl mx-auto leading-relaxed font-bold">
              We bridge the gap between young people and constitutional knowledge through 
              <span className="text-red-600 font-black bg-red-100 px-3 py-1 rounded-lg mx-2"> innovative programs</span> that make learning engaging and relevant.
            </p>
          </div>

          {/* Program Highlights - COLORFUL CARDS */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            
            {/* Young Citizens Program */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 group border-t-8 border-blue-500">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-xl">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-black text-gray-900 mb-4">Young Citizens Program</h3>
              <p className="text-gray-700 mb-6 font-heading font-bold">Comprehensive constitutional education through multiple learning formats - self-paced, online, and in-person classes.</p>
              
              <ul className="space-y-3 text-sm text-gray-700 mb-6 font-bold">
                {['Interactive learning modules', 'Expert facilitators', 'Community engagement', 'Leadership development'].map((feature, index) => {
                  const icons = ['🎯', '👨‍🏫', '🤝', '👑'];
                  return (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-lg">{icons[index]}</span>
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
              
              <Link
                to="/ycp"
                className="w-full bg-blue-500 text-white py-4 rounded-2xl font-display font-black hover:bg-purple-500 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Learn More</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Teendom Awards */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 group border-t-8 border-yellow-500 relative">
              
              {/* Coming Soon badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full font-display font-black text-sm animate-bounce shadow-xl">
                🎉 Coming 2025
              </div>
              
              <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-xl">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-black text-gray-900 mb-4">Teendom Awards</h3>
              <p className="text-gray-700 mb-6 font-heading font-bold">National recognition platform celebrating exceptional teenagers making positive impact in their communities.</p>
              
              <ul className="space-y-3 text-sm text-gray-700 mb-6 font-bold">
                {['Six award categories', 'National recognition', 'Media coverage', 'Inspiring role models'].map((feature, index) => {
                  const icons = ['🎪', '🌟', '📺', '✨'];
                  return (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-lg">{icons[index]}</span>
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
              
              <Link
                to="/awards"
                className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-display font-black hover:bg-yellow-600 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Discover Awards</span>
                <Star size={18} />
              </Link>
            </div>

            {/* Community Impact */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-4 transition-all duration-500 group border-t-8 border-pink-500">
              <div className="w-20 h-20 bg-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-xl">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-black text-gray-900 mb-4">Community Impact</h3>
              <p className="text-gray-700 mb-6 font-heading font-bold">Building networks of informed young citizens who actively participate in community development and civic engagement.</p>
              
              <ul className="space-y-3 text-sm text-gray-700 mb-6 font-bold">
                {['School partnerships', 'Community workshops', 'Youth networks', 'Civic engagement'].map((feature, index) => {
                  const icons = ['🏫', '🎪', '👥', '🗳️'];
                  return (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-lg">{icons[index]}</span>
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
              
              <Link
                to="/about"
                className="w-full bg-pink-500 text-white py-4 rounded-2xl font-display font-black hover:bg-pink-600 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Our Impact</span>
                <Heart size={18} />
              </Link>
            </div>
          </div>

          {/* The Problem We're Solving - BOLD */}
          <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-3xl p-12 border-8 border-blue-300 shadow-2xl">
            <div className="text-center space-y-8">
              <h3 className="text-4xl font-display font-black">
                <span className="text-red-600">The Challenge</span> 
                <span className="text-gray-900"> We're Addressing</span> 
                <span className="text-3xl ml-2">🎯</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 text-left">
                  <div className="bg-red-100 rounded-2xl p-6 border-l-8 border-red-500 shadow-lg">
                    <h4 className="text-xl font-display font-black text-gray-900 mb-3">📊 The Numbers</h4>
                    <p className="text-gray-800 font-heading font-bold">
                      Over <span className="font-black text-red-600 bg-red-200 px-2 py-1 rounded">11.6 million young people</span> aged 10-19 in Kenya 
                      have limited access to legal and constitutional education, making them vulnerable to exploitation 
                      and limiting their civic participation.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-100 rounded-2xl p-6 border-l-8 border-yellow-500 shadow-lg">
                    <h4 className="text-xl font-display font-black text-gray-900 mb-3">💡 Our Solution</h4>
                    <p className="text-gray-800 font-heading font-bold">
                      We provide accessible, engaging constitutional education that empowers young people 
                      to understand their rights, responsibilities, and the power of active citizenship.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="text-center space-y-6">
                    <div className="text-9xl animate-float">📚</div>
                    <div className="space-y-3">
                      <div className="text-5xl font-display font-black text-blue-700">Knowledge</div>
                      <div className="text-2xl text-gray-800 font-heading font-bold">is Power</div>
                      <div className="text-4xl font-display font-black text-yellow-600">Empowerment</div>
                      <div className="text-xl text-gray-800 font-heading font-bold">is Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - BRIGHT YELLOW */}
      <section className="py-20 bg-yellow-400 relative overflow-hidden">
        
        {/* Bold background elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full animate-pulse shadow-2xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 rounded-blob animate-float shadow-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            {/* Heading - BOLD BLACK TEXT */}
            <h2 className="text-5xl lg:text-6xl font-display font-black text-black leading-tight">
              Ready to Shape Kenya's Future?
              <div className="flex justify-center space-x-3 mt-6">
                <span className="text-4xl animate-bounce">🚀</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.1s'}}>🇰🇪</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
              </div>
            </h2>
            
            {/* Description - BOLD */}
            <p className="text-2xl text-gray-900 font-heading leading-relaxed font-bold">
              Join the movement of young Kenyans who are learning about their rights, responsibilities, 
              and the power of active citizenship. <span className="font-black bg-black text-yellow-400 px-3 py-1 rounded-lg">Your voice matters.</span>
            </p>
            
            {/* CTA Buttons - BIG & BOLD */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/ycp"
                className="group bg-blue-600 text-white px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-purple-600 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl"
              >
                <span className="text-3xl group-hover:animate-bounce">📚</span>
                <span>Explore Programs</span>
                <ArrowRight size={28} className="group-hover:translate-x-3 transition-transform duration-300" />
              </Link>
              <Link
                to="/awards"
                className="group border-4 border-black bg-black text-yellow-400 px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl"
              >
                <span className="text-3xl group-hover:animate-bounce">🏆</span>
                <span>Nominate a Teen</span>
              </Link>
            </div>
            
            {/* Fun decorative elements - BIGGER */}
            <div className="flex justify-center space-x-8 mt-8">
              <div className="text-5xl animate-float">📚</div>
              <div className="text-5xl animate-bounce">🎓</div>
              <div className="text-5xl animate-wiggle">⚖️</div>
              <div className="text-5xl animate-float">🏆</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;