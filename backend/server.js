// File: backend/server.js - COMPLETE WITH FIXED STATIC FILE SERVING

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

// Ensure directories exist
[uploadsDir, nominationsDir, articlesDir].forEach(dir => {
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
      directories: {
        uploads: uploadsDir,
        nominations: nominationsDir,
        articles: articlesDir
      },
      files: {
        nominations: nominationFiles,
        articles: articleFiles
      },
      counts: {
        nominations: nominationFiles.length,
        articles: articleFiles.length
      }
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
      directories: {
        uploads: uploadsDir,
        nominations: nominationsDir,
        articles: articlesDir
      }
    });
  }
});

// Test endpoint for direct image access
app.get('/api/test/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(nominationsDir, filename);
  
  console.log(`🔍 Testing image access: ${filename}`);
  console.log(`🔍 Full path: ${filePath}`);
  console.log(`🔍 File exists: ${fs.existsSync(filePath)}`);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({
      error: 'File not found',
      filename: filename,
      path: filePath,
      exists: false
    });
  }
});

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
    version: "2.6.0",
    timestamp: new Date().toISOString(),
    features: {
      mongodb: isMongoConnected,
      authentication: !!User,
      nominations: !!Nomination,
      articles: !!Article,
      adminPanel: !!(adminArticleRoutes && User),
      staticFiles: true
    },
    availableRoutes: {
      health: '/api/health',
      auth: '/api/auth/*',
      nominations: '/api/nominations/*',
      articles: '/api/articles/*',
      admin: '/api/admin/*',
      uploads: '/uploads/*',
      debug: '/api/debug/files'
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

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = nominationsDir; // Default
    
    // Determine upload path based on fieldname or route
    if (file.fieldname === 'nomineePhoto' || file.fieldname === 'supportingFiles') {
      uploadPath = nominationsDir;
    } else if (file.fieldname === 'articleImage') {
      uploadPath = articlesDir;
    }
    
    console.log(`📁 Upload destination: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension);
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
    
    console.log(`📁 Generated filename: ${filename}`);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50000000, // 50MB
    files: parseInt(process.env.MAX_FILES) || 10
  },
  fileFilter: (req, file, cb) => {
    console.log(`📁 File filter check: ${file.originalname} (${file.mimetype})`);
    
    // Allow images and documents
    const allowedMimes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`), false);
    }
  }
});

// Nomination submission endpoint with Cloudinary integration
app.post('/api/nominations', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    console.log('🎯 POST /api/nominations - Processing submission');
    console.log('📁 Files received:', req.files);
    
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
      
      // Import Cloudinary utilities
      let cloudinaryUtils;
      try {
        cloudinaryUtils = require('./utils/cloudinaryUtils');
      } catch (error) {
        console.warn('⚠️ Cloudinary utils not available, using local storage');
      }
      
      // Handle file uploads - try Cloudinary first, fallback to local
      let uploadedFiles = { photo: null, supportingFiles: [] };
      let cloudinaryUploads = { photo: null, supportingFiles: [] };
      
      // Process nominee photo
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        console.log('📸 Processing nominee photo:', photoFile.filename);
        
        // Try Cloudinary upload
        if (cloudinaryUtils) {
          try {
            const cloudinaryResult = await cloudinaryUtils.uploadNomineePhoto(photoFile, submissionId);
            console.log('☁️ Cloudinary upload successful:', cloudinaryResult.url);
            
            cloudinaryUploads.photo = {
              url: cloudinaryResult.url,
              publicId: cloudinaryResult.publicId,
              cloudinary: true,
              filename: photoFile.originalname,
              size: cloudinaryResult.bytes
            };
          } catch (cloudinaryError) {
            console.error('❌ Cloudinary photo upload failed:', cloudinaryError.message);
            console.log('📁 Falling back to local storage...');
          }
        }
        
        // Local storage (always as backup)
        uploadedFiles.photo = {
          filename: photoFile.filename,
          originalName: photoFile.originalname,
          path: photoFile.path,
          url: `/uploads/nominations/${photoFile.filename}`,
          size: photoFile.size,
          mimetype: photoFile.mimetype
        };
      }
      
      // Process supporting files
      if (req.files?.supportingFiles) {
        for (let i = 0; i < req.files.supportingFiles.length; i++) {
          const file = req.files.supportingFiles[i];
          console.log(`📎 Processing supporting file ${i + 1}:`, file.filename);
          
          // Try Cloudinary upload
          if (cloudinaryUtils) {
            try {
              const cloudinaryResult = await cloudinaryUtils.uploadSupportingDocument(file, submissionId, i);
              console.log(`☁️ Cloudinary supporting file ${i + 1} upload successful:`, cloudinaryResult.url);
              
              cloudinaryUploads.supportingFiles.push({
                url: cloudinaryResult.url,
                publicId: cloudinaryResult.publicId,
                cloudinary: true,
                filename: file.originalname,
                size: cloudinaryResult.bytes,
                mimetype: file.mimetype
              });
            } catch (cloudinaryError) {
              console.error(`❌ Cloudinary supporting file ${i + 1} upload failed:`, cloudinaryError.message);
            }
          }
          
          // Local storage (always as backup)
          uploadedFiles.supportingFiles.push({
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            url: `/uploads/nominations/${file.filename}`,
            size: file.size,
            mimetype: file.mimetype
          });
        }
      }
      
      // Prepare nomination record with both storage methods
      const nominationRecord = {
        submissionId: submissionId,
        ...nominationData,
        files: uploadedFiles, // Local files (backup)
        cloudinary: cloudinaryUploads, // Cloudinary files (primary)
        submittedAt: new Date(),
        status: 'submitted'
      };
      
      // Save to database
      let mongoId = null;
      let savedToMongo = false;
      
      if (isMongoConnected && Nomination) {
        try {
          const newNomination = new Nomination(nominationRecord);
          const savedNomination = await newNomination.save();
          mongoId = savedNomination._id;
          savedToMongo = true;
          console.log('✅ Successfully saved to MongoDB:', mongoId);
        } catch (mongoSaveError) {
          console.error('❌ MongoDB save failed:', mongoSaveError.message);
          console.log('📊 Nomination data structure:', JSON.stringify(nominationRecord, null, 2));
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
            fileBackup: savedToFile
          },
          files: {
            photo: {
              cloudinary: cloudinaryUploads.photo ? cloudinaryUploads.photo.url : null,
              local: uploadedFiles.photo ? uploadedFiles.photo.filename : null
            },
            supportingFiles: {
              cloudinary: cloudinaryUploads.supportingFiles.length,
              local: uploadedFiles.supportingFiles.length
            }
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
      adminCategories: 'GET /api/admin/categories',
      debug: 'GET /api/debug/files'
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
📁 Debug Files: http://localhost:${PORT}/api/debug/files
📁 Static Files: http://localhost:${PORT}/uploads/

📋 Status Summary:
   Database: ${isMongoConnected ? '✅ Connected' : '❌ Disconnected'}
   Auth: ${!!User ? '✅ Ready' : '❌ No User Model'}
   Articles: ${!!Article ? '✅ Ready' : '❌ No Article Model'}
   Admin Routes: ${!!adminArticleRoutes ? '✅ Mounted' : '❌ Not Available'}
   Static Files: ✅ Served from ${uploadsDir}
   Nominations Dir: ✅ ${nominationsDir}

🎉 Server ready with enhanced static file serving!
=============================
  `);
});

module.exports = app;