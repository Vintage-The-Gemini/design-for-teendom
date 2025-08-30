// File: /frontend/src/services/api.js
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

  // Get all articles
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/articles${queryString ? `?${queryString}` : ''}`;
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
        throw new Error(`Backend is not available at ${this.baseURL}. Tried /api/health and /health`);
      }
    }
  }

  // Nominations API
  async submitNomination(formData) {
    try {
      const url = `${this.baseURL}/api/nominations`;
      console.log(`🚀 Submitting nomination to: ${url}`);
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData // FormData should not have Content-Type header
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }
      
      console.log('✅ Nomination submitted successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Nomination submission failed:', error);
      throw error;
    }
  }

  // Get nominations (admin)
  async getNominations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/admin/nominations${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;