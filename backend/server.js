// File: backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mongoose = require('mongoose');
const { uploadNomineePhoto, uploadSupportingDocument } = require('./utils/cloudinaryUtils');

require("dotenv").config();

console.log('🚀 Starting Teendom Backend Server...');

const app = express();

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
const nominationsDir = path.join(uploadsDir, 'nominations');

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (!fs.existsSync(nominationsDir)) {
    fs.mkdirSync(nominationsDir, { recursive: true });
  }
} catch (error) {
  console.error('❌ Failed to create directories:', error.message);
}

// Configure multer
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
    fileSize: 50 * 1024 * 1024,
    files: 6
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}`), false);
    }
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
  console.log(`\n📥 ${req.method} ${req.url}`);
  next();
});

app.use('/uploads', express.static(uploadsDir));

// Database connection
let connectDB;
try {
  connectDB = require("./config/database");
  connectDB().catch(err => {
    console.warn('⚠️ Database connection failed:', err.message);
  });
} catch (error) {
  console.warn('⚠️ Database config not found, using file storage');
}

let isMongoConnected = false;
let Nomination;

if (connectDB) {
  connectDB().then(() => {
    try {
      Nomination = require('./models/Nomination');
      isMongoConnected = true;
      console.log('✅ MongoDB + Nomination model ready');
    } catch (error) {
      console.warn('⚠️ Nomination model not found');
    }
  }).catch(err => {
    console.warn('⚠️ MongoDB connection failed:', err.message);
  });
}

// Import routes
let articleRoutes, authRoutes, adminNominationRoutes;

try {
  articleRoutes = require("./routes/articles");
} catch (error) {
  console.warn('⚠️ Articles routes not found');
  articleRoutes = (req, res) => res.status(404).json({ message: 'Articles not available' });
}

try {
  authRoutes = require("./routes/auth");
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.warn('⚠️ Auth routes not found');
  authRoutes = (req, res) => res.status(404).json({ message: 'Auth not available' });
}

try {
  adminNominationRoutes = require("./routes/admin/nominations");
  console.log('✅ Admin nomination routes loaded');
} catch (error) {
  console.warn('⚠️ Admin nomination routes not found');
}

// Routes
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Teendom Backend API is running!",
    version: "2.3.0",
    features: {
      mongodb: isMongoConnected,
      cloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME),
      fileBackup: true
    },
    availableRoutes: {
      auth: '/api/auth/*',
      nominations: '/api/nominations/*',
      articles: '/api/articles/*',
      admin: '/api/admin/*',
      health: '/api/health'
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "✅ Backend is healthy",
    services: {
      uploads: fs.existsSync(nominationsDir) ? "Available" : "Error",
      mongodb: isMongoConnected ? "Connected" : "File storage",
      cloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME) ? "Configured" : "Local storage",
      auth: !!authRoutes ? "Available" : "Not found"
    }
  });
});

// Mount routes
app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes);

if (adminNominationRoutes) {
  app.use("/api/admin/nominations", adminNominationRoutes);
}

// Nominations routes
app.get('/api/nominations/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Nominations API is healthy',
    mongodb: isMongoConnected,
    cloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME)
  });
});

// CORRECTED: Main nomination submission endpoint
app.post('/api/nominations', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    console.log('🎯 POST /api/nominations - CORRECTED VERSION');
    
    try {
      const submissionId = `TA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      let nominationData = {};
      try {
        if (req.body.nominationData) {
          nominationData = JSON.parse(req.body.nominationData);
          console.log('📊 Parsed nomination data:', JSON.stringify(nominationData, null, 2));
        }
      } catch (parseError) {
        console.error('❌ Failed to parse nomination data:', parseError);
        nominationData = req.body;
      }
      
      // Handle file uploads
      let uploadedFiles = { photo: null, supportingFiles: [] };
      
      // Upload photo if provided
      if (req.files?.nomineePhoto?.[0]) {
        try {
          const photoFile = req.files.nomineePhoto[0];
          console.log('📸 Processing nominee photo:', photoFile.filename);
          
          if (process.env.CLOUDINARY_CLOUD_NAME) {
            const cloudinaryResult = await uploadNomineePhoto(photoFile, submissionId);
            uploadedFiles.photo = cloudinaryResult;
            console.log('☁️ Photo uploaded to Cloudinary');
          } else {
            uploadedFiles.photo = {
              filename: photoFile.filename,
              path: photoFile.path,
              url: `/uploads/nominations/${photoFile.filename}`,
              size: photoFile.size
            };
            console.log('💾 Photo saved locally');
          }
        } catch (uploadError) {
          console.error('❌ Photo upload failed:', uploadError.message);
        }
      }
      
      // Upload supporting files if provided
      if (req.files?.supportingFiles) {
        for (let i = 0; i < req.files.supportingFiles.length; i++) {
          try {
            const file = req.files.supportingFiles[i];
            console.log(`📁 Processing supporting file ${i + 1}:`, file.filename);
            
            if (process.env.CLOUDINARY_CLOUD_NAME) {
              const cloudinaryResult = await uploadSupportingDocument(file, submissionId, i);
              uploadedFiles.supportingFiles.push(cloudinaryResult);
              console.log(`☁️ Supporting file ${i + 1} uploaded to Cloudinary`);
            } else {
              uploadedFiles.supportingFiles.push({
                filename: file.filename,
                path: file.path,
                url: `/uploads/nominations/${file.filename}`,
                size: file.size,
                originalName: file.originalname
              });
              console.log(`💾 Supporting file ${i + 1} saved locally`);
            }
          } catch (uploadError) {
            console.error(`❌ Supporting file ${i + 1} upload failed:`, uploadError.message);
          }
        }
      }
      
      // Create complete nomination record with CORRECTED structure
      const nominationRecord = {
        submissionId: submissionId,
        ...nominationData,
        // ✅ CORRECTED: Ensure photo field is populated
        nominee: {
          ...nominationData.nominee,
          photo: uploadedFiles.photo?.url || nominationData.nominee?.photo || 'placeholder-photo.jpg',
          photoPublicId: uploadedFiles.photo?.publicId || null
        },
        supportingFiles: uploadedFiles.supportingFiles.map(file => ({
          filename: file.filename || file.originalName,
          url: file.url,
          cloudinaryId: file.publicId,
          size: file.size
        })),
        submittedAt: new Date(),
        status: 'submitted',
        phase: 'nomination',
        // Initialize required nested objects
        adminReview: {
          reviewed: false,
          status: 'pending'
        },
        judging: {
          assignedJudges: [],
          scores: [],
          isFinalist: false
        },
        voting: {
          publicVotes: 0
        }
      };
      
      console.log('📋 Final nomination record structure:', JSON.stringify(nominationRecord, null, 2));
      
      let savedToMongo = false;
      let mongoId = null;
      let mongoError = null;
      
      // Try to save to MongoDB with detailed error logging
      if (isMongoConnected && Nomination) {
        try {
          console.log('💾 Attempting to save to MongoDB...');
          const newNomination = new Nomination(nominationRecord);
          const savedNomination = await newNomination.save();
          mongoId = savedNomination._id;
          savedToMongo = true;
          console.log('✅ Successfully saved to MongoDB:', mongoId);
        } catch (mongoSaveError) {
          mongoError = mongoSaveError;
          console.error('❌ MongoDB save failed:', mongoSaveError.message);
          
          // Log validation errors in detail
          if (mongoSaveError.errors) {
            console.error('🔍 Validation errors:');
            Object.keys(mongoSaveError.errors).forEach(field => {
              console.error(`   • ${field}: ${mongoSaveError.errors[field].message}`);
            });
          }
        }
      } else {
        console.warn('⚠️ MongoDB not connected, using file backup only');
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
      
      // Prepare response
      const responseData = {
        submissionId: submissionId,
        status: savedToMongo ? 'submitted' : 'pending',
        storage: {
          mongodb: savedToMongo,
          mongoId: mongoId ? mongoId.toString() : null,
          fileBackup: savedToFile,
          cloudinary: {
            photo: !!uploadedFiles.photo?.cloudinary,
            supportingFiles: uploadedFiles.supportingFiles.filter(f => f.cloudinary).length
          }
        }
      };
      
      // If MongoDB failed, include error details for debugging
      if (!savedToMongo && mongoError) {
        responseData.mongoError = {
          message: mongoError.message,
          validationErrors: mongoError.errors ? Object.keys(mongoError.errors).map(field => ({
            field,
            message: mongoError.errors[field].message
          })) : []
        };
      }
      
      res.status(201).json({
        status: 'success',
        message: savedToMongo ? 'Nomination submitted successfully' : 'Nomination saved to backup (MongoDB error)',
        submissionId: submissionId,
        data: responseData
      });
      
    } catch (error) {
      console.error('❌ Nomination submission error:', error);
      
      // Cleanup uploaded files on error
      if (req.files) {
        Object.values(req.files).flat().forEach(file => {
          if (fs.existsSync(file.path)) {
            try {
              fs.unlinkSync(file.path);
            } catch {}
          }
        });
      }
      
      res.status(500).json({
        status: 'error',
        message: 'Failed to submit nomination',
        error: error.message,
        submissionId: null
      });
    }
  }
);

