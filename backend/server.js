// File: /backend/server.js - FIXED: Wait for MongoDB before starting server

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://teendom-awards-frontend.onrender.com',
    'https://design-for-teendom.onrender.com',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.set('trust proxy', 1);

// Static files serving
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🌐 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`📦 Body keys: ${Object.keys(req.body)}`);
  }
  next();
});

// ✅ FIXED: Database connection and server startup
let isMongoConnected = false;
let User, Nomination, Article;

const connectDatabaseAndStartServer = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    // ✅ WAIT for MongoDB connection
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully');

    // ✅ ONLY load models AFTER successful connection
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
      console.error('❌ CRITICAL: Nomination model not found:', error.message);
    }

    try {
      Article = require('./models/Article');
      console.log('✅ Article model loaded');
    } catch (error) {
      console.warn('⚠️ Article model not found:', error.message);
    }

    // ✅ ONLY load routes AFTER database and models are ready
    await loadRoutes();

    // ✅ ONLY start server AFTER everything is ready
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log('🚀 SERVER STARTED SUCCESSFULLY');
      console.log(`📍 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Database: ${isMongoConnected ? 'Connected' : 'Disconnected'}`);
      console.log('📍 Available endpoints:');
      console.log('   - GET /health');
      console.log('   - GET /api/debug/routes');
      console.log('   - GET /api/nominations/test');
      console.log('   - POST /api/nominations');
      console.log(`🔗 CORS enabled for:`, corsOptions.origin);
    });

  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.log('⚠️ Server will start without database (limited functionality)');
    isMongoConnected = false;
    
    // Start server anyway but with limited functionality
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log('⚠️ SERVER STARTED WITHOUT DATABASE');
      console.log(`📍 Server running on port ${PORT} (LIMITED MODE)`);
    });
  }
};

// ✅ Load routes function
const loadRoutes = async () => {
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
    console.error('❌ CRITICAL: Public nominations routes failed:', error.message);
  }

  try {
    const articleRoutes = require("./routes/articles");
    app.use("/api/articles", articleRoutes);
    console.log('✅ Articles routes loaded');
  } catch (error) {
    console.warn('⚠️ Articles routes not found:', error.message);
  }

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
};

// Enhanced health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      api: "✅ Available",
      database: isMongoConnected ? "✅ Connected" : "❌ Not Connected",
      models: {
        user: User ? "✅ Loaded" : "❌ Not Loaded",
        nomination: Nomination ? "✅ Loaded" : "❌ Not Loaded",
        article: Article ? "✅ Loaded" : "❌ Not Loaded"
      }
    },
    mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not Set',
    cors: {
      enabled: true,
      allowedOrigins: corsOptions.origin
    }
  };
  
  console.log('🏥 Health check requested:', health);
  res.json(health);
});

// Test endpoints
app.get('/api/nominations/test', (req, res) => {
  console.log('🧪 Test route hit - nominations endpoint is working');
  res.json({
    status: 'success',
    message: 'Nominations route is working!',
    timestamp: new Date().toISOString(),
    endpoint: '/api/nominations/test',
    databaseConnected: isMongoConnected
  });
});

// Debug routes endpoint
app.get('/api/debug/routes', (req, res) => {
  const routes = [];
  
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const basePath = middleware.regexp.toString().match(/^\/\^\\?(.*?)\\\?\$?\//)?.[1] || '';
          routes.push({
            path: basePath + handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });

  res.json({
    status: 'success',
    databaseConnected: isMongoConnected,
    totalRoutes: routes.length,
    routes: routes.sort((a, b) => a.path.localeCompare(b.path))
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  console.error('Stack:', err.stack);
  
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /health',
      'GET /api/debug/routes',
      'GET /api/nominations/test',
      'POST /api/nominations'
    ]
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🔄 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// ✅ START THE PROCESS
connectDatabaseAndStartServer();