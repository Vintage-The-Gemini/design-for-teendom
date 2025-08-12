// File: src/pages/AwardsPage.jsx
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Bookmark, Share2, Eye, Clock, Trophy, Star, Target, Award } from 'lucide-react';

const AwardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Award categories data
  const categories = [
    {
      name: 'INNOVATION',
      description: 'Young innovators solving community problems',
      icon: '💡',
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
    },
    {
      name: 'LEADERSHIP',
      description: 'Teen leaders driving positive change',
      icon: '👑',
      color: 'bg-purple-600',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop'
    },
    {
      name: 'ADVOCACY',
      description: 'Young voices fighting for important causes',
      icon: '📢',
      color: 'bg-red-600',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop'
    },
    {
      name: 'ARTS & CULTURE',
      description: 'Creative expression with social impact',
      icon: '🎨',
      color: 'bg-pink-600',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop'
    },
    {
      name: 'ENVIRONMENT',
      description: 'Environmental champions protecting our planet',
      icon: '🌱',
      color: 'bg-green-600',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop'
    }
  ];

  // Timeline data
  const timeline = [
    { month: 'AUG', event: 'NOMINATIONS OPEN', status: 'upcoming' },
    { month: 'OCT', event: 'DEADLINE', status: 'upcoming' },
    { month: 'NOV', event: 'JUDGING', status: 'upcoming' },
    { month: 'DEC', event: 'CEREMONY', status: 'upcoming' }
  ];

  // Winners showcase (sample data)
  const winners = [
    {
      name: 'SARAH KIPLAGAT',
      category: 'INNOVATION',
      achievement: 'Water Purification System',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b130?w=400&h=400&fit=crop'
    },
    {
      name: 'JAMES MWANGI',
      category: 'LEADERSHIP',
      achievement: 'Youth Civic Education',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
      name: 'AISHA OMAR',
      category: 'ADVOCACY',
      achievement: 'Girls Education Campaign',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="pt-20 bg-white">
      
      {/* HERO SECTION - FEATURED CATEGORY CAROUSEL */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src={categories[selectedCategory].image}
            alt={categories[selectedCategory].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8 z-30">
          <span className={`${categories[selectedCategory].color} text-white px-6 py-3 font-black text-lg tracking-widest`}>
            AWARD CATEGORY
          </span>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setSelectedCategory((prev) => (prev - 1 + categories.length) % categories.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={() => setSelectedCategory((prev) => (prev + 1) % categories.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
        
        {/* Content */}
        <div className="absolute bottom-8 left-8 right-8 z-30">
          <div className="max-w-7xl mx-auto">
            <h1 
              className="text-6xl md:text-8xl font-black text-white leading-tight mb-6"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              TEENDOM AWARDS
            </h1>
            
            <h2 
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              {categories[selectedCategory].name}
            </h2>
            
            <p className="text-xl text-white mb-8 max-w-2xl">
              {categories[selectedCategory].description}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="bg-red-600 px-6 py-3">
                <span className="font-black text-white tracking-wider">NOMINATIONS OPEN AUG 2025</span>
              </div>
              <div className="bg-blue-600 px-6 py-3">
                <span className="font-black text-white tracking-wider">5 CATEGORIES</span>
              </div>
              <div className="bg-green-600 px-6 py-3">
                <span className="font-black text-white tracking-wider">KENYA-WIDE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(index)}
              className={`w-3 h-3 transition-all ${
                index === selectedCategory ? 'bg-red-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES GRID - HOMEPAGE STYLE */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`${index === selectedCategory ? category.color : 'bg-gray-600'} text-white px-6 py-3 font-black tracking-wider hover:scale-105 transition-transform`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            AWARDS TIMELINE
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-600 w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-white">{item.month}</span>
                </div>
                <h3 
                  className="text-xl font-black text-gray-900 mb-2"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {item.event}
                </h3>
                <p className="text-gray-600">2025</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WINNERS SHOWCASE */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            FEATURED <span className="text-red-600">CHANGEMAKERS</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <article key={index} className="group cursor-pointer">
                <div className="relative mb-4 overflow-hidden">
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 font-black text-sm tracking-wider">
                      {winner.category}
                    </span>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 
                      className="text-2xl font-black text-white leading-tight mb-1"
                      style={{fontFamily: 'Space Grotesk, sans-serif'}}
                    >
                      {winner.name}
                    </h3>
                    <p className="text-white text-sm font-medium">{winner.achievement}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION - HOMEPAGE STYLE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            OUR <span className="text-red-600">IMPACT</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-red-600 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div 
                className="text-4xl md:text-5xl font-black text-white mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                100+
              </div>
              <div 
                className="text-sm font-black text-white tracking-widest"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                NOMINEES EXPECTED
              </div>
            </div>

            <div className="bg-blue-600 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div 
                className="text-4xl md:text-5xl font-black text-white mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                5
              </div>
              <div 
                className="text-sm font-black text-white tracking-widest"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                AWARD CATEGORIES
              </div>
            </div>

            <div className="bg-green-600 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div 
                className="text-4xl md:text-5xl font-black text-white mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                47
              </div>
              <div 
                className="text-sm font-black text-white tracking-widest"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                COUNTIES COVERED
              </div>
            </div>

            <div className="bg-purple-600 p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div 
                className="text-4xl md:text-5xl font-black text-white mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                1M+
              </div>
              <div 
                className="text-sm font-black text-white tracking-widest"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                TEENS REACHED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOMINATION CTA - HOMEPAGE STYLE */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-6xl font-black mb-8 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            NOMINATE A CHANGEMAKER
          </h2>
          
          <p 
            className="text-2xl font-bold text-red-100 mb-12 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            KNOW A TEEN MAKING A DIFFERENCE? NOMINATE THEM TODAY
          </p>
          
          <div className="bg-white p-8 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL FOR UPDATES"
              className="w-full px-4 py-4 bg-gray-100 text-black font-bold placeholder-gray-600 mb-4 focus:outline-none focus:bg-white"
            />
            <button className="w-full bg-black text-white py-4 font-black tracking-wider hover:bg-gray-800 transition-all">
              GET NOTIFIED WHEN NOMINATIONS OPEN
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;