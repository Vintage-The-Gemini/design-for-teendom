// File: backend/server.js - COMPLETE FIXED VERSION WITH CORS FIX

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

require("dotenv").config();

console.log('🚀 ===== TEENDOM BACKEND STARTING =====');
console.log(`📅 ${new Date().toISOString()}`);

const app = express();
const PORT = process.env.PORT || 5000;

// Global variables
let isMongoConnected = false;
let User, Nomination, Article;
let authRoutes, articleRoutes, adminArticleRoutes, adminCategoryRoutes, adminNominationRoutes, adminSystemRoutes;

// CORS Configuration - FIXED WITH PRODUCTION FRONTEND URL
app.use(cors({
  origin: [
    "http://localhost:3000",  // Create React App
    "http://localhost:5173",  // Vite
    "http://localhost:3001",  // Alternative port
    "http://127.0.0.1:3000",  // Alternative localhost
    "https://teendom-awards-frontend.onrender.com", // Production frontend URL
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request logging
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Create uploads directory structure
const uploadsDir = path.join(__dirname, 'uploads');
const nominationsDir = path.join(uploadsDir, 'nominations');
const articlesDir = path.join(uploadsDir, 'articles');
const dataDir = path.join(__dirname, 'data');
const nominationsDataDir = path.join(dataDir, 'nominations');

// Ensure directories exist
[uploadsDir, nominationsDir, articlesDir, dataDir, nominationsDataDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// ===== CRITICAL: SERVE STATIC FILES FIRST =====
// This MUST come before other routes
app.use('/uploads', express.static(uploadsDir, {
  maxAge: '1d', // Cache for 1 day
  setHeaders: (res, filePath) => {
    console.log(`📁 Serving static file: ${filePath}`);
    // Allow CORS for images
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

console.log(`📁 Static files served from: ${uploadsDir}`);
console.log(`📁 Nominations directory: ${nominationsDir}`);

// Debug endpoint to list files
app.get('/api/debug/files', (req, res) => {
  try {
    const nominationFiles = fs.existsSync(nominationsDir) 
      ? fs.readdirSync(nominationsDir) 
      : [];
    
    const articleFiles = fs.existsSync(articlesDir) 
      ? fs.readdirSync(articlesDir) 
      : [];
    
    res.json({
      status: 'success',
      data: {
        nominations: nominationFiles,
        articles: articleFiles,
        uploadsPath: uploadsDir
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to list files',
      error: error.message
    });
  }
});

// Initialize database connection
console.log('🔗 Initializing database connection...');
if (process.env.MONGODB_URI) {
  const mongoose = require('mongoose');
  
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('✅ MongoDB Connected:', mongoose.connection.host);
      console.log('📊 Database:', mongoose.connection.name);
      isMongoConnected = true;
      
      console.log('🎯 Database connection successful, loading models...');
      
      try {
        User = require('./models/User');
        console.log('✅ User model loaded');
      } catch (error) {
        console.warn('⚠️ User model not found:', error.message);
      }
      
      try {
        Nomination = require('./models/Nomination');
        console.log('✅ Nomination model loaded');
      } catch (error) {
        console.warn('⚠️ Nomination model not found:', error.message);
      }
      
      try {
        Article = require('./models/Article');
        console.log('✅ Article model loaded');
      } catch (error) {
        console.warn('⚠️ Article model not found:', error.message);
      }
      
      console.log('🎉 MongoDB + All Models ready!');
    })
    .catch(err => {
      console.error('❌ Database connection failed:', err.message);
      console.log('📝 Continuing with file-based storage');
    });
} else {
  console.log('⚠️ No database config found');
}

// Import routes
console.log('📂 Loading routes...');

// Auth routes
try {
  authRoutes = require("./routes/auth");
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.error('❌ Auth routes failed:', error.message);
  authRoutes = express.Router();
  authRoutes.all('*', (req, res) => {
    res.status(503).json({ 
      status: 'error', 
      message: 'Authentication service unavailable - Database not connected'
    });
  });
  console.log('🔄 Created fallback auth routes');
}

// Public article routes
try {
  articleRoutes = require("./routes/articles");
  console.log('✅ Public articles routes loaded');
} catch (error) {
  console.warn('⚠️ Public articles routes not found:', error.message);
  articleRoutes = express.Router();
  articleRoutes.all('*', (req, res) => {
    res.status(404).json({ message: 'Public articles not available' });
  });
}

// Public nominations routes
let publicNominationRoutes;
try {
  publicNominationRoutes = require("./routes/public/nominations");
  console.log('✅ Public nominations routes loaded');
} catch (error) {
  console.warn('⚠️ Public nominations routes not found:', error.message);
  publicNominationRoutes = express.Router();
  publicNominationRoutes.all('*', (req, res) => {
    res.status(404).json({ message: 'Nominations not available' });
  });
}

// Admin routes
try {
  adminArticleRoutes = require("./routes/admin/articles");
  console.log('✅ Admin articles routes loaded');
} catch (error) {
  console.error('❌ Admin articles routes failed:', error.message);
  adminArticleRoutes = null;
}

try {
  adminCategoryRoutes = require("./routes/admin/categories");
  console.log('✅ Admin categories routes loaded');
} catch (error) {
  console.warn('⚠️ Admin categories routes not found:', error.message);
  adminCategoryRoutes = null;
}

try {
  adminNominationRoutes = require("./routes/admin/nominations");
  console.log('✅ Admin nomination routes loaded');
} catch (error) {
  console.warn('⚠️ Admin nomination routes not found:', error.message);
  adminNominationRoutes = null;
}

// Admin system routes (NEW)
try {
  adminSystemRoutes = require("./routes/admin/system");
  console.log('✅ Admin system routes loaded');
} catch (error) {
  console.warn('⚠️ Admin system routes not found:', error.message);
  adminSystemRoutes = null;
}

// Health check route
app.get("/api/health", (req, res) => {
  const health = {
    status: "success",
    message: "✅ Backend is healthy",
    timestamp: new Date().toISOString(),
    services: {
      uploads: fs.existsSync(nominationsDir) ? "✅ Available" : "❌ Not Available",
      database: isMongoConnected ? "✅ Connected" : "❌ Not Connected",
      models: {
        user: User ? "✅ Loaded" : "❌ Not Loaded",
        nomination: Nomination ? "✅ Loaded" : "❌ Not Loaded", 
        article: Article ? "✅ Loaded" : "❌ Not Loaded"
      }
    },
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  };
  
  console.log('🏥 Health check requested:', health);
  res.json(health);
});

// Root health check (fallback)
app.get("/health", (req, res) => {
  res.json({
    status: "success",
    message: "✅ Backend is healthy (root endpoint)",
    timestamp: new Date().toISOString()
  });
});

// API Routes
console.log('🛣️ Setting up API routes...');

// Auth routes
app.use("/api/auth", authRoutes);

// Public routes
app.use("/api/articles", articleRoutes);
app.use("/api/nominations", publicNominationRoutes);

// Admin routes (protected)
if (adminArticleRoutes) {
  app.use("/api/admin/articles", adminArticleRoutes);
  console.log('✅ Admin articles routes mounted');
}

if (adminCategoryRoutes) {
  app.use("/api/admin/categories", adminCategoryRoutes);
  console.log('✅ Admin categories routes mounted');
}

if (adminNominationRoutes) {
  app.use("/api/admin/nominations", adminNominationRoutes);
  console.log('✅ Admin nominations routes mounted');
}

if (adminSystemRoutes) {
  app.use("/api/admin/system", adminSystemRoutes);
  console.log('✅ Admin system routes mounted');
}

// Generic admin endpoint
app.get("/api/admin", (req, res) => {
  res.json({
    status: 'success',
    message: '✅ Admin API is available',
    endpoints: [
      adminArticleRoutes ? '/api/admin/articles' : null,
      adminCategoryRoutes ? '/api/admin/categories' : null, 
      adminNominationRoutes ? '/api/admin/nominations' : null,
      adminSystemRoutes ? '/api/admin/system' : null
    ].filter(Boolean)
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Global error handler:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'File too large. Maximum size is 50MB per file.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        status: 'error',
        message: 'Too many files. Maximum is 6 files total.'
      });
    }
  }
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(error.status || 500).json({
    status: 'error',
    message: error.message || 'Internal server error',
    ...(isDevelopment && { stack: error.stack })
  });
});

// 404 handler for undefined routes
app.all('*', (req, res) => {
  console.log(`❓ 404: ${req.method} ${req.url}`);
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎉 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📂 Uploads directory: ${uploadsDir}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 Admin endpoint: http://localhost:${PORT}/api/admin`);
  console.log('✅ Backend is ready to accept requests!');
});