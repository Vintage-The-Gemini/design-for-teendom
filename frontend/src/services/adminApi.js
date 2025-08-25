// File: frontend/src/services/adminApi.js
// FIXED: Uses your existing environment variables

class AdminApiService {
  constructor() {
    // FIXED: Use your existing REACT_APP_API_URL and add /api
    const baseUrl = import.meta.env?.VITE_API_URL || 
                   import.meta.env?.REACT_APP_API_URL || 
                   'http://localhost:5000';
    
    // Ensure we have /api at the end
    this.baseURL = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    this.token = localStorage.getItem('adminToken');
    
    console.log('🔗 AdminAPI initialized with baseURL:', this.baseURL);
  }

  // Token management
  setToken(token) {
    this.token = token;
    localStorage.setItem('adminToken', token);
  }

  getToken() {
    return this.token || localStorage.getItem('adminToken');
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  // Generic request method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    console.log(`🌐 Making request to: ${url}`);

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(data.message || `Route ${endpoint} not found`);
      }

      return data;
    } catch (error) {
      console.error(`❌ Admin API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Form data request method for file uploads
  async makeFormRequest(endpoint, formData, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
      body: formData,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          throw new Error('Session expired. Please login again.');
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

  // === AWARDS MANAGEMENT ===
  async getAwards(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/awards${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async createAward(awardData) {
    return this.makeRequest('/admin/awards', {
      method: 'POST',
      body: JSON.stringify(awardData),
    });
  }

  async updateAward(id, awardData) {
    return this.makeRequest(`/admin/awards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(awardData),
    });
  }

  async deleteAward(id) {
    return this.makeRequest(`/admin/awards/${id}`, {
      method: 'DELETE',
    });
  }

  async getAwardsStats() {
    return this.makeRequest('/admin/awards/stats');
  }

  // === NOMINATIONS MANAGEMENT ===
  async getNominations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/nominations${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getNomination(id) {
    return this.makeRequest(`/admin/nominations/${id}`);
  }

  async updateNominationStatus(id, status, notes = '', sendNotification = true) {
    return this.makeRequest(`/admin/nominations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ 
        status, 
        notes, 
        sendNotification 
      }),
    });
  }

  async bulkNominationAction(nominationIds, action, notes = '', sendNotifications = true) {
    return this.makeRequest('/admin/nominations/bulk-action', {
      method: 'POST',
      body: JSON.stringify({
        nominationIds,
        action,
        notes,
        sendNotifications
      }),
    });
  }

  async deleteNomination(id) {
    return this.makeRequest(`/admin/nominations/${id}`, {
      method: 'DELETE',
    });
  }

  async getNominationFiles(id) {
    return this.makeRequest(`/admin/nominations/${id}/files`);
  }

  async getNominationStats() {
    return this.makeRequest('/admin/nominations/stats');
  }

  // === JUDGES MANAGEMENT ===
  async getJudges() {
    return this.makeRequest('/admin/awards/judges');
  }

  async createJudge(judgeData) {
    return this.makeRequest('/admin/awards/judges', {
      method: 'POST',
      body: JSON.stringify(judgeData),
    });
  }

  async updateJudge(id, judgeData) {
    return this.makeRequest(`/admin/awards/judges/${id}`, {
      method: 'PUT',
      body: JSON.stringify(judgeData),
    });
  }

  async deleteJudge(id) {
    return this.makeRequest(`/admin/awards/judges/${id}`, {
      method: 'DELETE',
    });
  }

  // === VOTING MANAGEMENT ===
  async getVotingStats() {
    return this.makeRequest('/admin/awards/voting/stats');
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