// File: src/pages/ArticlesPage.jsx
import React, { useState } from 'react';
import { Search, Filter, Heart, Bookmark, Share2, Eye, Clock } from 'lucide-react';

// COMPLETE ARTICLES DATABASE - Your actual content
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

  const categories = [
    { name: 'ALL', color: 'bg-gray-600', count: ALL_ARTICLES.length },
    { name: 'SELF-CARE', color: 'bg-blue-600', count: ALL_ARTICLES.filter(a => a.category === 'SELF-CARE').length },
    { name: 'LEADERSHIP', color: 'bg-red-600', count: ALL_ARTICLES.filter(a => a.category === 'LEADERSHIP').length },
    { name: 'BUSINESS', color: 'bg-purple-600', count: ALL_ARTICLES.filter(a => a.category === 'BUSINESS').length },
    { name: 'MONEY', color: 'bg-green-600', count: ALL_ARTICLES.filter(a => a.category === 'MONEY').length },
    { name: 'LIFESTYLE', color: 'bg-orange-600', count: ALL_ARTICLES.filter(a => a.category === 'LIFESTYLE').length },
    { name: 'RELATIONSHIPS', color: 'bg-pink-600', count: ALL_ARTICLES.filter(a => a.category === 'RELATIONSHIPS').length },
    { name: 'EDUCATION', color: 'bg-indigo-600', count: ALL_ARTICLES.filter(a => a.category === 'EDUCATION').length }
  ];

  // Filter articles based on category and search
  const filteredArticles = ALL_ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'ALL' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openArticle = (article) => {
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  return (
    <div className="pt-20 bg-white">
      
      {/* HERO SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 
            className="text-8xl md:text-9xl font-black text-gray-900 mb-16 leading-none tracking-tight"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            ALL<br/>
            ARTICLES
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-2xl md:text-3xl font-medium text-gray-600 leading-relaxed mb-16"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              Explore our complete collection of teen-focused content covering everything from 
              self-care to leadership, relationships to career guidance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES FILTER */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`${selectedCategory === category.name ? category.color : 'bg-gray-400'} text-white px-6 py-3 font-black tracking-wider hover:scale-105 transition-transform flex items-center space-x-2`}
              >
                <span>{category.name}</span>
                <span className="bg-white/20 px-2 py-1 text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Results Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 
              className="text-3xl font-black text-gray-900"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              {selectedCategory === 'ALL' ? 'ALL ARTICLES' : selectedCategory} 
              <span className="text-gray-500 ml-4">({filteredArticles.length} articles)</span>
            </h2>
            
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="border border-gray-300 px-4 py-2 font-medium focus:outline-none focus:border-red-500">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Most Read</option>
              </select>
            </div>
          </div>
          
          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className="group cursor-pointer" onClick={() => openArticle(article)}>
                  <div className="relative mb-4 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`${categories.find(c => c.name === article.category)?.color || 'bg-gray-600'} text-white px-3 py-1 font-black text-sm tracking-wider`}>
                        {article.category}
                      </span>
                    </div>
                    
                    {/* Interaction Buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="w-8 h-8 bg-red-600 flex items-center justify-center hover:bg-red-700 transition-all">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-all">
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                      <button className="w-8 h-8 bg-green-600 flex items-center justify-center hover:bg-green-700 transition-all">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 
                        className="text-2xl font-black text-white leading-tight mb-2"
                        style={{fontFamily: 'Space Grotesk, sans-serif'}}
                      >
                        {article.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Article Info */}
                  <div className="space-y-2">
                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt?.substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views?.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}min</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 
                className="text-3xl font-black text-gray-400 mb-4"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                NO ARTICLES FOUND
              </h3>
              <p className="text-gray-500">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED CATEGORIES SHOWCASE */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center text-gray-900"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            EXPLORE BY <span className="text-red-600">CATEGORY</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'SELF-CARE', color: 'bg-blue-600', icon: '💪', count: 3 },
              { name: 'LEADERSHIP', color: 'bg-red-600', icon: '👑', count: 1 },
              { name: 'BUSINESS', color: 'bg-purple-600', icon: '💼', count: 1 },
              { name: 'MONEY', color: 'bg-green-600', icon: '💰', count: 1 },
              { name: 'LIFESTYLE', color: 'bg-orange-600', icon: '🌟', count: 1 },
              { name: 'RELATIONSHIPS', color: 'bg-pink-600', icon: '❤️', count: 2 },
              { name: 'EDUCATION', color: 'bg-indigo-600', icon: '📚', count: 1 }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`${category.color} p-8 text-white hover:scale-105 transition-transform duration-300 text-center`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 
                  className="text-xl font-black mb-2"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {category.name}
                </h3>
                <p className="text-white/80 font-bold">{category.count} Articles</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-6xl font-black mb-8 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            NEVER MISS A STORY
          </h2>
          
          <div className="bg-white p-8 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL"
              className="w-full px-4 py-4 bg-gray-100 text-black font-bold placeholder-gray-600 mb-4 focus:outline-none focus:bg-white"
            />
            <button className="w-full bg-black text-white py-4 font-black tracking-wider hover:bg-gray-800 transition-all">
              SUBSCRIBE FOR UPDATES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;