// File: frontend/src/pages/AwardsPage.jsx
import React, { useState } from 'react';

const AwardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = [
    { name: "ACADEMIC EXCELLENCE", icon: "🎓", color: "bg-blue-600" },
    { name: "LEADERSHIP EXCELLENCE", icon: "👑", color: "bg-red-600" },
    { name: "TEEN INNOVATOR", icon: "💡", color: "bg-yellow-600" },
    { name: "TEENPRENEUR", icon: "💼", color: "bg-blue-600" },
    { name: "CREATIVE ARTS", icon: "🎨", color: "bg-red-600" },
    { name: "SPORTS & WELLNESS", icon: "⚽", color: "bg-yellow-600" },
    { name: "ADVOCATE FOR CHANGE", icon: "📢", color: "bg-blue-600" },
    { name: "ENVIRONMENTAL CHAMPION", icon: "🌱", color: "bg-red-600" },
    { name: "DIGITAL IMPACT", icon: "💻", color: "bg-yellow-600" },
    { name: "TEEN OF THE YEAR", icon: "⭐", color: "bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600" }
  ];

  const timeline = [
    { month: "JAN", event: "NOMINATIONS OPEN" },
    { month: "MAR", event: "JUDGING BEGINS" },
    { month: "NOV", event: "FINALISTS ANNOUNCED" },
    { month: "DEC", event: "AWARDS CEREMONY" }
  ];

  const winners = [
    {
      name: "FAITH KIPROTICH",
      category: "LEADERSHIP",
      achievement: "Youth Environmental Activist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "BRIAN MWANGI",
      category: "INNOVATION",
      achievement: "Tech Solutions for Agriculture",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "GRACE ACHIENG",
      category: "CREATIVE ARTS",
      achievement: "Community Arts Program Founder",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* HERO SECTION - Teendom Awards Colors (Red, Blue, Yellow) */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-red-600 via-blue-600 to-yellow-500 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-400 rounded-full opacity-15"></div>
        <div className="absolute top-60 right-1/4 w-28 h-28 bg-blue-400 rounded-full opacity-20"></div>
        
        {/* Sun symbol from logo */}
        <div className="absolute top-20 right-10">
          <div className="w-20 h-20 bg-yellow-400 rounded-full opacity-30 relative">
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-6 bg-yellow-400 opacity-50"
                  style={{
                    top: '-12px',
                    left: '50%',
                    transformOrigin: '50% 52px',
                    transform: `translateX(-50%) rotate(${i * 45}deg)`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h1 
            className="text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight drop-shadow-lg"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            TEENDOM
            <br/>
            <span className="text-yellow-300 drop-shadow-xl">AWARDS</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed drop-shadow-md"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              🌟 CELEBRATING TEEN EXCELLENCE 🌟
            </p>
            <p 
              className="text-lg md:text-xl font-semibold text-white/90 mb-12 leading-relaxed"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Recognizing extraordinary teens who are changing lives and rewriting the future. 
              It's time the whole country knew their names! 🇰🇪
            </p>
          </div>

          {/* Key Messages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="text-4xl mb-3">🔸</div>
              <h3 className="text-white font-black mb-2">TEENS MAKING A DIFFERENCE?</h3>
              <p className="text-white/90 font-medium">Nominate yourself. Your voice matters.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="text-4xl mb-3">🔸</div>
              <h3 className="text-white font-black mb-2">KNOW AN INSPIRING TEEN?</h3>
              <p className="text-white/90 font-medium">Nominate them. Let's give them their flowers now.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <div className="text-4xl mb-3">🔸</div>
              <h3 className="text-white font-black mb-2">WANT TO SUPPORT?</h3>
              <p className="text-white/90 font-medium">Partner with us and amplify these stories.</p>
            </div>
          </div>

          {/* Call to Actions matching logo colors */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105 rounded-lg shadow-2xl">
              🟨 NOMINATE NOW
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105 rounded-lg shadow-2xl">
              🟩 PARTNER WITH US
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105 rounded-lg shadow-2xl">
              🟧 JOIN THE MOVEMENT
            </button>
          </div>
        </div>
      </section>

      {/* AWARD CATEGORIES - Logo Color Theme */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 
              className="text-3xl font-black text-gray-900 mb-4"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              AWARD CATEGORIES
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`${index === selectedCategory ? category.color : 'bg-gray-600'} text-white px-6 py-3 font-black tracking-wider hover:scale-105 transition-transform rounded-lg`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION - Logo Colors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            AWARDS <span className="text-red-600">TIMELINE</span> 2025
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-24 h-24 flex items-center justify-center mx-auto mb-4 rounded-full ${
                  index % 3 === 0 ? 'bg-red-600' : 
                  index % 3 === 1 ? 'bg-blue-600' : 'bg-yellow-500'
                }`}>
                  <span className="text-2xl font-black text-white">{item.month}</span>
                </div>
                <h3 
                  className="text-xl font-black text-gray-900 mb-2"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {item.event}
                </h3>
                <p className="text-gray-600 font-semibold">2025</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CHANGEMAKERS - Improved Image Fitting */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            FEATURED <span className="text-blue-600">CHANGEMAKERS</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <article key={index} className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
                {/* Fixed Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-white px-3 py-1 font-black text-sm tracking-wider rounded ${
                      index % 3 === 0 ? 'bg-red-600' : 
                      index % 3 === 1 ? 'bg-blue-600' : 'bg-yellow-600'
                    }`}>
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

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">2024 Winner</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <div key={star} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATS - Logo Colors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            OUR <span className="text-red-600">IMPACT</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-red-600 p-8 text-center group hover:scale-105 transition-transform duration-300 rounded-lg">
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

            <div className="bg-blue-600 p-8 text-center group hover:scale-105 transition-transform duration-300 rounded-lg">
              <div 
                className="text-4xl md:text-5xl font-black text-white mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                10
              </div>
              <div 
                className="text-sm font-black text-white tracking-widest"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                AWARD CATEGORIES
              </div>
            </div>

            <div className="bg-yellow-500 p-8 text-center group hover:scale-105 transition-transform duration-300 rounded-lg">
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

            <div className="bg-gradient-to-r from-red-600 to-blue-600 p-8 text-center group hover:scale-105 transition-transform duration-300 rounded-lg">
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

      {/* ABOUT SECTION - Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-red-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 
                className="text-5xl font-black text-gray-900 mb-8"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                OUR <span className="text-blue-600">VISION</span> & <span className="text-red-600">MISSION</span>
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
                  <h3 
                    className="text-2xl font-black text-blue-600 mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    VISION
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    A thriving network of empowered teenagers recognized for their talent, 
                    leadership, and positive influence.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-600">
                  <h3 
                    className="text-2xl font-black text-red-600 mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    MISSION
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    To identify, celebrate, and support outstanding teens who exemplify 
                    excellence and social responsibility.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
                  <h3 
                    className="text-2xl font-black text-yellow-600 mb-3"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    IMPACT
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    The Teendom Awards are more than a ceremony — they are a launchpad. 
                    We're building a national stage where Kenya's most promising teens get seen, 
                    heard, and supported.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-blue-600 p-10 rounded-2xl shadow-2xl">
              <h3 
                className="text-3xl font-black text-white mb-6 text-center"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                WHAT WINNERS GET 🏆
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-black">✓</span>
                  </div>
                  <span className="text-white font-semibold">National Recognition & Media Exposure</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-black">✓</span>
                  </div>
                  <span className="text-white font-semibold">12-Month Mentorship Journey</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-black">✓</span>
                  </div>
                  <span className="text-white font-semibold">Skills Development Opportunities</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-black">✓</span>
                  </div>
                  <span className="text-white font-semibold">Access to Leadership Networks</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-black">✓</span>
                  </div>
                  <span className="text-white font-semibold">Scholarship Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOMINATION CTA - Logo Colors */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-blue-600 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-6xl font-black mb-8 text-white drop-shadow-lg"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            NOMINATE A
            <br/>
            <span className="text-yellow-300">CHANGEMAKER</span>
          </h2>
          
          <p 
            className="text-2xl font-bold text-white/90 mb-12 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            🌟 KNOW A TEEN MAKING A DIFFERENCE? NOMINATE THEM TODAY! 🌟
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 max-w-md mx-auto rounded-2xl border border-white/20">
            <input 
              type="email" 
              placeholder="YOUR EMAIL FOR UPDATES"
              className="w-full px-4 py-4 bg-white/20 text-white font-bold placeholder-white/70 mb-4 focus:outline-none focus:bg-white/30 rounded-lg backdrop-blur-sm"
            />
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 font-black tracking-wider transition-all rounded-lg shadow-lg">
              🔔 GET NOTIFIED WHEN NOMINATIONS OPEN
            </button>
          </div>
          
          <div className="mt-8">
            <p className="text-white/80 font-semibold mb-4">Nominations open January 2025</p>
            <div className="flex justify-center space-x-6">
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 font-bold rounded-lg backdrop-blur-sm border border-white/30 transition-all">
                📋 LEARN MORE ABOUT CATEGORIES
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 font-bold rounded-lg backdrop-blur-sm border border-white/30 transition-all">
                🤝 BECOME A PARTNER
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;