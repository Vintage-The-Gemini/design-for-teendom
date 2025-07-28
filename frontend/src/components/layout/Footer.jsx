// File: frontend/src/components/layout/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, Star } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, color: 'teen-blue', hover: 'hover:bg-blue-600' },
    { icon: Instagram, color: 'teen-pink', hover: 'hover:bg-pink-600' },
    { icon: Twitter, color: 'teen-cyan', hover: 'hover:bg-cyan-600' },
    { icon: Linkedin, color: 'teen-purple', hover: 'hover:bg-purple-600' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-teen-yellow/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-teen-pink/10 rounded-blob animate-float"></div>
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-teen-blue/10 rounded-full animate-bounce"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand Section - Your Logo! */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:animate-wiggle border-2 border-teen-yellow/30 p-1">
                <img 
                  src="/logo.png" 
                  alt="Teendom Africa Logo" 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback emoji if logo fails to load */}
                <div className="w-full h-full bg-teen-yellow rounded-xl flex items-center justify-center text-xl" style={{display: 'none'}}>
                  🇰🇪
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-teen-yellow">Teendom</span>
                <span className="text-sm font-heading font-bold text-teen-orange -mt-1">Africa</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm font-heading leading-relaxed">
              Empowering young people to develop into informed and active citizens through 
              constitutional education and mentorship. 
              <span className="text-teen-pink">✨ Shaping Kenya's Future Together! ✨</span>
            </p>
            
            {/* Social Media Links - Colorful */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={index}
                    href="#" 
                    className={`w-12 h-12 bg-${social.color} rounded-full flex items-center justify-center ${social.hover} transform hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <IconComponent size={18} className="text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Programs Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-bold text-teen-yellow flex items-center space-x-2">
              <span>📚 Programs</span>
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                { name: 'Young Citizens Program', path: '/ycp', emoji: '🎓' },
                { name: 'Self-Paced Learning', path: '#', emoji: '📖' },
                { name: 'Online Classes', path: '#', emoji: '💻' },
                { name: 'Physical Classes', path: '#', emoji: '🏫' },
                { name: 'Teen Facilitators', path: '#', emoji: '👨‍🏫' },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="hover:text-teen-yellow transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="group-hover:animate-bounce">{item.emoji}</span>
                    <span className="font-heading">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Awards Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-bold text-teen-pink flex items-center space-x-2">
              <span>🏆 Awards</span>
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              {[
                { name: 'Teendom Awards', path: '/awards', emoji: '🏆' },
                { name: 'Nominate a Teen', path: '#', emoji: '⭐' },
                { name: 'Award Categories', path: '#', emoji: '📋' },
                { name: 'Past Winners', path: '#', emoji: '👑' },
                { name: 'Become a Judge', path: '#', emoji: '⚖️' },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="hover:text-teen-pink transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="group-hover:animate-bounce">{item.emoji}</span>
                    <span className="font-heading">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-bold text-teen-orange flex items-center space-x-2">
              <span>📞 Contact</span>
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-teen-blue rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <Mail size={14} className="text-white" />
                </div>
                <span className="font-heading">info@teendom.africa</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-teen-green rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <Phone size={14} className="text-white" />
                </div>
                <span className="font-heading">+254 742 862 080</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-teen-pink rounded-full flex items-center justify-center group-hover:animate-bounce">
                  <MapPin size={14} className="text-white" />
                </div>
                <span className="font-heading">Nairobi, Kenya</span>
              </div>
            </div>
            
            {/* Newsletter Signup - Colorful */}
            <div className="space-y-3">
              <h5 className="font-display font-bold text-teen-purple flex items-center space-x-2">
                <span>📬 Stay Updated</span>
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 text-gray-900 rounded-l-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teen-purple font-heading"
                />
                <button className="bg-teen-purple hover:bg-teen-pink px-6 py-3 rounded-r-2xl transition-all duration-300 hover:scale-105 shadow-lg">
                  <span className="text-lg animate-pulse">✨</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Fun & Colorful */}
        <div className="border-t-2 border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <p className="text-gray-300 text-sm font-heading flex items-center space-x-2">
              <span>&copy; 2025 Teendom Africa. All rights reserved.</span>
              <Heart size={16} className="text-teen-pink animate-pulse" />
              <span className="text-teen-yellow font-bold">Shaping Our Future Together</span>
              <span className="text-lg animate-bounce">🇰🇪</span>
            </p>
            
            {/* Footer Links */}
            <div className="flex space-x-6 text-gray-300 text-sm">
              {[
                { name: 'Privacy Policy', emoji: '🔒' },
                { name: 'Terms of Service', emoji: '📄' },
                { name: 'Sitemap', emoji: '🗺️' }
              ].map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="hover:text-teen-yellow transition-colors duration-300 flex items-center space-x-1 group"
                >
                  <span className="group-hover:animate-bounce">{link.emoji}</span>
                  <span className="font-heading">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Fun Bottom Decoration */}
          <div className="flex justify-center space-x-4 mt-8">
            <div className="w-2 h-2 bg-teen-blue rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-teen-pink rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-teen-yellow rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-teen-green rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
            <div className="w-2 h-2 bg-teen-orange rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;