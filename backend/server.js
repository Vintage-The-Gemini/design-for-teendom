// File: backend/server.js - WITH ADMIN ROUTES MOUNTED

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

console.log('🚀 ===== TEENDOM BACKEND STARTING =====');
console.log(`📅 ${new Date().toISOString()}`);

const app = express();
const PORT = process.env.PORT || 5000;

// Global variables
let isMongoConnected = false;
let User, Nomination, Article;
let authRoutes, articleRoutes, adminArticleRoutes, adminCategoryRoutes, adminNominationRoutes;

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:3000",  // Create React App
    "http://localhost:5173",  // Vite
    "http://localhost:3001",  // Alternative port
    "http://127.0.0.1:3000",  // Alternative localhost
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request logging
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Create uploads directory
const nominationsDir = path.join(__dirname, 'uploads', 'nominations');
if (!fs.existsSync(nominationsDir)) {
  fs.mkdirSync(nominationsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Database connection
console.log('🔗 Attempting database connection...');
let connectDB;
try {
  connectDB = require("./config/database");
  console.log('✅ Database config loaded');
} catch (error) {
  console.error('❌ Database config not found:', error.message);
  console.log('📝 Continuing with file-based storage only');
}

if (connectDB) {
  connectDB()
    .then(() => {
      console.log('🎯 Database connection successful, loading models...');
      try {
        User = require('./models/User');
        console.log('✅ User model loaded');
        
        Nomination = require('./models/Nomination');
        console.log('✅ Nomination model loaded');
        
        // Load Article model for admin routes
        Article = require('./models/Article');
        console.log('✅ Article model loaded');
        
        isMongoConnected = true;
        console.log('🎉 MongoDB + All Models ready!');
      } catch (modelError) {
        console.error('❌ Model loading failed:', modelError.message);
        console.log('📝 Some models not available, features may be limited');
      }
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

// Health check route
app.get("/api/health", (req, res) => {
  const health = {
    status: "success",
    message: "✅ Backend is healthy",
    timestamp: new Date().toISOString(),
    services: {
      uploads: fs.existsSync(nominationsDir) ? "✅ Available" : "❌ Error",
      mongodb: isMongoConnected ? "✅ Connected" : "❌ Disconnected",
      models: {
        user: !!User ? "✅ Loaded" : "❌ Missing",
        nomination: !!Nomination ? "✅ Loaded" : "❌ Missing",
        article: !!Article ? "✅ Loaded" : "❌ Missing"
      },
      routes: {
        auth: "✅ Loaded",
        publicArticles: !!articleRoutes ? "✅ Available" : "❌ Missing",
        adminArticles: !!adminArticleRoutes ? "✅ Available" : "❌ Missing",
        adminCategories: !!adminCategoryRoutes ? "✅ Available" : "❌ Missing",
        adminNominations: !!adminNominationRoutes ? "✅ Available" : "❌ Missing"
      }
    }
  };
  
  res.json(health);
});

// Main routes
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Teendom Backend API is running!",
    version: "2.5.0",
    timestamp: new Date().toISOString(),
    features: {
      mongodb: isMongoConnected,
      authentication: !!User,
      nominations: !!Nomination,
      articles: !!Article,
      adminPanel: !!(adminArticleRoutes && User)
    },
    availableRoutes: {
      health: '/api/health',
      auth: '/api/auth/*',
      nominations: '/api/nominations/*',
      articles: '/api/articles/*',
      admin: '/api/admin/*'
    }
  });
});

// Mount routes
console.log('🔗 Mounting routes...');

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Admin routes
if (adminArticleRoutes) {
  app.use("/api/admin/articles", adminArticleRoutes);
  console.log('✅ Admin articles routes mounted at /api/admin/articles');
}

if (adminCategoryRoutes) {
  app.use("/api/admin/categories", adminCategoryRoutes);
  console.log('✅ Admin categories routes mounted at /api/admin/categories');
}

if (adminNominationRoutes) {
  app.use("/api/admin/nominations", adminNominationRoutes);
  console.log('✅ Admin nomination routes mounted at /api/admin/nominations');
}

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic nominations endpoint (your existing one)
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, nominationsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50000000,
    files: parseInt(process.env.MAX_FILES) || 6
  }
});

