// File: backend/server.js - COMPLETELY FIXED VERSION
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
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
    process.env.FRONTEND_URL,
    'https://design-for-teendom.netlify.app', // Add your deployed frontend
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Global variables for models and connection status
let User, Nomination, Article, Judge, Vote, Award;
let isMongoConnected = false;

// FIXED: Proper database initialization with retry logic
const initializeDatabase = async () => {
  const MAX_RETRIES = 3;
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      console.log(`\n🔗 Database Initialization Attempt ${retryCount + 1}/${MAX_RETRIES}`);
      console.log('===============================================');
      
      // Import and connect to database
      const { connectDB, getConnectionStatus } = require('./config/database');
      
      // Establish connection with timeout
      console.log('🔌 Establishing Atlas connection...');
      const connection = await Promise.race([
        connectDB(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout after 60 seconds')), 60000)
        )
      ]);
      
      if (!connection) {
        throw new Error('Database connection returned null');
      }

      // Verify connection is actually working
      const status = getConnectionStatus();
      console.log('🔍 Connection Status:', status);
      
      if (status.readyState !== 1) {
        throw new Error(`Connection not ready. State: ${status.readyState}`);
      }

      // Connection successful - load models
      isMongoConnected = true;
      console.log('✅ Atlas connection verified! Loading models...');
      
      // Load all models AFTER successful connection
      await loadModels();
      
      // Test model functionality
      await testModels();
      
      console.log('🎉 Database initialization completed successfully!');
      return true;
      
    } catch (error) {
      retryCount++;
      console.error(`❌ Database initialization failed (attempt ${retryCount}):`, error.message);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`🔄 Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('💥 All database connection attempts failed!');
        console.error('🚫 Starting server in FILE-ONLY mode...');
        isMongoConnected = false;
        break;
      }
    }
  }
  
  return isMongoConnected;
};

// Load all models after successful DB connection
const loadModels = async () => {
  try {
    console.log('📦 Loading database models...');
    
    // Load core models
    try {
      Nomination = require('./models/Nomination');
      console.log('✅ Nomination model loaded');
    } catch (error) {
      console.error('❌ Failed to load Nomination model:', error.message);
      throw error; // Nomination model is critical
    }
    
    try {
      User = require('./models/User');
      console.log('✅ User model loaded');
    } catch (error) {
      console.warn('⚠️ User model not found (optional)');
    }
    
    try {
      Article = require('./models/Article');
      console.log('✅ Article model loaded');
    } catch (error) {
      console.warn('⚠️ Article model not found (optional)');
    }
    
    try {
      Judge = require('./models/Judge');
      console.log('✅ Judge model loaded');
    } catch (error) {
      console.warn('⚠️ Judge model not found (optional)');
    }
    
    try {
      Vote = require('./models/Vote');
      console.log('✅ Vote model loaded');
    } catch (error) {
      console.warn('⚠️ Vote model not found (optional)');
    }
    
    try {
      Award = require('./models/Award');
      console.log('✅ Award model loaded');
    } catch (error) {
      console.warn('⚠️ Award model not found (optional)');
    }
    
    console.log('📦 Model loading completed');
    
  } catch (error) {
    console.error('❌ Critical error loading models:', error.message);
    throw error;
  }
};

// Test models to ensure they work with the database
const testModels = async () => {
  try {
    console.log('🧪 Testing database models...');
    
    if (Nomination) {
      const count = await Nomination.countDocuments();
      console.log(`📊 Existing nominations: ${count}`);
      
      // Test creating a simple query (without saving)
      const testQuery = Nomination.find({}).limit(1);
      console.log('✅ Nomination model queries working');
    }
    
    if (User) {
      const userCount = await User.countDocuments();
      console.log(`👤 Existing users: ${userCount}`);
    }
    
    if (Article) {
      const articleCount = await Article.countDocuments();
      console.log(`📝 Existing articles: ${articleCount}`);
    }
    
    console.log('✅ Model tests completed successfully');
    
  } catch (error) {
    console.error('❌ Model testing failed:', error.message);
    throw error;
  }
};

// CRITICAL: Enhanced server startup with proper waiting
const startServer = async () => {
  console.log('\n🚀 TEENDOM AWARDS BACKEND STARTUP');
  console.log('=====================================');
  
  try {
    // Step 1: Initialize database FIRST and wait for completion
    console.log('📊 Step 1: Database initialization...');
    const dbSuccess = await initializeDatabase();
    
    // Step 2: Create upload directories
    console.log('📊 Step 2: Setting up file directories...');
    const uploadsDir = path.join(__dirname, 'uploads');
    const nominationsDir = path.join(uploadsDir, 'nominations');
    const articlesDir = path.join(uploadsDir, 'articles');
    
    [uploadsDir, nominationsDir, articlesDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });

    // Step 3: Serve static files
    app.use('/uploads', express.static(uploadsDir));
    console.log('📁 Static file serving configured');

    // Step 4: Setup routes AFTER database is ready
    console.log('📊 Step 3: Loading API routes...');
    setupRoutes(nominationsDir, articlesDir, uploadsDir);
    
    // Step 5: Start the server
    const server = app.listen(PORT, () => {
      console.log('\n🎉 =====================================');
      console.log(`🌟 TEENDOM AWARDS BACKEND IS LIVE!`);
      console.log(`🚀 Server: http://localhost:${PORT}`);
      console.log(`🔗 Database: ${isMongoConnected ? '✅ ATLAS CONNECTED' : '⚠️ FILE-ONLY MODE'}`);
      console.log(`📊 Models: ${isMongoConnected ? Object.keys(mongoose.models).length : 0} loaded`);
      console.log(`📂 Uploads: ${uploadsDir}`);
      console.log(`🎯 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🕒 Started: ${new Date().toISOString()}`);
      console.log('🎉 =====================================\n');
      
      // Final database status
      if (isMongoConnected) {
        console.log('✅ Ready to receive nominations and save to Atlas!');
      } else {
        console.log('⚠️ WARNING: Database not connected - nominations will only save to files');
        console.log('🔧 Check your .env MONGODB_URI and Atlas network settings');
      }
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down server gracefully...');
      server.close(() => {
        console.log('🔒 HTTP server closed');
      });
      
      if (isMongoConnected && mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('🔒 Database connection closed');
      }
      
      process.exit(0);
    });
    
  } catch (error) {
    console.error('💥 FATAL ERROR: Server startup failed');
    console.error('❌ Error:', error.message);
    console.error('🔍 Stack:', error.stack);
    process.exit(1);
  }
};

