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
let articleRoutes, authRoutes;

try {
  articleRoutes = require("./routes/articles");
} catch (error) {
  articleRoutes = (req, res) => res.status(404).json({ message: 'Articles not available' });
}

try {
  authRoutes = require("./routes/auth");
} catch (error) {
  authRoutes = (req, res) => res.status(404).json({ message: 'Auth not available' });
}

// Routes
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Teendom Backend API is running!",
    version: "2.2.0",
    features: {
      mongodb: isMongoConnected,
      cloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME),
      fileBackup: true
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
      cloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME) ? "Configured" : "Local storage"
    }
  });
});

app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes);

// Nominations routes
app.get('/api/nominations/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Nominations API is healthy',
    mongodb: isMongoConnected,
    cloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME)
  });
});

app.get('/api/nominations/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Test endpoint working',
    features: {
      mongodb: isMongoConnected,
      cloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME)
    }
  });
});

app.post('/api/nominations', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    console.log('🎯 POST /api/nominations');
    
    try {
      const submissionId = `TA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      let nominationData = {};
      try {
        if (req.body.nominationData) {
          nominationData = JSON.parse(req.body.nominationData);
        }
      } catch (parseError) {
        nominationData = req.body;
      }
      
      let uploadedFiles = { photo: null, supportingFiles: [] };
      
      // Upload photo
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        try {
          const cloudResult = await uploadNomineePhoto(photoFile, submissionId);
          uploadedFiles.photo = {
            filename: photoFile.filename,
            originalName: photoFile.originalname,
            url: cloudResult.url,
            cloudinary: { url: cloudResult.url, public_id: cloudResult.publicId }
          };
          fs.unlinkSync(photoFile.path);
        } catch (cloudError) {
          uploadedFiles.photo = {
            filename: photoFile.filename,
            originalName: photoFile.originalname,
            url: `/uploads/nominations/${photoFile.filename}`
          };
        }
      }
      
      // Upload supporting files
      if (req.files?.supportingFiles?.length > 0) {
        for (let i = 0; i < req.files.supportingFiles.length; i++) {
          const file = req.files.supportingFiles[i];
          try {
            const cloudResult = await uploadSupportingDocument(file, submissionId, i);
            uploadedFiles.supportingFiles.push({
              filename: file.filename,
              originalName: file.originalname,
              url: cloudResult.url,
              cloudinary: { url: cloudResult.url, public_id: cloudResult.publicId }
            });
            fs.unlinkSync(file.path);
          } catch (cloudError) {
            uploadedFiles.supportingFiles.push({
              filename: file.filename,
              originalName: file.originalname,
              url: `/uploads/nominations/${file.filename}`
            });
          }
        }
      }
      
      const nominationRecord = {
        submissionId: submissionId,
        status: 'submitted',
        submittedAt: new Date(),
        nominee: {
          firstName: nominationData.nominee?.firstName || '',
          lastName: nominationData.nominee?.lastName || '',
          age: parseInt(nominationData.nominee?.age) || 0,
          email: nominationData.nominee?.email || '',
          county: nominationData.nominee?.county || ''
        },
        nominator: {
          firstName: nominationData.nominator?.firstName || '',
          lastName: nominationData.nominator?.lastName || '',
          email: nominationData.nominator?.email || ''
        },
        awardCategory: nominationData.awardCategory || '',
        documents: {
          nomineePhoto: uploadedFiles.photo,
          supportingFiles: uploadedFiles.supportingFiles
        },
        files: uploadedFiles,
        rawData: nominationData
      };
      
      let savedToMongo = false;
      let mongoId = null;
      
      if (isMongoConnected && Nomination) {
        try {
          const newNomination = new Nomination(nominationRecord);
          const savedNomination = await newNomination.save();
          mongoId = savedNomination._id;
          savedToMongo = true;
        } catch (mongoError) {
          console.error('❌ MongoDB save failed:', mongoError.message);
        }
      }
      
      const backupPath = path.join(nominationsDir, `nomination-${submissionId}.json`);
      let savedToFile = false;
      try {
        fs.writeFileSync(backupPath, JSON.stringify(nominationRecord, null, 2));
        savedToFile = true;
      } catch (fileError) {
        console.error('❌ File backup failed:', fileError.message);
      }
      
      const responseData = {
        submissionId: submissionId,
        status: 'submitted',
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
      
      res.status(201).json({
        status: 'success',
        message: 'Nomination submitted successfully',
        submissionId: submissionId,
        data: responseData
      });
      
    } catch (error) {
      console.error('❌ Nomination error:', error);
      
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
        submissionId: null
      });
    }
  }
);

app.get('/api/nominations/status/:submissionId', async (req, res) => {
  try {
    let nomination = null;
    
    if (isMongoConnected && Nomination) {
      try {
        nomination = await Nomination.findOne({ submissionId: req.params.submissionId }).lean();
      } catch (mongoError) {}
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

app.get('/api/nominations/list', async (req, res) => {
  try {
    let nominations = [];
    
    if (isMongoConnected && Nomination) {
      try {
        nominations = await Nomination.find({})
          .select('submissionId status submittedAt nominee awardCategory')
          .sort({ submittedAt: -1 })
          .lean();
      } catch (mongoError) {}
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
    }
    
    res.json({
      status: 'success',
      data: {
        nominations: nominations,
        total: nominations.length
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to list nominations'
    });
  }
});

app.get('/api/admin/nominations', async (req, res) => {
  try {
    let nominations = [];
    
    if (isMongoConnected && Nomination) {
      try {
        nominations = await Nomination.find({})
          .sort({ submittedAt: -1 })
          .lean();
      } catch (mongoError) {}
    }
    
    if (nominations.length === 0) {
      const files = fs.readdirSync(nominationsDir)
        .filter(file => file.startsWith('nomination-') && file.endsWith('.json'))
        .map(file => {
          try {
            return JSON.parse(fs.readFileSync(path.join(nominationsDir, file), 'utf8'));
          } catch (error) {
            return null;
          }
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      
      nominations = files;
    }
    
    res.json({
      success: true,
      data: {
        nominations,
        total: nominations.length
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nominations'
    });
  }
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('🚨 Server Error:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'error',
      message: 'File too large. Maximum size is 50MB.'
    });
  }
  
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 TEENDOM BACKEND RUNNING ON PORT ${PORT}`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`💾 MongoDB: ${isMongoConnected ? 'CONNECTED' : 'FILE STORAGE'}`);
  console.log(`☁️ Cloudinary: ${!!(process.env.CLOUDINARY_CLOUD_NAME) ? 'CONFIGURED' : 'LOCAL STORAGE'}`);
  console.log(`✅ READY FOR NOMINATIONS\n`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    if (isMongoConnected) {
      mongoose.connection.close();
    }
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    if (isMongoConnected) {
      mongoose.connection.close();
    }
    process.exit(0);
  });
});

module.exports = app;