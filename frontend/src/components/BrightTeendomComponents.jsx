// File: src/components/BrightTeendomComponents.jsx
import React from 'react';
import { Sparkles, Heart, Star, Zap, Globe, Users, ArrowRight, Target, Award, BookOpen, Clock, Play } from 'lucide-react';

// BRIGHT & VIBRANT HERO - FULL ENERGY
const BrightTeendomHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300 overflow-hidden">
      
      {/* Floating colorful decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-yellow rounded-full animate-float shadow-2xl opacity-80"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-primary-pink rounded-2xl transform rotate-45 animate-bounce shadow-2xl opacity-70"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-primary-green rounded-full animate-pulse shadow-2xl opacity-60"></div>
      <div className="absolute bottom-20 right-32 w-28 h-28 bg-primary-orange rounded-2xl animate-wiggle shadow-2xl opacity-80"></div>
      <div className="absolute top-60 left-1/3 w-20 h-20 bg-primary-purple rounded-full animate-bounce shadow-xl opacity-50"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl">
          
          {/* Energetic badge */}
          <div className="inline-flex items-center space-x-3 bg-primary-red text-white px-8 py-4 rounded-full font-black shadow-2xl mb-8 animate-bounce">
            <span className="text-2xl animate-pulse">🚀</span>
            <span className="text-lg tracking-wider">EMPOWERING YOUNG CITIZENS</span>
          </div>
          
          {/* MASSIVE BRIGHT HEADLINE */}
          <h1 
            className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            <span className="text-primary-red drop-shadow-lg">EMPOWER</span><br/>
            <span className="text-primary-blue drop-shadow-lg">YOUNG</span><br/>
            <span className="text-primary-yellow drop-shadow-lg">CITIZENS</span>
          </h1>
          
          {/* Vibrant subheading */}
          <p 
            className="text-2xl md:text-3xl mb-12 font-bold tracking-wide text-gray-800"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            CONSTITUTIONAL EDUCATION THAT'S FUN, ENGAGING & LIFE-CHANGING ✨
          </p>
          
          {/* BRIGHT CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-primary-red hover:bg-red-600 text-white font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl hover:shadow-3xl">
              <span className="flex items-center gap-4">
                <Zap className="w-8 h-8" />
                JOIN YCP PROGRAM
                <ArrowRight className="w-8 h-8" />
              </span>
            </button>
            
            <button className="bg-white hover:bg-primary-yellow border-4 border-primary-blue text-primary-blue hover:text-gray-800 font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105 rounded-full shadow-2xl">
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

// BRIGHT FEATURE CARDS - COLORFUL & ENERGETIC
const BrightFeatureCards = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "YOUNG CITIZENS PROGRAM",
      description: "Interactive constitutional education designed for teens with games, debates & real-world practice",
      color: "bg-primary-blue",
      emoji: "📚",
      stats: "2,500+ STUDENTS",
      accent: "bg-blue-100"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "TEENDOM AWARDS", 
      description: "Recognizing exceptional young changemakers who are making a difference in their communities",
      color: "bg-primary-purple",
      emoji: "🏆",
      stats: "100+ NOMINEES",
      accent: "bg-purple-100"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "COMMUNITY IMPACT",
      description: "Building informed citizens who understand their rights and can participate in democracy",
      color: "bg-primary-green", 
      emoji: "🎯",
      stats: "10+ SCHOOLS",
      accent: "bg-green-100"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-blue-light to-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Floating decorations */}
        <div className="absolute left-10 w-16 h-16 bg-primary-yellow rounded-full animate-pulse opacity-50"></div>
        <div className="absolute right-20 w-12 h-12 bg-primary-pink rounded-2xl animate-bounce opacity-60"></div>
        
        {/* ENERGETIC Section heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-primary-yellow text-gray-900 px-8 py-4 rounded-full font-black shadow-xl mb-8 animate-wiggle">
            <span className="text-2xl">⚡</span>
            <span className="text-lg tracking-wider">WHAT WE DO</span>
          </div>
          
          <h2 
            className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-none"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            EMPOWERING KENYA'S YOUTH
          </h2>
          <p 
            className="text-2xl font-bold text-gray-700 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            Through Education, Recognition & Community Building 🌟
          </p>
        </div>
        
        {/* Feature cards - BRIGHT & ROUNDED */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${feature.color} p-8 rounded-3xl text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl relative overflow-hidden shadow-xl hover:rotate-1`}
            >
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 ${feature.accent} rounded-full -translate-y-12 translate-x-12 opacity-30`}></div>
              
              <div className="relative z-10">
                <div className="mb-8 flex items-center space-x-4">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <span className="text-4xl">{feature.emoji}</span>
                </div>
                
                <h3 
                  className="text-2xl font-black mb-6 leading-tight tracking-wide"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {feature.title}
                </h3>
                
                <p 
                  className="text-lg leading-relaxed mb-6 font-medium"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  {feature.description}
                </p>

                {/* Stats block */}
                <div className="bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm">
                  <span 
                    className="text-xl font-black tracking-widest flex items-center gap-2"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    <Sparkles className="w-5 h-5" />
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

