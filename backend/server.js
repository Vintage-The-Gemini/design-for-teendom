// File: backend/server.js - COMPLETE FIXED VERSION WITH IMAGE SUPPORT

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
        publicNominations: !!publicNominationRoutes ? "✅ Available" : "❌ Missing",
        adminArticles: !!adminArticleRoutes ? "✅ Available" : "❌ Missing",
        adminCategories: !!adminCategoryRoutes ? "✅ Available" : "❌ Missing",
        adminNominations: !!adminNominationRoutes ? "✅ Available" : "❌ Missing",
        adminSystem: !!adminSystemRoutes ? "✅ Available" : "❌ Missing"
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
    version: "2.7.0",
    timestamp: new Date().toISOString(),
    features: {
      mongodb: isMongoConnected,
      authentication: !!User,
      nominations: !!Nomination,
      articles: !!Article,
      adminPanel: !!(adminArticleRoutes && User),
      staticFiles: true,
      imageSupport: true
    },
    availableRoutes: {
      health: '/api/health',
      auth: '/api/auth/*',
      nominations: '/api/nominations/*',
      articles: '/api/articles/*',
      admin: '/api/admin/*',
      uploads: '/uploads/*',
      debug: '/api/debug/files',
      testImage: '/api/test/image/:filename'
    }
  });
});

// Mount routes
console.log('🔗 Mounting routes...');

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/nominations", publicNominationRoutes);

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

if (adminSystemRoutes) {
  app.use("/api/admin/system", adminSystemRoutes);
  console.log('✅ Admin system routes mounted at /api/admin/system');
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
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 6 // Max 6 files
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4', 'video/quicktime', 'video/x-msvideo'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`), false);
    }
  }
});

