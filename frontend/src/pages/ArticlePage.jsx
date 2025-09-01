// File: frontend/src/pages/ArticlePage.jsx - SAME DESIGN AS HOME PAGE
import React, { useState, useEffect } from 'react';

const ArticlePage = ({ article, setCurrentPage, setCurrentArticle }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Fix image URL - same as other pages
  const getImageUrl = (article) => {
    if (!article?.image) return '/api/placeholder/1200/600';
    
    // If it's already a full Cloudinary URL, use it
    if (article.image.startsWith('https://res.cloudinary.com')) {
      return article.image;
    }
    
    // If it's a local asset path, use placeholder
    if (article.image.startsWith('/src/assets/')) {
      return '/api/placeholder/1200/600';
    }
    
    return article.image;
  };

  // Generate some sample related articles when article loads
  useEffect(() => {
    if (article) {
      // Sample related articles matching your database structure
      const sampleRelated = [
        {
          _id: 'related-1',
          title: 'UNDERSTANDING YOUR EMOTIONS',
          category: 'SELF-CARE',
          author: 'Mental Health Team',
          excerpt: 'Learning to recognize and manage your emotions is a crucial life skill for every teenager.',
          image: '/api/placeholder/400/300',
          readTime: 4,
          views: 1200,
        },
        {
          _id: 'related-2',
          title: 'BUILDING CONFIDENCE IN RELATIONSHIPS',
          category: 'RELATIONSHIPS',
          author: 'Social Team',
          excerpt: 'How to maintain healthy boundaries and communicate effectively with friends and family.',
          image: '/api/placeholder/400/300',
          readTime: 6,
          views: 980,
        },
        {
          _id: 'related-3',
          title: 'TEEN LEADERSHIP IN ACTION',
          category: 'LEADERSHIP',
          author: 'Leadership Team',
          excerpt: 'Real stories of young Kenyans making a difference in their communities.',
          image: '/api/placeholder/400/300',
          readTime: 5,
          views: 1500,
        }
      ].filter(related => related.category !== article.category); // Filter out same category

      setRelatedArticles(sampleRelated.slice(0, 3));
    }
  }, [article]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this story: ${article.title}`;
    
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

  // Clean article content (remove HTML tags for display)
  const cleanContent = (content) => {
    if (!content) return '';
    // Remove HTML tags and decode entities
    return content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  // Article not found state
  if (!article) {
    return (
      <div className="pt-20 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-6xl mb-6">📖</div>
          <h2 
            className="text-3xl font-black text-gray-900 mb-4"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            STORY NOT FOUND
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <button
            onClick={() => setCurrentPage('articles')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-black tracking-wider transition-all transform hover:scale-105"
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
      {/* BACK NAVIGATION - SAME DESIGN */}
      <div className="pt-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => setCurrentPage('articles')}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors font-semibold"
            style={{fontFamily: 'Inter, sans-serif'}}
          >
            ← Back to All Stories
          </button>
        </div>
      </div>

      {/* ARTICLE HERO - SAME DESIGN AS HOME PAGE FEATURED */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
            <img 
              src={getImageUrl(article)} 
              alt={article.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            
            {/* Article Header Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
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
              <h1 
                className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                {article.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex items-center space-x-4 text-white/80">
                <span className="font-semibold">{article.author}</span>
                <span>•</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{article.readTime} min read</span>
                <span>•</span>
                <span>{article.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT - SAME DESIGN AS HOME PAGE */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Article Excerpt */}
          <div className="mb-12">
            <p 
              className="text-xl text-gray-700 leading-relaxed font-medium"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              {article.excerpt}
            </p>
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  isBookmarked 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                }`}
              >
                <span>{isBookmarked ? '❤️' : '🤍'}</span>
                <span>Bookmark</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  <span>📤</span>
                  <span>Share</span>
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <span>🐦</span>
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <span>📘</span>
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <span>📋</span>
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-red-50 text-red-600 px-3 py-1 text-sm rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <div 
              className="text-gray-800 leading-relaxed"
              style={{fontFamily: 'Inter, sans-serif'}}
            >
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <div className="space-y-6">
                  <p className="text-lg">
                    {cleanContent(article.excerpt)}
                  </p>
                  <p className="text-lg text-gray-600 italic">
                    This is a sample article. The full content would be managed through the admin panel where you can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Add rich text content with formatting</li>
                    <li>Upload and manage images through Cloudinary</li>
                    <li>Set categories, tags, and reading time</li>
                    <li>Control publication status</li>
                    <li>Track views and engagement</li>
                  </ul>
                  <p className="text-lg">
                    Use the admin panel to create compelling, well-formatted articles that will engage your teen audience 
                    with meaningful content about constitutional education, leadership, and personal development.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h3 
              className="text-2xl font-black text-gray-900 mb-4"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              About the Author
            </h3>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-black">
                  {article.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h4 
                  className="text-xl font-black text-gray-900 mb-2"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                >
                  {article.author}
                </h4>
                <p 
                  className="text-gray-600 leading-relaxed"
                  style={{fontFamily: 'Inter, sans-serif'}}
                >
                  A passionate contributor to Teendom Africa, dedicated to empowering young people through 
                  engaging content and meaningful stories. With experience in youth development and education, 
                  they create content that resonates with teens and helps them navigate life's challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED ARTICLES - SAME DESIGN AS HOME PAGE */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 
                className="text-4xl md:text-5xl font-black mb-4 text-gray-900"
                style={{fontFamily: 'Playfair Display, serif'}}
              >
                MORE <span className="text-red-600">STORIES</span>
              </h2>
              <p 
                className="text-xl text-gray-600 font-semibold"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                DISCOVER SIMILAR CONTENT YOU MIGHT ENJOY
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <article 
                  key={relatedArticle._id} 
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => openRelatedArticle(relatedArticle)}
                >
                  {/* Image Container - SAME DESIGN */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getImageUrl(relatedArticle)} 
                      alt={relatedArticle.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-3 py-1 font-black text-xs tracking-wider">
                        {relatedArticle.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 
                      className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors"
                      style={{fontFamily: 'Playfair Display, serif'}}
                    >
                      {relatedArticle.title}
                    </h3>
                    
                    <p 
                      className="text-gray-600 mb-4 leading-relaxed"
                      style={{fontFamily: 'Inter, sans-serif'}}
                    >
                      {relatedArticle.excerpt.substring(0, 100)}...
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="font-semibold">{relatedArticle.author}</span>
                      <span>{relatedArticle.readTime} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => setCurrentPage('articles')}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
                style={{fontFamily: 'Space Grotesk, sans-serif'}}
              >
                VIEW ALL STORIES
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CALL TO ACTION - SAME DESIGN AS HOME PAGE */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 
            className="text-5xl font-black mb-8 text-white"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            ENJOYED THIS <span className="text-yellow-300">STORY?</span>
          </h2>
          
          <p 
            className="text-xl text-red-100 mb-10 font-semibold"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            DISCOVER MORE INSPIRING CONTENT AND JOIN OUR COMMUNITY
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setCurrentPage('articles')}
              className="bg-white text-red-600 px-12 py-4 font-black text-lg tracking-wider hover:bg-gray-100 transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              📚 READ MORE STORIES
            </button>
            <button 
              onClick={() => setCurrentPage('ycp')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              🎓 JOIN OUR PROGRAM
            </button>
            <button 
              onClick={() => setCurrentPage('awards')}
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-12 py-4 font-black text-lg tracking-wider transition-all transform hover:scale-105"
              style={{fontFamily: 'Space Grotesk, sans-serif'}}
            >
              🏆 NOMINATE SOMEONE
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
            STAY <span className="text-red-500">UPDATED</span>
          </h2>
          
          <p 
            className="text-xl text-gray-300 mb-10 font-semibold"
            style={{fontFamily: 'Space Grotesk, sans-serif'}}
          >
            GET THE LATEST STORIES AND OPPORTUNITIES DELIVERED TO YOUR INBOX
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

      {/* Close share menu when clicking outside */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default ArticlePage;