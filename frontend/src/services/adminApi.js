// File: /frontend/src/services/adminApi.js
import { API_BASE_URL } from '../config/api';

class AdminApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
    console.log('🔗 AdminAPI initialized with baseURL:', this.baseURL);
  }

  // Generic request method with auth
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

      console.log(`🌐 Admin API Request: ${config.method || 'GET'} ${url}`);

      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          window.location.href = '/admin/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ Admin API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }

  // Authentication
  async login(credentials) {
    return this.makeRequest('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    localStorage.removeItem('adminToken');
    return { success: true };
  }

  async getCurrentUser() {
    return this.makeRequest('/auth/me');
  }

  // Nominations Management
  async getNominations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/nominations${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getNomination(id) {
    return this.makeRequest(`/admin/nominations/${id}`);
  }

  async updateNominationStatus(id, status, notes = '') {
    return this.makeRequest(`/admin/nominations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  }

  async deleteNomination(id) {
    return this.makeRequest(`/admin/nominations/${id}`, {
      method: 'DELETE',
    });
  }

  async getNominationStats() {
    return this.makeRequest('/admin/nominations/stats');
  }

  async exportNominations(format = 'csv') {
    return this.makeRequest(`/admin/nominations/export?format=${format}`);
  }

  // Articles Management (if exists)
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

  // Categories Management
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

  // Dashboard Stats
  async getDashboardStats() {
    return this.makeRequest('/admin/dashboard/stats');
  }

  // File Management
  async uploadFile(formData, type = 'general') {
    try {
      const url = `${this.baseURL}/admin/upload/${type}`;
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData, // Don't set Content-Type for FormData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ File upload failed:', error);
      throw error;
    }
  }

  // Bulk Operations
  async bulkUpdateNominations(ids, action, data = {}) {
    return this.makeRequest('/admin/nominations/bulk', {
      method: 'PATCH',
      body: JSON.stringify({ ids, action, data }),
    });
  }

  async bulkDeleteNominations(ids) {
    return this.makeRequest('/admin/nominations/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  }

  // System Management
  async getSystemInfo() {
    return this.makeRequest('/admin/system/info');
  }

  async getSystemLogs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/system/logs${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async clearCache() {
    return this.makeRequest('/admin/system/clear-cache', {
      method: 'POST',
    });
  }

  // Settings Management
  async getSettings() {
    return this.makeRequest('/admin/settings');
  }

  async updateSettings(settings) {
    return this.makeRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }
}

// Create and export a singleton instance
const adminApi = new AdminApiService();
export default adminApi;