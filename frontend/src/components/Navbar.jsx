// File: src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/95 backdrop-blur-md border-b border-red-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="text-3xl font-black text-red-500 cursor-pointer"
            style={{fontFamily: 'Playfair Display, serif', letterSpacing: '-2px'}}
            onClick={() => setCurrentPage('home')}
          >
            TEENDOM
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`font-black text-lg tracking-wider transition-all ${
                currentPage === 'home' 
                  ? 'text-red-500 border-b-2 border-red-500 pb-1' 
                  : 'text-white hover:text-red-500'
              }`}
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              HOME
            </button>
            <button 
              onClick={() => setCurrentPage('ycp')}
              className={`font-black text-lg tracking-wider transition-all ${
                currentPage === 'ycp' 
                  ? 'text-red-500 border-b-2 border-red-500 pb-1' 
                  : 'text-white hover:text-red-500'
              }`}
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              YOUNG CITIZENS
            </button>
            <button 
              onClick={() => setCurrentPage('awards')}
              className={`font-black text-lg tracking-wider transition-all ${
                currentPage === 'awards' 
                  ? 'text-red-500 border-b-2 border-red-500 pb-1' 
                  : 'text-white hover:text-red-500'
              }`}
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              AWARDS
            </button>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 bg-red-500 rounded-sm flex items-center justify-center hover:bg-red-600 transition-all">
              <User className="w-5 h-5 text-white" />
            </button>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-red-500">
          <div className="px-6 py-4 space-y-4">
            <button 
              onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} 
              className="block text-white font-black py-2 w-full text-left text-xl"
            >
              HOME
            </button>
            <button 
              onClick={() => { setCurrentPage('ycp'); setIsMenuOpen(false); }} 
              className="block text-white font-black py-2 w-full text-left text-xl"
            >
              YOUNG CITIZENS
            </button>
            <button 
              onClick={() => { setCurrentPage('awards'); setIsMenuOpen(false); }} 
              className="block text-white font-black py-2 w-full text-left text-xl"
            >
              AWARDS
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;