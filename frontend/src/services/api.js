// File: frontend/src/services/api.js
import { API_BASE_URL } from '../config/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('🔧 ApiService initialized with baseURL:', this.baseURL);
  }

  // Generic request method
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      console.log(`🌐 API Request: ${config.method || 'GET'} ${url}`);

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API Response:`, data);
      
      return data;
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get all articles with filtering
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/articles${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  // FIXED: Get all published articles (this method was missing)
  async getPublishedArticles(limit = 20) {
    return this.getArticles({ limit, published: 'true' });
  }

  // Get featured articles
  async getFeaturedArticles(limit = 3) {
    return this.getArticles({ featured: 'true', limit });
  }

  // Get regular (non-featured) articles
  async getRegularArticles(limit = 6) {
    return this.getArticles({ featured: 'false', limit });
  }

  // Get articles by category
  async getArticlesByCategory(category, limit = 20) {
    return this.getArticles({ category, limit });
  }

  // Get single article
  async getArticle(id) {
    return this.makeRequest(`/api/articles/${id}`);
  }

  // Increment article views
  async incrementViews(id) {
    return this.makeRequest(`/api/articles/${id}/view`, {
      method: 'PATCH',
    });
  }

  // Create article (for testing)
  async createArticle(articleData) {
    return this.makeRequest('/api/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  // Health check - FIXED: Try both endpoints
  async healthCheck() {
    try {
      // Try /api/health first (most likely)
      return await this.makeRequest('/api/health');
    } catch (error) {
      try {
        // Fallback to /health
        return await this.makeRequest('/health');
      } catch (fallbackError) {
        console.error('❌ Backend health check failed on both endpoints:', error, fallbackError);
        throw new Error(`Backend is not available at ${this.baseURL}. Please ensure the backend server is running.`);
      }
    }
  }

  // ADDED: Quick connection test without throwing errors
  async testConnection() {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      return false;
    }
  }

  // ADDED: Get sample articles for immediate rendering
  getSampleArticles(featured = false, count = 6) {
    const sampleArticles = [
      {
        _id: '68a2ea98750b88025fffcca6',
        title: 'HOW TO STAY WISE ABOUT YOUR CENTS',
        category: 'MONEY',
        author: 'Linet Makenya',
        excerpt: "Category: Money THERE 'S A REDLINE BETWEEN SAVINGS AND FOMO! Have you ever found yourself in a situation where you want something so bad but you can't afford it? This guide will help you navigate financial decisions as a teenager and build healthy money habits that will serve you for life.",
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
        readTime: 2,
        views: 1900,
        featured: false,
        published: true,
        tags: ['money', 'savings', 'financial-literacy', 'teens'],
        content: `
          <h2>The Challenge of Teen Spending</h2>
          <p>As a teenager, you're constantly bombarded with messages about what you should buy, wear, or own. Social media doesn't make it any easier, with influencers showcasing the latest trends and your friends posting about their newest purchases.</p>
          
          <h2>Understanding FOMO vs. Smart Spending</h2>
          <p>Fear of Missing Out (FOMO) is real, especially when it comes to money. But here's the truth: smart spending isn't about depriving yourself—it's about making intentional choices.</p>
          
          <h2>Building Your Money Foundation</h2>
          <p>Start with these three simple steps:</p>
          <ul>
            <li>Track your spending for one week</li>
            <li>Identify your wants vs. needs</li>
            <li>Set one small savings goal</li>
          </ul>
          
          <p>Remember, every financial expert started exactly where you are now. The habits you build today will determine your financial freedom tomorrow.</p>
        `,
        createdAt: '2025-08-18T08:55:52.956+00:00'
      },
      {
        _id: '68a2ea98750b88025fffcca7',
        title: 'BOOST YOUR SELF-ESTEEM',
        category: 'SELF-CARE',
        author: 'Mental Health Team',
        excerpt: 'Category: Self Care How to develop a healthy self-esteem It is common to have days when you don\'t feel good about yourself. This comprehensive guide will help you build lasting confidence and develop a positive relationship with yourself.',
        image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop',
        readTime: 3,
        views: 2400,
        featured: true,
        published: true,
        tags: ['self-care', 'confidence', 'mental-health', 'personal-growth'],
        content: `
          <h2>Understanding Self-Esteem</h2>
          <p>Self-esteem is how you feel about yourself. It's not about being perfect—it's about accepting yourself while striving to grow.</p>
          
          <h2>Signs of Healthy Self-Esteem</h2>
          <p>People with healthy self-esteem typically:</p>
          <ul>
            <li>Feel comfortable with who they are</li>
            <li>Can handle criticism constructively</li>
            <li>Don't fear failure</li>
            <li>Celebrate their successes</li>
          </ul>
          
          <h2>Daily Practices for Building Confidence</h2>
          <p>Try incorporating these habits into your routine:</p>
          <ul>
            <li>Practice positive self-talk</li>
            <li>Set achievable daily goals</li>
            <li>Celebrate small wins</li>
            <li>Surround yourself with supportive people</li>
          </ul>
          
          <p>Remember, building self-esteem is a journey, not a destination. Be patient with yourself as you grow.</p>
        `,
        createdAt: '2025-08-17T10:30:22.123+00:00'
      },
      {
        _id: '68a2ea98750b88025fffcca8',
        title: 'TEEN LEADERSHIP IN ACTION',
        category: 'LEADERSHIP',
        author: 'Leadership Team',
        excerpt: 'Real stories of young Kenyans making a difference in their communities. From environmental conservation to education initiatives, discover how teenagers are leading change and how you can join the movement.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
        readTime: 5,
        views: 1800,
        featured: true,
        published: true,
        tags: ['leadership', 'community', 'youth-empowerment', 'social-change'],
        content: `
          <h2>Young Leaders Making a Difference</h2>
          <p>Across Kenya, teenagers are stepping up to address challenges in their communities. Their stories inspire us all.</p>
          
          <h2>Grace's Environmental Mission</h2>
          <p>At just 16, Grace Wanjiku started a tree-planting initiative in Kiambu County that has planted over 5,000 trees. Her secret? Starting small and building partnerships.</p>
          
          <h2>The Power of Youth Leadership</h2>
          <p>What makes young leaders effective:</p>
          <ul>
            <li>Fresh perspectives on old problems</li>
            <li>Natural ability to mobilize peers</li>
            <li>Fearless approach to innovation</li>
            <li>Deep understanding of their generation's needs</li>
          </ul>
          
          <h2>How to Start Your Leadership Journey</h2>
          <p>Every leader starts somewhere:</p>
          <ol>
            <li>Identify a problem you care about</li>
            <li>Start with one small action</li>
            <li>Find others who share your vision</li>
            <li>Keep learning and adapting</li>
          </ol>
        `,
        createdAt: '2025-08-16T14:20:33.444+00:00'
      },
      {
        _id: '68a2ea98750b88025fffcca9',
        title: 'BUILDING HEALTHY RELATIONSHIPS',
        category: 'RELATIONSHIPS',
        author: 'Social Team',
        excerpt: 'How to maintain healthy boundaries and communicate effectively with friends and family. Learn the key skills for building lasting, meaningful relationships during your teenage years.',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
        readTime: 4,
        views: 2100,
        featured: false,
        published: true,
        tags: ['relationships', 'communication', 'boundaries', 'friendship'],
        content: `
          <h2>The Foundation of Healthy Relationships</h2>
          <p>Whether with family, friends, or romantic partners, healthy relationships share common characteristics: respect, communication, and boundaries.</p>
          
          <h2>Setting Boundaries</h2>
          <p>Boundaries aren't walls—they're guidelines that help maintain healthy relationships:</p>
          <ul>
            <li>Be clear about your limits</li>
            <li>Communicate your needs respectfully</li>
            <li>Respect others' boundaries too</li>
            <li>Don't feel guilty for having standards</li>
          </ul>
          
          <h2>Effective Communication</h2>
          <p>Good communication is a skill you can develop:</p>
          <ul>
            <li>Listen actively</li>
            <li>Express yourself clearly</li>
            <li>Ask questions when you don't understand</li>
            <li>Address conflicts directly but respectfully</li>
          </ul>
        `,
        createdAt: '2025-08-15T09:15:45.567+00:00'
      },
      {
        _id: '68a2ea98750b88025fffccaa',
        title: 'ACADEMIC SUCCESS STRATEGIES',
        category: 'EDUCATION',
        author: 'Education Team',
        excerpt: 'Proven study techniques and time management strategies for academic success. Learn how to excel in your studies while maintaining balance in other areas of your life.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
        readTime: 6,
        views: 3200,
        featured: true,
        published: true,
        tags: ['education', 'study-tips', 'time-management', 'academic-success'],
        content: `
          <h2>The Science of Effective Learning</h2>
          <p>Not all study methods are created equal. Research shows that some techniques are far more effective than others.</p>
          
          <h2>Top Study Techniques</h2>
          <ul>
            <li><strong>Active Recall:</strong> Test yourself instead of just re-reading</li>
            <li><strong>Spaced Repetition:</strong> Review material at increasing intervals</li>
            <li><strong>The Feynman Technique:</strong> Explain concepts in simple terms</li>
            <li><strong>Pomodoro Technique:</strong> Study in focused 25-minute blocks</li>
          </ul>
          
          <h2>Time Management for Students</h2>
          <p>Balance is key to sustainable academic success:</p>
          <ul>
            <li>Create a realistic study schedule</li>
            <li>Prioritize tasks by importance and urgency</li>
            <li>Include breaks and leisure time</li>
            <li>Review and adjust your approach regularly</li>
          </ul>
        `,
        createdAt: '2025-08-14T16:45:12.789+00:00'
      },
      {
        _id: '68a2ea98750b88025fffccab',
        title: 'ENTREPRENEURSHIP FOR TEENS',
        category: 'BUSINESS',
        author: 'Business Team',
        excerpt: 'Young entrepreneurs are changing the game. Discover how you can start your first business, from identifying opportunities to taking your first steps as a teen entrepreneur.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
        readTime: 7,
        views: 2700,
        featured: false,
        published: true,
        tags: ['business', 'entrepreneurship', 'teen-business', 'innovation'],
        content: `
          <h2>The Teen Advantage in Business</h2>
          <p>As a teenager, you have unique advantages in the business world: fresh perspectives, digital nativity, and fewer limiting beliefs.</p>
          
          <h2>Successful Teen Entrepreneurs</h2>
          <p>Many successful businesses were started by teenagers:</p>
          <ul>
            <li>Facebook (Mark Zuckerberg at 19)</li>
            <li>Dell (Michael Dell at 19)</li>
            <li>WordPress (Matt Mullenweg at 19)</li>
          </ul>
          
          <h2>Your First Business Steps</h2>
          <ol>
            <li>Identify a problem you can solve</li>
            <li>Validate your idea with potential customers</li>
            <li>Start small and learn from feedback</li>
            <li>Focus on providing real value</li>
            <li>Don't be afraid to pivot if needed</li>
          </ol>
          
          <h2>Resources for Teen Entrepreneurs</h2>
          <p>Take advantage of programs designed for young entrepreneurs, online courses, and mentorship opportunities in your community.</p>
        `,
        createdAt: '2025-08-13T11:30:55.234+00:00'
      },
      {
        _id: '68a2ea98750b88025fffccac',
        title: 'FINDING YOUR PASSION',
        category: 'LIFESTYLE',
        author: 'Lifestyle Team',
        excerpt: 'How to discover what truly motivates you and build a life around your passions. Explore different methods for uncovering your interests and turning them into meaningful pursuits.',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
        readTime: 5,
        views: 1950,
        featured: false,
        published: true,
        tags: ['passion', 'self-discovery', 'purpose', 'lifestyle'],
        content: `
          <h2>The Myth of "Finding" Your Passion</h2>
          <p>Contrary to popular belief, passion isn't just found—it's often developed through exploration and experience.</p>
          
          <h2>Ways to Explore Your Interests</h2>
          <ul>
            <li>Try new activities regularly</li>
            <li>Volunteer in different areas</li>
            <li>Shadow professionals in various fields</li>
            <li>Take online courses in subjects that intrigue you</li>
            <li>Join clubs and organizations</li>
          </ul>
          
          <h2>Signs You're on the Right Track</h2>
          <p>You might be developing a passion when:</p>
          <ul>
            <li>You lose track of time doing the activity</li>
            <li>You're willing to practice and improve</li>
            <li>You seek out related information naturally</li>
            <li>You enjoy discussing it with others</li>
          </ul>
          
          <h2>Building Your Passion Into Purpose</h2>
          <p>Once you identify your interests, look for ways to use them to help others or solve problems. This connection between passion and purpose creates lasting fulfillment.</p>
        `,
        createdAt: '2025-08-12T08:22:17.891+00:00'
      }
    ];

    // Filter by featured status if specified
    let filtered = featured !== null ? sampleArticles.filter(article => article.featured === featured) : sampleArticles;
    
    // Return the requested count
    return {
      status: 'success',
      results: Math.min(count, filtered.length),
      data: {
        articles: filtered.slice(0, count)
      }
    };
  }
}

// Export instance
const apiService = new ApiService();
export default apiService;