// File: src/components/TeendomMagazineComponents.jsx
import React from 'react';
import { Sparkles, Heart, Star, Zap, Globe, Users, ArrowRight, Target, Award, BookOpen } from 'lucide-react';

// MAGAZINE-STYLE HERO - FULL POWER
const TeendomMagazineHero = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Bold geometric shapes - NO gradients */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 transform rotate-45 opacity-80"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-600 opacity-70"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-green-600 transform -rotate-12 opacity-60"></div>
      <div className="absolute bottom-20 right-32 w-28 h-28 bg-yellow-600 opacity-80"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center text-white max-w-6xl">
          {/* MASSIVE MAGAZINE HEADLINE */}
          <h1 
            className="text-8xl md:text-9xl font-black mb-8 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            <span className="text-red-600">EMPOWER</span><br/>
            <span className="text-white">YOUNG</span><br/>
            <span className="text-yellow-600">CITIZENS</span>
          </h1>
          
          {/* Bold subheading */}
          <p 
            className="text-2xl md:text-3xl mb-12 font-bold tracking-wide text-gray-300"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            CONSTITUTIONAL EDUCATION THAT CHANGES LIVES
          </p>
          
          {/* SHARP CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105">
              <span className="flex items-center gap-4">
                <Zap className="w-8 h-8" />
                JOIN YCP PROGRAM
                <ArrowRight className="w-8 h-8" />
              </span>
            </button>
            
            <button className="border-4 border-white bg-transparent hover:bg-white hover:text-black text-white font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105">
              <span className="flex items-center gap-4">
                <Heart className="w-8 h-8" />
                SUPPORT MISSION
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// BOLD FEATURE BLOCKS - MAGAZINE STYLE
const MagazineFeatureBlocks = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "YOUNG CITIZENS PROGRAM",
      description: "INTERACTIVE CONSTITUTIONAL EDUCATION DESIGNED FOR TEENS",
      color: "bg-red-600",
      stats: "2,500+ STUDENTS"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "TEENDOM AWARDS", 
      description: "RECOGNIZING EXCEPTIONAL YOUNG CHANGEMAKERS NATIONWIDE",
      color: "bg-purple-600",
      stats: "100+ NOMINEES"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "COMMUNITY IMPACT",
      description: "BUILDING INFORMED CITIZENS FOR A BETTER KENYA",
      color: "bg-green-600", 
      stats: "10+ SCHOOLS"
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* MASSIVE Section heading */}
        <div className="text-center mb-20">
          <h2 
            className="text-7xl md:text-8xl font-black text-white mb-6 leading-none"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            WHAT WE DO
          </h2>
          <p 
            className="text-2xl font-bold text-gray-400 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            EMPOWERING KENYA'S YOUTH THROUGH EDUCATION & RECOGNITION
          </p>
        </div>
        
        {/* Feature blocks - SHARP & BOLD */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${feature.color} p-12 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl relative overflow-hidden`}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-black opacity-20"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  {feature.icon}
                </div>
                
                <h3 
                  className="text-3xl font-black mb-6 leading-tight tracking-wide"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {feature.title}
                </h3>
                
                <p 
                  className="text-lg leading-relaxed mb-6 font-bold"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  {feature.description}
                </p>

                {/* Stats block */}
                <div className="bg-black bg-opacity-30 px-4 py-3">
                  <span 
                    className="text-xl font-black tracking-widest"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    {feature.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// POWER STATS - MAGAZINE LAYOUT
const PowerStatsSection = () => {
  const stats = [
    { number: "2,500+", label: "STUDENTS REACHED", color: "bg-red-600" },
    { number: "1,500+", label: "GUIDES DISTRIBUTED", color: "bg-blue-600" },
    { number: "10+", label: "SCHOOLS ENGAGED", color: "bg-green-600" },
    { number: "100%", label: "YOUTH FOCUSED", color: "bg-purple-600" }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Bold background blocks */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-red-600 opacity-10 transform -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-purple-600 opacity-10 transform translate-x-26 translate-y-26"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 
            className="text-7xl md:text-8xl font-black text-white mb-6 leading-none"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            OUR <span className="text-red-600">IMPACT</span>
          </h2>
          <p 
            className="text-2xl font-bold text-gray-400 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            REAL NUMBERS. REAL CHANGE. REAL EMPOWERMENT.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} p-8 text-center group hover:scale-110 transition-transform duration-300`}>
              <div 
                className="text-5xl md:text-6xl font-black text-white mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                {stat.number}
              </div>
              <div 
                className="text-lg font-black text-white tracking-widest"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// MASSIVE CTA SECTION - FULL MAGAZINE POWER