app.get('/api/nominations/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Nominations API is healthy',
    mongodb: isMongoConnected,
    models: { nomination: !!Nomination }
  });
});

// Your existing nomination submission endpoint
app.post('/api/nominations', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    console.log('🎯 POST /api/nominations - Processing submission');
    
    try {
      const submissionId = `TA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      let nominationData = {};
      try {
        if (req.body.nominationData) {
          nominationData = JSON.parse(req.body.nominationData);
        }
      } catch (parseError) {
        console.error('❌ Failed to parse nomination data:', parseError);
        nominationData = req.body;
      }
      
      // Handle file uploads (your existing logic)
      let uploadedFiles = { photo: null, supportingFiles: [] };
      
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        uploadedFiles.photo = {
          filename: photoFile.filename,
          path: photoFile.path,
          url: `/uploads/nominations/${photoFile.filename}`,
          size: photoFile.size
        };
      }
      
      if (req.files?.supportingFiles) {
        req.files.supportingFiles.forEach(file => {
          uploadedFiles.supportingFiles.push({
            filename: file.filename,
            path: file.path,
            url: `/uploads/nominations/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype
          });
        });
      }
      
      // Prepare nomination record
      const nominationRecord = {
        submissionId: submissionId,
        ...nominationData,
        files: uploadedFiles,
        submittedAt: new Date(),
        status: 'submitted'
      };
      
      // Save to database and file
      let mongoId = null;
      let savedToMongo = false;
      
      if (isMongoConnected && Nomination) {
        try {
          const newNomination = new Nomination(nominationRecord);
          const savedNomination = await newNomination.save();
          mongoId = savedNomination._id;
          savedToMongo = true;
          console.log('✅ Successfully saved to MongoDB');
        } catch (mongoSaveError) {
          console.error('❌ MongoDB save failed:', mongoSaveError.message);
        }
      }
      
      // Save backup to file system
      const backupPath = path.join(nominationsDir, `nomination-${submissionId}.json`);
      let savedToFile = false;
      try {
        fs.writeFileSync(backupPath, JSON.stringify(nominationRecord, null, 2));
        savedToFile = true;
        console.log('✅ Backup saved to file system');
      } catch (fileError) {
        console.error('❌ File backup failed:', fileError.message);
      }
      
      res.status(201).json({
        status: 'success',
        message: savedToMongo ? 'Nomination submitted successfully' : 'Nomination received and saved to backup',
        submissionId: submissionId,
        data: {
          submissionId: submissionId,
          status: savedToMongo ? 'submitted' : 'pending',
          storage: {
            mongodb: savedToMongo,
            mongoId: mongoId ? mongoId.toString() : null,
            fileBackup: savedToFile,
            cloudinary: { photo: false, supportingFiles: 0 }
          }
        }
      });
      
    } catch (error) {
      console.error('💥 Nomination submission error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to process nomination',
        error: error.message
      });
    }
  }
);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: {
      health: 'GET /api/health',
      auth: 'POST /api/auth/login',
      nominations: 'POST /api/nominations',
      adminArticles: 'GET /api/admin/articles/stats/overview',
      adminCategories: 'GET /api/admin/categories'
    }
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('💥 Unhandled error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🎯 ===== SERVER READY =====
🚀 Port: ${PORT}
🌐 Frontend: http://localhost:3000
🔗 Backend: http://localhost:${PORT}
📊 Health: http://localhost:${PORT}/api/health

📋 Status Summary:
   Database: ${isMongoConnected ? '✅ Connected' : '❌ Disconnected'}
   Auth: ${!!User ? '✅ Ready' : '❌ No User Model'}
   Articles: ${!!Article ? '✅ Ready' : '❌ No Article Model'}
   Admin Routes: ${!!adminArticleRoutes ? '✅ Mounted' : '❌ Not Available'}

🎉 Admin panel should work now!
=============================
  `);
});