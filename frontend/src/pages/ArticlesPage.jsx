// File: frontend/src/pages/ArticlesPage.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ArticlesPage = ({ setCurrentPage, setCurrentArticle }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [backendConnected, setBackendConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  // Categories matching your exact design
  const categories = [
    { name: 'ALL', color: 'bg-gray-600' },
    { name: 'SELF-CARE', color: 'bg-blue-600' },
    { name: 'LEADERSHIP', color: 'bg-red-600' },
    { name: 'BUSINESS', color: 'bg-purple-600' },
    { name: 'MONEY', color: 'bg-green-600' },
    { name: 'LIFESTYLE', color: 'bg-orange-600' },
    { name: 'RELATIONSHIPS', color: 'bg-pink-600' },
    { name: 'EDUCATION', color: 'bg-indigo-600' }
  ];

  // IMMEDIATE RENDERING: Load articles immediately, then replace with real data
  useEffect(() => {
    // 1. IMMEDIATE: Load sample data for instant rendering
    const sampleData = apiService.getSampleArticles(null, 20);
    setArticles(sampleData.data.articles);
    setFilteredArticles(sampleData.data.articles);
    
    // 2. BACKGROUND: Try to fetch real data from backend
    const fetchRealData = async () => {
      try {
        console.log('🔄 Attempting to fetch real articles from backend...');
        
        // Test backend connection first
        const isConnected = await apiService.testConnection();
        setBackendConnected(isConnected);
        
        if (isConnected) {
          // Fetch all published articles
          const response = await apiService.getPublishedArticles(50);
          
          console.log('✅ Real articles fetched:', response.results);
          
          // Replace sample data with real data if available
          if (response.results > 0) {
            setArticles(response.data.articles);
            setFilteredArticles(response.data.articles);
          }
        } else {
          console.log('⚠️ Backend not available, using sample data');
        }
      } catch (error) {
        console.warn('⚠️ Failed to fetch real data:', error.message);
        // Keep using sample data
      }
    };
    
    // Fetch real data in background
    fetchRealData();
  }, []);

  // Filter articles based on search and category
  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.author.toLowerCase().includes(searchLower) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  // Fix image URL - handle both Cloudinary and fallback
  const getImageUrl = (article) => {
    if (!article.image) return '/api/placeholder/600/400';
    
    // If it's already a full URL (Unsplash/Cloudinary), use it
    if (article.image.startsWith('http')) {
      return article.image;
    }
    
    // If it's a Cloudinary path
    if (article.image.startsWith('https://res.cloudinary.com')) {
      return article.image;
    }
    
    // If it's a local asset path, use placeholder
    if (article.image.startsWith('/src/assets/')) {
      return '/api/placeholder/600/400';
    }
    
    return article.image;
  };

  const openArticle = (article) => {
    console.log('🔥 Opening article from Articles Page:', article.title, 'ID:', article._id);
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  return (
    <div className="bg-white text-gray-900">
      {/* CONNECTION STATUS (only show if backend disconnected) */}
      {!backendConnected && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-20">
          <div className="flex items-center max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-yellow-800 text-sm">
              ⚠️ <strong>Demo Mode:</strong> Backend not connected. Showing sample articles. 
              <span className="ml-2">Start your backend server for real data.</span>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="pt-20 pb-12 md:pb-20 bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-4 md:left-10 w-20 md:w-32 h-20 md:h-32 bg-red-500 rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-20 md:top-40 right-10 md:right-20 w-16 md:w-24 h-16 md:h-24 bg-red-600 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-24 md:w-40 h-24 md:h-40 bg-red-400 rounded-full opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative">
          <h1 
            className="text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 mb-6 md:mb-8 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            ALL
            <br/>
            <span className="text-red-600">STORIES</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-lg md:text-xl lg:text-2xl font-medium text-gray-700 leading-relaxed mb-8 md:mb-12 px-4"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Explore our complete collection of inspiring stories, practical guides, 
              and empowering content crafted specifically for young minds across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS SECTION */}
      <section className="py-6 md:py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Search Bar */}
          <div className="mb-6 md:mb-8">
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search articles by title, author, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none transition-colors"
                style={{fontFamily: 'Inter, sans-serif'}}
              />
              <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-3 md:px-4 py-2 font-black text-xs md:text-sm tracking-wider uppercase transition-all transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? `${category.color} text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID SECTION */}
      <section className="py-8 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Results Count */}
          <div className="mb-6 md:mb-12">
            <p 
              className="text-center text-gray-600 text-base md:text-lg font-medium"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'STORY' : 'STORIES'} 
              {selectedCategory !== 'ALL' && ` IN ${selectedCategory}`}
              {searchTerm && ` MATCHING "${searchTerm.toUpperCase()}"`}
            </p>
          </div>
          
          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredArticles.map((article) => (
                <article 
                  key={article._id || article.id} 
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => openArticle(article)}
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img 
                      src={getImageUrl(article)} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-2 md:px-3 py-1 font-black text-xs tracking-wider">
                        {article.category}
                      </span>
                    </div>

                    {/* Views Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/50 text-white px-2 md:px-3 py-1 font-bold text-xs rounded">
                        {article.views} views
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <h3 
                      className="text-lg md:text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors"
                      style={{fontFamily: 'Playfair Display, serif'}}
                    >
                      {article.title}
                    </h3>
                    
                    <p 
                      className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {article.excerpt.substring(0, 120)}...
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs md:text-sm text-gray-500">
                      <span className="font-semibold">{article.author}</span>
                      <div className="flex items-center gap-2">
                        <span>{article.readTime} min read</span>
                        <span>•</span>
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* No Results State */
            <div className="text-center py-12 md:py-20">
              <div className="text-4xl md:text-6xl mb-6">🔍</div>
              <h3 
                className="text-2xl md:text-3xl font-black text-gray-900 mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                NO STORIES FOUND
              </h3>
              <p 
                className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg max-w-2xl mx-auto px-4"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                {searchTerm || selectedCategory !== 'ALL' 
                  ? 'Try adjusting your search criteria or browse different categories.' 
                  : 'No stories are available at the moment. Please check back later.'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {(searchTerm || selectedCategory !== 'ALL') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('ALL');
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 font-black text-sm md:text-base tracking-wider uppercase transition-all"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    CLEAR FILTERS
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentPage('home')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-black text-sm md:text-base tracking-wider uppercase transition-all transform hover:scale-105"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  BACK TO HOME
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      {filteredArticles.length > 0 && (
        <section className="py-12 md:py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              INSPIRING THE NEXT
              <br/>
              <span className="text-red-500">GENERATION</span>
            </h2>
            
            <p 
              className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Every story here is crafted to empower, inspire, and guide young Kenyans 
              toward a brighter future. Join our community of changemakers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setCurrentPage('awards')}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 font-black text-sm md:text-base tracking-wider uppercase transition-all transform hover:scale-105"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                TEENDOM AWARDS
              </button>
              
              <button
                onClick={() => setCurrentPage('ycp')}
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 font-black text-sm md:text-base tracking-wider uppercase transition-all"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                YOUTH PROGRAM
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CSS for animations and responsive design */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Responsive text sizing */
        @media (max-width: 768px) {
          .text-8xl { font-size: 3rem; }
          .text-6xl { font-size: 2.5rem; }
          .text-5xl { font-size: 2rem; }
          .text-4xl { font-size: 1.75rem; }
          .text-3xl { font-size: 1.5rem; }
        }
        
        @media (max-width: 640px) {
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          
          /* Better mobile spacing */
          .px-6 { padding-left: 1rem; padding-right: 1rem; }
          .py-20 { padding-top: 3rem; padding-bottom: 3rem; }
        }
        
        /* Improve readability on small screens */
        @media (max-width: 480px) {
          .text-xs { font-size: 0.75rem; }
          .text-sm { font-size: 0.875rem; }
          .gap-2 { gap: 0.5rem; }
        }
      `}</style>
    </div>
  );
};

export default ArticlesPage;