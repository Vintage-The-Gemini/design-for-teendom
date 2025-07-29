// File: frontend/src/components/layout/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, Send } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, name: 'Facebook' },
    { icon: Instagram, name: 'Instagram' },
    { icon: Twitter, name: 'Twitter' },
    { icon: Linkedin, name: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'Young Citizens Program', path: '/ycp' },
    { name: 'Self-Paced Learning', path: '#' },
    { name: 'Online Classes', path: '#' },
    { name: 'Physical Classes', path: '#' },
    { name: 'Teen Facilitators', path: '#' },
  ];

  const awardLinks = [
    { name: 'Teendom Awards', path: '/awards' },
    { name: 'Nominate a Teen', path: '#' },
    { name: 'Award Categories', path: '#' },
    { name: 'Past Winners', path: '#' },
    { name: 'Become a Judge', path: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500 rounded-full opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-3 transition-all duration-300 p-1">
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
                {/* Fallback if logo fails to load */}
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-display font-black text-sm" style={{display: 'none'}}>
                  TA
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-black text-yellow-400">Teendom</span>
                <span className="text-sm font-heading font-bold text-gray-300 -mt-1">Africa</span>
              </div>
            </div>
            
            <p className="text-gray-300 font-heading leading-relaxed">
              Empowering young people to develop into informed and active citizens through 
              constitutional education and mentorship.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 bg-gray-800 hover:bg-yellow-400 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg group"
                    title={social.name}
                  >
                    <IconComponent size={18} className="text-white group-hover:text-gray-900" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Programs Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-black text-yellow-400">
              Programs
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-heading font-medium hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Awards Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-black text-yellow-400">
              Awards
            </h4>
            <ul className="space-y-3">
              {awardLinks.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-heading font-medium hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-black text-yellow-400">
              Contact
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-yellow-400" />
                <span className="font-heading text-gray-300">info@teendom.africa</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-yellow-400" />
                <span className="font-heading text-gray-300">+254 742 862 080</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-yellow-400" />
                <span className="font-heading text-gray-300">Nairobi, Kenya</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h5 className="font-display font-bold text-gray-200">
                Stay Updated
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 text-gray-900 rounded-l-xl font-heading focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-3 rounded-r-xl transition-all duration-300 hover:scale-105 group">
                  <Send size={16} className="text-gray-900" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
              <p className="text-gray-400 font-heading flex items-center space-x-2">
                <span>&copy; 2025 Teendom Africa. All rights reserved.</span>
                <Heart size={16} className="text-yellow-400" />
              </p>
              <span className="text-yellow-400 font-display font-bold">Shaping Kenya's Future</span>
            </div>
            
            {/* Footer Links */}
            <div className="flex space-x-6">
              {[
                { name: 'Privacy Policy' },
                { name: 'Terms of Service' },
                { name: 'Sitemap' }
              ].map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 font-heading font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;