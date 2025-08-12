// File: src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Heart, Bookmark, Share2, Eye, Clock } from 'lucide-react';

// Sample articles data
const ARTICLES = [
  {
    id: 1,
    title: 'ACNE AND MALE SELF ESTEEM',
    category: { name: 'Self-Care', color: 'bg-blue-600' },
    date: 'Jun 29, 2025',
    author: 'Catherine Kinyanjui',
    excerpt: 'Understanding how acne affects teenage boys and building confidence through proper skincare and self-acceptance.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    featured: true,
    views: 2500,
    readTime: 5
  },
  {
    id: 2,
    title: 'THE BOYLAN SISTERS: Constitutional Champions',
    category: { name: 'Leadership', color: 'bg-red-600' },
    date: 'Jun 25, 2025',
    author: 'Teendom Team',
    excerpt: 'Meet the inspiring Boylan sisters who are revolutionizing youth advocacy and constitutional education across Kenya.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    featured: true,
    views: 3200,
    readTime: 7
  },
  {
    id: 3,
    title: 'TEEN CEO: Building Your Empire Young',
    category: { name: 'Business', color: 'bg-purple-600' },
    date: 'Jun 20, 2025',
    author: 'Business Team',
    excerpt: 'Inspiring stories of young entrepreneurs and practical steps to start your own business as a teenager.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    featured: false,
    views: 2800,
    readTime: 8
  },
  {
    id: 4,
    title: 'HOW TO STAY WISE ABOUT YOUR CENTS',
    category: { name: 'Money', color: 'bg-green-600' },
    date: 'Jun 18, 2025',
    author: 'Linet Wanjira',
    excerpt: 'Teen-friendly financial tips for saving, budgeting, and making smart money decisions.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    featured: false,
    views: 1900,
    readTime: 6
  },
  {
    id: 5,
    title: 'WHERE IS GOD?',
    category: { name: 'Lifestyle', color: 'bg-orange-600' },
    date: 'Jun 16, 2025',
    author: 'Faith Team',
    excerpt: 'Exploring faith, spirituality, and finding meaning as a teenager in today\'s world.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    featured: false,
    views: 1800,
    readTime: 7
  },
  {
    id: 6,
    title: '10 REASONS WHY TEENAGERS ARE HAVING SEX, OR SHOULDN\'T',
    category: { name: 'Relationships', color: 'bg-pink-600' },
    date: 'Jun 14, 2025',
    author: 'Health Team',
    excerpt: 'A frank discussion about teenage sexuality, consent, and making informed decisions.',
    image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&h=600&fit=crop',
    featured: false,
    views: 4100,
    readTime: 8
  }
];

const CategoryBadge = ({ category, size = 'md' }) => {
  const sizes = { 
    sm: 'px-3 py-1 text-xs', 
    md: 'px-4 py-2 text-sm', 
    lg: 'px-6 py-3 text-lg' 
  };
  
  return (
    <span className={`${category.color} text-white font-black uppercase tracking-widest ${sizes[size]}`}>
      {category.name}
    </span>
  );
};

const ArticleCard = ({ article, featured = false, onClick }) => {
  if (featured) {
    return (
      <div className="relative h-screen cursor-pointer group" onClick={onClick}>
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70"></div>
        
        {/* Category */}
        <div className="absolute top-8 left-8">
          <CategoryBadge category={article.category} size="lg" />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 
            className="text-6xl md:text-8xl font-black text-white text-center leading-none tracking-tighter max-w-6xl"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            {article.title}
          </h2>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div>
            <p className="text-white text-xl mb-4 max-w-2xl font-bold">{article.excerpt}</p>
            <div className="flex items-center space-x-6 text-gray-300 text-lg">
              <span className="font-bold">{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group cursor-pointer" onClick={onClick}>
      <div className="relative mb-4 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <CategoryBadge category={article.category} size="sm" />
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
        <p className="text-gray-400 leading-relaxed">
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
  );
};

const HomePage = ({ setCurrentPage, setCurrentArticle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredArticles = ARTICLES.filter(article => article.featured);
  const regularArticles = ARTICLES.filter(article => !article.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  const openArticle = (article) => {
    setCurrentArticle(article);
    setCurrentPage('article');
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen">
        {featuredArticles.map((article, index) => (
          <div
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ArticleCard 
              article={article} 
              featured={true} 
              onClick={() => openArticle(article)}
            />
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
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

      {/* Categories */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'ALL', color: 'bg-gray-600' },
              { name: 'SELF-CARE', color: 'bg-blue-600' },
              { name: 'LEADERSHIP', color: 'bg-red-600' },
              { name: 'BUSINESS', color: 'bg-purple-600' },
              { name: 'MONEY', color: 'bg-green-600' },
              { name: 'LIFESTYLE', color: 'bg-orange-600' },
              { name: 'RELATIONSHIPS', color: 'bg-pink-600' }
            ].map((category) => (
              <button
                key={category.name}
                className={`${category.color} text-white px-6 py-3 font-black tracking-wider hover:scale-105 transition-transform`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-5xl font-black mb-12 text-center"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            LATEST STORIES
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article}
                onClick={() => openArticle(article)}
              />
            ))}
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