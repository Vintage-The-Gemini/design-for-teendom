// File: frontend/src/services/api.js
// API service for communicating with the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
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

  // Get all articles
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/articles${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
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
    return this.makeRequest(`/articles/${id}`);
  }

  // Increment article views
  async incrementViews(id) {
    return this.makeRequest(`/articles/${id}/view`, {
      method: 'PATCH',
    });
  }

  // Create article (for testing)
  async createArticle(articleData) {
    return this.makeRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  // Health check
  async healthCheck() {
    try {
      return this.makeRequest('/health');
    } catch (error) {
      console.error('❌ Backend health check failed:', error);
      throw new Error('Backend is not available. Make sure the server is running on port 5000.');
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;