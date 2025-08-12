// File: src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-20 border-t border-red-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div 
                className="text-6xl font-black text-red-500"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                TEENDOM
              </div>
              <p className="text-2xl text-white font-bold">
                Empowering the next generation of Kenyan citizens
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: '📘', color: 'bg-blue-500 hover:bg-blue-400' },
                { icon: '📸', color: 'bg-pink-500 hover:bg-pink-400' },
                { icon: '🐦', color: 'bg-blue-400 hover:bg-blue-300' },
                { icon: '💼', color: 'bg-blue-700 hover:bg-blue-600' }
              ].map((social, index) => (
                <button 
                  key={index}
                  className={`w-12 h-12 ${social.color} flex items-center justify-center transition-all text-xl`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="bg-red-500 p-4 text-center">
                <div className="text-3xl font-black text-white">2,500+</div>
                <div className="text-sm text-white font-bold">STUDENTS</div>
              </div>
              <div className="bg-purple-500 p-4 text-center">
                <div className="text-3xl font-black text-white">1,500+</div>
                <div className="text-sm text-white font-bold">GUIDES</div>
              </div>
              <div className="bg-blue-500 p-4 text-center">
                <div className="text-3xl font-black text-white">10+</div>
                <div className="text-sm text-white font-bold">SCHOOLS</div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-2xl font-black text-white">Quick Links</h4>
            <ul className="space-y-4">
              {[
                'Young Citizens Program',
                'Online Classes', 
                'Physical Classes',
                'Teen Facilitators',
                'Teendom Awards'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors font-bold text-lg">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-2xl font-black text-white">Contact</h4>
            
            <div className="space-y-4">
              <div className="bg-red-500 p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📧</div>
                  <div>
                    <div className="text-sm text-white font-bold opacity-80">Email</div>
                    <div className="text-white font-black text-lg">info@teendom.africa</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-500 p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📱</div>
                  <div>
                    <div className="text-sm text-white font-bold opacity-80">Phone</div>
                    <div className="text-white font-black text-lg">+254 742 862 080</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-500 p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <div className="text-sm text-white font-bold opacity-80">Location</div>
                    <div className="text-white font-black text-lg">Nairobi, Kenya</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-red-500 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-white font-bold text-lg">&copy; 2025 Teendom Africa.</p>
              <span className="text-red-500 font-black text-xl">CHANGING THE GAME</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="text-white hover:text-red-500 transition-colors font-bold">Privacy</a>
              <a href="#" className="text-white hover:text-red-500 transition-colors font-bold">Terms</a>
              <div className="flex items-center space-x-3 bg-green-500 px-4 py-2">
                <span className="text-3xl">🇰🇪</span>
                <span className="text-white font-black">MADE IN KENYA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;