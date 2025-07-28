// File: frontend/src/pages/Contact.jsx

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'info@teendom.africa',
      description: 'Send us a message anytime',
      color: 'secondary-blue',
      emoji: '📧'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+254 742 862 080',
      description: 'Mon-Fri, 9AM-5PM EAT',
      color: 'primary-yellow',
      emoji: '📱'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Nairobi, Kenya',
      description: 'Central Business District',
      color: 'neutral-pink',
      emoji: '📍'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: '💬 General Inquiry', color: 'secondary-blue' },
    { value: 'ycp', label: '📚 Young Citizens Program', color: 'support-purple' },
    { value: 'awards', label: '🏆 Teendom Awards', color: 'accent-red' },
    { value: 'partnership', label: '🤝 Partnership', color: 'primary-yellow' },
    { value: 'sponsorship', label: '💰 Sponsorship', color: 'neutral-pink' },
    { value: 'media', label: '📺 Media & Press', color: 'support-purple' }
  ];

  return (
    <div className="pt-20">
      
      {/* Hero Section - BOLD & COLORFUL */}
      <section className="py-20 lg:py-32 bg-neutral-pink-light relative overflow-hidden">
        
        {/* Bold floating decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-yellow rounded-full animate-float shadow-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary-blue rounded-blob animate-bounce shadow-2xl"></div>
        <div className="absolute top-60 left-60 w-24 h-24 bg-accent-red rounded-full animate-wiggle shadow-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            {/* Badge - BOLD */}
            <div className="inline-flex items-center space-x-3 bg-support-purple text-white px-8 py-4 rounded-full font-display font-bold animate-bounce shadow-2xl">
              <span className="text-2xl animate-pulse">📞</span>
              <span className="text-lg font-black">Get In Touch</span>
            </div>
            
            {/* Main Heading - SUPER BOLD */}
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-black text-secondary-blue">CONTACT</div>
              <div className="text-4xl lg:text-6xl font-display font-black text-gray-900">US</div>
            </h1>
            
            <p className="text-xl text-gray-900 font-heading max-w-3xl mx-auto leading-relaxed font-bold">
              Have questions about our programs? Want to partner with us? 
              <span className="text-white font-black bg-secondary-blue px-4 py-2 rounded-xl mx-2 shadow-lg">We'd love to hear from you!</span>
            </p>

            {/* Quick Stats - COLORFUL */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-secondary-blue text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-display font-black mb-1">24 Hours</div>
                <div className="font-heading font-bold text-sm">Response Time</div>
              </div>
              <div className="bg-primary-yellow text-gray-900 rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl">
                <div className="text-3xl mb-2">🤝</div>
                <div className="text-2xl font-display font-black mb-1">Always</div>
                <div className="font-heading font-bold text-sm">Here to Help</div>
              </div>
              <div className="bg-support-purple text-white rounded-3xl p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl">
                <div className="text-3xl mb-2">💬</div>
                <div className="text-2xl font-display font-black mb-1">Multiple</div>
                <div className="font-heading font-bold text-sm">Ways to Connect</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information - COLORFUL CARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-primary-yellow text-gray-900 px-8 py-4 rounded-full font-display font-bold shadow-xl animate-bounce">
              <span className="text-2xl animate-pulse">📱</span>
              <span className="text-lg font-black">How to Reach Us</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-black space-y-2">
              <div className="text-secondary-blue">MULTIPLE WAYS</div>
              <div className="text-accent-red">TO CONNECT</div>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-24 h-24 bg-${info.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle shadow-2xl`}>
                    <IconComponent size={40} className="text-white" />
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-4 group-hover:animate-bounce">{info.emoji}</div>
                    <h3 className="text-2xl font-display font-black text-gray-900 mb-3">{info.title}</h3>
                    <p className={`text-lg font-heading font-black text-${info.color} mb-2`}>{info.value}</p>
                    <p className="text-gray-700 font-heading font-bold">{info.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form - COLORFUL */}
      <section className="py-20 bg-secondary-blue-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              
              {/* Form */}
              <div className="p-8 lg:p-12">
                <h2 className="text-4xl font-display font-black mb-8">
                  <span className="text-secondary-blue">Send Us a</span>{' '}
                  <span className="text-neutral-pink">Message</span>
                  <span className="text-3xl ml-2 animate-bounce">💌</span>
                </h2>

                {isSubmitted && (
                  <div className="bg-primary-yellow/20 border-2 border-primary-yellow rounded-2xl p-4 mb-6 flex items-center space-x-3 shadow-lg">
                    <CheckCircle size={24} className="text-primary-yellow-dark" />
                    <span className="text-gray-800 font-heading font-black">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Inquiry Type - COLORFUL */}
                  <div>
                    <label className="block text-gray-900 font-display font-black mb-4 text-xl">What's this about? 🤔</label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => (
                        <label key={type.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={formData.type === type.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`p-3 rounded-2xl border-2 transition-all duration-300 text-sm font-heading font-bold shadow-lg ${
                            formData.type === type.value
                              ? `border-${type.color} bg-${type.color} text-white scale-105`
                              : `border-gray-300 hover:border-${type.color} hover:scale-105 bg-white`
                          }`}>
                            {type.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-gray-900 font-display font-black mb-2 text-lg">
                      Your Name 👤
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-300 font-heading font-bold shadow-lg"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-900 font-display font-black mb-2 text-lg">
                      Email Address 📧
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-300 font-heading font-bold shadow-lg"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-gray-900 font-display font-black mb-2 text-lg">
                      Subject 📝
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-300 font-heading font-bold shadow-lg"
                      placeholder="Brief subject line"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-gray-900 font-display font-black mb-2 text-lg">
                      Message 💬
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-secondary-blue focus:ring-2 focus:ring-secondary-blue/20 transition-all duration-300 resize-none font-heading font-bold shadow-lg"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button - BOLD */}
                  <button
                    type="submit"
                    className="w-full bg-secondary-blue text-white px-8 py-5 rounded-2xl font-display font-black text-xl hover:bg-support-purple hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl"
                  >
                    <Send size={24} />
                    <span>Send Message</span>
                    <span className="text-2xl animate-bounce">🚀</span>
                  </button>
                </form>
              </div>

              {/* Contact Info Side - COLORFUL */}
              <div className="bg-secondary-blue p-8 lg:p-12 text-white relative overflow-hidden">
                
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-blob animate-float"></div>
                
                <div className="relative z-10 space-y-8">
                  <h3 className="text-3xl font-display font-black flex items-center space-x-3">
                    <span>Get in Touch</span>
                    <span className="text-3xl animate-bounce">📞</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                      <h4 className="font-display font-black mb-2 flex items-center space-x-2 text-lg">
                        <span>📧</span>
                        <span>Email</span>
                      </h4>
                      <p className="text-blue-100 font-heading font-bold">info@teendom.africa</p>
                    </div>
                    
                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                      <h4 className="font-display font-black mb-2 flex items-center space-x-2 text-lg">
                        <span>📱</span>
                        <span>Phone</span>
                      </h4>
                      <p className="text-blue-100 font-heading font-bold">+254 742 862 080</p>
                    </div>
                    
                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                      <h4 className="font-display font-black mb-2 flex items-center space-x-2 text-lg">
                        <span>📍</span>
                        <span>Location</span>
                      </h4>
                      <p className="text-blue-100 font-heading font-bold">Nairobi, Kenya</p>
                    </div>
                    
                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                      <h4 className="font-display font-black mb-2 flex items-center space-x-2 text-lg">
                        <span>⏰</span>
                        <span>Office Hours</span>
                      </h4>
                      <p className="text-blue-100 font-heading font-bold">Monday - Friday<br/>9:00 AM - 5:00 PM EAT</p>
                    </div>
                  </div>

                  <div className="bg-primary-yellow text-gray-900 rounded-2xl p-6 shadow-xl">
                    <h4 className="font-display font-black mb-3 flex items-center space-x-2 text-lg">
                      <span>🚀</span>
                      <span>Quick Response</span>
                    </h4>
                    <p className="font-heading font-bold">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - COLORFUL */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-accent-red text-white px-8 py-4 rounded-full font-display font-bold shadow-xl animate-bounce">
              <span className="text-2xl animate-pulse">❓</span>
              <span className="text-lg font-black">Frequently Asked Questions</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-display font-black space-y-2">
              <div className="text-support-purple">QUICK</div>
              <div className="text-primary-yellow">ANSWERS</div>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How can I join the Young Citizens Program?',
                answer: 'You can join through our website by selecting your preferred learning format: self-paced, online classes, or physical classes. Registration is simple and we provide all necessary materials.',
                color: 'secondary-blue',
                emoji: '🎓'
              },
              {
                question: 'What are the program fees?',
                answer: 'Self-paced learning is KSH 3,500, online classes are KSH 10,000, and physical classes are KSH 18,000. We offer payment plans and sponsorships for students who need financial assistance.',
                color: 'primary-yellow',
                emoji: '💰'
              },
              {
                question: 'When will nominations for Teendom Awards open?',
                answer: 'Nominations for the first Teendom Awards will open in August 2025. Follow our social media or subscribe to our newsletter to get notified when nominations go live.',
                color: 'accent-red',
                emoji: '🏆'
              },
              {
                question: 'Can schools partner with Teendom Africa?',
                answer: 'Absolutely! We actively seek partnerships with schools to bring constitutional education directly to students. Contact us to discuss how we can work together.',
                color: 'neutral-pink',
                emoji: '🤝'
              },
              {
                question: 'Do you offer the program outside Nairobi?',
                answer: 'Currently we focus on Nairobi County, but our 2025 expansion plans include neighboring counties. Our online programs are available to anyone in Kenya with internet access.',
                color: 'support-purple',
                emoji: '🌍'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-${faq.color} rounded-2xl flex items-center justify-center text-2xl shadow-xl group-hover:animate-bounce`}>
                    {faq.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-black text-gray-900 mb-4 group-hover:text-gray-700">{faq.question}</h3>
                    <p className="text-gray-800 font-heading font-bold">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA - BRIGHT */}
      <section className="py-20 bg-primary-yellow relative overflow-hidden">
        
        {/* Bold decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-accent-red rounded-full animate-pulse shadow-2xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-secondary-blue rounded-blob animate-float shadow-2xl"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            
            <h2 className="text-5xl lg:text-6xl font-display font-black text-gray-900 leading-tight">
              Ready to Connect?
              <div className="flex justify-center space-x-4 mt-6">
                <span className="text-4xl animate-bounce">📞</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.1s'}}>💬</span>
                <span className="text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🤝</span>
              </div>
            </h2>
            
            <p className="text-2xl text-gray-900 font-heading leading-relaxed font-bold">
              We're here to help answer your questions and support your journey. 
              <span className="font-black bg-gray-900 text-primary-yellow px-3 py-1 rounded-lg">Let's chat!</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-secondary-blue text-white px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-support-purple hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl">
                <span className="text-3xl group-hover:animate-bounce">📧</span>
                <span>Send Email</span>
              </button>
              <button className="group bg-gray-900 text-primary-yellow px-12 py-6 rounded-2xl font-display font-black text-xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl">
                <span className="text-3xl group-hover:animate-bounce">📱</span>
                <span>Call Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;