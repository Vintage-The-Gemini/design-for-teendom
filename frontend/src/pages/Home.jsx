// File: frontend/src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, CheckCircle } from 'lucide-react';

const Home = () => {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section - Closer to navbar with more colors */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-white">
        
        {/* More Colorful Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/40 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-500/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-500/25 rounded-full"></div>
        <div className="absolute top-10 left-1/3 w-28 h-28 bg-red-400/20 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              
              {/* Enhanced Colorful Badge */}
              <div className="inline-flex items-center space-x-3 bg-red-600 text-white px-6 py-3 rounded-full font-display font-bold shadow-lg border-2 border-yellow-400">
                <span>🇰🇪</span>
                <span>Empowering Kenyan Youth</span>
              </div>
              
              {/* Main Heading - More Colorful */}
              <h1 className="space-y-2">
                <div className="text-4xl lg:text-6xl font-display font-black leading-tight text-gray-900">
                  <span className="text-red-600">NURTURING</span> THE NEXT
                </div>
                <div className="text-4xl lg:text-6xl font-display font-black leading-tight">
                  <span className="text-yellow-500">GENERATION</span>
                </div>
              </h1>
              
              {/* Description with More Color */}
              <p className="text-lg text-gray-700 font-heading leading-relaxed max-w-lg">
                <span className="text-yellow-600 font-bold">Empowering young people</span> to develop into 
                <span className="text-red-600 font-bold"> informed and active citizens</span> through 
                constitutional education and <span className="text-yellow-600 font-bold">mentorship programs.</span>
              </p>

              {/* Colorful Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="text-center p-4 bg-yellow-50 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                  <div className={`text-2xl font-display font-black text-blue-600 transition-all duration-1000 ${animateStats ? 'opacity-100' : 'opacity-0'}`}>
                    2,500+
                  </div>
                  <div className="text-xs font-heading text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-2xl shadow-sm border-l-4 border-blue-400">
                  <div className={`text-2xl font-display font-black text-blue-600 transition-all duration-1000 delay-200 ${animateStats ? 'opacity-100' : 'opacity-0'}`}>
                    1,500+
                  </div>
                  <div className="text-xs font-heading text-gray-600">Guides</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-2xl shadow-sm border-l-4 border-red-400">
                  <div className={`text-2xl font-display font-black text-blue-600 transition-all duration-1000 delay-400 ${animateStats ? 'opacity-100' : 'opacity-0'}`}>
                    10+
                  </div>
                  <div className="text-xs font-heading text-gray-600">Schools</div>
                </div>
              </div>

              {/* More Colorful CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ycp"
                  className="group bg-yellow-500 text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg border-2 border-red-400 hover:border-red-500"
                >
                  <span>Start Learning</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/about"
                  className="group border-2 border-red-500 bg-red-500 text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-red-600 hover:border-red-600 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <BookOpen size={20} />
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right Side - Better Aligned Illustration */}
            <div className="relative">
              <div className="relative w-full h-80 lg:h-[420px] flex items-start justify-start lg:justify-center pt-8">
                
                {/* Main Visual Element - Pushed Up and Better Aligned */}
                <div className="relative ml-4 lg:ml-0">
                  <div className="w-64 h-64 lg:w-72 lg:h-72 bg-yellow-400/40 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 lg:w-54 lg:h-54 bg-red-500/25 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 lg:w-36 lg:h-36 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-2 border-yellow-300">
                        <div className="text-center px-2">
                          <div className="text-xl lg:text-2xl mb-1">📚</div>
                          <div className="font-display font-black text-red-600 text-sm lg:text-base">Constitution</div>
                          <div className="font-heading text-gray-600 text-xs lg:text-sm">Guide</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - Colorful */}
                <div className="absolute top-4 right-2 lg:right-8 bg-yellow-100 p-3 lg:p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                  <span className="text-xl lg:text-2xl">⚖️</span>
                </div>
                <div className="absolute bottom-8 left-2 lg:left-8 bg-red-100 p-3 lg:p-4 rounded-xl shadow-lg border-2 border-red-400">
                  <span className="text-xl lg:text-2xl">🎓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - Original Design with Current Colors */}
      <section className="py-20 bg-white relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-red-500/20 rounded-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header with More Color */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-8 py-4 rounded-full font-display font-bold shadow-xl animate-bounce border-2 border-yellow-400">
              <span className="text-lg font-black">What We Do</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-black space-y-2">
              <div className="text-yellow-600">CONSTITUTIONAL</div>
              <div className="text-red-600 text-shadow-strong">EDUCATION</div>
              <div className="text-gray-900">FOR YOUTH</div>
            </h2>
            
            <p className="text-xl text-gray-800 font-heading max-w-3xl mx-auto leading-relaxed font-bold">
              We bridge the gap between <span className="text-red-600 font-black">young people</span> and constitutional knowledge through 
              <span className="text-yellow-600 font-black bg-yellow-100 px-3 py-1 rounded-lg mx-2"> innovative programs</span> that make learning <span className="text-red-600 font-black">engaging and relevant.</span>
            </p>
          </div>

          {/* Program Cards - More Visible */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            
            {/* Young Citizens Program */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-gray-900 mb-4">Young Citizens Program</h3>
              <p className="text-gray-800 mb-6 font-heading font-semibold text-base">Comprehensive constitutional education through multiple learning formats.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">Interactive learning modules</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">Expert facilitators</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">Community engagement</span>
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-display font-black text-base hover:bg-blue-700 transition-colors duration-300 shadow-lg">
                Learn More
              </button>
            </div>

            {/* Teendom Awards */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative border border-gray-100">
              
              {/* Coming Soon badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-5 py-2 rounded-full font-display font-black text-sm shadow-lg">
                Coming 2025
              </div>
              
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                <Award size={24} className="text-gray-900" />
              </div>
              <h3 className="text-xl font-display font-black text-gray-900 mb-4">Teendom Awards</h3>
              <p className="text-gray-800 mb-6 font-heading font-semibold text-base">National recognition platform celebrating exceptional teenagers.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">Six award categories</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">National recognition</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">Media coverage</span>
                </li>
              </ul>
              
              <button className="w-full bg-yellow-400 text-gray-900 py-4 rounded-xl font-display font-black text-base hover:bg-yellow-500 transition-colors duration-300 shadow-lg">
                Discover Awards
              </button>
            </div>

            {/* Community Impact - Warm Color */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-black text-gray-900 mb-4">Community Impact</h3>
              <p className="text-gray-800 mb-6 font-heading font-semibold text-base">Building networks of informed young citizens who actively participate.</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">School partnerships</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">Community workshops</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                  <span className="font-heading font-bold text-sm">Youth networks</span>
                </li>
              </ul>
              
              <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-display font-black text-base hover:bg-orange-600 transition-colors duration-300 shadow-lg">
                Our Impact
              </button>
            </div>
          </div>

          {/* The Problem We're Solving - Original Design with Current Colors */}
          <div className="bg-yellow-100 rounded-3xl p-12 border-8 border-yellow-400/30 shadow-2xl">
            <div className="text-center space-y-8">
              <h3 className="text-4xl font-display font-black">
                <span className="text-red-600">The Challenge</span> 
                <span className="text-gray-900"> We're Addressing</span> 
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 text-left">
                  <div className="bg-red-100 rounded-2xl p-6 border-l-8 border-red-500 shadow-lg">
                    <h4 className="text-xl font-display font-black text-gray-900 mb-3">The Numbers</h4>
                    <p className="text-gray-800 font-heading font-bold">
                      Over <span className="font-black text-red-600 bg-red-200 px-2 py-1 rounded">11.6 million young people</span> aged 10-19 in Kenya 
                      have limited access to legal and constitutional education, making them vulnerable to exploitation 
                      and limiting their civic participation.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-200 rounded-2xl p-6 border-l-8 border-yellow-500 shadow-lg">
                    <h4 className="text-xl font-display font-black text-gray-900 mb-3">Our Solution</h4>
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
                      <div className="text-5xl font-display font-black text-red-600">Knowledge</div>
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

      {/* Call to Action - Colorful */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        
        {/* Background Accents */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-500/20 rounded-full"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            <h2 className="text-4xl lg:text-5xl font-display font-black text-white leading-tight">
              Ready to Shape 
              <span className="text-yellow-400"> Kenya's Future?</span>
            </h2>
            
            <p className="text-xl text-blue-100 font-heading leading-relaxed max-w-3xl mx-auto">
              Join the movement of young Kenyans who are learning about their rights, responsibilities, 
              and the <span className="text-yellow-300 font-bold">power of active citizenship.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ycp"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-display font-black text-lg hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg border-2 border-transparent hover:border-white"
              >
                <span>Explore Programs</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/awards"
                className="border-2 border-red-400 bg-red-500 text-white px-8 py-4 rounded-2xl font-display font-black text-lg hover:bg-red-600 hover:border-red-500 transition-all duration-300"
              >
                Nominate a Teen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;