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
      color: 'teen-blue',
      emoji: '📧'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+254 742 862 080',
      description: 'Mon-Fri, 9AM-5PM EAT',
      color: 'teen-green',
      emoji: '📱'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Nairobi, Kenya',
      description: 'Central Business District',
      color: 'teen-pink',
      emoji: '📍'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: '💬 General Inquiry', color: 'teen-blue' },
    { value: 'ycp', label: '📚 Young Citizens Program', color: 'teen-purple' },
    { value: 'awards', label: '🏆 Teendom Awards', color: 'teen-orange' },
    { value: 'partnership', label: '🤝 Partnership', color: 'teen-green' },
    { value: 'sponsorship', label: '💰 Sponsorship', color: 'teen-pink' },
    { value: 'media', label: '📺 Media & Press', color: 'teen-yellow' }
  ];

  return (
    <div className="pt-20">
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-blue/10 via-white to-teen-purple/10 relative overflow-hidden">
        
        <div className="absolute top-10 right-10 w-24 h-24 bg-teen-yellow/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-teen-pink/15 rounded-blob animate-bounce"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            
            <div className="inline-flex items-center space-x-3 bg-teen-pink text-white px-6 py-3 rounded-full font-display font-bold animate-bounce shadow-xl">
              <span className="text-xl animate-pulse">📞</span>
              <span>Get In Touch</span>
            </div>
            
            <h1 className="space-y-4">
              <div className="text-5xl lg:text-7xl font-display font-bold text-teen-blue">CONTACT</div>
              <div className="text-4xl lg:text-6xl font-display font-bold text-teen-pink">US</div>
            </h1>
            
            <p className="text-xl text-gray-600 font-heading max-w-3xl mx-auto leading-relaxed">
              Have questions about our programs? Want to partner with us? 
              We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-${info.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle shadow-lg`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <div className="text-3xl mb-4 group-hover:animate-bounce">{info.emoji}</div>
                  <h3 className="text-xl font-display font-bold text-gray-800 mb-2">{info.title}</h3>
                  <p className={`text-lg font-heading font-bold text-${info.color} mb-2`}>{info.value}</p>
                  <p className="text-gray-600 text-sm font-heading">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-teen-yellow/20">
            <div className="grid lg:grid-cols-2">
              
              {/* Form */}
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-display font-bold mb-8">
                  <span className="text-teen-blue">Send Us a</span>{' '}
                  <span className="text-teen-pink">Message</span>
                  <span className="text-2xl ml-2">💌</span>
                </h2>

                {isSubmitted && (
                  <div className="bg-teen-green/10 border-2 border-teen-green/30 rounded-2xl p-4 mb-6 flex items-center space-x-3">
                    <CheckCircle size={20} className="text-teen-green" />
                    <span className="text-teen-green font-heading font-bold">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-gray-700 font-display font-bold mb-3">What's this about?</label>
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
                          <div className={`p-3 rounded-2xl border-2 transition-all duration-300 text-sm font-heading font-semibold ${
                            formData.type === type.value
                              ? `border-${type.color} bg-${type.color}/10 scale-105`
                              : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                          }`}>
                            {type.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-display font-bold mb-2">
                      Your Name 👤
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue focus:ring-2 focus:ring-teen-blue/20 transition-all duration-300 font-heading"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-display font-bold mb-2">
                      Email Address 📧
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue focus:ring-2 focus:ring-teen-blue/20 transition-all duration-300 font-heading"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-display font-bold mb-2">
                      Subject 📝
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue focus:ring-2 focus:ring-teen-blue/20 transition-all duration-300 font-heading"
                      placeholder="Brief subject line"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-display font-bold mb-2">
                      Message 💬
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue focus:ring-2 focus:ring-teen-blue/20 transition-all duration-300 resize-none font-heading"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-teen-blue text-white px-8 py-4 rounded-2xl font-display font-bold text-lg hover:bg-teen-purple hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                    <span className="text-xl">🚀</span>
                  </button>
                </form>
              </div>

              {/* Contact Info Side */}
              <div className="bg-teen-blue p-8 lg:p-12 text-white relative overflow-hidden">
                
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-blob animate-float"></div>
                
                <div className="relative z-10 space-y-8">
                  <h3 className="text-2xl font-display font-bold flex items-center space-x-2">
                    <span>Get in Touch</span>
                    <span className="text-2xl animate-bounce">📞</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold mb-2 flex items-center space-x-2">
                        <span>📧</span>
                        <span>Email</span>
                      </h4>
                      <p className="text-blue-100 font-heading">info@teendom.africa</p>
                    </div>
                    
                    <div>
                      <h4 className="font-display font-bold mb-2 flex items-center space-x-2">
                        <span>📱</span>
                        <span>Phone</span>
                      </h4>
                      <p className="text-blue-100 font-heading">+254 742 862 080</p>
                    </div>
                    
                    <div>
                      <h4 className="font-display font-bold mb-2 flex items-center space-x-2">
                        <span>📍</span>
                        <span>Location</span>
                      </h4>
                      <p className="text-blue-100 font-heading">Nairobi, Kenya</p>
                    </div>
                    
                    <div>
                      <h4 className="font-display font-bold mb-2 flex items-center space-x-2">
                        <span>⏰</span>
                        <span>Office Hours</span>
                      </h4>
                      <p className="text-blue-100 font-heading">Monday - Friday<br/>9:00 AM - 5:00 PM EAT</p>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="font-display font-bold mb-3 flex items-center space-x-2">
                      <span>🚀</span>
                      <span>Quick Response</span>
                    </h4>
                    <p className="text-blue-100 text-sm font-heading">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl font-display font-bold">
              <span className="text-teen-purple">Frequently Asked</span>{' '}
              <span className="text-teen-orange">Questions</span>
              <span className="text-3xl ml-2">❓</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How can I join the Young Citizens Program?',
                answer: 'You can join through our website by selecting your preferred learning format: self-paced, online classes, or physical classes. Registration is simple and we provide all necessary materials.',
                color: 'teen-blue'
              },
              {
                question: 'Is the Young Citizens Program really free?',
                answer: 'Our self-paced learning option is completely free. Online and physical classes have nominal fees to cover facilitation costs, but we offer sponsorships for students who need financial assistance.',
                color: 'teen-green'
              },
              {
                question: 'When will nominations for Teendom Awards open?',
                answer: 'Nominations for the first Teendom Awards will open in August 2025. Follow our social media or subscribe to our newsletter to get notified when nominations go live.',
                color: 'teen-orange'
              },
              {
                question: 'Can schools partner with Teendom Africa?',
                answer: 'Absolutely! We actively seek partnerships with schools to bring constitutional education directly to students. Contact us to discuss how we can work together.',
                color: 'teen-pink'
              },
              {
                question: 'Do you offer the program outside Nairobi?',
                answer: 'Currently we focus on Nairobi County, but our 2025 expansion plans include neighboring counties. Our online programs are available to anyone in Kenya with internet access.',
                color: 'teen-purple'
              }
            ].map((faq, index) => (
              <div key={index} className={`bg-${faq.color}/10 border-l-4 border-${faq.color} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}>
                <h3 className="text-lg font-display font-bold text-gray-800 mb-3 group-hover:text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 font-heading">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;