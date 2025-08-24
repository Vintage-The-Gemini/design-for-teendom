// File: backend/server.js
// COMPLETE DEBUG SERVER - Full working version

const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();

console.log('🚀 Starting Teendom Backend Server...');
console.log('📁 Server directory:', __dirname);

// Create Express app
const app = express();

// Create uploads directory first
const uploadsDir = path.join(__dirname, 'uploads');
const nominationsDir = path.join(uploadsDir, 'nominations');

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('📁 Created uploads directory');
  }
  if (!fs.existsSync(nominationsDir)) {
    fs.mkdirSync(nominationsDir, { recursive: true });
    console.log('📁 Created nominations directory');
  }
  console.log('✅ Upload directories ready');
} catch (error) {
  console.error('❌ Failed to create directories:', error.message);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, nominationsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 6 // Max 6 files
  },
  fileFilter: function (req, file, cb) {
    console.log(`📁 File upload: ${file.originalname} (${file.mimetype})`);
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4', 'video/quicktime', 'video/x-msvideo'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}`), false);
    }
  }
});

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n🌐 ${timestamp}`);
  console.log(`📥 ${req.method} ${req.url}`);
  console.log(`🔗 Content-Type: ${req.get('content-type') || 'none'}`);
  console.log(`📦 Body keys: ${Object.keys(req.body)}`);
  
  if (req.url.includes('/nominations')) {
    console.log('🎯 NOMINATIONS REQUEST DETECTED');
  }
  
  next();
});

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// Database connection (optional - fallback if not available)
let connectDB;
try {
  connectDB = require("./config/database");
  connectDB().catch(err => {
    console.warn('⚠️ Database connection failed:', err.message);
    console.log('📝 Using file-based storage as fallback');
  });
} catch (error) {
  console.warn('⚠️ Database config not found, using file storage');
}

// Import other routes with fallbacks
let articleRoutes, authRoutes;

try {
  articleRoutes = require("./routes/articles");
  console.log('✅ Article routes loaded');
} catch (error) {
  console.warn('⚠️ Article routes not found');
  articleRoutes = (req, res) => res.status(404).json({ message: 'Articles not available' });
}

try {
  authRoutes = require("./routes/auth");
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.warn('⚠️ Auth routes not found');
  authRoutes = (req, res) => res.status(404).json({ message: 'Auth not available' });
}

// Root endpoint
app.get("/", (req, res) => {
  console.log('🏠 Root endpoint accessed');
  res.json({
    status: "success",
    message: "🚀 Teendom Backend API is running!",
    version: "2.1.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      health: "/api/health",
      articles: "/api/articles",
      nominations: "/api/nominations",
      nominationsHealth: "/api/nominations/health",
      auth: "/api/auth"
    }
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  console.log('🏥 Health check requested');
  res.json({
    status: "success",
    message: "✅ Backend is healthy",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    memory: process.memoryUsage(),
    services: {
      uploads: fs.existsSync(nominationsDir) ? "Available" : "Error",
      nominations: "Available"
    }
  });
});

// Mount other routes
app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes);

// NOMINATIONS ROUTES - BUILT INTO SERVER FOR GUARANTEED FUNCTIONALITY
console.log('🎯 Setting up nominations routes directly in server...');

// Nominations health endpoint
app.get('/api/nominations/health', (req, res) => {
  console.log('🏥 Nominations health check');
  res.json({
    status: 'success',
    message: 'Nominations API is healthy',
    timestamp: new Date().toISOString(),
    uploadsDir: nominationsDir,
    uploadsDirExists: fs.existsSync(nominationsDir),
    routes: {
      health: 'GET /api/nominations/health',
      submit: 'POST /api/nominations',
      status: 'GET /api/nominations/status/:submissionId'
    }
  });
});

// Nominations test endpoint
app.get('/api/nominations/test', (req, res) => {
  console.log('🧪 Nominations test endpoint');
  res.json({
    status: 'success',
    message: 'Nominations test endpoint working',
    timestamp: new Date().toISOString()
  });
});

// Main nominations submission endpoint - WITH FILE UPLOAD
app.post('/api/nominations', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  (req, res) => {
    console.log('🎯 POST /api/nominations - MAIN SUBMISSION ENDPOINT CALLED');
    console.log('📦 Request body keys:', Object.keys(req.body));
    console.log('📁 Files received:', {
      nomineePhoto: req.files?.nomineePhoto?.length || 0,
      supportingFiles: req.files?.supportingFiles?.length || 0
    });
    
    try {
      // Generate submission ID
      const submissionId = `TA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      console.log('🎫 Generated submission ID:', submissionId);
      
      // Parse nomination data
      let nominationData = {};
      try {
        if (req.body.nominationData) {
          nominationData = JSON.parse(req.body.nominationData);
          console.log('✅ Parsed nomination data successfully');
          console.log('👤 Nominee:', nominationData.nominee?.firstName, nominationData.nominee?.lastName);
          console.log('🏆 Category:', nominationData.awardCategory);
        }
      } catch (parseError) {
        console.warn('⚠️ Failed to parse nomination data:', parseError.message);
        nominationData = { test: true };
      }
      
      // Handle file uploads
      let uploadedFiles = {
        photo: null,
        supportingFiles: []
      };
      
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        uploadedFiles.photo = {
          filename: photoFile.filename,
          originalName: photoFile.originalname,
          size: photoFile.size,
          path: photoFile.path,
          url: `/uploads/nominations/${photoFile.filename}`
        };
        console.log('📸 Photo uploaded:', uploadedFiles.photo.filename);
      }
      
      if (req.files?.supportingFiles?.length > 0) {
        uploadedFiles.supportingFiles = req.files.supportingFiles.map(file => ({
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          path: file.path,
          url: `/uploads/nominations/${file.filename}`
        }));
        console.log(`📋 ${uploadedFiles.supportingFiles.length} supporting files uploaded`);
      }
      
      // Create nomination record
      const nominationRecord = {
        submissionId: submissionId,
        status: 'submitted',
        submittedAt: new Date(),
        nominee: nominationData.nominee || { firstName: 'Test', lastName: 'User' },
        nominator: nominationData.nominator || { firstName: 'Test', lastName: 'Nominator' },
        awardCategory: nominationData.awardCategory || 'Test Category',
        files: uploadedFiles,
        rawData: nominationData
      };
      
      // Save to file (as backup/primary storage)
      const backupPath = path.join(nominationsDir, `nomination-${submissionId}.json`);
      try {
        fs.writeFileSync(backupPath, JSON.stringify(nominationRecord, null, 2));
        console.log('💾 Nomination saved to file:', backupPath);
      } catch (fileError) {
        console.error('❌ Failed to save nomination file:', fileError.message);
      }
      
      // Response data
      const responseData = {
        submissionId: submissionId,
        nomineeFirstName: nominationRecord.nominee.firstName,
        nomineeLastName: nominationRecord.nominee.lastName,
        awardCategory: nominationRecord.awardCategory,
        submittedAt: nominationRecord.submittedAt,
        status: 'submitted',
        filesUploaded: {
          photo: !!uploadedFiles.photo,
          supportingFiles: uploadedFiles.supportingFiles.length
        }
      };
      
      // Success response
      const response = {
        status: 'success',
        message: 'Nomination submitted successfully',
        submissionId: submissionId,
        data: responseData
      };
      
      console.log('✅ Sending success response');
      console.log('📤 Response data:', {
        submissionId: response.submissionId,
        status: response.status
      });
      
      res.status(201).json(response);
      
    } catch (error) {
      console.error('❌ Nomination submission error:', error);
      console.error('📊 Error stack:', error.stack);
      
      // Clean up uploaded files on error
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          if (fs.existsSync(file.path)) {
            try {
              fs.unlinkSync(file.path);
              console.log('🗑️ Cleaned up file:', file.path);
            } catch (cleanupError) {
              console.error('❌ Cleanup failed:', cleanupError.message);
            }
          }
        });
      }
      
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit nomination',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        submissionId: null
      });
    }
  }
);

