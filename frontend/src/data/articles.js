// File: src/data/articles.js
// UNIFIED ARTICLES DATABASE - Single source of truth for all articles
// This ensures consistency across HomePage, ArticlesPage, and ArticlePage

export const ARTICLES = [
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
    folder: 'acne',
    wordDoc: 'ACNE IN TEENAGE BOYS - Catherine Kinyanjui.docx',
    tags: ['skincare', 'confidence', 'puberty', 'boys'],
    isPublished: true,
    publishedDate: '2025-06-29'
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
    folder: 'babylon',
    wordDoc: 'COVER STORY_ BOYLAN SISTERS.docx',
    tags: ['leadership', 'constitution', 'advocacy', 'sisters'],
    isPublished: true,
    publishedDate: '2025-06-25'
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
    folder: 'teen ceo',
    wordDoc: 'TEEN CEO.docx',
    tags: ['business', 'entrepreneur', 'startup', 'success'],
    isPublished: true,
    publishedDate: '2025-06-20'
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
    folder: 'savings',
    wordDoc: 'SAVINGS-Makenya.docx',
    tags: ['money', 'savings', 'budgeting', 'financial literacy'],
    isPublished: true,
    publishedDate: '2025-06-18'
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
    folder: 'self-esteem',
    wordDoc: 'Boost Your Self-Esteem.docx',
    tags: ['self-esteem', 'confidence', 'mental health', 'positivity'],
    isPublished: true,
    publishedDate: '2025-06-16'
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
    folder: 'relationships',
    wordDoc: 'Relationships.docx',
    tags: ['relationships', 'love', 'boundaries', 'dating'],
    isPublished: true,
    publishedDate: '2025-06-14'
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
    folder: 'body-oduor',
    wordDoc: 'Body Odour.docx',
    tags: ['hygiene', 'puberty', 'body changes', 'confidence'],
    isPublished: true,
    publishedDate: '2025-06-12'
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
    folder: 'bully',
    wordDoc: 'Bully proof.docx',
    tags: ['bullying', 'resilience', 'safety', 'school'],
    isPublished: true,
    publishedDate: '2025-06-10'
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
    folder: 'career',
    wordDoc: 'In their FootSteps.docx',
    tags: ['career', 'guidance', 'professionals', 'future'],
    isPublished: true,
    publishedDate: '2025-06-08'
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
    folder: 'Ride or die',
    wordDoc: 'RIDE OR DIE- By Faith Bwari.doc',
    tags: ['friendship', 'loyalty', 'boundaries', 'relationships'],
    isPublished: true,
    publishedDate: '2025-06-06'
  }
];

// CATEGORY CONFIGURATION - Beautiful colors and emojis
export const CATEGORIES = [
  { 
    name: 'ALL', 
    color: 'from-gray-700 to-gray-900', 
    emoji: '🔥', 
    description: 'All our amazing content'
  },
  { 
    name: 'SELF-CARE', 
    color: 'from-blue-500 to-purple-600', 
    emoji: '💪', 
    description: 'Mental health, hygiene & confidence'
  },
  { 
    name: 'LEADERSHIP', 
    color: 'from-red-500 to-pink-600', 
    emoji: '👑', 
    description: 'Inspiring leaders and advocacy'
  },
  { 
    name: 'BUSINESS', 
    color: 'from-purple-500 to-indigo-600', 
    emoji: '💼', 
    description: 'Entrepreneurship and business skills'
  },
  { 
    name: 'MONEY', 
    color: 'from-green-500 to-emerald-600', 
    emoji: '💰', 
    description: 'Financial literacy and smart money habits'
  },
  { 
    name: 'LIFESTYLE', 
    color: 'from-orange-500 to-yellow-600', 
    emoji: '🌟', 
    description: 'Life skills and personal development'
  },
  { 
    name: 'RELATIONSHIPS', 
    color: 'from-pink-500 to-rose-600', 
    emoji: '❤️', 
    description: 'Love, friendship and social connections'
  },
  { 
    name: 'EDUCATION', 
    color: 'from-indigo-500 to-blue-600', 
    emoji: '📚', 
    description: 'Learning, career guidance and academic success'
  }
];

// UTILITY FUNCTIONS
export const getFeaturedArticles = () => ARTICLES.filter(article => article.featured);
export const getRegularArticles = () => ARTICLES.filter(article => !article.featured);
export const getArticlesByCategory = (category) => 
  category === 'ALL' ? ARTICLES : ARTICLES.filter(article => article.category === category);

export const getArticleById = (id) => ARTICLES.find(article => article.id === parseInt(id));

export const getCategoryConfig = (categoryName) => 
  CATEGORIES.find(cat => cat.name === categoryName) || CATEGORIES[0];

export const getArticleCount = (category = 'ALL') => {
  if (category === 'ALL') return ARTICLES.length;
  return ARTICLES.filter(article => article.category === category).length;
};

export const searchArticles = (searchTerm) => {
  if (!searchTerm) return ARTICLES;
  
  const term = searchTerm.toLowerCase();
  return ARTICLES.filter(article => 
    article.title.toLowerCase().includes(term) ||
    article.excerpt.toLowerCase().includes(term) ||
    article.author.toLowerCase().includes(term) ||
    article.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

export const filterArticles = (category = 'ALL', searchTerm = '') => {
  let filtered = getArticlesByCategory(category);
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.author.toLowerCase().includes(term) ||
      article.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }
  
  return filtered;
};

// MOCK CONTENT GENERATION (for development)
export const generateMockContent = (article) => {
  return `
    <div class="article-content">
      <h1>${article.title}</h1>
      
      <div class="article-meta">
        <p><strong>By:</strong> ${article.author}</p>
        <p><strong>Published:</strong> ${article.date}</p>
        <p><strong>Reading Time:</strong> ${article.readTime} minutes</p>
        <p><strong>Category:</strong> ${article.category}</p>
      </div>

      <div class="article-excerpt">
        <blockquote>${article.excerpt}</blockquote>
      </div>

      <div class="article-body">
        <p>This is where the full article content would be displayed. The content would be loaded from the Word document: <strong>${article.wordDoc}</strong></p>
        
        <p>This article covers important topics related to <strong>${article.category.toLowerCase()}</strong> and provides valuable insights for Kenyan teenagers.</p>
        
        <h2>Key Takeaways</h2>
        <ul>
          <li>Practical advice for young people</li>
          <li>Real-world examples and case studies</li>
          <li>Actionable steps teens can take</li>
          <li>Expert insights and research</li>
        </ul>

        <h2>Why This Matters</h2>
        <p>At Teendom, we believe in empowering young Kenyans with knowledge and tools they need to succeed. This article is part of our mission to provide high-quality, relevant content that speaks directly to the teenage experience.</p>
        
        <div class="call-to-action">
          <h3>What's Next?</h3>
          <p>Want to read more articles like this? Check out our other stories in the <strong>${article.category}</strong> category, or explore all our content to discover something new!</p>
        </div>
      </div>
      
      <div class="article-tags">
        <h4>Tags:</h4>
        ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
      </div>
    </div>
  `;
};