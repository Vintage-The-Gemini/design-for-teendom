// File: src/components/SharpPricingCards.jsx
import React from 'react';

const SharpPricingCards = () => {
  const learningPaths = [
    {
      title: "Self-Paced Learning",
      duration: "6 weeks",
      price: "KSH 3,500",
      description: "Learn at your own pace",
      features: [
        "Interactive content",
        "Self-assessment tools", 
        "Digital resources",
        "Progress tracking",
        "Certificate upon completion"
      ]
    },
    {
      title: "Online Classes",
      duration: "8 weeks", 
      price: "KSH 10,000",
      description: "Live weekly sessions",
      popular: true,
      features: [
        "Live instructor-led sessions",
        "Interactive group discussions",
        "Weekly assignments",
        "Peer collaboration",
        "Expert mentorship"
      ]
    },
    {
      title: "Physical Classes",
      duration: "12 weeks",
      price: "KSH 18,000", 
      description: "In-person sessions",
      features: [
        "Face-to-face learning",
        "Hands-on workshops",
        "Field trips and visits",
        "Networking opportunities",
        "Intensive mentorship"
      ]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-black text-gray-900 mb-6 leading-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            Select the format that works best for your schedule and learning style
          </h2>
        </div>

        {/* Pricing Cards - SHARP EDGES, NO BORDERS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {learningPaths.map((path, index) => (
            <div 
              key={index}
              className={`bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative ${
                path.popular ? 'shadow-blue-200' : ''
              }`}
            >
              {/* Popular Badge - NO ROUNDED CORNERS */}
              {path.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 font-black text-sm">
                  ⭐ MOST POPULAR
                </div>
              )}
              
              {/* Title */}
              <h3 
                className="text-2xl font-black text-gray-900 mb-4 text-center"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                {path.title}
              </h3>
              
              {/* Duration */}
              <div className="text-center mb-6">
                <span className="text-gray-700 font-bold text-lg">{path.duration}</span>
              </div>
              
              {/* Price - LARGE */}
              <div 
                className="text-4xl font-black text-gray-900 mb-6 text-center"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                {path.price}
              </div>
              
              {/* Description */}
              <div className="text-center mb-8">
                <span className="text-gray-600 font-medium">{path.description}</span>
              </div>
              
              {/* Features List - NO ICONS */}
              <ul className="space-y-3 mb-8">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="text-green-500 font-black mt-1">✓</span>
                    <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Button - SHARP */}
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105">
                CHOOSE THIS PLAN
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharpPricingCards;