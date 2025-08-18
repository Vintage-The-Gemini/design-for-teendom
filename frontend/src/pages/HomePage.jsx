// File: src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Heart, Bookmark, Share2, Eye, Clock } from 'lucide-react';
import apiService from '../services/api';

// CLEAN ARTICLE CARD COMPONENT
const ArticleCard = ({ article, featured = false, onClick }) => {
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
    <article 
      className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        featured ? 'lg:col-span-2' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-white shadow-xl">
        {/* Hero Image */}
        <div className="relative h-80 overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span 
              className={`${categoryColors[article.category] || 'bg-gray-600'} text-white px-4 py-2 font-black text-sm tracking-wider`}
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              {article.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
            <button className="w-10 h-10 bg-red-600 flex items-center justify-center hover:bg-red-700 transition-all">
              <Heart className="w-4 h-4 text-white" />
            </button>
            <button className="w-10 h-10 bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-all">
              <Bookmark className="w-4 h-4 text-white" />
            </button>
            <button className="w-10 h-10 bg-green-600 flex items-center justify-center hover:bg-green-700 transition-all">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 
              className={`${featured ? 'text-3xl' : 'text-xl'} font-black text-white leading-tight mb-2`}
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              {article.title}
            </h3>
            
            {/* Stats */}
            <div className="flex items-center space-x-4 text-white/90 text-sm">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.views?.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}min</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 bg-white">
          <p className="text-gray-600 leading-relaxed mb-4">
            {article.excerpt?.substring(0, 120)}...
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800">{article.author}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const HomePage = ({ setCurrentPage, setCurrentArticle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [regularArticles, setRegularArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Fetch featured articles
        const featuredResponse = await apiService.getFeaturedArticles();
        console.log('📚 Featured Articles:', featuredResponse);
        setFeaturedArticles(featuredResponse.data.articles || []);
        
        // Fetch regular articles (non-featured)
        const regularResponse = await apiService.getRegularArticles(6);
        console.log('📰 Regular Articles:', regularResponse);
        setRegularArticles(regularResponse.data.articles || []);
        
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Make sure the backend is running!');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Auto-slide for featured articles
  useEffect(() => {
    if (featuredArticles.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredArticles.length]);

  // Enhanced navigation function
  const openArticle = (article) => {
    console.log('📖 Opening article:', article.title, 'ID:', article._id);
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  // Loading state
  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-8"></div>
          <h2 
            className="text-4xl font-black text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            Loading Articles...
          </h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 
            className="text-4xl font-black text-red-600 mb-4"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            Something Went Wrong
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-8 py-4 font-black rounded hover:bg-red-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white">
      {/* DIGNIFIED HERO SECTION */}
      {featuredArticles.length > 0 && (
        <section className="relative h-screen overflow-hidden">
          {featuredArticles.map((article, index) => (
            <div
              key={article._id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative h-full">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                
                {/* Professional Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <div className="max-w-7xl mx-auto">
                    <div className="max-w-4xl">
                      {/* Category */}
                      <div className="mb-6">
                        <span 
                          className="bg-red-600 text-white px-6 py-3 font-black text-sm tracking-wider uppercase"
                          style={{fontFamily: 'Space Grotesk, sans-serif'}}
                        >
                          {article.category}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h1 
                        className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
                        style={{fontFamily: 'Playfair Display, serif'}}
                      >
                        {article.title}
                      </h1>
                      
                      {/* Excerpt */}
                      <p 
                        className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl"
                        style={{fontFamily: 'Inter, sans-serif'}}
                      >
                        {article.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center space-x-6 text-white/80 mb-8">
                        <span className="font-bold">{article.author}</span>
                        <span>•</span>
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{article.readTime} min read</span>
                        <span>•</span>
                        <span>{article.views?.toLocaleString()} views</span>
                      </div>
                      
                      {/* CTA Button */}
                      <button 
                        onClick={() => openArticle(article)}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-black tracking-wider transition-all"
                        style={{fontFamily: 'Space Grotesk, sans-serif'}}
                      >
                        READ ARTICLE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length)}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredArticles.length)}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 right-12 z-30 flex space-x-2">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 transition-all ${
                  index === currentSlide ? 'bg-red-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'ALL', color: 'bg-gray-600' },
              { name: 'SELF-CARE', color: 'bg-blue-600' },
              { name: 'LEADERSHIP', color: 'bg-red-600' },
              { name: 'BUSINESS', color: 'bg-purple-600' },
              { name: 'MONEY', color: 'bg-green-600' },
              { name: 'LIFESTYLE', color: 'bg-orange-600' },
              { name: 'RELATIONSHIPS', color: 'bg-pink-600' },
              { name: 'EDUCATION', color: 'bg-indigo-600' }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => setCurrentPage('articles')}
                className={`${category.color} text-white px-6 py-3 font-black tracking-wider hover:scale-105 transition-transform`}
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            LATEST STORIES
          </h2>
          
          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <ArticleCard 
                  key={article._id} 
                  article={article}
                  onClick={() => openArticle(article)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles available at the moment.</p>
            </div>
          )}
          
          {/* View All Button */}
          <div className="text-center mt-16">
            <button 
              onClick={() => setCurrentPage('articles')}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 font-black text-xl tracking-wider transition-all"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              VIEW ALL STORIES
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-6xl font-black mb-8 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            STAY IN THE LOOP
          </h2>
          
          <div className="bg-white p-8 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL"
              className="w-full px-4 py-4 bg-gray-100 text-black font-bold placeholder-gray-600 mb-4 focus:outline-none focus:bg-white"
            />
            <button className="w-full bg-black text-white py-4 font-black tracking-wider hover:bg-gray-800 transition-all">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;