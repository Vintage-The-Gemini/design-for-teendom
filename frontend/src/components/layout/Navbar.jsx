// File: frontend/src/components/layout/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    { name: 'Young Citizens Program', path: '/ycp', emoji: '📚', color: 'primary-yellow' },
    { name: 'Teendom Awards', path: '/awards', emoji: '🏆', color: 'teen-red' },
    { name: 'About', path: '/about', emoji: '💫', color: 'teen-purple' },
    { name: 'Contact', path: '/contact', emoji: '📞', color: 'teen-pink' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-yellow-400' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-all duration-300 border-2 border-yellow-400 p-2">
                <div className="w-full h-full bg-yellow-400 rounded-xl flex items-center justify-center text-2xl font-black text-gray-900">
                  TA
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-3 hidden sm:block">
              <div className="font-display font-black text-xl text-blue-600">Teendom</div>
              <div className="font-display font-black text-sm text-orange-500 -mt-1">Africa</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-2xl font-display font-bold transition-all duration-300 flex items-center space-x-2 group ${
                  location.pathname === link.path 
                    ? 'bg-blue-500 text-white shadow-lg scale-105' 
                    : 'text-gray-700 hover:bg-yellow-200 hover:text-gray-800 hover:scale-105'
                }`}
              >
                <span className="text-lg group-hover:animate-bounce">
                  {link.emoji}
                </span>
                <span className="hidden xl:block text-sm">{link.name}</span>
                <span className="xl:hidden font-bold text-sm">
                  {link.name.split(' ')[0]}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Link
              to="/ycp"
              className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-display font-bold hover:bg-purple-600 hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <span className="text-lg">✨</span>
              <span>Join YCP</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-2xl transition-all duration-300 shadow-lg ${
              isOpen 
                ? 'bg-red-500 text-white rotate-180 scale-110' 
                : 'bg-blue-500 text-white hover:bg-purple-600 hover:scale-110'
            }`}
          >
            {isOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="bg-white rounded-3xl shadow-2xl mx-4 mb-6 p-6 border-4 border-yellow-400">
              <div className="space-y-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl font-display font-bold transition-all duration-300 group ${
                      location.pathname === link.path 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'hover:bg-yellow-100 hover:scale-105'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:animate-bounce">
                        {link.emoji}
                      </span>
                      <span>{link.name}</span>
                    </div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </Link>
                ))}
                
                <Link
                  to="/ycp"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-3 bg-blue-500 text-white p-4 rounded-2xl font-display font-bold text-center mt-6 hover:bg-purple-600 transition-all duration-300 shadow-lg"
                >
                  <span className="text-2xl">✨</span>
                  <span>Join Young Citizens Program</span>
                  <span className="text-xl">🚀</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;