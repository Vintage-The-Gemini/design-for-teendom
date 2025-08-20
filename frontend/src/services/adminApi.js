// File: frontend/src/services/adminApi.js
// API service for admin panel functionality

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class AdminApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('admin_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  // Get stored token
  getToken() {
    return this.token || localStorage.getItem('admin_token');
  }

  // Generic request method with auth
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const token = this.getToken();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      console.log(`🔐 Admin API Request: ${config.method || 'GET'} ${url}`);

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          throw new Error('Authentication failed. Please login again.');
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      console.log(`✅ Admin API Response:`, data);
      return data;
    } catch (error) {
      console.error(`❌ Admin API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Form data request (for file uploads)
  async makeFormRequest(endpoint, formData, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const token = this.getToken();

      const config = {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        body: formData,
        ...options,
      };

      console.log(`📤 Admin Form Request: ${config.method} ${url}`);

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          throw new Error('Authentication failed. Please login again.');
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`❌ Admin Form Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // === AUTHENTICATION ===
  async login(email, password) {
    const data = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.data?.token) {
      this.setToken(data.data.token);
    }
    
    return data;
  }

  async logout() {
    this.removeToken();
  }

  async getCurrentUser() {
    return this.makeRequest('/auth/me');
  }

  async updateProfile(profileData) {
    return this.makeRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.makeRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // === USER MANAGEMENT ===
  async getUsers() {
    return this.makeRequest('/auth/users');
  }

  async createUser(userData) {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUserStatus(userId, status) {
    return this.makeRequest(`/auth/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // === ARTICLES MANAGEMENT ===
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/articles${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getArticle(id) {
    return this.makeRequest(`/admin/articles/${id}`);
  }

  async createArticle(articleData, imageFile) {
    const formData = new FormData();
    
    // Add all article data to form
    Object.keys(articleData).forEach(key => {
      if (articleData[key] !== null && articleData[key] !== undefined) {
        formData.append(key, articleData[key]);
      }
    });

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.makeFormRequest('/admin/articles', formData);
  }

  async updateArticle(id, articleData, imageFile) {
    const formData = new FormData();
    
    // Add all article data to form
    Object.keys(articleData).forEach(key => {
      if (articleData[key] !== null && articleData[key] !== undefined) {
        formData.append(key, articleData[key]);
      }
    });

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.makeFormRequest(`/admin/articles/${id}`, formData, {
      method: 'PUT',
    });
  }

  async deleteArticle(id) {
    return this.makeRequest(`/admin/articles/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleArticleFeatured(id) {
    return this.makeRequest(`/admin/articles/${id}/toggle-featured`, {
      method: 'POST',
    });
  }

  async toggleArticlePublished(id) {
    return this.makeRequest(`/admin/articles/${id}/toggle-published`, {
      method: 'POST',
    });
  }

  async getArticleStats() {
    return this.makeRequest('/admin/articles/stats/overview');
  }

  // === CATEGORIES MANAGEMENT ===
  async getCategories() {
    return this.makeRequest('/admin/categories');
  }

  async getCategory(id) {
    return this.makeRequest(`/admin/categories/${id}`);
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

  async reorderCategories(categories) {
    return this.makeRequest('/admin/categories/reorder', {
      method: 'PUT',
      body: JSON.stringify({ categories }),
    });
  }

  async toggleCategoryStatus(id) {
    return this.makeRequest(`/admin/categories/${id}/toggle-status`, {
      method: 'POST',
    });
  }

  async seedDefaultCategories() {
    return this.makeRequest('/admin/categories/seed-defaults', {
      method: 'POST',
    });
  }

  // === UTILITY ===
  isAuthenticated() {
    return !!this.getToken();
  }

  async healthCheck() {
    try {
      return await this.makeRequest('/health');
    } catch (error) {
      throw new Error('Backend is not available. Make sure the server is running on port 5000.');
    }
  }
}

// Create and export a singleton instance
const adminApi = new AdminApiService();
export default adminApi;