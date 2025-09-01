// File: frontend/src/services/adminApi.js

import { API_BASE_URL } from '../config/api';

class AdminApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
    console.log('🔗 AdminAPI initialized with baseURL:', this.baseURL);
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const token = localStorage.getItem('adminToken');
      const url = `${this.baseURL}${endpoint}`;
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      if (options.body instanceof FormData) {
        delete config.headers['Content-Type'];
      }

      console.log(`🌐 Admin API Request: ${config.method || 'GET'} ${url}`);

      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP ${response.status}` };
        }
        
        if (response.status === 401) {
          this.removeToken();
          throw new Error('Authentication required');
        }
        
        throw new Error(errorData.message || `Request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Admin API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication
  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  }

  removeToken() {
    localStorage.removeItem('adminToken');
  }

  setToken(token) {
    localStorage.setItem('adminToken', token);
  }

  async login(credentials) {
    const response = await this.makeRequest('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response?.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.makeRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.warn('Logout API failed:', error);
    }
    this.removeToken();
    return { success: true };
  }

  async getCurrentUser() {
    return this.makeRequest('/auth/me');
  }

  // Nominations
  async getNominations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/nominations${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getNomination(id) {
    return this.makeRequest(`/admin/nominations/${id}`);
  }

  async updateNominationStatus(id, status, notes = '') {
    console.log('🔄 AdminAPI: Updating nomination status', { id, status, notes });
    
    const response = await this.makeRequest(`/admin/nominations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });

    console.log('✅ AdminAPI: Status update response:', response);
    return response;
  }

  async deleteNomination(id) {
    return this.makeRequest(`/admin/nominations/${id}`, {
      method: 'DELETE',
    });
  }

  async getNominationStats() {
    try {
      return await this.makeRequest('/admin/nominations/stats');
    } catch (error) {
      console.error('Stats fetch failed:', error);
      return {
        status: 'success',
        data: { total: 0, pending: 0, approved: 0, rejected: 0, needsInfo: 0 }
      };
    }
  }

  // Articles (missing methods causing the other error)
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/articles${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getArticle(id) {
    return this.makeRequest(`/admin/articles/${id}`);
  }

  async createArticle(articleData) {
    return this.makeRequest('/admin/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  async updateArticle(id, articleData) {
    return this.makeRequest(`/admin/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  }

  async deleteArticle(id) {
    return this.makeRequest(`/admin/articles/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleArticlePublished(id) {
    return this.makeRequest(`/admin/articles/${id}/toggle-published`, {
      method: 'PATCH',
    });
  }

  async toggleArticleFeatured(id) {
    return this.makeRequest(`/admin/articles/${id}/toggle-featured`, {
      method: 'PATCH',
    });
  }

  // Categories
  async getCategories() {
    return this.makeRequest('/admin/categories');
  }

  async createCategory(categoryData) {
    return this.makeRequest('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(id, categoryData) {
    return this.makeRequest(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id) {
    return this.makeRequest(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // System
  async getSystemStats() {
    return this.makeRequest('/admin/system/stats');
  }

  async clearCache() {
    return this.makeRequest('/admin/system/cache', {
      method: 'DELETE',
    });
  }

  // Test connection
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      if (!response.ok) {
        throw new Error(`Backend unreachable: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Backend connection failed:', error);
      throw error;
    }
  }
}

const adminApi = new AdminApiService();
export default adminApi;