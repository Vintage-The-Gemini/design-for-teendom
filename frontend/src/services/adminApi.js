// File: frontend/src/services/adminApi.js - COMPLETE FIX
import { API_BASE_URL } from '../config/api';

class AdminApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
    console.log('🔗 AdminAPI initialized with baseURL:', this.baseURL);
  }

  // Generic request method with auth and better error handling
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

      // Don't set Content-Type for FormData (let browser set it with boundary)
      if (options.body instanceof FormData) {
        delete config.headers['Content-Type'];
      }

      console.log(`🌐 Admin API Request: ${config.method || 'GET'} ${url}`);

      const response = await fetch(url, config);
      
      // Handle different HTTP status codes
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          console.warn('❌ Unauthorized - clearing token');
          this.removeToken();
          window.location.href = '/admin';
          return null;
        }
        
        if (response.status === 403) {
          throw new Error('Access denied. Insufficient permissions.');
        }
        
        if (response.status === 404) {
          throw new Error(`Resource not found: ${endpoint}`);
        }
        
        if (response.status >= 500) {
          throw new Error(`Server error: ${errorData.message || 'Internal server error'}`);
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`❌ Admin API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // MISSING AUTHENTICATION FUNCTIONS - FIXED
  
  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('adminToken');
    return !!token;
  }

  // Remove authentication token
  removeToken() {
    localStorage.removeItem('adminToken');
  }

  // Set authentication token
  setToken(token) {
    localStorage.setItem('adminToken', token);
  }

  // Get current token
  getToken() {
    return localStorage.getItem('adminToken');
  }

  // Test connection to backend
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      if (!response.ok) {
        throw new Error(`Backend unreachable: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ Backend connection test successful:', data);
      return data;
    } catch (error) {
      console.error('❌ Backend connection test failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }

  // Authentication
  async login(credentials) {
    try {
      console.log('🔐 Attempting admin login...');
      const response = await this.makeRequest('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      if (response?.token) {
        this.setToken(response.token);
        console.log('✅ Admin login successful');
      }
      
      return response;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      // Call logout endpoint if available
      await this.makeRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.warn('⚠️ Logout API call failed:', error);
    }
    
    this.removeToken();
    console.log('📤 Admin logged out');
    return { success: true };
  }

  async getCurrentUser() {
    return this.makeRequest('/auth/me');
  }

  // CLOUDINARY IMAGE UPLOAD FUNCTION
  async uploadImageToCloudinary(file, folder = 'articles') {
    try {
      console.log('📤 Uploading image to Cloudinary...');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'teendom_uploads'); // Your Cloudinary upload preset
      formData.append('folder', `teendom-awards/${folder}`);

      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dbidxxqxr/image/upload';
      
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      console.log('✅ Image uploaded successfully:', data.secure_url);
      
      return {
        success: true,
        url: data.secure_url,
        public_id: data.public_id,
        width: data.width,
        height: data.height
      };
    } catch (error) {
      console.error('❌ Cloudinary upload failed:', error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  // Articles Management
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/articles${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getArticle(id) {
    return this.makeRequest(`/admin/articles/${id}`);
  }

  async createArticle(articleData) {
    console.log('📝 Creating article:', articleData);
    return this.makeRequest('/admin/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  async updateArticle(id, articleData) {
    console.log('📝 Updating article:', id, articleData);
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

  // System Management
  async getSystemStats() {
    return this.makeRequest('/admin/system/stats');
  }

  async clearCache() {
    return this.makeRequest('/admin/system/cache', {
      method: 'DELETE',
    });
  }

  async getSystemLogs() {
    return this.makeRequest('/admin/system/logs');
  }

  // Utility method to validate image file
  validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload JPG, PNG, or WebP images only.');
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Please upload images smaller than 5MB.');
    }

    return true;
  }

  // Complete article creation with image upload
  async createArticleWithImage(articleData, imageFile = null) {
    try {
      let imageUrl = articleData.image;

      // Upload image to Cloudinary if provided
      if (imageFile) {
        console.log('📤 Uploading article image...');
        this.validateImageFile(imageFile);
        
        const uploadResult = await this.uploadImageToCloudinary(imageFile, 'articles');
        imageUrl = uploadResult.url;
        console.log('✅ Article image uploaded:', imageUrl);
      }

      // Create article with image URL
      const finalArticleData = {
        ...articleData,
        image: imageUrl
      };

      return await this.createArticle(finalArticleData);
    } catch (error) {
      console.error('❌ Error creating article with image:', error);
      throw error;
    }
  }

  // Complete article update with image upload
  async updateArticleWithImage(id, articleData, imageFile = null) {
    try {
      let imageUrl = articleData.image;

      // Upload new image to Cloudinary if provided
      if (imageFile) {
        console.log('📤 Uploading new article image...');
        this.validateImageFile(imageFile);
        
        const uploadResult = await this.uploadImageToCloudinary(imageFile, 'articles');
        imageUrl = uploadResult.url;
        console.log('✅ New article image uploaded:', imageUrl);
      }

      // Update article with new image URL
      const finalArticleData = {
        ...articleData,
        image: imageUrl
      };

      return await this.updateArticle(id, finalArticleData);
    } catch (error) {
      console.error('❌ Error updating article with image:', error);
      throw error;
    }
  }
}

// Create and export single instance
const adminApi = new AdminApiService();
export default adminApi;