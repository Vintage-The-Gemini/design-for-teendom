import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Target, CheckCircle } from 'lucide-react';

const Home = () => {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-teen-yellow rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teen-pink rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-teen-blue rounded-full opacity-10 animate-float"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block bg-gradient-to-r from-teen-pink to-teen-purple text-white px-6 py-2 rounded-full font-bold mb-6 animate-bounce">
                🇰🇪 Empowering Kenyan Youth
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6 leading-tight">
                <span className="gradient-text">NURTURING</span><br/>
                <span className="text-gray-800">THE NEXT</span><br/>
                <span className="gradient-text">GENERATION</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Empowering young people to develop into a community of 
                <span className="font-semibold text-teen-blue"> informed and active citizens </span>
                through constitutional education and mentorship.
              </p>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all">
                  <div className={`text-2xl font-bold text-teen-blue transition-all duration-1000 ${animateStats ? 'opacity-100' : 'opacity-0'}`}>
                    2,500+
                  </div>
                  <div className="text-xs text-gray-600">Young People Reached</div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all">
                  <div className={`text-2xl font-bold text-teen-pink transition-all duration-1000 delay-200 ${animateStats ? 'opacity-100' : 'opacity-0'}`}>
                    1,500+
                  </div>
                  <div className="text-xs text-gray-600">Constitution Guides</div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-all">
                  <div className={`text-2xl font-bold text-teen-orange transition-all duration-1000 delay-400 ${animateStats ? 'opacity-100' : 'opacity-0'}`}>
                    10+
                  </div>
                  <div className="text-xs text-gray-600">Schools Engaged</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ycp"
                  className="bg-gradient-to-r from-teen-blue to-teen-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <span>🚀 Start Learning</span>
                  <ArrowRight size={20} />
                </Link>
                <button className="border-2 border-teen-pink text-teen-pink px-8 py-4 rounded-full font-bold text-lg hover:bg-teen-pink hover:text-white transition-all flex items-center justify-center space-x-2">
                  <BookOpen size={20} />
                  <span>Download Guide</span>
                </button>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Large central blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-teen-yellow via-teen-orange to-teen-pink blob-shape opacity-80 animate-pulse"></div>
                
                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-teen-blue rounded-full animate-float opacity-70"></div>
                <div className="absolute bottom-20 left-10 w-16 h-16 bg-teen-green rounded-full animate-bounce opacity-80"></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-teen-purple rounded-full animate-wiggle opacity-60"></div>
                
                {/* Constitution book mockup */}
                <div className="absolute bottom-10 right-10 bg-white p-4 rounded-lg shadow-xl transform rotate-12 hover:rotate-6 transition-all">
                  <div className="w-24 h-32 bg-gradient-to-b from-teen-blue to-teen-purple rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs text-center">TEENS<br/>GUIDE<br/>CONSTITUTION</span>
                  </div>
                </div>

                {/* Emojis representing young people */}
                <div className="absolute top-1/4 left-1/3 text-6xl animate-float">🧑‍🎓</div>
                <div className="absolute bottom-1/3 right-1/4 text-5xl animate-bounce">👩‍🎓</div>
                <div className="absolute top-1/2 right-1/2 text-4xl animate-wiggle">⚖️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Young Citizens Program Section */}
      <section className="py-20 bg-gradient-to-r from-teen-blue/10 to-teen-purple/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold font-display gradient-text mb-6">
              YOUNG CITIZENS PROGRAM
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Shaping Our Future Through Constitutional Education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Self-Paced Learning */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-teen-yellow to-teen-orange rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-800 mb-4">Self-Paced Learning</h3>
              <p className="text-gray-600 mb-6">6 weeks of flexible learning at your own pace with interactive modules and resources.</p>
              <div className="bg-teen-yellow/20 rounded-full px-4 py-2 text-teen-yellow font-bold text-sm inline-block mb-4">
                6 WEEKS
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Interactive modules</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Audio & video content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Digital certificate</span>
                </li>
              </ul>
            </div>

            {/* Online Classes */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-teen-blue to-teen-purple rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-800 mb-4">Online Classes</h3>
              <p className="text-gray-600 mb-6">8 weeks of guided online sessions with peers and expert facilitators.</p>
              <div className="bg-teen-blue/20 rounded-full px-4 py-2 text-teen-blue font-bold text-sm inline-block mb-4">
                8 WEEKS
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Live sessions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Peer discussions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Expert mentorship</span>
                </li>
              </ul>
            </div>

            {/* Physical Classes */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-teen-pink to-teen-purple rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold font-display text-gray-800 mb-4">Physical Classes</h3>
              <p className="text-gray-600 mb-6">12 weeks of in-person sessions with hands-on activities and community engagement.</p>
              <div className="bg-teen-pink/20 rounded-full px-4 py-2 text-teen-pink font-bold text-sm inline-block mb-4">
                12 WEEKS
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Hands-on activities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Community visits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-teen-green" />
                  <span>Industry exposure</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <h3 className="text-3xl font-bold font-display text-center mb-12 gradient-text">What You'll Learn</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '⚖️', title: 'Teens, the Law & Society', color: 'teen-yellow' },
                { icon: '🏛️', title: 'Citizenship & Development', color: 'teen-blue' },
                { icon: '👑', title: 'Leadership & Volunteerism', color: 'teen-pink' },
                { icon: '✊', title: 'Human Rights & Participation', color: 'teen-orange' },
                { icon: '🏢', title: 'Government & Public Service', color: 'teen-purple' },
                { icon: '🇰🇪', title: 'Constitution of Kenya', color: 'teen-green' },
              ].map((topic, index) => (
                <div key={index} className={`flex items-center space-x-4 p-4 bg-${topic.color}/10 rounded-2xl hover:scale-105 transition-all`}>
                  <div className={`w-12 h-12 bg-${topic.color} rounded-full flex items-center justify-center`}>
                    <span className="text-xl">{topic.icon}</span>
                  </div>
                  <span className="font-semibold text-gray-700">{topic.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teendom Awards Preview */}
      <section className="py-20 bg-gradient-to-br from-teen-purple/20 via-teen-pink/10 to-teen-orange/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-teen-yellow to-teen-orange text-white px-6 py-2 rounded-full font-bold mb-6 animate-bounce">
              🏆 COMING DECEMBER 2025
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold font-display gradient-text mb-6">
              TEENDOM AWARDS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating Kenya's Teen Changemakers
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold font-display text-gray-800 mb-6">Why It Matters</h3>
              <p className="text-lg text-gray-600 mb-8">
                Teens are one of Kenya's largest demographic, yet their contributions often go unrecognized. 
                The Teendom Awards creates a platform to celebrate young changemakers and inspire others.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Users, text: 'Recognize 100+ changemakers annually', color: 'teen-blue' },
                  { icon: Target, text: 'Reach 1M+ teens through digital platforms', color: 'teen-pink' },
                  { icon: Award, text: 'Strengthen youth-led community initiatives', color: 'teen-orange' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 bg-${item.color} rounded-full flex items-center justify-center`}>
                      <item.icon size={16} className="text-white" />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/awards"
                className="bg-gradient-to-r from-teen-yellow to-teen-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all inline-flex items-center space-x-2"
              >
                <span>🌟 Learn More</span>
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-teen-yellow via-teen-orange to-teen-pink rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h4 className="text-2xl font-bold font-display mb-4">Award Categories</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {['Innovation', 'Leadership', 'Arts & Culture', 'Advocacy', 'Environment', 'Community Impact'].map((category, index) => (
                      <div key={index} className="bg-white/20 rounded-full px-3 py-2 backdrop-blur-sm">
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-teen-blue to-teen-purple">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-white mb-6">
            Ready to Shape Kenya's Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of young Kenyans who are learning about their rights, responsibilities, and the power of active citizenship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ycp"
              className="bg-white text-teen-blue px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>🚀 Join Young Citizens Program</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/awards"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-teen-blue transition-all inline-flex items-center justify-center space-x-2"
            >
              <span>🏆 Nominate a Teen</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;