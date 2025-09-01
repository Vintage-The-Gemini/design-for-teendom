// File: backend/server.js - FIXED DATABASE INITIALIZATION

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Global variables for models and connection status
let User, Nomination, Article;
let isMongoConnected = false;

// FIXED: Initialize database connection FIRST and PROPERLY
const initializeDatabase = async () => {
  try {
    console.log('🔗 Initializing database connection...');
    
    // Import the connectDB function 
    const connectDB = require('./config/database');
    
    // Connect to database
    const connection = await connectDB();
    
    if (connection) {
      isMongoConnected = true;
      console.log('🎯 Database connected successfully, loading models...');
      
      // Load models AFTER successful connection
      try {
        User = require('./models/User');
        console.log('✅ User model loaded');
      } catch (error) {
        console.warn('⚠️ User model not found:', error.message);
      }
      
      try {
        Nomination = require('./models/Nomination');
        console.log('✅ Nomination model loaded');
        
        // Test the model by checking existing nominations
        const count = await Nomination.countDocuments();
        console.log(`📊 Existing nominations in database: ${count}`);
        
      } catch (error) {
        console.error('❌ CRITICAL: Nomination model failed to load:', error.message);
        throw error; // This is critical for the app
      }
      
      try {
        Article = require('./models/Article');
        console.log('✅ Article model loaded');
      } catch (error) {
        console.warn('⚠️ Article model not found:', error.message);
      }
      
      console.log('🎉 All models loaded successfully!');
      
    } else {
      throw new Error('Database connection returned null');
    }
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.log('📝 Continuing with file-based storage as fallback');
    isMongoConnected = false;
    
    // Create fallback models or handle gracefully
    console.log('⚠️ Running in file-only mode - nominations will only save to local files');
  }
};

// CRITICAL: Wait for database initialization before starting server
const startServer = async () => {
  // Initialize database first
  await initializeDatabase();
  
  // Create uploads directories
  const uploadsDir = path.join(__dirname, 'uploads');
  const nominationsDir = path.join(uploadsDir, 'nominations');
  const articlesDir = path.join(uploadsDir, 'articles');
  
  [uploadsDir, nominationsDir, articlesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });

  // Serve static files
  app.use('/uploads', express.static(uploadsDir));

  // Import and use routes AFTER database initialization
  console.log('📂 Loading routes...');

  // Health check route with enhanced diagnostics
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
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not Set'
    };
    
    console.log('🏥 Health check requested:', health);
    res.json(health);
  });

  // Load routes after database is ready
  try {
    const authRoutes = require("./routes/auth");
    app.use("/api/auth", authRoutes);
    console.log('✅ Auth routes loaded');
  } catch (error) {
    console.error('❌ Auth routes failed:', error.message);
  }

  try {
    const publicNominationRoutes = require("./routes/public/nominations");
    app.use("/api/nominations", publicNominationRoutes);
    console.log('✅ Public nominations routes loaded');
  } catch (error) {
    console.error('❌ Public nominations routes failed:', error.message);
  }

  try {
    const articleRoutes = require("./routes/articles");
    app.use("/api/articles", articleRoutes);
    console.log('✅ Articles routes loaded');
  } catch (error) {
    console.warn('⚠️ Articles routes not found:', error.message);
  }

  // Admin routes
  try {
    const adminNominationRoutes = require("./routes/admin/nominations");
    app.use("/api/admin/nominations", adminNominationRoutes);
    console.log('✅ Admin nomination routes loaded');
  } catch (error) {
    console.warn('⚠️ Admin nomination routes not found:', error.message);
  }

  try {
    const adminArticleRoutes = require("./routes/admin/articles");
    app.use("/api/admin/articles", adminArticleRoutes);
    console.log('✅ Admin articles routes loaded');
  } catch (error) {
    console.warn('⚠️ Admin articles routes not found:', error.message);
  }

  // File listing endpoint for debugging
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
          uploadsPath: uploadsDir,
          mongoConnected: isMongoConnected,
          modelsLoaded: {
            User: !!User,
            Nomination: !!Nomination,
            Article: !!Article
          }
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

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down server...');
    if (isMongoConnected) {
      await mongoose.connection.close();
      console.log('🔒 Database connection closed');
    }
    process.exit(0);
  });

  // Start the server
  app.listen(PORT, () => {
    console.log('\n🚀 =====================================');
    console.log(`🌟 Server running on port ${PORT}`);
    console.log(`🔗 Database: ${isMongoConnected ? '✅ Connected' : '❌ Disconnected'}`);
    console.log(`📂 Uploads: ${uploadsDir}`);
    console.log(`🎯 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('🚀 =====================================\n');
    
    // Final status check
    if (!isMongoConnected) {
      console.log('⚠️  WARNING: Running without database connection');
      console.log('💡 Nominations will only save to local files');
      console.log('🔧 Fix database connection to enable full functionality');
    }
  });
};

// Start the server with proper error handling
startServer().catch(error => {
  console.error('❌ FATAL: Server startup failed:', error.message);
  process.exit(1);
});