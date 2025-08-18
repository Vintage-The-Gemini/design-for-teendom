// File: src/pages/ArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Bookmark, Share2, Eye, Clock, User, Calendar } from 'lucide-react';
import apiService from '../services/api';

const ArticlePage = ({ article, setCurrentPage, setCurrentArticle }) => {
  const [currentArticle, setCurrentArticleState] = useState(article);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If we have an article ID but no full article data, fetch it
  useEffect(() => {
    const fetchArticle = async () => {
      if (!article) return;
      
      // If we only have an ID, fetch the full article
      if (typeof article === 'string' || (!article.content && article._id)) {
        try {
          setLoading(true);
          const response = await apiService.getArticle(article._id || article);
          setCurrentArticleState(response.data.article);
        } catch (err) {
          console.error('Error fetching article:', err);
          setError('Failed to load article');
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentArticleState(article);
      }
    };

    fetchArticle();
  }, [article]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-8"></div>
          <h1 
            className="text-4xl font-black mb-8 text-white tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            LOADING ARTICLE...
          </h1>
        </div>
      </div>
    );
  }

  if (error || !currentArticle) {
    return (
      <div className="pt-20 min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 
            className="text-6xl font-black mb-8 text-white tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            ARTICLE NOT FOUND
          </h1>
          <p className="text-xl text-gray-300 mb-8">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 text-white font-black tracking-wider transition-all text-xl"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
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
      
      {/* Back Navigation Bar */}
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
          src={currentArticle.image} 
          alt={currentArticle.title} 
          className="w-full h-full object-cover bg-gray-900"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <span 
            className={`${categoryColors[currentArticle.category] || 'bg-gray-600'} text-white px-6 py-3 font-black text-lg tracking-widest`}
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            {currentArticle.category}
          </span>
        </div>

        {/* Action Buttons */}
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

        {/* Article Title and Meta */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-6xl px-6">
            <h1 
              className="text-6xl md:text-8xl font-black text-white mb-8 leading-none drop-shadow-2xl"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              {currentArticle.title}
            </h1>
            
            <p 
              className="text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              {currentArticle.excerpt}
            </p>

            {/* Article Meta Info */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
              <div className="flex items-center space-x-2 bg-white/20 px-6 py-3 backdrop-blur-sm">
                <User className="w-5 h-5" />
                <span className="font-bold">{currentArticle.author}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/20 px-6 py-3 backdrop-blur-sm">
                <Calendar className="w-5 h-5" />
                <span className="font-bold">
                  {new Date(currentArticle.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/20 px-6 py-3 backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{currentArticle.readTime} MIN READ</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/20 px-6 py-3 backdrop-blur-sm">
                <Eye className="w-5 h-5" />
                <span className="font-bold">{currentArticle.views?.toLocaleString()} VIEWS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-black">
        <div className="max-w-6xl mx-auto px-8 py-20">
          
          {/* Excerpt Block */}
          <div className="mb-16 bg-gray-900 p-12">
            <p 
              className="text-3xl font-bold text-white leading-relaxed"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              {currentArticle.excerpt?.toUpperCase()}
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
                  {/* Display the actual content from database */}
                  <div 
                    dangerouslySetInnerHTML={{ __html: currentArticle.content }} 
                    className="article-content"
                  />
                  
                  {/* Tags */}
                  {currentArticle.tags && currentArticle.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-700">
                      <h3 
                        className="text-2xl font-black text-white mb-4"
                        style={{fontFamily: 'Space Grotesk, sans-serif'}}
                      >
                        TAGS
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {currentArticle.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className={`${categoryColors[currentArticle.category] || 'bg-gray-600'} text-white px-4 py-2 text-sm font-bold`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-4">
              <div className="sticky top-8 space-y-8">
                
                {/* Article Stats */}
                <div className="bg-gray-900 p-6">
                  <h3 
                    className="text-xl font-black text-white mb-4"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    ARTICLE STATS
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Views:</span>
                      <span className="text-white font-bold">{currentArticle.views?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Reading Time:</span>
                      <span className="text-white font-bold">{currentArticle.readTime} minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white font-bold">{currentArticle.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Published:</span>
                      <span className="text-white font-bold">
                        {new Date(currentArticle.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share Article */}
                <div className="bg-gray-900 p-6">
                  <h3 
                    className="text-xl font-black text-white mb-4"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    SHARE THIS STORY
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 p-3 transition-all">
                      <span className="text-white font-bold text-sm">Facebook</span>
                    </button>
                    <button className="bg-blue-400 hover:bg-blue-500 p-3 transition-all">
                      <span className="text-white font-bold text-sm">Twitter</span>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 p-3 transition-all">
                      <span className="text-white font-bold text-sm">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles CTA */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black mb-8 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            WANT MORE AMAZING STORIES?
          </h2>
          
          <button 
            onClick={() => setCurrentPage('articles')}
            className="bg-white text-red-600 px-12 py-6 font-black text-xl tracking-wider hover:bg-gray-100 transition-all"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            EXPLORE ALL ARTICLES
          </button>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;