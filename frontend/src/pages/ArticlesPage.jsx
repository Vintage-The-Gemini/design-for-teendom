// File: src/pages/ArticlesPage.jsx
import React, { useState } from 'react';
import { Search, Filter, Heart, Bookmark, Share2, Eye, Clock } from 'lucide-react';

// UNIFIED ARTICLES DATABASE - Same as HomePage for consistency
const ALL_ARTICLES = [
  {
    id: 1,
    title: 'ACNE IN TEENAGE BOYS',
    category: 'SELF-CARE',
    date: 'Jun 29, 2025',
    author: 'Catherine Kinyanjui',
    excerpt: 'Understanding how acne affects teenage boys and building confidence through proper skincare and self-acceptance.',
    image: '/src/assets/images/acne/acne1.jpg',
    readTime: 5,
    views: 2500,
    folder: 'acne',
    wordDoc: 'ACNE IN TEENAGE BOYS - Catherine Kinyanjui.docx'
  },
  {
    id: 2,
    title: 'THE BOYLAN SISTERS: Constitutional Champions',
    category: 'LEADERSHIP',
    date: 'Jun 25, 2025',
    author: 'Teendom Team',
    excerpt: 'Meet the inspiring Boylan sisters who are revolutionizing youth advocacy and constitutional education across Kenya.',
    image: '/src/assets/images/babylon/babylon-sisters-cover.jpg',
    readTime: 7,
    views: 3200,
    folder: 'babylon',
    wordDoc: 'COVER STORY_ BOYLAN SISTERS.docx'
  },
  {
    id: 3,
    title: 'TEEN CEO: Building Your Empire Young',
    category: 'BUSINESS',
    date: 'Jun 20, 2025',
    author: 'Business Team',
    excerpt: 'Inspiring stories of young entrepreneurs and practical steps to start your own business as a teenager.',
    image: '/src/assets/images/teen ceo/Teen ceo primary.JPG',
    readTime: 8,
    views: 2800,
    folder: 'teen ceo',
    wordDoc: 'TEEN CEO.docx'
  },
  {
    id: 4,
    title: 'HOW TO STAY WISE ABOUT YOUR CENTS',
    category: 'MONEY',
    date: 'Jun 18, 2025',
    author: 'Linet Makenya',
    excerpt: 'Teen-friendly financial tips for saving, budgeting, and making smart money decisions for your future.',
    image: '/src/assets/images/savings/savings primary.jpg',
    readTime: 6,
    views: 1900,
    folder: 'savings',
    wordDoc: 'SAVINGS-Makenya.docx'
  },
  {
    id: 5,
    title: 'BOOST YOUR SELF-ESTEEM',
    category: 'SELF-CARE',
    date: 'Jun 16, 2025',
    author: 'Mental Health Team',
    excerpt: 'Practical strategies for building confidence and maintaining positive self-image during teenage years.',
    image: '/src/assets/images/self-esteem/self-esteem1.jpg',
    readTime: 7,
    views: 1800,
    folder: 'self-esteem',
    wordDoc: 'Boost Your Self-Esteem.docx'
  },
  {
    id: 6,
    title: 'RELATIONSHIPS: NAVIGATING TEEN LOVE',
    category: 'RELATIONSHIPS',
    date: 'Jun 14, 2025',
    author: 'Relationship Team',
    excerpt: 'A guide to healthy relationships, understanding boundaries, and making informed decisions about love.',
    image: '/src/assets/images/relationships/relatinships.jpg',
    readTime: 9,
    views: 2100,
    folder: 'relationships',
    wordDoc: 'Relationships.docx'
  },
  {
    id: 7,
    title: 'BODY ODOUR: A Teen\'s Guide',
    category: 'SELF-CARE',
    date: 'Jun 12, 2025',
    author: 'Health Team',
    excerpt: 'Understanding body changes during puberty and maintaining proper hygiene for confidence.',
    image: '/src/assets/images/body-oduor/body-oduor-1.jpg',
    readTime: 4,
    views: 1600,
    folder: 'body-oduor',
    wordDoc: 'Body Odour.docx'
  },
  {
    id: 8,
    title: 'BULLY PROOF: Standing Strong',
    category: 'LIFESTYLE',
    date: 'Jun 10, 2025',
    author: 'Safety Team',
    excerpt: 'Strategies for dealing with bullying, building resilience, and creating safer school environments.',
    image: '/src/assets/images/bully/bully-image-1.jpg',
    readTime: 6,
    views: 2200,
    folder: 'bully',
    wordDoc: 'Bully proof.docx'
  },
  {
    id: 9,
    title: 'IN THEIR FOOTSTEPS: Career Guidance',
    category: 'EDUCATION',
    date: 'Jun 8, 2025',
    author: 'Career Team',
    excerpt: 'Learning from successful professionals and mapping your career path as a young Kenyan.',
    image: '/src/assets/images/career/career primary.jpg',
    readTime: 8,
    views: 1900,
    folder: 'career',
    wordDoc: 'In their FootSteps.docx'
  },
  {
    id: 10,
    title: 'RIDE OR DIE: Friendship Loyalty',
    category: 'RELATIONSHIPS',
    date: 'Jun 6, 2025',
    author: 'Faith Bwari',
    excerpt: 'Understanding healthy friendship boundaries and the difference between loyalty and enabling.',
    image: '/src/assets/images/Ride or die/Ride or die.jpg',
    readTime: 5,
    views: 1700,
    folder: 'Ride or die',
    wordDoc: 'RIDE OR DIE- By Faith Bwari.doc'
  }
];

