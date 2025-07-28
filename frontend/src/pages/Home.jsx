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
      {/* Hero Section - Super Colorful & Fun! */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-yellow-50 section-dots">
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-teen-yellow/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-teen-pink/20 rounded-blob animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teen-blue/25 rounded-full animate-wiggle"></div>
        <div className="absolute top-60 right-1/3 w-16 h-16 bg-teen-green/30 rounded-blob animate-float"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              
              {/* Animated Badge */}
              <div className="inline-flex items-center space-x-2 bg-teen-pink text-white px-6 py-3 rounded-full font-display font-bold animate-bounce shadow-xl">
                <span className="text-xl animate-pulse">🇰🇪</span>
                <span>Empowering Kenyan Youth</span>
                <span className="text-xl animate-pulse">✨</span>
              </div>
              
              {/* Main Heading - Super Bold & Colorful */}
              <h1 className="space-y-2">
                <div className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                  <span className="inline-block text-teen-blue hover:text-teen-purple transition-colors duration-500 cursor-default">
                    NURTURING
                  </span>
                </div>
                <div className="text-4xl lg:text-6xl font-display font-bold leading-tight">
                  <span className="inline-block text-gray-800 hover:text-teen-orange transition-colors duration-500 cursor-default">
                    THE NEXT
                  </span>
                </div>
                <div className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                  <span className="inline-block text-teen-pink hover:text-teen-green transition-colors duration-500 cursor-default">
                    GENERATION
                  </span>
                </div>
              </h1>
              
              {/* Description */}
              <p className="text-xl text-gray-600 font-heading leading-relaxed">
                Empowering young people to develop into a community of 
                <span className="font-bold text-teen-blue px-2 py-1 bg-teen-blue/10 rounded-lg mx-1">
                  informed and active citizens
                </span>
                through constitutional education and mentorship.
              </p>

              {/* Impact Stats - Colorful Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="card-blue transform hover:scale-110 transition-all duration-300">
                  <div className={`text-3xl font-display font-bold text-teen-blue transition-all duration-1000 ${animateStats ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    2,500+
                  </div>
                  <div className="text-xs text-gray-600 font-heading font-semibold">Young People</div>
                  <div className="text-lg">🎓</div>
                </div>
                <div className="card-pink transform hover:scale-110 transition-all duration-300">
                  <div className={`text-3xl font-display font-bold text-teen-pink transition-all duration-1000 delay-200 ${animateStats ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    1,500+
                  </div>
                  <div className="text-xs text-gray-600 font-heading font-semibold">Constitution Guides</div>
                  <div className="text-lg">📚</div>
                </div>
                <div className="card-orange transform hover:scale-110 transition-all duration-300">
                  <div className={`text-3xl font-display font-bold text-teen-orange transition-all duration-1000 delay-400 ${animateStats ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    10+
                  </div>
                  <div className="text-xs text-gray-600 font-heading font-semibold">Schools</div>
                  <div className="text-lg">🏫</div>
                </div>
              </div>

              {/* CTA Buttons - Super Fun! */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ycp"
                  className="group bg-teen-blue text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-purple hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <span className="text-xl group-hover:animate-bounce">🚀</span>
                  <span>Start Learning</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <button className="group border-4 border-teen-pink text-teen-pink px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-pink hover:text-white transition-all duration-300 flex items-center justify-center space-x-3">
                  <BookOpen size={20} className="group-hover:animate-wiggle" />
                  <span>Download Guide</span>
                  <span className="text-xl group-hover:animate-bounce">📖</span>
                </button>
              </div>
            </div>

            {/* Right Illustration - Colorful & Animated */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                
                {/* Main decorative blob */}
                <div className="absolute inset-0 bg-teen-yellow/30 rounded-blob animate-pulse"></div>
                <div className="absolute inset-4 bg-teen-orange/20 rounded-blob animate-float"></div>
                <div className="absolute inset-8 bg-teen-pink/25 rounded-blob animate-wiggle"></div>
                
                {/* Floating emojis */}
                <div className="absolute top-10 right-10 text-6xl animate-float">
                  {floatingEmojis[currentEmoji]}
                </div>
                <div className="absolute bottom-20 left-10 text-5xl animate-bounce">👩‍🎓</div>
                <div className="absolute top-1/2 left-1/4 text-4xl animate-wiggle">⚖️</div>
                <div className="absolute bottom-1/3 right-1/4 text-5xl animate-float">🧑‍🎓</div>
                
                {/* Constitution book mockup */}
                <div className="absolute bottom-10 right-10 bg-white p-4 rounded-2xl shadow-xl transform rotate-12 hover:rotate-6 transition-all duration-300 border-4 border-teen-blue/20">
                  <div className="w-28 h-36 bg-teen-blue rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <div className="text-white font-display font-bold text-sm leading-tight">
                        TEENS<br/>GUIDE<br/>
                        <span className="text-teen-yellow">CONSTITUTION</span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-teen-yellow rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Floating achievement badges */}
                <div className="absolute top-1/4 left-1/3 bg-white p-3 rounded-full shadow-lg animate-bounce border-4 border-teen-green/30">
                  <Star size={24} className="text-teen-green" />
                </div>
                <div className="absolute top-3/4 left-1/4 bg-white p-3 rounded-full shadow-lg animate-float border-4 border-teen-purple/30">
                  <Heart size={24} className="text-teen-purple" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Young Citizens Program Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-teen-blue/5 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-teen-pink/5 rounded-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-teen-green/10 text-teen-green px-6 py-3 rounded-full font-display font-bold">
              <span className="text-xl animate-pulse">📚</span>
              <span>Featured Program</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-bold space-y-2">
              <div className="text-teen-blue">YOUNG CITIZENS</div>
              <div className="text-teen-pink">PROGRAM</div>
            </h2>
            
            <p className="text-xl text-gray-600 font-heading max-w-3xl mx-auto">
              <span className="text-teen-orange font-bold">Shaping Our Future</span> Through Constitutional Education
            </p>
          </div>

          {/* Learning Paths Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            
            {/* Self-Paced Learning */}
            <div className="card bg-white hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group border-t-4 border-teen-yellow">
              <div className="w-20 h-20 bg-teen-yellow rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-lg">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">Self-Paced Learning</h3>
              <p className="text-gray-600 mb-6 font-heading">6 weeks of flexible learning at your own pace with interactive modules and resources.</p>
              
              <div className="bg-teen-yellow/20 rounded-full px-4 py-2 text-teen-yellow font-display font-bold text-sm inline-block mb-4">
                6 WEEKS • FREE 🎉
              </div>
              
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {['Interactive modules', 'Audio & video content', 'Digital certificate'].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-teen-green" />
                    <span className="font-heading">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-teen-yellow text-gray-800 py-3 rounded-2xl font-display font-bold hover:bg-teen-orange hover:text-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Start Now</span>
                <span className="text-lg">📖</span>
              </button>
            </div>

            {/* Online Classes */}
            <div className="card bg-white hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group border-t-4 border-teen-blue relative">
              
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-teen-pink text-white px-6 py-2 rounded-full font-display font-bold text-sm animate-bounce">
                ⭐ Most Popular
              </div>
              
              <div className="w-20 h-20 bg-teen-blue rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-lg">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">Online Classes</h3>
              <p className="text-gray-600 mb-6 font-heading">8 weeks of guided online sessions with peers and expert facilitators.</p>
              
              <div className="bg-teen-blue/20 rounded-full px-4 py-2 text-teen-blue font-display font-bold text-sm inline-block mb-4">
                8 WEEKS • KSH 2,500
              </div>
              
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {['Live sessions', 'Peer discussions', 'Expert mentorship'].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-teen-green" />
                    <span className="font-heading">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-teen-blue text-white py-3 rounded-2xl font-display font-bold hover:bg-teen-purple hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Join Class</span>
                <span className="text-lg">👥</span>
              </button>
            </div>

            {/* Physical Classes */}
            <div className="card bg-white hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group border-t-4 border-teen-pink">
              <div className="w-20 h-20 bg-teen-pink rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle shadow-lg">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">Physical Classes</h3>
              <p className="text-gray-600 mb-6 font-heading">12 weeks of in-person sessions with hands-on activities and community engagement.</p>
              
              <div className="bg-teen-pink/20 rounded-full px-4 py-2 text-teen-pink font-display font-bold text-sm inline-block mb-4">
                12 WEEKS • KSH 4,000
              </div>
              
              <ul className="space-y-3 text-sm text-gray-600 mb-6">
                {['Hands-on activities', 'Community visits', 'Industry exposure'].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle size={16} className="text-teen-green" />
                    <span className="font-heading">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-teen-pink text-white py-3 rounded-2xl font-display font-bold hover:bg-teen-purple hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Book Spot</span>
                <span className="text-lg">🎯</span>
              </button>
            </div>
          </div>

          {/* What You'll Learn - Colorful Grid */}
          <div className="card bg-gradient-to-br from-gray-50 to-blue-50 border-4 border-teen-blue/20">
            <h3 className="text-3xl font-display font-bold text-center mb-12">
              <span className="text-teen-blue">What You'll</span> 
              <span className="text-teen-pink"> Learn</span> 
              <span className="text-2xl">🧠</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '⚖️', title: 'Teens, the Law & Society', color: 'teen-yellow' },
                { icon: '🏛️', title: 'Citizenship & Development', color: 'teen-blue' },
                { icon: '👑', title: 'Leadership & Volunteerism', color: 'teen-pink' },
                { icon: '✊', title: 'Human Rights & Participation', color: 'teen-orange' },
                { icon: '🏢', title: 'Government & Public Service', color: 'teen-purple' },
                { icon: '🇰🇪', title: 'Constitution of Kenya', color: 'teen-green' },
              ].map((topic, index) => (
                <div key={index} className={`flex items-center space-x-4 p-4 bg-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-md border-l-4 border-${topic.color} group`}>
                  <div className={`w-12 h-12 bg-${topic.color} rounded-full flex items-center justify-center group-hover:animate-bounce`}>
                    <span className="text-xl">{topic.icon}</span>
                  </div>
                  <span className="font-heading font-bold text-gray-700 group-hover:text-gray-900">{topic.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teendom Awards Preview - Colorful Section */}
      <section className="py-20 bg-gradient-to-br from-teen-purple/10 via-teen-pink/10 to-teen-orange/10 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-teen-yellow/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-teen-blue/15 rounded-blob animate-float"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-teen-orange text-white px-6 py-3 rounded-full font-display font-bold animate-bounce">
              <span className="text-xl">🏆</span>
              <span>COMING DECEMBER 2025</span>
              <span className="text-xl">✨</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-bold space-y-2">
              <div className="text-teen-orange">TEENDOM</div>
              <div className="text-teen-purple">AWARDS</div>
            </h2>
            
            <p className="text-xl text-gray-600 font-heading max-w-3xl mx-auto">
              <span className="text-teen-pink font-bold">Celebrating Kenya's</span> Teen Changemakers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h3 className="text-3xl font-display font-bold text-gray-800 flex items-center space-x-3">
                <span>Why It Matters</span>
                <span className="text-2xl animate-bounce">🌟</span>
              </h3>
              
              <p className="text-lg text-gray-600 font-heading leading-relaxed">
                Teens are one of Kenya's largest demographic, yet their contributions often go unrecognized. 
                The Teendom Awards creates a platform to celebrate young changemakers and inspire others.
              </p>

              {/* Impact Points */}
              <div className="space-y-4">
                {[
                  { icon: Users, text: 'Recognize 100+ changemakers annually', color: 'teen-blue', emoji: '👥' },
                  { icon: Target, text: 'Reach 1M+ teens through digital platforms', color: 'teen-pink', emoji: '📱' },
                  { icon: Award, text: 'Strengthen youth-led community initiatives', color: 'teen-orange', emoji: '🎯' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className={`w-12 h-12 bg-${item.color} rounded-2xl flex items-center justify-center group-hover:animate-bounce shadow-lg`}>
                      <item.icon size={20} className="text-white" />
                    </div>
                    <span className="text-gray-700 font-heading font-semibold group-hover:text-gray-900">{item.text}</span>
                    <span className="text-xl group-hover:animate-wiggle">{item.emoji}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to="/awards"
                className="inline-flex items-center space-x-3 bg-teen-orange text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-red hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl animate-pulse">🌟</span>
                <span>Learn More</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* Right Side - Award Categories Display */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-teen-yellow/30">
                <div className="text-center space-y-6">
                  <div className="text-6xl animate-bounce">🏆</div>
                  <h4 className="text-2xl font-display font-bold text-gray-800">Award Categories</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      { name: 'Innovation', color: 'teen-blue', emoji: '💡' },
                      { name: 'Leadership', color: 'teen-purple', emoji: '👑' },
                      { name: 'Arts & Culture', color: 'teen-pink', emoji: '🎨' },
                      { name: 'Advocacy', color: 'teen-orange', emoji: '📢' },
                      { name: 'Environment', color: 'teen-green', emoji: '🌱' },
                      { name: 'Community Impact', color: 'teen-yellow', emoji: '🤝' }
                    ].map((category, index) => (
                      <div key={index} className={`bg-${category.color}/10 border-2 border-${category.color}/30 rounded-2xl px-3 py-2 hover:scale-110 transition-all duration-300 group cursor-pointer`}>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="group-hover:animate-bounce">{category.emoji}</span>
                          <span className={`text-${category.color} font-heading font-bold`}>{category.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="flex justify-center space-x-3 mt-6">
                    <div className="w-3 h-3 bg-teen-blue rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-teen-pink rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-teen-yellow rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Vibrant & Energetic */}
      <section className="py-20 bg-teen-blue relative overflow-hidden">
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-teen-yellow/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-teen-pink/20 rounded-blob animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teen-purple/10 rounded-full animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              Ready to Shape Kenya's Future?
              <div className="flex justify-center space-x-2 mt-4">
                <span className="text-3xl animate-bounce">🚀</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.1s'}}>🇰🇪</span>
                <span className="text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
              </div>
            </h2>
            
            {/* Description */}
            <p className="text-xl text-blue-100 font-heading leading-relaxed">
              Join thousands of young Kenyans who are learning about their rights, responsibilities, 
              and the power of active citizenship.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ycp"
                className="group bg-white text-teen-blue px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-yellow hover:text-gray-800 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span className="text-xl group-hover:animate-bounce">🚀</span>
                <span>Join Young Citizens Program</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                to="/awards"
                className="group border-4 border-white text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-white hover:text-teen-blue transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span className="text-xl group-hover:animate-bounce">🏆</span>
                <span>Nominate a Teen</span>
              </Link>
            </div>
            
            {/* Fun decorative elements */}
            <div className="flex justify-center space-x-6 mt-8">
              <div className="text-4xl animate-float">📚</div>
              <div className="text-4xl animate-bounce">🎓</div>
              <div className="text-4xl animate-wiggle">⚖️</div>
              <div className="text-4xl animate-float">🏆</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;