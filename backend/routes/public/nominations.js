// File: backend/routes/public/nominations.js - FIXED VERSION
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

const router = express.Router();

// Import Nomination model with error handling
let Nomination;
try {
  Nomination = require('../../models/Nomination');
  console.log('✅ Nomination model loaded in routes');
} catch (error) {
  console.error('❌ Failed to load Nomination model in routes:', error.message);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/nominations');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50000000, // 50MB
    files: parseInt(process.env.MAX_FILES_PER_NOMINATION) || 5
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4', 'video/quicktime', 'video/x-msvideo'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`), false);
    }
  }
});

// FIXED: Enhanced nomination submission with proper MongoDB handling
router.post('/submit',
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 4 }
  ]),
  async (req, res) => {
    console.log('\n🎯 === NOMINATION SUBMISSION START ===');
    console.log('📥 Request received:', new Date().toISOString());
    
    try {
      // Generate unique submission ID
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substr(2, 9).toUpperCase();
      const submissionId = `TA-${timestamp}-${randomSuffix}`;
      
      console.log('🆔 Generated submission ID:', submissionId);
      console.log('📋 Form data received:', Object.keys(req.body));
      console.log('📁 Files received:', req.files ? Object.keys(req.files) : 'None');

      // STEP 1: Validate required data
      if (!req.body.nominator || !req.body.nominee) {
        console.log('❌ Missing required nomination data');
        return res.status(400).json({
          status: 'error',
          message: 'Missing required nomination data'
        });
      }

      // Parse form data
      const nominatorData = JSON.parse(req.body.nominator);
      const nomineeData = JSON.parse(req.body.nominee);
      const consentData = JSON.parse(req.body.consent || '{}');

      console.log('✅ Form data parsed successfully');

      // STEP 2: Handle file uploads
      const uploadedFiles = {
        photo: req.files?.nomineePhoto?.[0] || null,
        supportingFiles: req.files?.supportingFiles || []
      };

      console.log('📸 Nominee photo:', uploadedFiles.photo ? '✅ Received' : '❌ Missing');
      console.log('📄 Supporting files:', uploadedFiles.supportingFiles.length);

      // STEP 3: Upload to Cloudinary
      console.log('☁️ Starting Cloudinary uploads...');
      const cloudinaryUploads = { photo: null, supportingFiles: [] };

      if (uploadedFiles.photo) {
        try {
          console.log('📸 Uploading nominee photo to Cloudinary...');
          const photoResult = await cloudinary.uploader.upload(uploadedFiles.photo.path, {
            folder: `teendom-awards/nominees`,
            public_id: `nominee-${submissionId}-${timestamp}`,
            transformation: [
              { width: 1920, height: 1080, crop: 'limit' },
              { quality: 'auto:best' }
            ]
          });
          
          cloudinaryUploads.photo = {
            url: photoResult.secure_url,
            publicId: photoResult.public_id,
            cloudinary: true
          };
          
          console.log('✅ Photo uploaded to Cloudinary:', photoResult.secure_url);
        } catch (cloudinaryError) {
          console.error('❌ Cloudinary photo upload failed:', cloudinaryError.message);
          // Continue without Cloudinary - use local file
        }
      }

      // Upload supporting files
      for (const [index, file] of uploadedFiles.supportingFiles.entries()) {
        try {
          console.log(`📄 Uploading supporting file ${index + 1}...`);
          const fileResult = await cloudinary.uploader.upload(file.path, {
            folder: `teendom-awards/supporting`,
            public_id: `supporting-${submissionId}-${index}-${timestamp}`,
            resource_type: 'auto'
          });
          
          cloudinaryUploads.supportingFiles.push({
            url: fileResult.secure_url,
            publicId: fileResult.public_id,
            originalName: file.originalname
          });
          
          console.log(`✅ Supporting file ${index + 1} uploaded`);
        } catch (error) {
          console.error(`❌ Supporting file ${index + 1} upload failed:`, error.message);
        }
      }

      // STEP 4: Build nomination record
      const nominationRecord = {
        submissionId,
        
        // Nominator information
        nominator: {
          firstName: nominatorData.firstName,
          lastName: nominatorData.lastName,
          email: nominatorData.email,
          phone: nominatorData.phone,
          relationship: nominatorData.relationship,
          organization: nominatorData.organization || ''
        },

        // Nominee information
        nominee: {
          firstName: nomineeData.firstName,
          lastName: nomineeData.lastName,
          email: nomineeData.email,
          phone: nomineeData.phone,
          dateOfBirth: nomineeData.dateOfBirth,
          gender: nomineeData.gender,
          county: nomineeData.county,
          school: nomineeData.school,
          grade: nomineeData.grade,
          photo: cloudinaryUploads.photo?.url || 
                 (uploadedFiles.photo ? `http://localhost:5000/uploads/nominations/${uploadedFiles.photo.filename}` : ''),
          socialMedia: nomineeData.socialMedia || {}
        },

        // Award information
        awardCategory: req.body.awardCategory,
        nominationReason: req.body.nominationReason,
        specificAchievements: req.body.specificAchievements,
        personalQualities: req.body.personalQualities,
        futureGoals: req.body.futureGoals,

        // Supporting files
        supportingFiles: cloudinaryUploads.supportingFiles.map(file => ({
          url: file.url,
          filename: file.originalName,
          cloudinary: true
        })),

        // Cloudinary URLs for admin access
        adminAccessUrls: {
          nomineePhoto: cloudinaryUploads.photo?.url || 
                       (uploadedFiles.photo ? `http://localhost:5000/uploads/nominations/${uploadedFiles.photo.filename}` : ''),
          supportingFiles: cloudinaryUploads.supportingFiles.map(f => f.url)
        },

        // Cloudinary metadata
        cloudinary: {
          photo: cloudinaryUploads.photo,
          supportingFiles: cloudinaryUploads.supportingFiles
        },

        // Consent information
        consent: {
          parentalConsent: consentData.parentalConsent || false,
          publicRecognition: consentData.publicRecognition || false,
          backgroundCheck: consentData.backgroundCheck || false,
          dataUsage: consentData.dataUsage || false,
          antifraud: consentData.antifraud || false
        },

        // Metadata
        submittedAt: new Date(),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      };

      console.log('📋 Nomination record built successfully');

      // STEP 5: FIXED MongoDB save with enhanced error handling
      let mongoId = null;
      let savedToMongo = false;
      
      console.log('💾 Attempting to save to MongoDB Atlas...');
      console.log('🔍 Connection state:', mongoose.connection.readyState);
      console.log('🔍 Nomination model available:', !!Nomination);
      
      // Check BOTH model availability AND proper connection state
      if (Nomination && mongoose.connection.readyState === 1) {
        try {
          console.log('✅ Creating Nomination instance...');
          const newNomination = new Nomination(nominationRecord);
          
          console.log('✅ Validating nomination data...');
          await newNomination.validate();
          
          console.log('✅ Saving to Atlas database...');
          const savedNomination = await newNomination.save();
          
          mongoId = savedNomination._id;
          savedToMongo = true;
          
          console.log('🎉 SUCCESS: Nomination saved to MongoDB Atlas!');
          console.log(`📋 Submission ID: ${savedNomination.submissionId}`);
          console.log(`🆔 MongoDB ID: ${savedNomination._id}`);
          console.log('📸 Photo URL in database:', savedNomination.nominee.photo);
          
        } catch (mongoError) {
          savedToMongo = false;
          console.error('❌ MongoDB Atlas save failed:', mongoError.message);
          console.error('🔍 Error type:', mongoError.name);
          
          // Log detailed validation errors
          if (mongoError.errors) {
            console.error('🔍 Validation errors:');
            Object.entries(mongoError.errors).forEach(([field, error]) => {
              console.error(`   • ${field}: ${error.message}`);
            });
          }
          
          // Log connection issues
          if (mongoError.name === 'MongoNetworkError') {
            console.error('🌐 Network error - Atlas connection lost');
          }
          
          console.log('📝 Continuing with file backup as fallback...');
        }
      } else {
        console.error('❌ Cannot save to MongoDB Atlas:');
        console.error(`   • Model loaded: ${!!Nomination}`);
        console.error(`   • Connection state: ${mongoose.connection.readyState} (1=connected)`);
        console.error(`   • Host: ${mongoose.connection.host || 'N/A'}`);
        
        if (mongoose.connection.readyState === 0) {
          console.error('   • Problem: Database disconnected');
        } else if (mongoose.connection.readyState === 2) {
          console.error('   • Problem: Database still connecting');
        } else if (mongoose.connection.readyState === 3) {
          console.error('   • Problem: Database disconnecting');
        }
      }

      // STEP 6: File backup (always do this as fallback)
      console.log('📁 Saving file backup...');
      const backupDir = path.join(__dirname, '../../uploads/nominations');
      const backupPath = path.join(backupDir, `nomination-${submissionId}.json`);
      let savedToFile = false;
      
      try {
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }
        
        fs.writeFileSync(backupPath, JSON.stringify(nominationRecord, null, 2));
        savedToFile = true;
        console.log('✅ File backup saved:', backupPath);
      } catch (fileError) {
        console.error('❌ File backup failed:', fileError.message);
      }

      // STEP 7: Build response
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
              adminUrl: cloudinaryUploads.photo?.url || 
                       (uploadedFiles.photo ? `http://localhost:5000/uploads/nominations/${uploadedFiles.photo.filename}` : null)
            },
            supportingFiles: {
              cloudinary: cloudinaryUploads.supportingFiles.length,
              local: uploadedFiles.supportingFiles.length
            }
          },
          nominee: {
            name: `${nomineeData.firstName} ${nomineeData.lastName}`,
            category: req.body.awardCategory
          }
        }
      };

      console.log('📤 Sending response...');
      console.log(`✅ MongoDB: ${savedToMongo ? 'SUCCESS' : 'FAILED'}`);
      console.log(`✅ File Backup: ${savedToFile ? 'SUCCESS' : 'FAILED'}`);
      console.log('🎯 === NOMINATION SUBMISSION END ===\n');

      res.status(201).json(response);

    } catch (error) {
      console.error('💥 CRITICAL ERROR in nomination submission:');
      console.error('❌ Error:', error.message);
      console.error('🔍 Stack:', error.stack);
      console.log('🎯 === NOMINATION SUBMISSION FAILED ===\n');
      
      res.status(500).json({
        status: 'error',
        message: 'Failed to process nomination',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// GET /api/nominations - Get all nominations (admin access)
router.get('/', async (req, res) => {
  try {
    console.log('📋 GET /api/nominations - Fetching all nominations');
    
    // Check if MongoDB is connected and model is available
    if (!Nomination || mongoose.connection.readyState !== 1) {
      console.log('❌ Database not available, checking file backups...');
      
      // Fallback to file system
      const nominationsDir = path.join(__dirname, '../../uploads/nominations');
      let fileNominations = [];
      
      if (fs.existsSync(nominationsDir)) {
        const files = fs.readdirSync(nominationsDir).filter(f => f.endsWith('.json'));
        console.log(`📁 Found ${files.length} nomination files`);
        
        fileNominations = files.map(filename => {
          try {
            const filePath = path.join(nominationsDir, filename);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            return {
              ...data,
              _id: data.submissionId, // Use submissionId as _id for consistency
              source: 'file'
            };
          } catch (error) {
            console.error(`❌ Error reading file ${filename}:`, error.message);
            return null;
          }
        }).filter(Boolean);
      }
      
      return res.json({
        status: 'success',
        data: fileNominations,
        source: 'file_backup',
        count: fileNominations.length,
        message: 'Data loaded from file backup (database not available)'
      });
    }

    // Fetch from MongoDB
    console.log('💾 Fetching nominations from MongoDB Atlas...');
    const nominations = await Nomination.find({})
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance
    
    console.log(`✅ Found ${nominations.length} nominations in Atlas`);
    
    res.json({
      status: 'success',
      data: nominations,
      source: 'mongodb',
      count: nominations.length
    });

  } catch (error) {
    console.error('❌ Error fetching nominations:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nominations',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/nominations/:id - Get single nomination
router.get('/:id', async (req, res) => {
  try {
    const nominationId = req.params.id;
    console.log('📋 Fetching nomination:', nominationId);

    // Check MongoDB first
    if (Nomination && mongoose.connection.readyState === 1) {
      let nomination;
      
      // Try as MongoDB ObjectId first
      if (nominationId.match(/^[0-9a-fA-F]{24}$/)) {
        nomination = await Nomination.findById(nominationId);
      }
      
      // If not found, try as submissionId
      if (!nomination) {
        nomination = await Nomination.findOne({ submissionId: nominationId });
      }
      
      if (nomination) {
        console.log('✅ Found nomination in Atlas');
        return res.json({
          status: 'success',
          data: nomination,
          source: 'mongodb'
        });
      }
    }

    // Fallback to file system
    console.log('📁 Searching file backups...');
    const nominationsDir = path.join(__dirname, '../../uploads/nominations');
    const filePath = path.join(nominationsDir, `nomination-${nominationId}.json`);
    
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log('✅ Found nomination in file backup');
      
      return res.json({
        status: 'success',
        data: { ...data, _id: data.submissionId },
        source: 'file_backup'
      });
    }

    // Not found anywhere
    console.log('❌ Nomination not found');
    res.status(404).json({
      status: 'error',
      message: 'Nomination not found'
    });

  } catch (error) {
    console.error('❌ Error fetching nomination:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nomination',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;