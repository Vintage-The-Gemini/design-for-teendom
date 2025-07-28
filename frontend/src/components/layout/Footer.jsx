import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teen-yellow to-teen-orange rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold font-display">Teendom Africa</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              Empowering young people to develop into informed and active citizens through constitutional education and mentorship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-teen-blue rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-teen-pink rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-teen-purple rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-teen-orange rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-teen-yellow">Programs</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/ycp" className="hover:text-white transition-colors">Young Citizens Program</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Self-Paced Learning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Online Classes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Physical Classes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Teen Facilitators</a></li>
            </ul>
          </div>

          {/* Awards */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-teen-pink">Awards</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/awards" className="hover:text-white transition-colors">Teendom Awards</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Nominate a Teen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Award Categories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Past Winners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Judge</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-teen-orange">Contact</h4>
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-teen-blue" />
                <span>info@teendom.africa</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-teen-green" />
                <span>+254 742 862 080</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-teen-pink" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-teen-purple">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-gray-900 rounded-l-lg text-sm focus:outline-none"
                />
                <button className="bg-gradient-to-r from-teen-pink to-teen-purple px-4 py-2 rounded-r-lg hover:shadow-lg transition-all">
                  ✨
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Teendom Africa. All rights reserved. Shaping Our Future Together.
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;