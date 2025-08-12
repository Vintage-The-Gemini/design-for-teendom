// File: src/components/YoungCitizensHero.jsx
import React from 'react';

const YoungCitizensHero = () => {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* MASSIVE TITLE - EXACT MATCH TO IMAGE 2 */}
        <h1 
          className="text-8xl md:text-9xl font-black text-white mb-16 leading-none tracking-tight"
          style={{fontFamily: 'Playfair Display, serif'}}
        >
          YOUNG CITIZENS<br/>
          PROGRAM
        </h1>
        
        {/* Description - EXACT MATCH */}
        <div className="max-w-4xl mx-auto">
          <p 
            className="text-2xl md:text-3xl font-medium text-gray-300 leading-relaxed"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Promoting legal and constitutional literacy amongst teenagers and young adults. 
            Helping them maximize their potential as young citizens and guiding them on effective 
            community involvement.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center mt-16">
          <button className="bg-red-600 hover:bg-red-700 text-white font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105">
            ENROLL NOW
          </button>
          
          <button className="bg-white hover:bg-gray-100 text-black font-black px-12 py-6 text-xl tracking-widest transition-all transform hover:scale-105">
            LEARN MORE
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default YoungCitizensHero;