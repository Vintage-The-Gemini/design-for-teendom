// File: /frontend/src/config/api.js - RENDER PRODUCTION VERSION

// API Configuration optimized for Render deployment
// Automatically detects environment and uses appropriate backend URL

// More reliable environment detection for Render
const isRenderProduction = typeof window !== 'undefined' && 
  (window.location.hostname.includes('onrender.com') || 
   window.location.hostname.includes('render.com'));

const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1');

const isDevelopment = import.meta.env.DEV && isLocalhost;
const isProduction = !isDevelopment;

// Backend URLs
const DEVELOPMENT_API_URL = 'http://localhost:5000';
const PRODUCTION_API_URL = 'https://design-for-teendom-backend.onrender.com';

// ✅ RENDER-OPTIMIZED: Primary API URL selection
export const API_BASE_URL = (() => {
  // 1. Try environment variable first (highest priority for Render)
  if (import.meta.env.VITE_API_URL) {
    console.log('🔧 Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  if (import.meta.env.REACT_APP_API_URL) {
    console.log('🔧 Using REACT_APP_API_URL:', import.meta.env.REACT_APP_API_URL);
    return import.meta.env.REACT_APP_API_URL;
  }

  // 2. Auto-detect based on hostname (Render-specific)
  if (isRenderProduction) {
    console.log('🚀 Render production detected - using production backend');
    return PRODUCTION_API_URL;
  } else if (isLocalhost) {
    console.log('🏠 Localhost detected - using development backend');
    return DEVELOPMENT_API_URL;
  } else {
    console.log('🌐 Unknown environment - defaulting to production backend');
    return PRODUCTION_API_URL;
  }
})();

// Alternative exports for backward compatibility
export const BACKEND_URL = API_BASE_URL;
export const SERVER_URL = API_BASE_URL;

// API endpoints helper
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // Nominations - ✅ FIXED for Render
  NOMINATIONS: `${API_BASE_URL}/api/nominations`,
  SUBMIT_NOMINATION: `${API_BASE_URL}/api/nominations`,
  GET_NOMINATIONS: `${API_BASE_URL}/api/nominations`,
  
  // Articles
  ARTICLES: `${API_BASE_URL}/api/articles`,
  
  // Admin
  ADMIN: `${API_BASE_URL}/api/admin`,
  ADMIN_NOMINATIONS: `${API_BASE_URL}/api/admin/nominations`,
  ADMIN_ARTICLES: `${API_BASE_URL}/api/admin/articles`,
  
  // Files/Uploads
  UPLOADS: `${API_BASE_URL}/uploads`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`,
  
  // Debug endpoints
  DEBUG_ROUTES: `${API_BASE_URL}/api/debug/routes`,
  TEST_NOMINATIONS: `${API_BASE_URL}/api/nominations/test`
};

// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dbidxxqxr',
  UPLOAD_PRESET: import.meta.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'teendom_nominations',
  API_KEY: import.meta.env.REACT_APP_CLOUDINARY_API_KEY || '923713989445946'
};

// App configuration
export const APP_CONFIG = {
  NOMINATIONS_OPEN: import.meta.env.REACT_APP_NOMINATIONS_OPEN === 'true',
  VOTING_OPEN: import.meta.env.REACT_APP_VOTING_OPEN === 'true',
  AWARDS_YEAR: import.meta.env.REACT_APP_AWARDS_YEAR || '2025',
  SITE_NAME: import.meta.env.REACT_APP_SITE_NAME || 'Teendom Awards',
  SITE_TAGLINE: import.meta.env.REACT_APP_SITE_TAGLINE || 'Celebrating Outstanding Teenagers'
};

// Enhanced console log for debugging (Render-specific)
console.log('🚀 RENDER API Configuration:', {
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server-side',
  isRenderProduction: isRenderProduction,
  isLocalhost: isLocalhost,
  isDevelopment: isDevelopment,
  isProduction: isProduction,
  environment: isDevelopment ? 'development' : 'production',
  apiUrl: API_BASE_URL,
  cloudinaryConfigured: !!CLOUDINARY_CONFIG.CLOUD_NAME,
  envVariables: {
    VITE_API_URL: import.meta.env.VITE_API_URL || 'not set',
    REACT_APP_API_URL: import.meta.env.REACT_APP_API_URL || 'not set',
    DEV: import.meta.env.DEV,
    NODE_ENV: import.meta.env.NODE_ENV
  }
});

// ✅ RENDER-SPECIFIC API Service Helper Functions
export const apiHelper = {
  // Test backend connection with better error handling for Render
  async testConnection() {
    try {
      console.log('🔍 Testing connection to:', `${API_BASE_URL}/health`);
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Backend connection test successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Backend connection test failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Test nominations endpoint with Render-specific handling
  async testNominations() {
    try {
      console.log('🔍 Testing nominations endpoint:', `${API_BASE_URL}/api/nominations/test`);
      const response = await fetch(`${API_BASE_URL}/api/nominations/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Nominations endpoint test successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Nominations endpoint test failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Submit nomination with proper error handling for Render
  async submitNomination(formData) {
    try {
      console.log('🚀 Submitting nomination to Render backend:', `${API_BASE_URL}/api/nominations`);
      
      const response = await fetch(`${API_BASE_URL}/api/nominations`, {
        method: 'POST',
        body: formData, // FormData object
        // Don't set Content-Type header - let browser set it with boundary
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Submission failed - Response:', errorText);
        throw new Error(`Submission failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Submission successful:', result);
      return { success: true, data: result };
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get debug routes
  async getRoutes() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/debug/routes`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📍 Available routes:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Routes fetch failed:', error);
      return { success: false, error: error.message };
    }
  }
};

// ✅ RENDER DEPLOYMENT: Validate configuration on load
if (typeof window !== 'undefined') {
  // Run validation after a short delay to ensure DOM is ready
  setTimeout(() => {
    console.log('🔧 RENDER DEPLOYMENT VALIDATION:');
    console.log('  - Frontend URL:', window.location.origin);
    console.log('  - Backend URL:', API_BASE_URL);
    console.log('  - Environment:', isDevelopment ? 'Development' : 'Production');
    
    // Test connection on load (optional - can be commented out)
    // apiHelper.testConnection();
  }, 1000);
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  CLOUDINARY_CONFIG,
  APP_CONFIG,
  apiHelper
};