// File: backend/routes/public/nominations.js - FIXED MODEL LOADING

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// FIXED: Proper model import - get it from mongoose models
let Nomination;
try {
  // First try to get from mongoose.models (if already loaded)
  Nomination = require('mongoose').models.Nomination || require('../../models/Nomination');
  console.log('✅ Nomination model loaded in nominations route');
} catch (error) {
  console.error('❌ CRITICAL: Failed to load Nomination model in route:', error.message);
  console.error('🔍 Make sure models/Nomination.js exists and is valid');
}

// Import cloudinary utilities
let cloudinaryUtils;
try {
  cloudinaryUtils = require('../../utils/cloudinaryUtils');
  console.log('✅ Cloudinary utilities loaded');
} catch (error) {
  console.warn('⚠️ Cloudinary utilities not found:', error.message);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const nominationsDir = path.join(__dirname, '../../uploads/nominations');
    if (!fs.existsSync(nominationsDir)) {
      fs.mkdirSync(nominationsDir, { recursive: true });
    }
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
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 6
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'nomineePhoto') {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for nominee photo'));
      }
    } else {
      cb(null, true);
    }
  }
});

// POST /api/nominations - Submit nomination (FIXED)
router.post('/', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    console.log('🎯 POST /api/nominations - PROCESSING SUBMISSION');
    console.log('📁 Files received:', req.files);
    console.log('🔍 Nomination model available:', !!Nomination);
    
    // CRITICAL: Check if Nomination model is available
    if (!Nomination) {
      console.error('❌ CRITICAL: Nomination model not available');
      return res.status(503).json({
        status: 'error',
        message: 'Database service unavailable - Nomination model not loaded',
        details: 'The server is not properly connected to the database'
      });
    }
    
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
      
      console.log('📋 Parsed nomination data:', nominationData);
      
      // File upload handling
      let uploadedFiles = { photo: null, supportingFiles: [] };
      let cloudinaryUploads = { photo: null, supportingFiles: [] };
      
      // Process nominee photo
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        console.log('📸 Processing nominee photo:', photoFile.filename);
        
        uploadedFiles.photo = {
          filename: photoFile.filename,
          originalName: photoFile.originalname,
          path: photoFile.path,
          url: `/uploads/nominations/${photoFile.filename}`,
          size: photoFile.size,
          mimetype: photoFile.mimetype
        };
        
        // Cloudinary upload
        if (cloudinaryUtils) {
          try {
            const cloudinaryResult = await cloudinaryUtils.uploadNomineePhoto(photoFile, submissionId);
            console.log('☁️ Cloudinary upload successful:', cloudinaryResult.url);
            
            cloudinaryUploads.photo = {
              url: cloudinaryResult.url,
              publicId: cloudinaryResult.publicId,
              cloudinary: true
            };
          } catch (cloudinaryError) {
            console.error('❌ Cloudinary photo upload failed:', cloudinaryError.message);
          }
        }
      }
      
      // Process supporting files
      if (req.files?.supportingFiles) {
        for (const file of req.files.supportingFiles) {
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
      
      // Build nomination record with REAL URLs
      const nominationRecord = {
        submissionId: submissionId,
        nominee: {
          firstName: nominationData.nominee.firstName,
          middleName: nominationData.nominee.middleName || '',
          lastName: nominationData.nominee.lastName,
          dateOfBirth: new Date(nominationData.nominee.dateOfBirth),
          age: parseInt(nominationData.nominee.age),
          gender: nominationData.nominee.gender,
          email: nominationData.nominee.email || null, // Optional for minors
          phone: nominationData.nominee.phone || null, // Optional for minors
          nationality: nominationData.nominee.nationality,
          location: {
            county: nominationData.nominee.county || nominationData.nominee.location?.county,
            subcounty: nominationData.nominee.subcounty || nominationData.nominee.location?.subcounty || '',
            ward: nominationData.nominee.ward || nominationData.nominee.location?.ward || '',
            city: nominationData.nominee.city || nominationData.nominee.location?.city || ''
          },
          school: {
            name: nominationData.nominee.school?.name || null, // Optional
            level: nominationData.nominee.school?.level || null, // Optional
            grade: nominationData.nominee.school?.grade || null // Optional
          },
          // CRITICAL: Use REAL URL, never blob URL
          photo: cloudinaryUploads.photo?.url || 
                 (uploadedFiles.photo ? `http://localhost:5000/uploads/nominations/${uploadedFiles.photo.filename}` : null),
          photoPublicId: cloudinaryUploads.photo?.publicId || null
        },
        nominator: {
          firstName: nominationData.nominator.firstName,
          lastName: nominationData.nominator.lastName,
          email: nominationData.nominator.email,
          phone: nominationData.nominator.phone,
          relationship: nominationData.nominator.relationship,
          organization: nominationData.nominator.organization || '',
          isSelfNomination: nominationData.nominator.isSelfNomination || false
        },
        awardCategory: nominationData.awardCategory,
        shortBio: nominationData.shortBio,
        achievements: nominationData.achievements || '',
        impact: nominationData.impact,
        whyDeserveAward: nominationData.whyDeserveAward,
        additionalInfo: nominationData.additionalInfo || '',
        socialMediaLinks: nominationData.socialMediaLinks || {},
        referee: {
          name: nominationData.referee.name,
          email: nominationData.referee.email,
          phone: nominationData.referee.phone,
          position: nominationData.referee.position,
          organization: nominationData.referee.organization || '',
          relationship: nominationData.referee.relationship
        },
        supportingFiles: uploadedFiles.supportingFiles,
        cloudinary: {
          photo: cloudinaryUploads.photo,
          supportingFiles: cloudinaryUploads.supportingFiles
        },
        adminAccessUrls: {
          nomineePhoto: cloudinaryUploads.photo?.url || 
                      (uploadedFiles.photo ? `http://localhost:5000/uploads/nominations/${uploadedFiles.photo.filename}` : null),
          supportingFiles: uploadedFiles.supportingFiles.map(file => `http://localhost:5000/uploads/nominations/${file.filename}`)
        },
        consent: {
          accurateInfo: nominationData.consent.accurateInfo,
          nomineePermission: nominationData.consent.nomineePermission,
          parentalConsent: nominationData.consent.parentalConsent,
          dataUsage: nominationData.consent.dataUsage,
          publicRecognition: nominationData.consent.publicRecognition,
          backgroundCheck: nominationData.consent.backgroundCheck,
          antifraud: nominationData.consent.antifraud
        },
        status: 'submitted',
        phase: 'nomination',
        submittedAt: new Date(),
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
      };
      
      console.log('📋 Built nomination record:', {
        submissionId: nominationRecord.submissionId,
        nominee: `${nominationRecord.nominee.firstName} ${nominationRecord.nominee.lastName}`,
        category: nominationRecord.awardCategory,
        hasPhoto: !!nominationRecord.nominee.photo,
        photoUrl: nominationRecord.nominee.photo
      });
      
      // FIXED: Enhanced MongoDB save with better error checking
      let mongoId = null;
      let savedToMongo = false;
      
      console.log('💾 Attempting to save to MongoDB...');
      console.log('🔍 Nomination model available:', !!Nomination);
      console.log('🔍 Mongoose connection state:', require('mongoose').connection.readyState);
      
      // Check both model availability AND connection
      if (Nomination && require('mongoose').connection.readyState === 1) {
        try {
          console.log('✅ Creating new nomination instance...');
          const newNomination = new Nomination(nominationRecord);
          
          console.log('✅ Saving to database...');
          const savedNomination = await newNomination.save();
          
          mongoId = savedNomination._id;
          savedToMongo = true;
          
          console.log('🎉 SUCCESS: Saved to MongoDB!');
          console.log(`📋 Submission ID: ${savedNomination.submissionId}`);
          console.log(`🆔 MongoDB ID: ${savedNomination._id}`);
          console.log('🔍 Admin photo URL saved:', nominationRecord.adminAccessUrls.nomineePhoto);
          
        } catch (mongoSaveError) {
          console.error('❌ MongoDB save failed:', mongoSaveError.message);
          console.error('🔍 Error type:', mongoSaveError.name);
          
          if (mongoSaveError.errors) {
            console.error('🔍 Validation errors:');
            Object.entries(mongoSaveError.errors).forEach(([field, error]) => {
              console.error(`   • ${field}: ${error.message}`);
            });
          }
          
          console.log('📝 Continuing with file backup...');
        }
      } else {
        console.error('❌ Cannot save to MongoDB:');
        console.error(`   • Model available: ${!!Nomination}`);
        console.error(`   • Connection state: ${require('mongoose').connection.readyState} (1=connected)`);
      }
      
      // Save backup to file system (always do this)
      const nominationsDir = path.join(__dirname, '../../uploads/nominations');
      const backupPath = path.join(nominationsDir, `nomination-${submissionId}.json`);
      let savedToFile = false;
      
      try {
        if (!fs.existsSync(nominationsDir)) {
          fs.mkdirSync(nominationsDir, { recursive: true });
        }
        
        fs.writeFileSync(backupPath, JSON.stringify(nominationRecord, null, 2));
        savedToFile = true;
        console.log('✅ Backup saved to file system:', backupPath);
      } catch (fileError) {
        console.error('❌ File backup failed:', fileError.message);
      }
      
      // Return response with storage status
      const response = {
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
              cloudinary: cloudinaryUploads.photo?.url || null,
              local: uploadedFiles.photo?.filename || null,
              adminUrl: cloudinaryUploads.photo?.url || (uploadedFiles.photo ? 
                `http://localhost:5000/uploads/nominations/${uploadedFiles.photo.filename}` : null)
            },
            supportingFiles: {
              cloudinary: cloudinaryUploads.supportingFiles.length,
              local: uploadedFiles.supportingFiles.length
            }
          }
        }
      };
      
      console.log('📤 Sending response:', {
        submissionId: response.submissionId,
        mongoSaved: savedToMongo,
        fileSaved: savedToFile
      });
      
      res.status(201).json(response);
      
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

