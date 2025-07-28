// File: frontend/src/components/layout/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Star } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', emoji: '🏠', color: 'teen-blue' },
    { name: 'Young Citizens Program', path: '/ycp', emoji: '📚', color: 'teen-green' },
    { name: 'Teendom Awards', path: '/awards', emoji: '🏆', color: 'teen-orange' },
    { name: 'About', path: '/about', emoji: '💫', color: 'teen-purple' },
    { name: 'Contact', path: '/contact', emoji: '📞', color: 'teen-pink' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-teen-yellow/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo - Your Actual Logo! */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo Image Container */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-all duration-300 border-2 border-teen-yellow/30 p-1">
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
                <div className="w-full h-full bg-teen-yellow rounded-xl flex items-center justify-center text-2xl animate-bounce" style={{display: 'none'}}>
                  🇰🇪
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-teen-pink rounded-full animate-pulse flex items-center justify-center">
                <Star size={12} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-teen-blue rounded-full animate-bounce"></div>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold text-teen-blue group-hover:text-teen-purple transition-colors duration-300">
                Teendom
              </span>
              <span className="text-sm font-heading font-bold text-teen-orange -mt-2 group-hover:text-teen-pink transition-colors duration-300">
                Africa ✨
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Colorful Pill Links */}
          <div className="hidden lg:flex space-x-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-3 rounded-2xl font-heading font-bold transition-all duration-300 flex items-center space-x-2 group relative overflow-hidden ${
                  location.pathname === link.path 
                    ? `bg-${link.color} text-white shadow-lg scale-105` 
                    : 'text-gray-700 hover:bg-teen-yellow/20 hover:text-gray-800 hover:scale-105 hover:shadow-md'
                }`}
              >
                <span className="text-lg group-hover:animate-bounce transition-all duration-300">
                  {link.emoji}
                </span>
                <span className="hidden xl:block">{link.name}</span>
                <span className="xl:hidden font-bold">
                  {link.name.split(' ')[0]}
                </span>
                
                {/* Hover effect background */}
                <div className={`absolute inset-0 bg-${link.color}/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300 -z-10`}></div>
              </Link>
            ))}
          </div>

          {/* CTA Button - Rainbow Fun! */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/ycp"
              className="relative bg-teen-pink text-white px-6 py-3 rounded-2xl font-display font-bold hover:bg-teen-purple hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg group overflow-hidden"
            >
              <Sparkles size={20} className="animate-pulse" />
              <span>Join YCP</span>
              
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-teen-purple to-teen-blue scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl -z-10"></div>
            </Link>
          </div>

          {/* Mobile menu button - Fun Animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-2xl transition-all duration-300 shadow-lg ${
              isOpen 
                ? 'bg-teen-red text-white rotate-180 scale-110' 
                : 'bg-teen-blue text-white hover:bg-teen-purple hover:scale-110'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Super Fun Dropdown! */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="bg-white rounded-3xl shadow-2xl mx-4 mb-6 p-6 border-4 border-teen-yellow/30 animate-slide-down">
              <div className="space-y-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl font-heading font-bold transition-all duration-300 group ${
                      location.pathname === link.path 
                        ? `bg-${link.color} text-white shadow-lg` 
                        : 'hover:bg-teen-yellow/20 hover:scale-105 hover:shadow-md'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:animate-bounce">
                        {link.emoji}
                      </span>
                      <span>{link.name}</span>
                    </div>
                    <div className={`w-3 h-3 bg-${link.color} rounded-full group-hover:animate-pulse`}></div>
                  </Link>
                ))}
                
                {/* Mobile CTA */}
                <Link
                  to="/ycp"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-3 bg-teen-pink text-white p-4 rounded-2xl font-display font-bold text-center mt-6 hover:bg-teen-purple transition-all duration-300 shadow-lg"
                >
                  <Sparkles size={20} className="animate-pulse" />
                  <span>Join Young Citizens Program</span>
                  <span className="text-xl">🚀</span>
                </Link>
              </div>
              
              {/* Fun decorative elements */}
              <div className="flex justify-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-teen-blue rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teen-pink rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-teen-yellow rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-teen-green rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;