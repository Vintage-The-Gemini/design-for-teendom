// File: src/pages/ArticlePage.jsx
import React from 'react';
import { ArrowLeft, Heart, Bookmark, Share2, Eye, Clock, User, Calendar } from 'lucide-react';

const ArticlePage = ({ article, setCurrentPage, setCurrentArticle }) => {
  if (!article) {
    return (
      <div className="pt-20 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 
            className="text-6xl font-black mb-8 text-white tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            ARTICLE NOT FOUND
          </h1>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 text-white font-black tracking-wider transition-all text-xl"
          >
            RETURN HOME
          </button>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    setCurrentArticle(null);
    setCurrentPage('home');
  };

  const categoryColors = {
    'SELF-CARE': 'bg-blue-600',
    'LEADERSHIP': 'bg-red-600', 
    'BUSINESS': 'bg-purple-600',
    'MONEY': 'bg-green-600',
    'LIFESTYLE': 'bg-orange-600',
    'RELATIONSHIPS': 'bg-pink-600',
    'EDUCATION': 'bg-indigo-600',
    'POLITICS': 'bg-red-700'
  };

  return (
    <div className="pt-20 min-h-screen bg-black text-white">
      
      {/* Back Navigation Bar - EXACT HOMEPAGE STYLE */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <button 
            onClick={handleGoBack}
            className="flex items-center space-x-3 text-white hover:text-red-600 transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
            <span 
              className="font-black text-lg tracking-wider"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              BACK TO STORIES
            </span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-contain bg-gray-900"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span className={`${categoryColors[article.category] || 'bg-gray-600'} text-white px-6 py-3 font-black text-lg tracking-widest`}>
            {article.category}
          </span>
        </div>

        {/* Action Buttons - EXACT HOMEPAGE STYLE */}
        <div className="absolute top-8 right-8 flex space-x-4">
          <button className="w-12 h-12 bg-red-600 flex items-center justify-center hover:bg-red-700 transition-all">
            <Heart className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-all">
            <Bookmark className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 bg-green-600 flex items-center justify-center hover:bg-green-700 transition-all">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Title and Meta */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 
              className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tight"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              {article.title?.toUpperCase()}
            </h1>
            
            {/* Meta Info - EXACT HOMEPAGE BLOCKS */}
            <div className="flex flex-wrap gap-6">
              <div className="bg-red-600 px-6 py-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-white" />
                  <span className="font-black text-white tracking-wider">{article.author?.toUpperCase()}</span>
                </div>
              </div>
              
              <div className="bg-purple-600 px-6 py-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-white" />
                  <span className="font-black text-white tracking-wider">{article.date?.toUpperCase()}</span>
                </div>
              </div>
              
              <div className="bg-green-600 px-6 py-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="font-black text-white tracking-wider">{article.readTime} MIN READ</span>
                </div>
              </div>
              
              <div className="bg-blue-600 px-6 py-3">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-white" />
                  <span className="font-black text-white tracking-wider">{article.views?.toLocaleString()} VIEWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-8 py-20">
          
          {/* Excerpt Block - SHARP EDGES */}
          <div className="mb-16 bg-gray-900 p-12">
            <p 
              className="text-3xl font-bold text-white leading-relaxed"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              {article.excerpt?.toUpperCase()}
            </p>
          </div>

          {/* Article Body */}
          <div className="grid md:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="md:col-span-8">
              <div 
                className="prose prose-xl prose-invert max-w-none"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                <div className="text-gray-100 leading-relaxed space-y-8 text-lg">
                  <p className="text-xl leading-relaxed">
                    This is where the POWERFUL article content would be displayed. The content would be 
                    <strong className="text-red-500 font-black"> BOLD</strong>, 
                    <strong className="text-yellow-500 font-black"> IMPACTFUL</strong>, and 
                    <strong className="text-green-500 font-black"> LIFE-CHANGING</strong> - 
                    just like the Teendom brand demands.
                  </p>
                  
                  <p className="text-xl leading-relaxed">
                    The article would contain <strong className="text-blue-500 font-black">ENGAGING</strong>, 
                    educational content focused on empowering young Kenyan citizens with knowledge about their 
                    constitution, rights, and civic responsibilities.
                  </p>

                  {/* Subheading - SHARP */}
                  <div className="bg-red-600 p-8 my-12">
                    <h2 
                      className="text-4xl font-black text-white text-center"
                      style={{fontFamily: 'Playfair Display, serif'}}
                    >
                      KEY TAKEAWAYS
                    </h2>
                  </div>

                  <p className="text-xl leading-relaxed">
                    Each article would conclude with <strong className="text-purple-500 font-black">ACTIONABLE INSIGHTS</strong> 
                    and clear takeaways that readers can apply in their daily lives and civic engagement.
                  </p>
                  
                  {/* Quote Block - SHARP */}
                  <div className="bg-gray-900 p-12 my-12">
                    <blockquote 
                      className="text-3xl font-black text-white text-center leading-tight"
                      style={{fontFamily: 'Space Grotesk, sans-serif'}}
                    >
                      "KNOWLEDGE IS POWER. CIVIC EDUCATION IS EMPOWERMENT."
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4 space-y-8">
              
              {/* Author Block */}
              <div className="bg-gray-900 p-8">
                <h3 
                  className="text-2xl font-black text-red-500 mb-6 tracking-wider"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  AUTHOR
                </h3>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-20 h-20 bg-red-600 flex items-center justify-center text-white font-black text-2xl">
                    {article.author?.charAt(0)}
                  </div>
                  <div>
                    <h4 
                      className="text-xl font-black text-white mb-2"
                      style={{fontFamily: 'Space Grotesk, sans-serif'}}
                    >
                      {article.author?.toUpperCase()}
                    </h4>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Expert in youth empowerment and civic education. Dedicated to building informed citizens for Kenya's future.
                </p>
              </div>

              {/* Related Articles Block */}
              <div className="bg-gray-900 p-8">
                <h3 
                  className="text-2xl font-black text-yellow-500 mb-6 tracking-wider"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  MORE STORIES
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-l-4 border-red-600 pl-4">
                      <h4 className="font-black text-white text-lg leading-tight">
                        RELATED STORY TITLE HERE
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">5 MIN READ</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="bg-red-600 py-24">
        <div className="max-w-6xl mx-auto text-center px-8">
          <h2 
            className="text-6xl md:text-7xl font-black text-white mb-8 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            READY TO CHANGE THE GAME?
          </h2>
          <p 
            className="text-2xl font-bold text-red-100 mb-12 tracking-wide"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            JOIN THE YOUNG CITIZENS PROGRAM AND BECOME AN EMPOWERED LEADER
          </p>
          <button 
            onClick={() => setCurrentPage('ycp')}
            className="bg-black text-white px-16 py-6 font-black text-2xl tracking-widest hover:bg-gray-900 transition-all"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            JOIN YCP NOW
          </button>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;