// Setup all routes after database initialization
const setupRoutes = (nominationsDir, articlesDir, uploadsDir) => {
  // Enhanced health check with full diagnostics
  app.get("/api/health", (req, res) => {
    const health = {
      status: "success",
      message: "🎯 Teendom Awards Backend is healthy",
      timestamp: new Date().toISOString(),
      services: {
        server: "✅ Running",
        uploads: fs.existsSync(nominationsDir) ? "✅ Available" : "❌ Not Available",
        database: isMongoConnected ? "✅ Atlas Connected" : "❌ Not Connected",
      },
      database: {
        connected: isMongoConnected,
        readyState: mongoose.connection.readyState,
        host: mongoose.connection.host || 'N/A',
        name: mongoose.connection.name || 'N/A'
      },
      models: {
        user: User ? "✅ Loaded" : "❌ Not Loaded",
        nomination: Nomination ? "✅ Loaded" : "❌ Not Loaded",
        article: Article ? "✅ Loaded" : "❌ Not Loaded",
        judge: Judge ? "✅ Loaded" : "❌ Not Loaded",
        vote: Vote ? "✅ Loaded" : "❌ Not Loaded",
        award: Award ? "✅ Loaded" : "❌ Not Loaded"
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: PORT,
        mongoUri: process.env.MONGODB_URI ? '✅ Configured' : '❌ Missing'
      }
    };
    
    console.log(`🏥 Health check requested - Status: ${isMongoConnected ? 'HEALTHY' : 'DEGRADED'}`);
    res.json(health);
  });

  // Load route modules with error handling
  try {
    const publicNominationRoutes = require("./routes/public/nominations");
    app.use("/api/nominations", publicNominationRoutes);
    console.log('✅ Public nominations routes loaded');
  } catch (error) {
    console.error('❌ Failed to load public nominations routes:', error.message);
  }

  try {
    const adminNominationRoutes = require("./routes/admin/nominations");
    app.use("/api/admin/nominations", adminNominationRoutes);
    console.log('✅ Admin nominations routes loaded');
  } catch (error) {
    console.error('❌ Failed to load admin nominations routes:', error.message);
  }

  try {
    const authRoutes = require("./routes/auth");
    app.use("/api/auth", authRoutes);
    console.log('✅ Auth routes loaded');
  } catch (error) {
    console.warn('⚠️ Auth routes not found (optional)');
  }

  try {
    const articleRoutes = require("./routes/articles");
    app.use("/api/articles", articleRoutes);
    console.log('✅ Article routes loaded');
  } catch (error) {
    console.warn('⚠️ Article routes not found (optional)');
  }

  // Debug endpoint for file listing
  app.get('/api/debug/files', (req, res) => {
    try {
      const nominationFiles = fs.existsSync(nominationsDir) ? fs.readdirSync(nominationsDir) : [];
      const articleFiles = fs.existsSync(articlesDir) ? fs.readdirSync(articlesDir) : [];
      
      res.json({
        status: 'success',
        data: {
          nominations: nominationFiles.length,
          articles: articleFiles.length,
          uploadsPath: uploadsDir,
          mongoConnected: isMongoConnected,
          connectionState: mongoose.connection.readyState,
          modelsLoaded: {
            User: !!User,
            Nomination: !!Nomination,
            Article: !!Article,
            Judge: !!Judge,
            Vote: !!Vote,
            Award: !!Award
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

  console.log('🔗 All routes configured');
};

// Export the models for use in other files
module.exports = {
  app,
  User,
  Nomination,
  Article,
  Judge,
  Vote,
  Award,
  isMongoConnected: () => isMongoConnected
};

// Start the server
startServer().catch(error => {
  console.error('💥 CRITICAL STARTUP ERROR:', error);
  process.exit(1);
});