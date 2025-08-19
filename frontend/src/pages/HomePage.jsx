// File: frontend/src/components/Homepage.jsx

import React, { useState, useEffect } from 'react';
import { Zap, Star, Heart, Sparkles, Flame, Music, Camera, TrendingUp } from 'lucide-react';

const Homepage = () => {
  const [currentVibe, setCurrentVibe] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const vibes = [
    "TOTALLY WILD", "ABSOLUTELY CHAOTIC", "INSANELY COOL", 
    "MEGA VIBES", "SUPER CHARGED", "ULTRA HYPE"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVibe((prev) => (prev + 1) % vibes.length);
      
      // Random glitch effect
      if (Math.random() < 0.3) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const FloatingIcon = ({ Icon, className = "" }) => (
    <Icon className={`absolute animate-pulse ${className} text-pink-400`} />
  );

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* CRAZY ANIMATED BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 animate-pulse"></div>
      
      {/* FLOATING CHAOS ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon Icon={Star} className="top-10 left-20 w-6 h-6 animate-bounce" />
        <FloatingIcon Icon={Heart} className="top-32 right-32 w-8 h-8 animate-spin" />
        <FloatingIcon Icon={Sparkles} className="bottom-20 left-16 w-5 h-5 animate-ping" />
        <FloatingIcon Icon={Flame} className="top-1/2 left-1/4 w-7 h-7 animate-pulse" />
        <FloatingIcon Icon={Zap} className="bottom-32 right-20 w-6 h-6 animate-bounce" />
        <FloatingIcon Icon={Music} className="top-20 right-1/4 w-5 h-5 animate-spin" />
        <FloatingIcon Icon={Camera} className="bottom-40 left-1/3 w-6 h-6 animate-pulse" />
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        
        {/* MEGA TITLE WITH GLITCH EFFECT */}
        <div className="text-center mb-12">
          <h1 className={`text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent ${isGlitching ? 'animate-pulse filter blur-sm' : ''} transition-all duration-200`}>
            TEENDOM
          </h1>
          
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-wider transform rotate-1 shadow-2xl">
              {vibes[currentVibe]}
            </h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* CHAOTIC BUTTONS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          
          {/* ARTICLES BUTTON */}
          <button className="group relative p-6 bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl transform rotate-2 hover:rotate-6 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-white animate-bounce" />
              <span className="block text-white font-black text-lg tracking-wide">ARTICLES</span>
              <span className="block text-pink-200 font-bold text-sm">READ NOW!</span>
            </div>
          </button>

          {/* LIFESTYLE BUTTON */}
          <button className="group relative p-6 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl transform -rotate-1 hover:-rotate-3 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-white animate-spin" />
              <span className="block text-white font-black text-lg tracking-wide">LIFESTYLE</span>
              <span className="block text-cyan-200 font-bold text-sm">SO COOL!</span>
            </div>
          </button>

          {/* FASHION BUTTON */}
          <button className="group relative p-6 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-2xl transform rotate-1 hover:rotate-4 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-white animate-pulse" />
              <span className="block text-white font-black text-lg tracking-wide">FASHION</span>
              <span className="block text-yellow-200 font-bold text-sm">SLAY!</span>
            </div>
          </button>

          {/* MUSIC BUTTON */}
          <button className="group relative p-6 bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl transform -rotate-2 hover:-rotate-5 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/50">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative text-center">
              <Music className="w-8 h-8 mx-auto mb-2 text-white animate-bounce" />
              <span className="block text-white font-black text-lg tracking-wide">MUSIC</span>
              <span className="block text-green-200 font-bold text-sm">VIBES!</span>
            </div>
          </button>
        </div>

        {/* WILD STATS SECTION */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center transform hover:scale-110 transition-all duration-300">
            <div className="text-4xl font-black text-pink-400 animate-pulse">1K+</div>
            <div className="text-white font-bold text-sm tracking-wider">READERS</div>
          </div>
          <div className="text-center transform hover:scale-110 transition-all duration-300">
            <div className="text-4xl font-black text-purple-400 animate-pulse">50+</div>
            <div className="text-white font-bold text-sm tracking-wider">ARTICLES</div>
          </div>
          <div className="text-center transform hover:scale-110 transition-all duration-300">
            <div className="text-4xl font-black text-cyan-400 animate-pulse">∞</div>
            <div className="text-white font-bold text-sm tracking-wider">CHAOS</div>
          </div>
        </div>

        {/* SCROLLING TEXT */}
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-pink-600 to-purple-600 py-2 overflow-hidden">
          <div className="animate-scroll whitespace-nowrap">
            <span className="text-white font-black text-lg tracking-widest mx-8">
              ★ LATEST TRENDS ★ TEEN LIFE ★ STYLE INSPO ★ MUSIC REVIEWS ★ LIFESTYLE HACKS ★ 
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Homepage;