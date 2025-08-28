// File: backend/routes/public/nominations.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Import Cloudinary utilities
let cloudinaryUtils;
try {
  cloudinaryUtils = require('../../utils/cloudinaryUtils');
  console.log('✅ Cloudinary utilities loaded');
} catch (error) {
  console.warn('⚠️ Cloudinary utils not available, using local storage only');
}

// Import Nomination model
let Nomination;
try {
  Nomination = require('../../models/Nomination');
  console.log('✅ Nomination model loaded');
} catch (error) {
  console.warn('⚠️ Nomination model not available');
}

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, '../../uploads');
const nominationsDir = path.join(uploadsDir, 'nominations');

// Ensure directories exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(nominationsDir)) {
  fs.mkdirSync(nominationsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, nominationsDir);
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
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 6 // 1 nominee photo + 5 supporting files
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

// FIXED: Main nomination submission endpoint
router.post('/', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    console.log('🎯 POST /api/nominations - FIXED VERSION');
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
      
      // FIXED: File upload handling - ensures REAL URLs are saved, never blob URLs
      let uploadedFiles = { photo: null, supportingFiles: [] };
      let cloudinaryUploads = { photo: null, supportingFiles: [] };
      
      // Process nominee photo
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        console.log('📸 Processing nominee photo:', photoFile.filename);
        
        // ALWAYS save local file first (backup)
        uploadedFiles.photo = {
          filename: photoFile.filename,
          originalName: photoFile.originalname,
          path: photoFile.path,
          url: `/uploads/nominations/${photoFile.filename}`, // REAL server URL
          size: photoFile.size,
          mimetype: photoFile.mimetype
        };
        
        // Try Cloudinary upload (primary storage)
        if (cloudinaryUtils) {
          try {
            const cloudinaryResult = await cloudinaryUtils.uploadNomineePhoto(photoFile, submissionId);
            console.log('☁️ Cloudinary upload successful:', cloudinaryResult.url);
            
            cloudinaryUploads.photo = {
              url: cloudinaryResult.url, // REAL Cloudinary URL
              publicId: cloudinaryResult.publicId,
              cloudinary: true,
              filename: photoFile.originalname,
              size: cloudinaryResult.bytes || photoFile.size
            };
          } catch (cloudinaryError) {
            console.error('❌ Cloudinary photo upload failed:', cloudinaryError.message);
          }
        }
      }
      
      // Process supporting files
      if (req.files?.supportingFiles) {
        for (let i = 0; i < req.files.supportingFiles.length; i++) {
          const file = req.files.supportingFiles[i];
          console.log(`📎 Processing supporting file ${i + 1}:`, file.filename);
          
          // ALWAYS save local file first (backup)
          uploadedFiles.supportingFiles.push({
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            url: `/uploads/nominations/${file.filename}`, // REAL server URL
            size: file.size,
            mimetype: file.mimetype
          });
          
          // Try Cloudinary upload (primary storage)
          if (cloudinaryUtils) {
            try {
              const cloudinaryResult = await cloudinaryUtils.uploadSupportingDocument(file, submissionId, i);
              console.log(`☁️ Supporting file ${i + 1} uploaded:`, cloudinaryResult.url);
              
              cloudinaryUploads.supportingFiles.push({
                url: cloudinaryResult.url, // REAL Cloudinary URL
                publicId: cloudinaryResult.publicId,
                cloudinary: true,
                filename: file.originalname,
                size: cloudinaryResult.bytes || file.size,
                mimetype: file.mimetype
              });
            } catch (cloudinaryError) {
              console.error(`❌ Cloudinary supporting file ${i + 1} failed:`, cloudinaryError.message);
            }
          }
        }
      }
      
      // FIXED: Prepare nomination record with REAL URLs only
      const nominationRecord = {
        submissionId: submissionId,
        ...nominationData,
        
        // CRITICAL FIX: Save REAL URLs that admins can access
        files: {
          photo: uploadedFiles.photo, // Contains REAL server URL
          supportingFiles: uploadedFiles.supportingFiles // Contains REAL server URLs
        },
        
        // Cloudinary URLs as primary reference
        cloudinary: {
          photo: cloudinaryUploads.photo, // Contains REAL Cloudinary URL
          supportingFiles: cloudinaryUploads.supportingFiles // Contains REAL Cloudinary URLs
        },
        
        submittedAt: new Date(),
        status: 'submitted',
        
        // For admin access - provide the BEST available URL
        adminAccessUrls: {
          nomineePhoto: cloudinaryUploads.photo?.url || uploadedFiles.photo?.url || null,
          supportingFiles: cloudinaryUploads.supportingFiles.map(file => file.url)
            .concat(uploadedFiles.supportingFiles.map(file => file.url))
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
      const backupPath = path.join(nominationsDir, `nomination-${submissionId}.json`);
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
              // FIXED: Return REAL Cloudinary URL or server URL - NEVER blob URLs
              cloudinary: cloudinaryUploads.photo?.url || null,
              local: uploadedFiles.photo?.filename || null,
              // This is what admins will see:
              adminUrl: cloudinaryUploads.photo?.url || (uploadedFiles.photo ? `/uploads/nominations/${uploadedFiles.photo.filename}` : null)
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

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Nominations API is healthy - FIXED VERSION',
    timestamp: new Date().toISOString(),
    features: {
      cloudinary: !!cloudinaryUtils,
      database: !!Nomination,
      fileStorage: fs.existsSync(nominationsDir)
    }
  });
});

// Get submission status
router.get('/status/:submissionId', async (req, res) => {
  try {
    const { submissionId } = req.params;
    
    if (Nomination) {
      const nomination = await Nomination.findOne({ submissionId }).lean();
      if (nomination) {
        return res.json({
          status: 'success',
          data: {
            submissionId: nomination.submissionId,
            status: nomination.status,
            submittedAt: nomination.submittedAt,
            // FIXED: Return admin-accessible URLs
            adminPhotoUrl: nomination.adminAccessUrls?.nomineePhoto
          }
        });
      }
    }
    
    // Check backup files
    const backupPath = path.join(nominationsDir, `nomination-${submissionId}.json`);
    if (fs.existsSync(backupPath)) {
      const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
      return res.json({
        status: 'success',
        data: {
          submissionId: backupData.submissionId,
          status: backupData.status,
          submittedAt: backupData.submittedAt,
          source: 'backup'
        }
      });
    }
    
    res.status(404).json({
      status: 'error',
      message: 'Submission not found'
    });
    
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check submission status'
    });
  }
});

module.exports = router;