const MagazinePowerCTA = () => {
  return (
    <section className="py-32 bg-red-600 relative overflow-hidden">
      {/* Bold geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-black opacity-20 transform rotate-45"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-yellow-600 opacity-30"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-purple-600 opacity-20 transform -rotate-12"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        <h2 
          className="text-8xl md:text-9xl font-black text-white mb-8 leading-none tracking-tight"
          style={{fontFamily: 'Playfair Display, serif'}}
        >
          READY TO CHANGE THE GAME?
        </h2>
        
        <p 
          className="text-3xl font-black text-red-100 mb-16 tracking-wide"
          style={{fontFamily: 'Space Grotesk, sans-serif'}}
        >
          JOIN THOUSANDS OF YOUNG KENYANS CREATING POSITIVE CHANGE
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <button className="bg-black text-white font-black px-16 py-8 text-2xl tracking-widest transform hover:scale-105 transition-all hover:bg-gray-900">
            <span className="flex items-center gap-4">
              <Zap className="w-8 h-8" />
              START YOUR JOURNEY
              <ArrowRight className="w-8 h-8" />
            </span>
          </button>
          
          <button className="border-4 border-white bg-white bg-opacity-20 text-white font-black px-16 py-8 text-2xl tracking-widest transform hover:scale-105 transition-all hover:bg-white hover:text-red-600">
            <span className="flex items-center gap-4">
              <Heart className="w-8 h-8" />
              SUPPORT MISSION
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

// MAGAZINE-STYLE CATEGORY BLOCKS
const CategoryBlocks = () => {
  const categories = [
    { name: 'SELF-CARE', color: 'bg-blue-600', icon: '💪' },
    { name: 'LEADERSHIP', color: 'bg-red-600', icon: '👑' },
    { name: 'BUSINESS', color: 'bg-purple-600', icon: '💼' },
    { name: 'MONEY', color: 'bg-green-600', icon: '💰' },
    { name: 'LIFESTYLE', color: 'bg-orange-600', icon: '🌟' },
    { name: 'RELATIONSHIPS', color: 'bg-pink-600', icon: '❤️' },
    { name: 'EDUCATION', color: 'bg-indigo-600', icon: '📚' }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-6 justify-center">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`${category.color} text-white px-8 py-4 font-black tracking-widest hover:scale-110 transition-transform transform hover:rotate-1 text-lg flex items-center gap-3`}
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              <span className="text-2xl">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// BOLD NEWSLETTER SECTION - MAGAZINE STYLE
const MagazineNewsletter = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 
          className="text-7xl font-black mb-12 text-white leading-none"
          style={{fontFamily: 'Playfair Display, serif'}}
        >
          STAY IN THE <span className="text-red-600">LOOP</span>
        </h2>
        
        <p 
          className="text-2xl font-bold text-gray-400 mb-12 tracking-wide"
          style={{fontFamily: 'Space Grotesk, sans-serif'}}
        >
          GET THE LATEST STORIES, UPDATES & OPPORTUNITIES
        </p>
        
        <div className="bg-gray-900 p-12 max-w-2xl mx-auto">
          <input 
            type="email" 
            placeholder="YOUR EMAIL ADDRESS"
            className="w-full px-6 py-6 bg-white text-black font-bold placeholder-gray-600 mb-6 focus:outline-none text-lg"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          />
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 font-black tracking-widest transition-all text-xl">
            SUBSCRIBE NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export { 
  TeendomMagazineHero, 
  MagazineFeatureBlocks, 
  PowerStatsSection, 
  MagazinePowerCTA,
  CategoryBlocks,
  MagazineNewsletter
};