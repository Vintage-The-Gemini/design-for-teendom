// File: frontend/src/services/api.js
// API service to connect frontend with backend

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Generic fetch method
  async fetchData(endpoint) {
    try {
      console.log(`🌐 API Request: ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ API Response:`, data);
      return data;
    } catch (error) {
      console.error(`❌ API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Get all articles
  async getAllArticles(params = {}) {
    // Filter out undefined/null values
    const cleanParams = Object.entries(params)
      .filter(([key, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    const queryString = new URLSearchParams(cleanParams).toString();
    const endpoint = `/articles${queryString ? '?' + queryString : ''}`;
    return this.fetchData(endpoint);
  }

  // Get featured articles
  async getFeaturedArticles() {
    return this.getAllArticles({ featured: 'true' });
  }

  // Get regular (non-featured) articles
  async getRegularArticles(limit = 6) {
    return this.getAllArticles({ featured: 'false', limit });
  }

  // Get articles by category
  async getArticlesByCategory(category) {
    return this.getAllArticles({ category });
  }

  // Get single article
  async getArticle(id) {
    return this.fetchData(`/articles/${id}`);
  }

  // Search articles
  async searchArticles(searchTerm) {
    return this.getAllArticles({ search: searchTerm });
  }

  // Get article count by category
  async getArticleCount(category = 'ALL') {
    const response = await this.getAllArticles({ category: category === 'ALL' ? undefined : category });
    return response.results || 0;
  }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;

// Named exports for convenience
export const {
  getAllArticles,
  getFeaturedArticles,
  getRegularArticles,
  getArticlesByCategory,
  getArticle,
  searchArticles,
  getArticleCount
} = apiService;