const ArticlesPage = ({ setCurrentPage, setCurrentArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Colorful category configuration
  const categories = [
    { name: 'ALL', color: 'from-gray-700 to-gray-900', emoji: '🔥', count: ALL_ARTICLES.length },
    { name: 'SELF-CARE', color: 'from-blue-500 to-purple-600', emoji: '💪', count: ALL_ARTICLES.filter(a => a.category === 'SELF-CARE').length },
    { name: 'LEADERSHIP', color: 'from-red-500 to-pink-600', emoji: '👑', count: ALL_ARTICLES.filter(a => a.category === 'LEADERSHIP').length },
    { name: 'BUSINESS', color: 'from-purple-500 to-indigo-600', emoji: '💼', count: ALL_ARTICLES.filter(a => a.category === 'BUSINESS').length },
    { name: 'MONEY', color: 'from-green-500 to-emerald-600', emoji: '💰', count: ALL_ARTICLES.filter(a => a.category === 'MONEY').length },
    { name: 'LIFESTYLE', color: 'from-orange-500 to-yellow-600', emoji: '🌟', count: ALL_ARTICLES.filter(a => a.category === 'LIFESTYLE').length },
    { name: 'RELATIONSHIPS', color: 'from-pink-500 to-rose-600', emoji: '❤️', count: ALL_ARTICLES.filter(a => a.category === 'RELATIONSHIPS').length },
    { name: 'EDUCATION', color: 'from-indigo-500 to-blue-600', emoji: '📚', count: ALL_ARTICLES.filter(a => a.category === 'EDUCATION').length }
  ];

  // Filter articles based on category and search
  const filteredArticles = ALL_ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'ALL' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // FIXED: Enhanced navigation function with debugging
  const openArticle = (article) => {
    console.log('📖 Opening article from Articles Page:', article.title, 'ID:', article.id);
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      
      {/* HERO SECTION - Colorful & Fun */}
      <section className="py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-bounce-gentle"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h1 
            className="text-8xl md:text-9xl font-black text-gray-900 mb-16 leading-none tracking-tight"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            ALL<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">ARTICLES</span>
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-2xl md:text-3xl font-medium text-gray-600 leading-relaxed mb-16"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Explore our complete collection of teen-focused content covering everything from 
              self-care to leadership, relationships to career guidance. ✨
            </p>
          </div>

          {/* Colorful Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for amazing stories... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 text-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none font-medium rounded-3xl bg-white shadow-2xl transition-all duration-300 hover:shadow-xl"
                style={{fontFamily: 'Poppins, sans-serif'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES FILTER - Playful Design */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-4xl font-black text-center text-gray-900 mb-12"
            style={{fontFamily: 'Righteous, cursive'}}
          >
            FILTER BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">CATEGORY</span> 🎯
          </h2>
          
          <div className="flex flex-wrap gap-6 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`${
                  selectedCategory === category.name 
                    ? `bg-gradient-to-r ${category.color} text-white scale-110 shadow-2xl` 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } px-8 py-4 font-black tracking-wider hover:scale-105 transition-all duration-300 flex items-center space-x-3 rounded-2xl`}
                style={{fontFamily: 'Righteous, cursive'}}
              >
                <span className="text-2xl">{category.emoji}</span>
                <div className="text-left">
                  <div className="text-sm">{category.name}</div>
                  <div className="text-xs opacity-75">{category.count} articles</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID - Enhanced Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 
              className="text-4xl font-black text-gray-900"
              style={{fontFamily: 'Fredoka One, cursive'}}
            >
              {selectedCategory === 'ALL' ? 'ALL STORIES' : selectedCategory} 
              <span className="text-purple-600 ml-4">({filteredArticles.length} found)</span>
            </h2>
            
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="border-2 border-gray-200 px-6 py-3 font-medium focus:outline-none focus:border-purple-500 rounded-2xl bg-white shadow-lg transition-all">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Most Read</option>
              </select>
            </div>
          </div>
          
          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => {
                const categoryConfig = categories.find(c => c.name === article.category);
                const gradientClass = categoryConfig?.color || 'from-gray-500 to-gray-700';
                
                return (
                  <article 
                    key={article.id} 
                    className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1" 
                    onClick={() => openArticle(article)}
                  >
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                      {/* Image Section */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${gradientClass} opacity-60 group-hover:opacity-40 transition-opacity`}></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span 
                            className={`bg-gradient-to-r ${gradientClass} text-white px-4 py-2 font-black text-sm tracking-wider rounded-full shadow-lg flex items-center space-x-2`}
                            style={{fontFamily: 'Righteous, cursive'}}
                          >
                            <span>{categoryConfig?.emoji}</span>
                            <span>{article.category}</span>
                          </span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110 shadow-lg">
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                          <button className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 shadow-lg">
                            <Bookmark className="w-4 h-4 text-white" />
                          </button>
                          <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110 shadow-lg">
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        
                        {/* Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 
                            className="text-2xl font-black text-white leading-tight mb-2 drop-shadow-lg"
                            style={{fontFamily: 'Fredoka One, cursive'}}
                          >
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <p 
                          className="text-gray-600 leading-relaxed mb-4"
                          style={{fontFamily: 'Inter, sans-serif'}}
                        >
                          {article.excerpt?.substring(0, 120)}...
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3 text-gray-500">
                            <span 
                              className="font-bold"
                              style={{fontFamily: 'Poppins, sans-serif'}}
                            >
                              {article.author}
                            </span>
                            <span>•</span>
                            <span>{article.date}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span className="font-bold">{article.views?.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-bold">{article.readTime}min</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Read More Indicator */}
                        <div className={`mt-4 px-4 py-2 bg-gradient-to-r ${gradientClass} text-white text-center font-bold rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0`}>
                          READ FULL STORY →
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">😅</div>
              <h3 
                className="text-4xl font-black text-gray-400 mb-4"
                style={{fontFamily: 'Fredoka One, cursive'}}
              >
                NO ARTICLES FOUND
              </h3>
              <p 
                className="text-gray-500 text-lg"
                style={{fontFamily: 'Inter, sans-serif'}}
              >
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED CATEGORIES SHOWCASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            EXPLORE BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">VIBE</span> ✨
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(1).map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-8 bg-gradient-to-br ${category.color} text-white rounded-3xl hover:scale-105 transition-all duration-300 text-center group shadow-2xl hover:-rotate-2`}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{category.emoji}</div>
                <h3 
                  className="text-xl font-black mb-2"
                  style={{fontFamily: 'Righteous, cursive'}}
                >
                  {category.name}
                </h3>
                <p className="text-white/90 font-bold">{category.count} Articles</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BACK TO HOME CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-500 via-pink-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black mb-8 text-white drop-shadow-lg"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            WANT MORE <span className="text-yellow-300">AWESOME</span> CONTENT? 🚀
          </h2>
          
          <p 
            className="text-xl text-white/90 mb-12 leading-relaxed"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Check out our homepage for featured stories and the latest updates!
          </p>
          
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-white text-purple-600 px-12 py-6 font-black text-xl tracking-widest rounded-full shadow-2xl hover:scale-110 transition-all duration-300 transform hover:-rotate-1"
            style={{fontFamily: 'Righteous, cursive'}}
          >
            BACK TO HOME 🏠
          </button>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-20 bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400 rounded-full animate-bounce-gentle"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-6 relative">
          <h2 
            className="text-6xl font-black mb-8 text-white drop-shadow-lg"
            style={{fontFamily: 'Fredoka One, cursive'}}
          >
            NEVER MISS A <span className="text-yellow-300">STORY</span> 📰
          </h2>
          
          <p 
            className="text-2xl text-white/90 mb-12 leading-relaxed"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            Subscribe for weekly updates with the hottest teen content! 🔥
          </p>
          
          <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-2xl transform hover:scale-105 transition-all">
            <input 
              type="email" 
              placeholder="YOUR EMAIL 📧"
              className="w-full px-6 py-4 bg-gray-100 text-black font-bold placeholder-gray-600 mb-6 focus:outline-none focus:bg-white rounded-2xl text-lg"
              style={{fontFamily: 'Poppins, sans-serif'}}
            />
            <button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 font-black tracking-wider hover:from-purple-700 hover:to-pink-700 transition-all rounded-2xl text-lg hover:scale-105"
              style={{fontFamily: 'Righteous, cursive'}}
            >
              SUBSCRIBE FOR UPDATES 🎉
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;