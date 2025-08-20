// File: frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

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
        setError(null);
        
        // Check backend health first
        await apiService.healthCheck();
        
        // Fetch featured articles
        const featuredResponse = await apiService.getFeaturedArticles(3);
        console.log('📚 Featured Articles:', featuredResponse);
        setFeaturedArticles(featuredResponse.data?.articles || []);
        
        // Fetch regular articles (non-featured)
        const regularResponse = await apiService.getRegularArticles(6);
        console.log('📰 Regular Articles:', regularResponse);
        setRegularArticles(regularResponse.data?.articles || []);
        
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Make sure the backend is running on port 5000!');
        
        // Set some fallback data for development
        setFeaturedArticles([
          {
            id: 'temp-1',
            title: 'BACKEND CONNECTION NEEDED',
            category: 'SYSTEM',
            author: 'Teendom Team',
            excerpt: 'Please start the backend server to see real articles.',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            createdAt: new Date().toISOString(),
            readTime: 1,
            views: 0
          }
        ]);
        setRegularArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Auto-slide for featured articles
  useEffect(() => {
    if (featuredArticles.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredArticles.length]);

  const openArticle = (article) => {
    console.log('🔥 Opening article from Home Page:', article.title, 'ID:', article.id);
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  // Loading state
  if (loading) {
    return (
      <div className="pt-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Error state with backend instructions
  if (error) {
    return (
      <div className="pt-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Backend Connection Required</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="bg-gray-100 p-6 rounded-lg text-left">
            <h3 className="font-black text-gray-900 mb-3">To fix this:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Open terminal and navigate to the backend folder</li>
              <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">npm install</code></li>
              <li>Run: <code className="bg-gray-200 px-2 py-1 rounded">npm start</code></li>
              <li>Backend should start on port 5000</li>
              <li>Refresh this page</li>
            </ol>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-red-600 text-white px-6 py-3 font-bold rounded-lg hover:bg-red-700 transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      {/* INTRO HERO SECTION - Teendom Brand Introduction */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-600 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-400 rounded-full opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          {/* Main Brand Message */}
          <h1 
            className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            EMPOWERING
            <br/>
            <span className="text-red-600">TEEN VOICES</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed mb-12"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Welcome to <strong className="text-red-600">Teendom Africa</strong> - where young voices shape the future. 
              From constitutional education to celebrating changemakers, we're building informed, 
              active citizens ready to transform Kenya.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-600">
              <div 
                className="text-3xl font-black text-red-600 mb-2"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                2,500+
              </div>
              <p className="text-gray-700 font-semibold">Young Citizens Empowered</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-600">
              <div 
                className="text-3xl font-black text-red-600 mb-2"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                10+
              </div>
              <p className="text-gray-700 font-semibold">Schools Reached</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-600">
              <div 
                className="text-3xl font-black text-red-600 mb-2"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                100+
              </div>
              <p className="text-gray-700 font-semibold">Future Changemakers</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setCurrentPage('ycp')}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              JOIN YOUNG CITIZENS PROGRAM
            </button>
            <button 
              onClick={() => setCurrentPage('awards')}
              className="bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              EXPLORE TEENDOM AWARDS
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES CAROUSEL - Now Second Section */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              FEATURED <span className="text-red-500">STORIES</span>
            </h2>
            <p 
              className="text-xl text-gray-400 font-semibold"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              TRENDING STORIES SHAPING YOUNG MINDS
            </p>
          </div>

          {/* Featured Articles Slider */}
          <div className="relative h-96 md:h-[500px] mb-8 overflow-hidden rounded-lg">
            {featuredArticles.map((article, index) => (
              <div
                key={article.id}
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
                  
                  {/* Article Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-4xl">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span 
                          className="bg-red-600 text-white px-4 py-2 font-black text-sm tracking-wider uppercase"
                          style={{fontFamily: 'Space Grotesk, sans-serif'}}
                        >
                          {article.category}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 
                        className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
                        style={{fontFamily: 'Playfair Display, serif'}}
                      >
                        {article.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p 
                        className="text-lg text-white/90 mb-6 leading-relaxed max-w-3xl"
                        style={{fontFamily: 'Inter, sans-serif'}}
                      >
                        {article.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center space-x-4 text-white/80 mb-6">
                        <span className="font-semibold">{article.author}</span>
                        <span>•</span>
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{article.readTime} min read</span>
                      </div>
                      
                      {/* Read Button */}
                      <button 
                        onClick={() => openArticle(article)}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-black tracking-wider transition-all"
                        style={{fontFamily: 'Space Grotesk, sans-serif'}}
                      >
                        READ FULL STORY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center space-x-2">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-red-500' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-12 bg-gray-100">
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

      {/* MORE ARTICLES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-black mb-4 text-gray-900"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              LATEST <span className="text-red-600">STORIES</span>
            </h2>
            <p 
              className="text-xl text-gray-600 font-semibold"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              DISCOVER MORE CONTENT CRAFTED FOR YOUNG MINDS
            </p>
          </div>
          
          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <article 
                  key={article.id} 
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => openArticle(article)}
                >
                  {/* Image Container with Proper Aspect Ratio */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-3 py-1 font-black text-xs tracking-wider">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 
                      className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors"
                      style={{fontFamily: 'Playfair Display, serif'}}
                    >
                      {article.title}
                    </h3>
                    
                    <p 
                      className="text-gray-600 mb-4 leading-relaxed"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {article.excerpt.substring(0, 120)}...
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="font-semibold">{article.author}</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles available at the moment.</p>
            </div>
          )}

          {/* View All Articles Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('articles')}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              VIEW ALL ARTICLES
            </button>
          </div>
        </div>
      </section>

      {/* PROGRAMS SHOWCASE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-black mb-4 text-gray-900"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              OUR <span className="text-red-600">PROGRAMS</span>
            </h2>
            <p 
              className="text-xl text-gray-600 font-semibold"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              BUILDING THE NEXT GENERATION OF LEADERS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Young Citizens Program */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 
                className="text-2xl font-black text-gray-900 mb-4"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                YOUNG CITIZENS PROGRAM
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive constitutional education program empowering teens with knowledge 
                of their rights, responsibilities, and role in Kenya's democracy.
              </p>
              <button 
                onClick={() => setCurrentPage('ycp')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-black tracking-wider transition-all"
              >
                LEARN MORE
              </button>
            </div>

            {/* Teendom Awards */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 
                className="text-2xl font-black text-gray-900 mb-4"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                TEENDOM AWARDS
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Celebrating exceptional young changemakers across Kenya who are making 
                a difference in their communities and beyond.
              </p>
              <button 
                onClick={() => setCurrentPage('awards')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-black tracking-wider transition-all"
              >
                EXPLORE AWARDS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black mb-6 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            STAY IN THE LOOP
          </h2>
          
          <p 
            className="text-xl text-red-100 mb-10 font-semibold"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            GET THE LATEST STORIES, OPPORTUNITIES & UPDATES DELIVERED TO YOUR INBOX
          </p>
          
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-xl">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-gray-100 text-black font-semibold placeholder-gray-600 mb-4 focus:outline-none focus:bg-white rounded"
              style={{fontFamily: 'Inter, sans-serif'}}
            />
            <button 
              className="w-full bg-red-600 text-white py-3 font-black tracking-wider hover:bg-red-700 transition-all rounded"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;