// VIBRANT STATS - COLORFUL BLOCKS
const VibrantStatsSection = () => {
  const stats = [
    { number: "2,500+", label: "STUDENTS REACHED", color: "bg-primary-red", emoji: "👥" },
    { number: "1,500+", label: "GUIDES DISTRIBUTED", color: "bg-primary-blue", emoji: "📚" },
    { number: "10+", label: "SCHOOLS ENGAGED", color: "bg-primary-green", emoji: "🏫" },
    { number: "100%", label: "YOUTH FOCUSED", color: "bg-primary-purple", emoji: "🎯" }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Bright background decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary-yellow/20 rounded-full -translate-x-20 -translate-y-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-primary-pink/20 rounded-full translate-x-26 translate-y-26 animate-float"></div>
      <div className="absolute top-32 right-20 w-32 h-32 bg-primary-blue/20 rounded-2xl transform rotate-45 animate-bounce"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-primary-green text-white px-8 py-4 rounded-full font-black shadow-xl mb-8 animate-bounce">
            <span className="text-2xl">📊</span>
            <span className="text-lg tracking-wider">OUR IMPACT</span>
          </div>
          
          <h2 
            className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-none"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            REAL NUMBERS. <span className="text-primary-red">REAL CHANGE.</span>
          </h2>
          <p 
            className="text-2xl font-bold text-gray-700 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            Making a Difference Across Kenya 🇰🇪
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} p-8 rounded-3xl text-center group hover:scale-110 transition-transform duration-300 shadow-xl hover:shadow-2xl transform hover:rotate-1`}>
              <div className="mb-4">
                <span className="text-4xl mb-4 block">{stat.emoji}</span>
                <div 
                  className="text-4xl md:text-5xl font-black text-white mb-4"
                  style={{fontFamily: 'Playfair Display, serif'}}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-sm font-black text-white tracking-widest"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// BRIGHT LEARNING PATHS - COLORFUL CARDS
const BrightLearningPaths = () => {
  const paths = [
    {
      title: "SELF-PACED LEARNING",
      duration: "6 WEEKS",
      price: "FREE",
      color: "bg-primary-blue",
      emoji: "🎮",
      features: ["Learn at your own pace", "Interactive games", "Audio content", "Achievement badges"]
    },
    {
      title: "ONLINE CLASSES", 
      duration: "8 WEEKS",
      price: "KSH 500",
      color: "bg-primary-purple",
      emoji: "💻",
      features: ["Live video sessions", "Expert instructors", "Group discussions", "Q&A sessions"],
      popular: true
    },
    {
      title: "PHYSICAL CLASSES",
      duration: "12 WEEKS", 
      price: "KSH 1,000",
      color: "bg-primary-green",
      emoji: "🏛️",
      features: ["In-person training", "Hands-on activities", "Field trips", "Networking"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-purple-light via-white to-secondary-yellow-light">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-primary-orange text-white px-8 py-4 rounded-full font-black shadow-xl mb-8 animate-wiggle">
            <span className="text-2xl">🚀</span>
            <span className="text-lg tracking-wider">LEARNING PATHS</span>
          </div>
          
          <h2 
            className="text-6xl font-black text-gray-900 mb-6 leading-none"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            CHOOSE YOUR JOURNEY
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden border-4 ${path.popular ? 'border-primary-pink' : 'border-transparent'}`}
            >
              {path.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-pink text-white px-6 py-2 rounded-full font-black text-sm shadow-xl animate-bounce">
                  ⭐ MOST POPULAR
                </div>
              )}
              
              <div className={`w-20 h-20 ${path.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto`}>
                <span className="text-3xl">{path.emoji}</span>
              </div>
              
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
                  className="text-4xl font-black text-gray-900 flex items-center justify-center space-x-2"
                  style={{fontFamily: 'Playfair Display, serif'}}
                >
                  <span>{path.price}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <span className="text-green-500 text-xl">✅</span>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full ${path.color} hover:opacity-90 text-white py-4 rounded-2xl font-black text-lg tracking-wider transition-all transform hover:scale-105 shadow-xl`}>
                START LEARNING
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// MASSIVE BRIGHT CTA - FULL ENERGY
const BrightPowerCTA = () => {
  return (
    <section className="py-32 bg-gradient-to-r from-primary-red via-primary-purple to-primary-blue relative overflow-hidden">
      
      {/* Bright animated decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-yellow opacity-30 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white opacity-20 rounded-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-primary-green opacity-20 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 bg-primary-pink opacity-25 rounded-2xl animate-wiggle"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        <div className="mb-8">
          <span className="text-6xl mb-6 block animate-bounce">🚀</span>
        </div>
        
        <h2 
          className="text-7xl md:text-9xl font-black text-white mb-8 leading-none tracking-tight drop-shadow-2xl"
          style={{fontFamily: 'Playfair Display, serif'}}
        >
          READY TO CHANGE THE GAME?
        </h2>
        
        <p 
          className="text-3xl font-black text-white mb-16 tracking-wide"
          style={{fontFamily: 'Space Grotesk, sans-serif'}}
        >
          JOIN THOUSANDS OF YOUNG KENYANS CREATING POSITIVE CHANGE ✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <button className="bg-white text-primary-purple font-black px-16 py-8 text-2xl tracking-widest transform hover:scale-105 transition-all hover:bg-primary-yellow rounded-full shadow-2xl hover:shadow-3xl">
            <span className="flex items-center gap-4">
              <Zap className="w-8 h-8" />
              START YOUR JOURNEY
              <ArrowRight className="w-8 h-8" />
            </span>
          </button>
          
          <button className="border-4 border-white bg-white/20 backdrop-blur-sm text-white font-black px-16 py-8 text-2xl tracking-widest transform hover:scale-105 transition-all hover:bg-white hover:text-primary-purple rounded-full shadow-2xl">
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

// BRIGHT NEWSLETTER - COLORFUL
const BrightNewsletter = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-secondary-blue-light to-secondary-pink-light">
      <div className="max-w-5xl mx-auto text-center px-6">
        
        <div className="inline-flex items-center space-x-3 bg-primary-yellow text-gray-900 px-8 py-4 rounded-full font-black shadow-xl mb-8 animate-pulse">
          <span className="text-2xl">📧</span>
          <span className="text-lg tracking-wider">STAY CONNECTED</span>
        </div>
        
        <h2 
          className="text-6xl font-black mb-12 text-gray-900 leading-none"
          style={{fontFamily: 'Playfair Display, serif'}}
        >
          STAY IN THE <span className="text-primary-red">LOOP</span>
        </h2>
        
        <p 
          className="text-2xl font-bold text-gray-700 mb-12 tracking-wide"
          style={{fontFamily: 'Space Grotesk, sans-serif'}}
        >
          Get the Latest Stories, Updates & Opportunities 🌟
        </p>
        
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-2xl mx-auto">
          <input 
            type="email" 
            placeholder="YOUR EMAIL ADDRESS"
            className="w-full px-6 py-6 bg-gray-100 text-gray-900 font-bold placeholder-gray-600 mb-6 focus:outline-none text-lg rounded-2xl border-4 border-transparent focus:border-primary-blue"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          />
          <button className="w-full bg-primary-red hover:bg-red-600 text-white py-6 font-black tracking-widest transition-all text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105">
            SUBSCRIBE NOW ✨
          </button>
        </div>
      </div>
    </section>
  );
};

export { 
  BrightTeendomHero, 
  BrightFeatureCards, 
  VibrantStatsSection, 
  BrightLearningPaths,
  BrightPowerCTA,
  BrightNewsletter
};