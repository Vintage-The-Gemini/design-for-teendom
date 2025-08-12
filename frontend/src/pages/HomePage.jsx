// File: src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Heart, Bookmark, Share2, Eye, Clock } from 'lucide-react';

// REAL ARTICLES DATA - Using your actual content
const ARTICLES = [
  {
    id: 1,
    title: 'ACNE IN TEENAGE BOYS',
    category: 'SELF-CARE',
    date: 'Jun 29, 2025',
    author: 'Catherine Kinyanjui',
    excerpt: 'Understanding how acne affects teenage boys and building confidence through proper skincare and self-acceptance.',
    image: '/src/assets/images/acne/acne1.jpg',
    featured: true,
    views: 2500,
    readTime: 5,
    folder: 'acne'
  },
  {
    id: 2,
    title: 'THE BOYLAN SISTERS: Constitutional Champions',
    category: 'LEADERSHIP',
    date: 'Jun 25, 2025',
    author: 'Teendom Team',
    excerpt: 'Meet the inspiring Boylan sisters who are revolutionizing youth advocacy and constitutional education across Kenya.',
    image: '/src/assets/images/babylon/babylon-sisters-cover.jpg',
    featured: true,
    views: 3200,
    readTime: 7,
    folder: 'babylon'
  },
  {
    id: 3,
    title: 'TEEN CEO: Building Your Empire Young',
    category: 'BUSINESS',
    date: 'Jun 20, 2025',
    author: 'Business Team',
    excerpt: 'Inspiring stories of young entrepreneurs and practical steps to start your own business as a teenager.',
    image: '/src/assets/images/teen ceo/Teen ceo primary.JPG',
    featured: false,
    views: 2800,
    readTime: 8,
    folder: 'teen ceo'
  },
  {
    id: 4,
    title: 'HOW TO STAY WISE ABOUT YOUR CENTS',
    category: 'MONEY',
    date: 'Jun 18, 2025',
    author: 'Linet Makenya',
    excerpt: 'Teen-friendly financial tips for saving, budgeting, and making smart money decisions for your future.',
    image: '/src/assets/images/savings/savings primary.jpg',
    featured: false,
    views: 1900,
    readTime: 6,
    folder: 'savings'
  },
  {
    id: 5,
    title: 'BOOST YOUR SELF-ESTEEM',
    category: 'SELF-CARE',
    date: 'Jun 16, 2025',
    author: 'Mental Health Team',
    excerpt: 'Practical strategies for building confidence and maintaining positive self-image during teenage years.',
    image: '/src/assets/images/self-esteem/self-esteem1.jpg',
    featured: false,
    views: 1800,
    readTime: 7,
    folder: 'self-esteem'
  },
  {
    id: 6,
    title: 'RELATIONSHIPS: NAVIGATING TEEN LOVE',
    category: 'RELATIONSHIPS',
    date: 'Jun 14, 2025',
    author: 'Relationship Team',
    excerpt: 'A guide to healthy relationships, understanding boundaries, and making informed decisions about love.',
    image: '/src/assets/images/relationships/relatinships.jpg',
    featured: false,
    views: 2100,
    readTime: 9,
    folder: 'relationships'
  },
  {
    id: 7,
    title: 'BODY ODOUR: A Teen\'s Guide',
    category: 'SELF-CARE',
    date: 'Jun 12, 2025',
    author: 'Health Team',
    excerpt: 'Understanding body changes during puberty and maintaining proper hygiene for confidence.',
    image: '/src/assets/images/body-oduor/body-oduor-1.jpg',
    featured: false,
    views: 1600,
    readTime: 4,
    folder: 'body-oduor'
  },
  {
    id: 8,
    title: 'BULLY PROOF: Standing Strong',
    category: 'LIFESTYLE',
    date: 'Jun 10, 2025',
    author: 'Safety Team',
    excerpt: 'Strategies for dealing with bullying, building resilience, and creating safer school environments.',
    image: '/src/assets/images/bully/bully-image-1.jpg',
    featured: false,
    views: 2200,
    readTime: 6,
    folder: 'bully'
  },
  {
    id: 9,
    title: 'IN THEIR FOOTSTEPS: Career Guidance',
    category: 'EDUCATION',
    date: 'Jun 8, 2025',
    author: 'Career Team',
    excerpt: 'Learning from successful professionals and mapping your career path as a young Kenyan.',
    image: '/src/assets/images/career/career primary.jpg',
    featured: false,
    views: 1900,
    readTime: 8,
    folder: 'career'
  },
  {
    id: 10,
    title: 'RIDE OR DIE: Friendship Loyalty',
    category: 'RELATIONSHIPS',
    date: 'Jun 6, 2025',
    author: 'Faith Bwari',
    excerpt: 'Understanding healthy friendship boundaries and the difference between loyalty and enabling.',
    image: '/src/assets/images/Ride or die/Ride or die.jpg',
    featured: false,
    views: 1700,
    readTime: 5,
    folder: 'Ride or die'
  }
];

const CategoryBadge = ({ category, size = 'md' }) => {
  const categoryColors = {
    'SELF-CARE': 'bg-blue-600',
    'LEADERSHIP': 'bg-red-600',
    'BUSINESS': 'bg-purple-600',
    'MONEY': 'bg-green-600',
    'LIFESTYLE': 'bg-orange-600',
    'RELATIONSHIPS': 'bg-pink-600',
    'EDUCATION': 'bg-indigo-600'
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm'
  };

  return (
    <span className={`${categoryColors[category] || 'bg-gray-600'} text-white font-black tracking-wider ${sizeClasses[size]}`}>
      {category}
    </span>
  );
};

const ArticleCard = ({ article, featured = false, onClick }) => {
  if (featured) {
    return (
      <div className="relative h-screen cursor-pointer group" onClick={onClick}>
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-contain bg-gray-900 group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <CategoryBadge category={article.category} />
        </div>
        
        {/* Content */}
        <div className="absolute bottom-8 left-8 right-8">
          <h2 
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            {article.title}
          </h2>
          
          <div className="flex items-center space-x-6 text-white text-lg">
            <span className="font-bold">{article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
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
          className="w-full h-64 object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-500" 
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
    <div className="pt-20 bg-white">
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
                className={`${category.color} text-white px-6 py-3 font-black tracking-wider hover:scale-105 transition-transform`}
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