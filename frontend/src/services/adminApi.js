// File: frontend/src/services/adminApi.js
// COMPLETE ADMIN API SERVICE - FIXED FOR PERFECT IMAGE HANDLING

class AdminApiService {
  constructor() {
    const baseUrl = import.meta.env?.VITE_API_URL || 
                   import.meta.env?.REACT_APP_API_URL || 
                   'http://localhost:5000';
    
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

  // FIXED: Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Basic JWT token validation (check if it's not expired)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp && payload.exp < currentTime) {
        this.removeToken();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      this.removeToken();
      return false;
    }
  }

  // Generic request method with better error handling
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

    console.log(`🌐 Admin API Request: ${config.method || 'GET'} ${url}`);
    if (config.body && config.method === 'POST') {
      console.log('📦 Request body:', config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          throw new Error('Session expired. Please login again.');
        }
        
        // Try to get error message from response
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        } catch {
          errorMessage = `HTTP error! status: ${response.status}`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(`✅ Admin API Response:`, data);
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
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          throw new Error('Session expired. Please login again.');
        }
        
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        } catch {
          errorMessage = `HTTP error! status: ${response.status}`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error(`❌ Admin Form API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // ============ AUTHENTICATION ============
  async login(emailOrCredentials, password) {
    let credentials;
    
    // Handle both calling patterns: login({email, password}) or login(email, password)
    if (typeof emailOrCredentials === 'string' && password) {
      credentials = { email: emailOrCredentials, password };
    } else {
      credentials = emailOrCredentials;
    }
    
    console.log('🚀 Sending login request with credentials for:', credentials.email);
    
    const response = await this.makeRequest('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      this.setToken(response.token);
      console.log('✅ Token saved successfully');
    }

    return response;
  }

  async logout() {
    this.removeToken();
    return { status: 'success', message: 'Logged out successfully' };
  }

  async verifyToken() {
    return this.makeRequest('/auth/verify');
  }

  // ============ NOMINATIONS MANAGEMENT ============
  
  // Get all nominations with enhanced image data
  async getNominations(filters = {}) {
    const params = new URLSearchParams({
      page: filters.page || 1,
      limit: filters.limit || 20,
      ...(filters.status && filters.status !== 'all' && { status: filters.status }),
      ...(filters.category && filters.category !== 'all' && { category: filters.category }),
      ...(filters.adminStatus && filters.adminStatus !== 'all' && { adminStatus: filters.adminStatus }),
      ...(filters.search && { search: filters.search }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
    });

    const response = await this.makeRequest(`/admin/nominations?${params}`);
    
    // ENHANCED: Log image data availability for debugging
    if (response.data?.nominations) {
      console.log('📊 Nominations image availability summary:');
      const imageStats = response.data.nominations.reduce((stats, nomination) => {
        const hasCloudinary = !!nomination.cloudinary?.photo?.url;
        const hasAdminUrl = !!nomination.adminAccessUrls?.nomineePhoto;
        const hasLocalFile = !!nomination.files?.photo?.filename;
        
        if (hasCloudinary) stats.cloudinary++;
        if (hasAdminUrl) stats.adminUrl++;
        if (hasLocalFile) stats.localFile++;
        if (!hasCloudinary && !hasAdminUrl && !hasLocalFile) stats.noImage++;
        
        return stats;
      }, { cloudinary: 0, adminUrl: 0, localFile: 0, noImage: 0 });
      
      console.log('  📈 Image stats:', imageStats);
    }
    
    return response;
  }

  // Get single nomination with full image data
  async getNomination(id) {
    const response = await this.makeRequest(`/admin/nominations/${id}`);
    
    // Enhanced logging for single nomination image data
    if (response.data?.nomination) {
      const nomination = response.data.nomination;
      console.log('🖼️ Single nomination image data:', {
        id: nomination.submissionId,
        cloudinary: !!nomination.cloudinary?.photo?.url,
        adminUrl: !!nomination.adminAccessUrls?.nomineePhoto,
        localFile: !!nomination.files?.photo?.filename,
        resolvedUrl: this.resolveImageUrl(nomination)
      });
    }
    
    return response;
  }

  // Update nomination status
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

  // Delete nomination
  async deleteNomination(id) {
    return this.makeRequest(`/admin/nominations/${id}`, {
      method: 'DELETE',
    });
  }

  // Bulk actions on nominations
  async bulkNominationAction(nominationIds, action, notes = '') {
    return this.makeRequest('/admin/nominations/bulk-action', {
      method: 'POST',
      body: JSON.stringify({
        nominationIds,
        action,
        notes
      }),
    });
  }

  // Get nomination statistics
  async getNominationStats() {
    return this.makeRequest('/admin/nominations/stats');
  }

  // ENHANCED: Get image URL with all fallbacks (helper method)
  resolveImageUrl(nomination, baseUrl = 'http://localhost:5000') {
    if (!nomination) return null;
    
    console.log('🔍 Resolving image URL for:', nomination.submissionId || 'unknown');
    
    // Priority 1: Cloudinary CDN (best performance)
    if (nomination.cloudinary?.photo?.url) {
      console.log('✅ Using Cloudinary URL');
      return nomination.cloudinary.photo.url;
    }
    
    // Priority 2: Admin access URLs
    if (nomination.adminAccessUrls?.nomineePhoto) {
      const adminUrl = nomination.adminAccessUrls.nomineePhoto;
      const fullUrl = adminUrl.startsWith('http') ? adminUrl : `${baseUrl}${adminUrl}`;
      console.log('✅ Using admin access URL:', fullUrl);
      return fullUrl;
    }
    
    // Priority 3: Local server file
    if (nomination.files?.photo?.filename) {
      const localUrl = `${baseUrl}/uploads/nominations/${nomination.files.photo.filename}`;
      console.log('✅ Using local file URL:', localUrl);
      return localUrl;
    }
    
    // Priority 4: Direct file URL (avoid blob URLs)
    if (nomination.files?.photo?.url && !nomination.files.photo.url.startsWith('blob:')) {
      const fileUrl = nomination.files.photo.url.startsWith('http') 
        ? nomination.files.photo.url 
        : `${baseUrl}${nomination.files.photo.url}`;
      console.log('✅ Using file URL:', fileUrl);
      return fileUrl;
    }
    
    console.log('❌ No valid image URL found');
    return null;
  }

  // Test image accessibility
  async testImageUrl(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Image test failed:', error);
      return false;
    }
  }

  // Get comprehensive file information for a nomination
  async getNominationFiles(id) {
    return this.makeRequest(`/admin/nominations/${id}/files`);
  }

  // ============ ARTICLES MANAGEMENT ============
  async getArticles(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.makeRequest(`/admin/articles?${params}`);
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
      method: 'PATCH',
      body: JSON.stringify(articleData),
    });
  }

  async deleteArticle(id) {
    return this.makeRequest(`/admin/articles/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadArticleImage(formData) {
    return this.makeFormRequest('/admin/articles/upload-image', formData);
  }

  // ============ CATEGORIES MANAGEMENT ============
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
      method: 'PATCH',
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id) {
    return this.makeRequest(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // ============ SYSTEM & TESTING ============
  async getDashboardStats() {
    try {
      return await this.makeRequest('/admin/dashboard/stats');
    } catch (error) {
      console.warn('Dashboard stats not available:', error.message);
      return {
        status: 'error',
        message: 'Dashboard stats not available'
      };
    }
  }

  async getAnalytics(timeframe = '30d') {
    try {
      return await this.makeRequest(`/admin/analytics?timeframe=${timeframe}`);
    } catch (error) {
      console.warn('Analytics not available:', error.message);
      return {
        status: 'error',
        message: 'Analytics not available'
      };
    }
  }

  async checkHealth() {
    try {
      const response = await this.makeRequest('/health');
      return {
        status: 'healthy',
        ...response
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  // Test Cloudinary connection
  async testCloudinary() {
    try {
      return await this.makeRequest('/admin/system/cloudinary-test');
    } catch (error) {
      console.error('Cloudinary test failed:', error);
      // Return a fallback response instead of throwing
      return {
        status: 'error',
        message: 'Cloudinary test endpoint not available',
        details: error.message
      };
    }
  }

  // System health check for admins
  async getSystemHealth() {
    try {
      return await this.makeRequest('/admin/system/health');
    } catch (error) {
      console.error('System health check failed:', error);
      return {
        status: 'error',
        message: 'System health check not available',
        details: error.message
      };
    }
  }

  // Clear system cache
  async clearCache() {
    try {
      return await this.makeRequest('/admin/system/clear-cache', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Cache clearing failed:', error);
      return {
        status: 'error',
        message: 'Cache clearing not available',
        details: error.message
      };
    }
  }

  // ============ USER MANAGEMENT ============
  async getUsers() {
    try {
      return await this.makeRequest('/auth/users');
    } catch (error) {
      console.warn('User management not available:', error.message);
      return {
        status: 'error',
        message: 'User management not available'
      };
    }
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
}

// Export singleton instance
const adminApi = new AdminApiService();
export default adminApi;