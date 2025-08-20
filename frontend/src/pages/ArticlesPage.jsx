// File: frontend/src/pages/ArticlesPage.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ArticlesPage = ({ setCurrentPage, setCurrentArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getArticles({ limit: 50 });
        setArticles(response.data?.articles || []);
        
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Make sure the backend is running!');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const categories = [
    { name: 'ALL', color: 'from-gray-500 to-gray-600', emoji: '📚', count: articles.length },
    { name: 'SELF-CARE', color: 'from-blue-500 to-cyan-600', emoji: '💆‍♀️', count: articles.filter(a => a.category === 'SELF-CARE').length },
    { name: 'LEADERSHIP', color: 'from-red-500 to-red-600', emoji: '👑', count: articles.filter(a => a.category === 'LEADERSHIP').length },
    { name: 'BUSINESS', color: 'from-purple-500 to-purple-600', emoji: '💼', count: articles.filter(a => a.category === 'BUSINESS').length },
    { name: 'MONEY', color: 'from-green-500 to-emerald-600', emoji: '💰', count: articles.filter(a => a.category === 'MONEY').length },
    { name: 'LIFESTYLE', color: 'from-orange-500 to-orange-600', emoji: '🌟', count: articles.filter(a => a.category === 'LIFESTYLE').length },
    { name: 'RELATIONSHIPS', color: 'from-pink-500 to-rose-600', emoji: '❤️', count: articles.filter(a => a.category === 'RELATIONSHIPS').length },
    { name: 'EDUCATION', color: 'from-indigo-500 to-blue-600', emoji: '📚', count: articles.filter(a => a.category === 'EDUCATION').length }
  ];

  // Filter articles based on category and search
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'ALL' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Enhanced navigation function
  const openArticle = (article) => {
    console.log('📖 Opening article from Articles Page:', article.title, 'ID:', article.id);
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

  // Error state
  if (error) {
    return (
      <div className="pt-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-6">📱</div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Backend Connection Required</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 font-bold rounded-lg hover:bg-red-700 transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white min-h-screen">
      
      {/* HERO SECTION - Consistent with HomePage/YCP Branding */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-600 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-400 rounded-full opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h1 
            className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            ALL
            <br/>
            <span className="text-red-600">ARTICLES</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed mb-12"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Explore our complete collection of teen-focused content covering everything from 
              self-care to leadership, relationships to career guidance. 
              <strong className="text-red-600"> Knowledge that empowers, stories that inspire.</strong>
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white border-2 border-red-200 rounded-lg text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:border-red-500 shadow-lg"
                style={{fontFamily: 'Inter, sans-serif'}}
              />
              <div className="absolute right-4 top-4">
                <span className="text-red-500 text-xl">🔍</span>
              </div>
            </div>
          </div>

          {/* Article Count */}
          <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow-lg border border-red-200">
            <span className="text-gray-700 font-semibold">
              Showing <strong className="text-red-600">{filteredArticles.length}</strong> articles
              {selectedCategory !== 'ALL' && (
                <span> in <strong className="text-red-600">{selectedCategory}</strong></span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORIES FILTER - Improved Design */}
      <section className="py-12 bg-gray-50 sticky top-20 z-40 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 font-black tracking-wider transition-all duration-300 rounded-lg ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white transform scale-105 shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID - Enhanced Layout with Proper Image Fitting */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article 
                  key={article.id} 
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg border border-gray-100"
                  onClick={() => openArticle(article)}
                >
                  {/* Fixed Image Container - Consistent Aspect Ratio */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 font-black text-xs tracking-wider rounded">
                        {article.category}
                      </span>
                    </div>

                    {/* Read Time Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-gray-900 px-2 py-1 font-semibold text-xs rounded">
                        {article.readTime} min
                      </span>
                    </div>
                  </div>
                  
                  {/* Content - Consistent Padding and Typography */}
                  <div className="p-6">
                    <h3 
                      className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors line-clamp-2"
                      style={{fontFamily: 'Playfair Display, serif'}}
                    >
                      {article.title}
                    </h3>
                    
                    <p 
                      className="text-gray-600 mb-4 leading-relaxed line-clamp-3"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {article.excerpt}
                    </p>
                    
                    {/* Author and Meta Info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-black text-xs">
                            {article.author.charAt(0)}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-700">{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        {article.views && (
                          <span>{article.views.toLocaleString()} views</span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <h3 
                className="text-2xl font-black text-gray-900 mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                No Articles Found
              </h3>
              <p 
                className="text-gray-500 text-lg mb-8"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                Try adjusting your search or category filter
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchTerm('');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-black tracking-wider transition-all rounded-lg"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED CATEGORIES SHOWCASE */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            EXPLORE BY <span className="text-red-600">CATEGORY</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(1).map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-8 bg-gradient-to-br ${category.color} text-white rounded-2xl hover:scale-105 transition-all duration-300 text-center group shadow-lg hover:shadow-xl`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.emoji}</div>
                <h3 
                  className="text-xl font-black mb-2"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {category.name}
                </h3>
                <p className="text-white/90 font-semibold">{category.count} Articles</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BACK TO HOME CTA - Consistent with Site Design */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black mb-6 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            WANT MORE <span className="text-yellow-300">CONTENT</span>?
          </h2>
          
          <p 
            className="text-xl text-red-100 mb-10 font-semibold"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Check out our homepage for featured stories and explore our programs!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="bg-white text-red-600 px-12 py-4 font-black text-lg tracking-wider hover:bg-gray-100 transition-all transform hover:scale-105 rounded-lg"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              🏠 BACK TO HOME
            </button>
            <button 
              onClick={() => setCurrentPage('ycp')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105 rounded-lg"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              📚 EXPLORE YCP
            </button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA - Consistent with HomePage */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black mb-6 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            NEVER MISS A <span className="text-red-500">STORY</span>
          </h2>
          
          <p 
            className="text-xl text-gray-300 mb-10 font-semibold"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Subscribe for weekly updates with the hottest teen content and latest opportunities!
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
              SUBSCRIBE FOR UPDATES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;