// Get nomination status
app.get('/api/nominations/status/:submissionId', async (req, res) => {
  try {
    let nomination = null;
    
    if (isMongoConnected && Nomination) {
      try {
        nomination = await Nomination.findOne({ submissionId: req.params.submissionId }).lean();
      } catch (mongoError) {
        console.warn('MongoDB query failed:', mongoError.message);
      }
    }
    
    if (!nomination) {
      const backupPath = path.join(nominationsDir, `nomination-${req.params.submissionId}.json`);
      if (fs.existsSync(backupPath)) {
        nomination = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
      }
    }
    
    if (nomination) {
      res.json({
        status: 'success',
        data: {
          submissionId: nomination.submissionId,
          status: nomination.status,
          submittedAt: nomination.submittedAt
        }
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to check status'
    });
  }
});

// List all nominations (for admin)
app.get('/api/nominations/list', async (req, res) => {
  try {
    let nominations = [];
    
    if (isMongoConnected && Nomination) {
      try {
        nominations = await Nomination.find({})
          .select('submissionId status submittedAt nominee awardCategory')
          .sort({ submittedAt: -1 })
          .lean();
        console.log(`📊 Found ${nominations.length} nominations in MongoDB`);
      } catch (mongoError) {
        console.warn('MongoDB query failed:', mongoError.message);
      }
    }
    
    if (nominations.length === 0) {
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
      
      nominations = files;
      console.log(`📁 Found ${nominations.length} nominations in file backup`);
    }
    
    res.json({
      status: 'success',
      data: {
        nominations: nominations,
        total: nominations.length
      }
    });
  } catch (error) {
    console.error('❌ Failed to list nominations:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve nominations'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Global error handler:', error.message);
  
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
        message: 'Too many files. Maximum 6 files allowed.'
      });
    }
  }
  
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /api/nominations/health',
      'POST /api/nominations',
      'GET /api/nominations/status/:submissionId',
      'GET /api/nominations/list'
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Nominations API: http://localhost:${PORT}/api/nominations`);
  console.log('\n✅ Ready to receive nominations!');
});