// Submission status endpoint
app.get('/api/nominations/status/:submissionId', (req, res) => {
  console.log('📊 Status check for:', req.params.submissionId);
  
  try {
    const backupPath = path.join(nominationsDir, `nomination-${req.params.submissionId}.json`);
    
    if (fs.existsSync(backupPath)) {
      const data = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
      res.json({
        status: 'success',
        data: {
          submissionId: data.submissionId,
          status: data.status,
          submittedAt: data.submittedAt,
          nominee: data.nominee
        }
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }
  } catch (error) {
    console.error('❌ Status check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check status'
    });
  }
});

// List all nominations (for admin/testing)
app.get('/api/nominations/list', (req, res) => {
  console.log('📋 List all nominations requested');
  
  try {
    const files = fs.readdirSync(nominationsDir)
      .filter(file => file.startsWith('nomination-') && file.endsWith('.json'))
      .map(file => {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(nominationsDir, file), 'utf8'));
          return {
            submissionId: data.submissionId,
            status: data.status,
            submittedAt: data.submittedAt,
            nominee: data.nominee,
            awardCategory: data.awardCategory
          };
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    res.json({
      status: 'success',
      data: {
        nominations: files,
        total: files.length
      }
    });
  } catch (error) {
    console.error('❌ List nominations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to list nominations'
    });
  }
});

console.log('✅ All nominations routes configured directly in server');

// 404 handler
app.all("*", (req, res) => {
  console.log(`\n❌ 404 ERROR:`);
  console.log(`📍 Route: ${req.method} ${req.originalUrl}`);
  console.log(`🔍 Available nominations routes:`);
  console.log(`   - GET /api/nominations/health`);
  console.log(`   - GET /api/nominations/test`);
  console.log(`   - POST /api/nominations`);
  console.log(`   - GET /api/nominations/status/:id`);
  console.log(`   - GET /api/nominations/list`);
  
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
    method: req.method,
    availableRoutes: [
      "GET /",
      "GET /api/health",
      "GET /api/nominations/health",
      "GET /api/nominations/test",
      "POST /api/nominations",
      "GET /api/nominations/status/:id",
      "GET /api/nominations/list"
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Server Error:', error);
  console.error('🚨 Error Stack:', error.stack);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'error',
      message: 'File too large. Maximum size is 50MB.'
    });
  }
  
  if (error.message && error.message.includes('Invalid file type')) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid file type uploaded'
    });
  }
  
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('\n🚀 ===============================================');
  console.log('🚀 TEENDOM AWARDS BACKEND SERVER - FULL VERSION');
  console.log('🚀 ===============================================');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Nominations:`);
  console.log(`   📍 Health: GET http://localhost:${PORT}/api/nominations/health`);
  console.log(`   📍 Test: GET http://localhost:${PORT}/api/nominations/test`);
  console.log(`   📍 Submit: POST http://localhost:${PORT}/api/nominations`);
  console.log(`   📍 Status: GET http://localhost:${PORT}/api/nominations/status/:id`);
  console.log(`   📍 List: GET http://localhost:${PORT}/api/nominations/list`);
  console.log(`📁 Files: http://localhost:${PORT}/uploads`);
  console.log('🚀 ===============================================');
  console.log('✅ READY FOR NOMINATION SUBMISSIONS!');
  console.log('🔍 WATCH CONSOLE FOR DETAILED REQUEST LOGS');
  console.log('🚀 ===============================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;