// API Configuration for both development and production environments
// Automatically detects environment and uses appropriate backend URL

// Environment detection
const isDevelopment = import.meta.env.DEV;

// Backend URLs
const DEVELOPMENT_API_URL = 'http://localhost:5000';
const PRODUCTION_API_URL = 'https://teendom-awards-backend.onrender.com'; // Replace with your actual backend URL

// Primary API URL selection with fallback chain
export const API_BASE_URL = 
  // 1. Try environment variable first (highest priority)
  import.meta.env.VITE_API_URL || 
  import.meta.env.REACT_APP_API_URL || 
  // 2. Auto-detect based on build environment
  (isDevelopment ? DEVELOPMENT_API_URL : PRODUCTION_API_URL);

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

// Console log for debugging
console.log('🔧 API Configuration:', {
  environment: isDevelopment ? 'development' : 'production',
  apiUrl: API_BASE_URL,
  cloudinaryConfigured: !!CLOUDINARY_CONFIG.CLOUD_NAME
});

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  CLOUDINARY_CONFIG,
  APP_CONFIG
};