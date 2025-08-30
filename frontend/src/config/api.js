// File: /frontend/src/config/api.js

// API Configuration for both development and production environments
// Automatically detects environment and uses appropriate backend URL

// More reliable environment detection
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname.includes('localhost'));

const isDevelopment = import.meta.env.DEV || isLocalhost;
const isProduction = !isDevelopment;

// Backend URLs
const DEVELOPMENT_API_URL = 'http://localhost:5000';
const PRODUCTION_API_URL = 'https://design-for-teendom-backend.onrender.com';

// Primary API URL selection with better fallback chain
export const API_BASE_URL = (() => {
  // 1. Try environment variable first (highest priority)
  if (import.meta.env.VITE_API_URL) {
    console.log('🔧 Using VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  if (import.meta.env.REACT_APP_API_URL) {
    console.log('🔧 Using REACT_APP_API_URL:', import.meta.env.REACT_APP_API_URL);
    return import.meta.env.REACT_APP_API_URL;
  }

  // 2. Auto-detect based on hostname (more reliable)
  if (isLocalhost) {
    console.log('🏠 Localhost detected - using development backend');
    return DEVELOPMENT_API_URL;
  } else {
    console.log('🌐 Production domain detected - using production backend');
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
  
  // Nominations
  NOMINATIONS: `${API_BASE_URL}/api/nominations`,
  SUBMIT_NOMINATION: `${API_BASE_URL}/api/nominations/submit`,
  
  // Articles
  ARTICLES: `${API_BASE_URL}/api/articles`,
  
  // Admin
  ADMIN: `${API_BASE_URL}/api/admin`,
  
  // Files/Uploads
  UPLOADS: `${API_BASE_URL}/uploads`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`
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

// Enhanced console log for debugging
console.log('🔧 API Configuration:', {
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
  isLocalhost: isLocalhost,
  isDevelopment: isDevelopment,
  isProduction: isProduction,
  environment: isDevelopment ? 'development' : 'production',
  apiUrl: API_BASE_URL,
  cloudinaryConfigured: !!CLOUDINARY_CONFIG.CLOUD_NAME,
  envVariables: {
    VITE_API_URL: import.meta.env.VITE_API_URL || 'not set',
    REACT_APP_API_URL: import.meta.env.REACT_APP_API_URL || 'not set',
    DEV: import.meta.env.DEV
  }
});

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  CLOUDINARY_CONFIG,
  APP_CONFIG
};