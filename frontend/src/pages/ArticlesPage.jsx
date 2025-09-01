// File: frontend/src/pages/ArticlesPage.jsx - SAME DESIGN AS HOME PAGE
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ArticlesPage = ({ setCurrentPage, setCurrentArticle }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('📚 Fetching all articles...');
        
        try {
          // Check backend health first
          await apiService.healthCheck();
          console.log('✅ Backend connected');
          
          // Fetch all published articles
          const response = await apiService.getPublishedArticles();
          console.log('📰 All Articles:', response);
          
          const articlesData = response.data?.articles || [];
          setArticles(articlesData);
          setFilteredArticles(articlesData);
          
        } catch (apiError) {
          console.warn('⚠️ API not available, using sample data:', apiError.message);
          
          // Extended sample data matching your database structure
          const sampleArticles = [
            {
              _id: '68a2ea98750b88025fffcca6',
              title: 'HOW TO STAY WISE ABOUT YOUR CENTS',
              category: 'MONEY',
              author: 'Linet Makenya',
              excerpt: "Category: Money THERE 'S A REDLINE BETWEEN SAVINGS AND FOMO! Have you ever found yourself in a situation where you want something so bad but you can't afford it?",
              image: '/api/placeholder/600/400',
              readTime: 2,
              views: 1900,
              featured: false,
              published: true,
              tags: ['money', 'savings', 'financial-literacy', 'teens'],
              createdAt: '2025-08-18T08:55:52.956+00:00'
            },
            {
              _id: '68a2ea98750b88025fffcca7',
              title: 'BOOST YOUR SELF-ESTEEM',
              category: 'SELF-CARE',
              author: 'Mental Health Team',
              excerpt: 'Category: Self Care How to develop a healthy self-esteem It is common to have days when you don\'t feel good about yourself.',
              image: '/api/placeholder/600/400',
              readTime: 3,
              views: 1800,
              featured: false,
              published: true,
              tags: ['self-care', 'mental-health', 'self-esteem', 'wellness'],
              createdAt: '2025-08-18T08:55:52.956+00:00'
            },
            {
              _id: '68a2ea98750b88025fffcca5',
              title: 'TEEN CEO: Building Your Empire Young',
              category: 'BUSINESS',
              author: 'Business Team',
              excerpt: 'Category: Leadership Heading: TEEN CEO Faith Huini, Founder of Huini Solutions - From school uniform business to tech entrepreneur.',
              image: 'https://res.cloudinary.com/dbidxxqxr/image/upload/v1756662645/teendom-awards/articles/teen-ceo.jpg',
              readTime: 2,
              views: 2800,
              featured: false,
              published: true,
              tags: ['business', 'entrepreneurship', 'teen-ceo', 'leadership'],
              createdAt: '2025-08-18T08:55:52.955+00:00'
            },
            {
              _id: '68a2ea98750b88025fffcca4',
              title: 'THE BOYLAN SISTERS: Constitutional Champions',
              category: 'LEADERSHIP',
              author: 'Teendom Team',
              excerpt: "Category; Leadership Heading: The Boylan Sisters 'We are not on social media but we are busy transforming lives'",
              image: 'https://res.cloudinary.com/dbidxxqxr/image/upload/v1756662761/teendom-awards/articles/boylan-sisters.jpg',
              readTime: 7,
              views: 3200,
              featured: false,
              published: true,
              tags: ['leadership', 'constitutional', 'champions', 'sisters'],
              createdAt: '2025-08-18T08:55:52.955+00:00'
            },
            {
              _id: '68a2ea98750b88025fffcca3',
              title: 'ACNE IN TEENAGE BOYS',
              category: 'SELF-CARE',
              author: 'Catherine Kinyanjui',
              excerpt: 'Category: Self care Acne and Male Self Esteem There are boys that are struggling with acne and its impact on their confidence.',
              image: '/api/placeholder/600/400',
              readTime: 3,
              views: 2500,
              featured: false,
              published: true,
              tags: ['self-care', 'acne', 'boys', 'confidence'],
              createdAt: '2025-08-18T08:55:52.953+00:00'
            },
            {
              _id: 'sample-education-1',
              title: 'YOUR RIGHTS AS A KENYAN TEEN',
              category: 'EDUCATION',
              author: 'Constitutional Team',
              excerpt: 'Understanding your fundamental rights as enshrined in the Kenyan Constitution - every teen should know these basic rights and freedoms.',
              image: '/api/placeholder/600/400',
              readTime: 5,
              views: 1500,
              featured: false,
              published: true,
              tags: ['education', 'constitution', 'rights', 'kenya'],
              createdAt: '2025-08-15T08:55:52.953+00:00'
            }
          ];
          
          setArticles(sampleArticles);
          setFilteredArticles(sampleArticles);
        }
        
      } catch (err) {
        console.error('❌ Error fetching articles:', err);
        setError('Failed to load articles. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on search and category
  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory]);

  // Fix image URL - same as HomePage
  const getImageUrl = (article) => {
    if (!article.image) return '/api/placeholder/600/400';
    
    // If it's already a full Cloudinary URL, use it
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

  // Loading state - SAME DESIGN AS HOME PAGE
  if (loading) {
    return (
      <div className="pt-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading all stories...</p>
        </div>
      </div>
    );
  }

  // Error state - SAME DESIGN AS HOME PAGE
  if (error) {
    return (
      <div className="pt-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Connection Issue</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 font-bold rounded-lg hover:bg-red-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      {/* HERO SECTION - SAME DESIGN AS HOME PAGE */}
      <section className="pt-20 pb-20 bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden">
        {/* Background Decorations - SAME AS HOME PAGE */}
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
            <span className="text-red-600">STORIES</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed mb-12"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Explore our complete collection of inspiring stories, practical guides, 
              and empowering content crafted specifically for young minds across Kenya.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              style={{fontFamily: 'Inter, sans-serif'}}
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION - SAME DESIGN AS HOME PAGE */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`${category.color} text-white px-6 py-3 font-black tracking-wider hover:scale-105 transition-transform ${
                  selectedCategory === category.name ? 'ring-4 ring-white ring-opacity-50' : ''
                }`}
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID - SAME DESIGN AS HOME PAGE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Results Info */}
          <div className="text-center mb-12">
            <h2 
              className="text-4xl md:text-5xl font-black mb-4 text-gray-900"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              LATEST <span className="text-red-600">STORIES</span>
            </h2>
            <p 
              className="text-xl text-gray-600 font-semibold mb-4"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              {filteredArticles.length} {filteredArticles.length === 1 ? 'STORY' : 'STORIES'} 
              {selectedCategory !== 'ALL' && ` IN ${selectedCategory}`}
              {searchTerm && ` MATCHING "${searchTerm.toUpperCase()}"`}
            </p>
          </div>
          
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article 
                  key={article._id || article.id} 
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => openArticle(article)}
                >
                  {/* Image Container - SAME DESIGN AS HOME PAGE */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getImageUrl(article)} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                    
                    {/* Category Badge - SAME DESIGN AS HOME PAGE */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-3 py-1 font-black text-xs tracking-wider">
                        {article.category}
                      </span>
                    </div>

                    {/* Views Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/50 text-white px-3 py-1 font-bold text-xs rounded">
                        {article.views} views
                      </span>
                    </div>
                  </div>
                  
                  {/* Content - SAME DESIGN AS HOME PAGE */}
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
                    
                    {/* Meta - SAME DESIGN AS HOME PAGE */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="font-semibold">{article.author}</span>
                      <span>{article.readTime} min read</span>
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📚</div>
              <h3 
                className="text-3xl font-black text-gray-900 mb-4"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                NO STORIES FOUND
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {searchTerm || selectedCategory !== 'ALL' 
                  ? "Try adjusting your search or category filters to find more stories."
                  : "No stories are available right now. Add some from the admin panel!"
                }
              </p>
              
              {(searchTerm || selectedCategory !== 'ALL') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('ALL');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-black tracking-wider transition-all transform hover:scale-105"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  CLEAR FILTERS
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION - SAME DESIGN AS HOME PAGE */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black mb-6 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            WANT MORE <span className="text-yellow-300">CONTENT?</span>
          </h2>
          
          <p 
            className="text-xl text-red-100 mb-10 font-semibold"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            EXPLORE OUR PROGRAMS AND JOIN THE TEENDOM COMMUNITY
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="bg-white text-red-600 px-12 py-4 font-black text-lg tracking-wider hover:bg-gray-100 transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              🏠 BACK TO HOME
            </button>
            <button 
              onClick={() => setCurrentPage('ycp')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              📚 EXPLORE YCP
            </button>
            <button 
              onClick={() => setCurrentPage('awards')}
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              🏆 AWARDS PROGRAM
            </button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER - SAME DESIGN AS HOME PAGE */}
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
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            SUBSCRIBE FOR WEEKLY UPDATES WITH THE LATEST TEEN CONTENT
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

export default ArticlesPage;