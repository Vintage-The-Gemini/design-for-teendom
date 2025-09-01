// File: frontend/src/pages/ArticlePage.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ArticlePage = ({ article, setCurrentPage, setCurrentArticle }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [fullArticle, setFullArticle] = useState(article);

  // Fix image URL - same as other pages
  const getImageUrl = (article) => {
    if (!article?.image) return '/api/placeholder/1200/600';
    
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
      return '/api/placeholder/1200/600';
    }
    
    return article.image;
  };

  // Fetch full article data and related articles when component mounts
  useEffect(() => {
    const fetchArticleData = async () => {
      if (!article) return;

      try {
        // Try to fetch the full article from backend
        console.log('🔄 Fetching full article data for:', article._id);
        const response = await apiService.getArticle(article._id);
        
        if (response.status === 'success' && response.data.article) {
          console.log('✅ Full article fetched from backend');
          setFullArticle(response.data.article);
        } else {
          console.log('⚠️ Using passed article data');
          setFullArticle(article);
        }
      } catch (error) {
        console.warn('⚠️ Failed to fetch full article, using passed data:', error.message);
        setFullArticle(article);
      }

      // Generate related articles (sample data for now)
      generateRelatedArticles(article.category);
    };

    fetchArticleData();
  }, [article]);

  const generateRelatedArticles = (currentCategory) => {
    // Get sample articles excluding current category
    const sampleRelated = apiService.getSampleArticles(null, 10);
    const filtered = sampleRelated.data.articles
      .filter(related => 
        related.category !== currentCategory && 
        related._id !== article._id
      )
      .slice(0, 3);

    setRelatedArticles(filtered);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this story: ${fullArticle.title}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
      copy: () => {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    };

    if (platform === 'copy') {
      shareUrls.copy();
    } else {
      window.open(shareUrls[platform], '_blank');
    }
    
    setShowShareMenu(false);
  };

  const openRelatedArticle = (relatedArticle) => {
    console.log('🔥 Opening related article:', relatedArticle.title);
    setCurrentArticle(relatedArticle);
    window.scrollTo(0, 0);
  };

  // Clean and format article content
  const formatContent = (content) => {
    if (!content) return '';
    
    // If content has HTML, return as HTML
    if (content.includes('<')) {
      return content;
    }
    
    // If plain text, format it nicely
    return content.split('\n').map((paragraph, index) => 
      paragraph.trim() ? `<p key="${index}">${paragraph.trim()}</p>` : ''
    ).join('');
  };

  // Article not found state
  if (!fullArticle) {
    return (
      <div className="pt-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4 md:px-6">
          <div className="text-4xl md:text-6xl mb-6">📖</div>
          <h2 
            className="text-2xl md:text-3xl font-black text-gray-900 mb-4"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            STORY NOT FOUND
          </h2>
          <p className="text-gray-600 mb-6 text-base md:text-lg">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <button
            onClick={() => setCurrentPage('articles')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 font-black tracking-wider transition-all transform hover:scale-105"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            BROWSE ALL STORIES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      {/* BACK NAVIGATION */}
      <div className="pt-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <button
            onClick={() => setCurrentPage('articles')}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors font-semibold text-sm md:text-base"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            ← Back to All Stories
          </button>
        </div>
      </div>

      {/* ARTICLE HERO */}
      <section className="py-8 md:py-16 bg-gray-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {getImageUrl(fullArticle) ? (
            /* With Image */
            <div className="relative h-48 md:h-64 lg:h-96 mb-6 md:mb-8 overflow-hidden rounded-lg">
              <img 
                src={getImageUrl(fullArticle)} 
                alt={fullArticle.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              
              {/* Article Header Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                {/* Category Badge */}
                <div className="mb-3 md:mb-4">
                  <span 
                    className="bg-red-600 text-white px-3 md:px-4 py-1 md:py-2 font-black text-xs md:text-sm tracking-wider uppercase"
                    style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  >
                    {fullArticle.category}
                  </span>
                </div>
                
                {/* Title */}
                <h1 
                  className="text-xl md:text-3xl lg:text-5xl font-black text-white mb-3 md:mb-4 leading-tight"
                  style={{fontFamily: 'Playfair Display, serif'}}
                >
                  {fullArticle.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-white/80">
                  <span className="font-semibold">{fullArticle.author}</span>
                  <span>•</span>
                  <span>{new Date(fullArticle.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{fullArticle.readTime} min read</span>
                  <span>•</span>
                  <span>{fullArticle.views} views</span>
                </div>
              </div>
            </div>
          ) : (
            /* Text-only design when no image */
            <div className="text-center py-12 md:py-16">
              {/* Category Badge */}
              <div className="mb-6">
                <span 
                  className="bg-red-600 text-white px-4 py-2 font-black text-sm tracking-wider uppercase"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {fullArticle.category}
                </span>
              </div>
              
              {/* Title */}
              <h1 
                className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-tight max-w-4xl mx-auto"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                {fullArticle.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-sm text-white/80">
                <span className="font-semibold">{fullArticle.author}</span>
                <span>•</span>
                <span>{new Date(fullArticle.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{fullArticle.readTime} min read</span>
                <span>•</span>
                <span>{fullArticle.views} views</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="py-8 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          {/* Article Excerpt */}
          <div className="mb-8 md:mb-12">
            <p 
              className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              {fullArticle.excerpt}
            </p>
          </div>

          {/* Article Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-12 pb-4 md:pb-6 border-b border-gray-200 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  isBookmarked 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                }`}
              >
                <span>{isBookmarked ? '❤️' : '🤍'}</span>
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 md:px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                >
                  <span>📤</span>
                  <span>Share</span>
                </button>
                
                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      🐦 Twitter
                    </button>
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      📘 Facebook
                    </button>
                    <button 
                      onClick={() => handleShare('whatsapp')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      💬 WhatsApp
                    </button>
                    <button 
                      onClick={() => handleShare('copy')}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-t border-gray-100"
                    >
                      📋 Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>👁️ {fullArticle.views} views</span>
              <span>⏱️ {fullArticle.readTime} min read</span>
            </div>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            {fullArticle.content ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(fullArticle.content) 
                }} 
              />
            ) : (
              <div className="text-gray-600 leading-relaxed space-y-6">
                <p>
                  This is the full article content for "{fullArticle.title}". 
                  The content would typically be stored in the database and fetched from your backend.
                </p>
                <p>
                  {fullArticle.excerpt}
                </p>
                <p>
                  For demonstration purposes, this shows how the article page would look with proper content.
                  The article management system in your admin panel allows you to create and edit full articles.
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {fullArticle.tags && fullArticle.tags.length > 0 && (
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {fullArticle.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 
              className="text-2xl md:text-3xl font-black text-gray-900 mb-8 md:mb-12 text-center"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              RELATED STORIES
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedArticles.map((relatedArticle) => (
                <article 
                  key={relatedArticle._id}
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => openRelatedArticle(relatedArticle)}
                >
                  {/* Image */}
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    <img 
                      src={getImageUrl(relatedArticle)} 
                      alt={relatedArticle.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-2 py-1 font-black text-xs tracking-wider">
                        {relatedArticle.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <h3 
                      className="text-base md:text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors"
                      style={{fontFamily: 'Playfair Display, serif'}}
                    >
                      {relatedArticle.title}
                    </h3>
                    
                    <p 
                      className="text-sm text-gray-600 mb-3 leading-relaxed"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {relatedArticle.excerpt.substring(0, 100)}...
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-semibold">{relatedArticle.author}</span>
                      <span>{relatedArticle.readTime} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* View More Button */}
            <div className="text-center mt-8 md:mt-12">
              <button
                onClick={() => setCurrentPage('articles')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 font-black text-sm md:text-base tracking-wider uppercase transition-all transform hover:scale-105"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                VIEW ALL STORIES
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Close share menu when clicking outside */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowShareMenu(false)}
        />
      )}

      {/* Responsive CSS */}
      <style jsx>{`
        .prose p {
          margin-bottom: 1.5rem;
        }
        .prose h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: bold;
          color: #111;
        }
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .prose {
            font-size: 16px;
          }
          .prose h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticlePage;