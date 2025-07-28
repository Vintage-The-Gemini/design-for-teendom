// File: src/components/layout/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    { name: 'Home', path: '/' },
    { name: 'Young Citizens Program', path: '/ycp' },
    { name: 'Teendom Awards', path: '/awards' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-teen-yellow to-teen-orange rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold font-display gradient-text">
              Teendom Africa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 hover:text-teen-blue transition-colors font-medium ${
                  location.pathname === link.path ? 'text-teen-blue font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/ycp"
            className="hidden lg:block bg-gradient-to-r from-teen-pink to-teen-purple text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Join YCP 🚀
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-teen-blue transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl mx-4 mb-4 p-6">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-gray-700 hover:text-teen-blue transition-colors font-medium py-2 ${
                    location.pathname === link.path ? 'text-teen-blue font-semibold' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/ycp"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-teen-pink to-teen-purple text-white px-6 py-3 rounded-full font-bold text-center mt-4"
              >
                Join YCP 🚀
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;