// GET /api/nominations - Get all nominations (for admin)
router.get('/', async (req, res) => {
  try {
    console.log('📋 GET /api/nominations - Fetching nominations');
    console.log('🔍 Nomination model available:', !!Nomination);
    
    if (!Nomination) {
      // Fallback to file system
      console.log('📁 Falling back to file system');
      const nominationsDir = path.join(__dirname, '../../uploads/nominations');
      
      if (!fs.existsSync(nominationsDir)) {
        return res.json({
          status: 'success',
          data: [],
          source: 'filesystem',
          message: 'No nominations found'
        });
      }
      
      const files = fs.readdirSync(nominationsDir).filter(file => file.endsWith('.json'));
      const nominations = files.map(file => {
        try {
          const filePath = path.join(nominationsDir, file);
          const data = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(data);
        } catch (error) {
          console.error('Error reading nomination file:', file, error);
          return null;
        }
      }).filter(Boolean);
      
      return res.json({
        status: 'success',
        data: nominations,
        source: 'filesystem',
        count: nominations.length
      });
    }
    
    // Get from MongoDB
    const nominations = await Nomination.find()
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`📊 Found ${nominations.length} nominations in MongoDB`);
    
    res.json({
      status: 'success',
      data: nominations,
      source: 'mongodb',
      count: nominations.length
    });
    
  } catch (error) {
    console.error('❌ Error fetching nominations:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nominations',
      error: error.message
    });
  }
});

// GET /api/nominations/:id - Get single nomination
router.get('/:id', async (req, res) => {
  try {
    console.log('🔍 GET nomination by ID:', req.params.id);
    
    if (!Nomination) {
      return res.status(503).json({
        status: 'error',
        message: 'Database service unavailable'
      });
    }
    
    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }
    
    res.json({
      status: 'success',
      data: nomination
    });
    
  } catch (error) {
    console.error('❌ Error fetching nomination:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nomination',
      error: error.message
    });
  }
});

// Health check endpoint with detailed diagnostics
router.get('/health', (req, res) => {
  const health = {
    status: 'success',
    message: 'Nominations API is healthy',
    services: {
      cloudinary: !!cloudinaryUtils,
      database: !!Nomination,
      mongooseConnection: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      connectionState: {
        0: 'Disconnected',
        1: 'Connected', 
        2: 'Connecting',
        3: 'Disconnecting'
      }[mongoose.connection.readyState]
    },
    timestamp: new Date().toISOString()
  };
  
  console.log('🏥 Nominations health check:', health);
  res.json(health);
});

module.exports = router;