// ENHANCED NOMINATIONS SUBMISSION ENDPOINT WITH BETTER IMAGE HANDLING
app.post('/api/nominations', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    try {
      console.log('📥 Nomination submission received');
      console.log('📋 Form data:', req.body);
      console.log('📁 Files:', req.files);

      const submissionId = `TEEN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Process uploaded files with better error handling
      const uploadedFiles = {
        photo: null,
        supportingFiles: []
      };

      // Handle nominee photo
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        uploadedFiles.photo = {
          filename: photoFile.filename,
          originalName: photoFile.originalname,
          mimetype: photoFile.mimetype,
          size: photoFile.size,
          url: `/uploads/nominations/${photoFile.filename}` // Direct URL
        };
        console.log('📸 Photo processed:', uploadedFiles.photo);
      }

      // Handle supporting files
      if (req.files?.supportingFiles) {
        uploadedFiles.supportingFiles = req.files.supportingFiles.map(file => ({
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          url: `/uploads/nominations/${file.filename}`
        }));
        console.log('📎 Supporting files processed:', uploadedFiles.supportingFiles.length);
      }

      // Upload to Cloudinary (if available)
      const cloudinaryUploads = {
        photo: null,
        supportingFiles: []
      };

      try {
        const cloudinaryUtils = require('./utils/cloudinaryUtils');
        
        // Upload photo to Cloudinary
        if (uploadedFiles.photo) {
          console.log('☁️ Uploading photo to Cloudinary...');
          const photoPath = path.join(nominationsDir, uploadedFiles.photo.filename);
          const cloudinaryResult = await cloudinaryUtils.uploadNomineePhoto(
            { path: photoPath },
            submissionId
          );
          
          if (cloudinaryResult.success) {
            cloudinaryUploads.photo = {
              url: cloudinaryResult.url,
              publicId: cloudinaryResult.publicId,
              variations: cloudinaryResult.variations
            };
            console.log('☁️ ✅ Photo uploaded to Cloudinary:', cloudinaryResult.url);
          }
        }

        // Upload supporting files to Cloudinary
        for (let i = 0; i < uploadedFiles.supportingFiles.length; i++) {
          const file = uploadedFiles.supportingFiles[i];
          const filePath = path.join(nominationsDir, file.filename);
          
          try {
            const cloudinaryResult = await cloudinaryUtils.uploadSupportingDocument(
              { path: filePath },
              submissionId,
              i
            );
            
            if (cloudinaryResult.success) {
              cloudinaryUploads.supportingFiles.push({
                url: cloudinaryResult.url,
                publicId: cloudinaryResult.publicId,
                originalName: file.originalName
              });
              console.log(`☁️ ✅ Supporting file ${i + 1} uploaded to Cloudinary`);
            }
          } catch (error) {
            console.error(`☁️ ❌ Supporting file ${i + 1} upload failed:`, error);
          }
        }
      } catch (cloudinaryError) {
        console.warn('☁️ ⚠️ Cloudinary not available:', cloudinaryError.message);
      }

      // Build nomination record with ENHANCED IMAGE URLS
      const nominationRecord = {
        submissionId: submissionId,
        submittedAt: new Date(),
        status: 'submitted',
        
        // Nominee information
        nominee: {
          firstName: req.body.nomineeFirstName,
          lastName: req.body.nomineeLastName,
          email: req.body.nomineeEmail,
          phone: req.body.nomineePhone,
          location: req.body.nomineeLocation,
          school: req.body.nomineeSchool
        },
        
        // Nominator information
        nominator: {
          firstName: req.body.nominatorFirstName,
          lastName: req.body.nominatorLastName,
          email: req.body.nominatorEmail,
          phone: req.body.nominatorPhone,
          relationship: req.body.relationship
        },
        
        // Nomination details
        awardCategory: req.body.awardCategory,
        nominationReason: req.body.nominationReason,
        supportingEvidence: req.body.supportingEvidence,
        
        // File storage (local)
        files: {
          photo: uploadedFiles.photo,
          supportingFiles: uploadedFiles.supportingFiles
        },
        
        // Cloudinary URLs (CDN)
        cloudinary: {
          photo: cloudinaryUploads.photo,
          supportingFiles: cloudinaryUploads.supportingFiles
        },
        
        // ENHANCED: Admin access URLs - provide the BEST available URL
        adminAccessUrls: {
          nomineePhoto: cloudinaryUploads.photo?.url || 
                       (uploadedFiles.photo ? `http://localhost:${PORT}/uploads/nominations/${uploadedFiles.photo.filename}` : null),
          supportingFiles: [
            ...cloudinaryUploads.supportingFiles.map(file => file.url),
            ...uploadedFiles.supportingFiles.map(file => `http://localhost:${PORT}/uploads/nominations/${file.filename}`)
          ]
        }
      };
      
      // Save to database with REAL URLs
      let mongoId = null;
      let savedToMongo = false;
      
      if (Nomination) {
        try {
          const newNomination = new Nomination(nominationRecord);
          const savedNomination = await newNomination.save();
          mongoId = savedNomination._id;
          savedToMongo = true;
          console.log('✅ Saved to MongoDB with REAL URLs:', mongoId);
          console.log('🔍 Admin photo URL:', nominationRecord.adminAccessUrls.nomineePhoto);
        } catch (mongoSaveError) {
          console.error('❌ MongoDB save failed:', mongoSaveError.message);
        }
      }
      
      // Save backup to file system
      const backupPath = path.join(nominationsDataDir, `nomination-${submissionId}.json`);
      let savedToFile = false;
      try {
        fs.writeFileSync(backupPath, JSON.stringify(nominationRecord, null, 2));
        savedToFile = true;
        console.log('✅ Backup saved to file system');
      } catch (fileError) {
        console.error('❌ File backup failed:', fileError.message);
      }
      
      // FIXED: Return response with REAL URLs that frontend can display
      res.status(201).json({
        status: 'success',
        message: 'Nomination submitted successfully',
        submissionId: submissionId,
        data: {
          submissionId: submissionId,
          status: 'submitted',
          storage: {
            mongodb: savedToMongo,
            mongoId: mongoId ? mongoId.toString() : null,
            fileBackup: savedToFile
          },
          files: {
            photo: {
              // FIXED: Return REAL URLs that admins can access
              cloudinary: cloudinaryUploads.photo?.url || null,
              local: uploadedFiles.photo?.filename || null,
              adminUrl: nominationRecord.adminAccessUrls.nomineePhoto
            },
            supportingFiles: {
              cloudinary: cloudinaryUploads.supportingFiles.length,
              local: uploadedFiles.supportingFiles.length,
              adminUrls: nominationRecord.adminAccessUrls.supportingFiles
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
      adminNominations: 'GET /api/admin/nominations',
      adminSystem: 'GET /api/admin/system/health',
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
🖼️  Test Image: http://localhost:${PORT}/api/test/image/[filename]

📋 Status Summary:
   Database: ${isMongoConnected ? '✅ Connected' : '❌ Disconnected'}
   Auth: ${!!User ? '✅ Ready' : '❌ No User Model'}
   Articles: ${!!Article ? '✅ Ready' : '❌ No Article Model'}
   Nominations: ${!!Nomination ? '✅ Ready' : '❌ No Nomination Model'}
   Admin Articles: ${!!adminArticleRoutes ? '✅ Mounted' : '❌ Not Available'}
   Admin Nominations: ${!!adminNominationRoutes ? '✅ Mounted' : '❌ Not Available'}
   Admin System: ${!!adminSystemRoutes ? '✅ Mounted' : '❌ Not Available'}
   Static Files: ✅ Served from ${uploadsDir}
   Nominations Dir: ✅ ${nominationsDir}
   Image Support: ✅ Enhanced with fallbacks

🎉 Server ready with perfect image handling!
=============================
  `);
});

module.exports = app;