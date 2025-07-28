// File: src/pages/Contact.jsx

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
    // Here you would typically send the form data to your backend
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
      color: 'teen-blue'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+254 742 862 080',
      description: 'Mon-Fri, 9AM-5PM EAT',
      color: 'teen-green'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Nairobi, Kenya',
      description: 'Central Business District',
      color: 'teen-pink'
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
      <section className="py-20 lg:py-32 bg-gradient-to-br from-teen-blue/20 to-teen-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teen-yellow to-teen-orange text-white px-6 py-2 rounded-full font-bold mb-6 animate-bounce">
              📞 Get In Touch
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-display mb-6 leading-tight">
              <span className="gradient-text">CONTACT</span><br/>
              <span className="text-gray-800">US</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
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
                  <div className={`w-20 h-20 bg-${info.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-wiggle`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-gray-800 mb-2">{info.title}</h3>
                  <p className={`text-lg font-semibold text-${info.color} mb-2`}>{info.value}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Form */}
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold font-display gradient-text mb-8">
                  Send Us a Message
                </h2>

                {isSubmitted && (
                  <div className="bg-teen-green/10 border border-teen-green/20 rounded-2xl p-4 mb-6 flex items-center space-x-3">
                    <CheckCircle size={20} className="text-teen-green" />
                    <span className="text-teen-green font-semibold">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">What's this about?</label>
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
                          <div className={`p-3 rounded-2xl border-2 transition-all text-sm ${
                            formData.type === type.value
                              ? `border-${type.color} bg-${type.color}/10`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            {type.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue transition-colors"
                      placeholder="Brief subject line"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-teen-blue transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teen-blue to-teen-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              {/* Contact Info Side */}
              <div className="bg-gradient-to-br from-teen-blue to-teen-purple p-8 lg:p-12 text-white">
                <h3 className="text-2xl font-bold font-display mb-8">Get in Touch</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold mb-4">📧 Email</h4>
                    <p className="text-blue-100">info@teendom.africa</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-4">📱 Phone</h4>
                    <p className="text-blue-100">+254 742 862 080</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-4">📍 Location</h4>
                    <p className="text-blue-100">Nairobi, Kenya</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-4">⏰ Office Hours</h4>
                    <p className="text-blue-100">Monday - Friday<br/>9:00 AM - 5:00 PM EAT</p>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <h4 className="font-bold mb-3">🚀 Quick Response</h4>
                  <p className="text-blue-100 text-sm">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How can I join the Young Citizens Program?',
                answer: 'You can join through our website by selecting your preferred learning format: self-paced, online classes, or physical classes. Registration is simple and we provide all necessary materials.'
              },
              {
                question: 'Is the Young Citizens Program really free?',
                answer: 'Our self-paced learning option is completely free. Online and physical classes have nominal fees to cover facilitation costs, but we offer sponsorships for students who need financial assistance.'
              },
              {
                question: 'When will nominations for Teendom Awards open?',
                answer: 'Nominations for the first Teendom Awards will open in August 2025. Follow our social media or subscribe to our newsletter to get notified when nominations go live.'
              },
              {
                question: 'Can schools partner with Teendom Africa?',
                answer: 'Absolutely! We actively seek partnerships with schools to bring constitutional education directly to students. Contact us to discuss how we can work together.'
              },
              {
                question: 'Do you offer the program outside Nairobi?',
                answer: 'Currently we focus on Nairobi County, but our 2025 expansion plans include neighboring counties. Our online programs are available to anyone in Kenya with internet access.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold font-display text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;