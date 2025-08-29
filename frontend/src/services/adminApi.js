// File: frontend/src/services/adminApi.js

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

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
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

  // Generic request method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: 'include',
      ...options,
    };

    console.log(`🌐 Admin API Request: ${config.method || 'GET'} ${url}`);

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
      console.log(`✅ Admin API Response:`, data);
      
      return data;
    } catch (error) {
      console.error(`❌ Admin API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Authentication endpoints
  async login(credentials) {
    try {
      const response = await this.makeRequest('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.status === 'success' && response.token) {
        this.setToken(response.token);
        console.log('✅ Admin login successful:', response.user?.email);
        return response;
      }

      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('❌ Admin login error:', error);
      throw error;
    }
  }

  async verifyToken() {
    return this.makeRequest('/auth/verify');
  }

  async logout() {
    try {
      await this.makeRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      this.removeToken();
    }
  }

  // ONLY use Cloudinary URLs - ignore everything else
  resolveImageUrl(nomination) {
    console.log('🔍 Resolving image URL for:', nomination.submissionId);
    
    // ONLY accept Cloudinary URLs
    if (nomination.nominee?.photo && 
        typeof nomination.nominee.photo === 'string' && 
        nomination.nominee.photo.includes('cloudinary')) {
      console.log('✅ Using Cloudinary URL');
      return nomination.nominee.photo;
    }
    
    console.log('❌ No valid image URL found');
    return null;
  }

  // Nominations endpoints
  async getNominations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/admin/nominations${queryString ? `?${queryString}` : ''}`;
    const response = await this.makeRequest(endpoint);
    
    // Add image accessibility information
    if (response.data?.nominations) {
      const imageStats = {
        total: response.data.nominations.length,
        withCloudinary: 0,
        withImages: 0,
        accessible: 0
      };

      response.data.nominations = response.data.nominations.map(nomination => {
        const imageUrl = this.resolveImageUrl(nomination);
        
        if (imageUrl) {
          imageStats.withImages++;
          imageStats.accessible++;
          
          if (imageUrl.includes('cloudinary')) {
            imageStats.withCloudinary++;
          }
        }

        return {
          ...nomination,
          _imageUrl: imageUrl,
          _hasImage: !!imageUrl
        };
      });

      console.log('📊 Nominations image availability summary:');
      console.log(`  📈 Image stats:`, imageStats);
    }

    return response;
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

  // Categories endpoints
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

  // System endpoints
  async getSystemHealth() {
    return this.makeRequest('/health');
  }

  // Test image accessibility
  async testImageAccessibility() {
    try {
      const nominations = await this.getNominations({ limit: 50 });
      
      const testResults = {};
      
      for (const nomination of nominations.data.nominations) {
        const imageUrl = this.resolveImageUrl(nomination);
        
        if (imageUrl) {
          try {
            const response = await fetch(imageUrl, { method: 'HEAD' });
            testResults[nomination.submissionId] = {
              accessible: response.ok,
              url: imageUrl,
              source: imageUrl.includes('cloudinary') ? 'cloudinary' : 
                     imageUrl.includes('/uploads/') ? 'local-file' : 
                     imageUrl.includes('adminAccessUrls') ? 'admin-url' : 'unknown'
            };
          } catch (error) {
            testResults[nomination.submissionId] = {
              accessible: false,
              url: imageUrl,
              error: error.message,
              source: 'failed'
            };
          }
        } else {
          testResults[nomination.submissionId] = {
            accessible: false,
            url: null,
            source: 'none'
          };
        }
      }
      
      console.log('🧪 Image accessibility test results:', testResults);
      return testResults;
    } catch (error) {
      console.error('❌ Image accessibility test failed:', error);
      return {};
    }
  }
}

// Create and export singleton instance
const adminApi = new AdminApiService();
export default adminApi;