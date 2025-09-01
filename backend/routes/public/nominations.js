// File: /backend/routes/public/nominations.js - FORCED MONGODB SAVE

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// FORCE load Nomination model
const Nomination = require('../../models/Nomination');

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

// POST /api/nominations - Submit nomination (FIXED TO FORCE MONGODB SAVE)
router.post('/', 
  upload.fields([
    { name: 'nomineePhoto', maxCount: 1 },
    { name: 'supportingFiles', maxCount: 5 }
  ]), 
  async (req, res) => {
    console.log('🎯 POST /api/nominations - PROCESSING SUBMISSION');
    console.log('📁 Files received:', req.files);
    console.log('📋 Body data received:', Object.keys(req.body));

    try {
      // Parse nomination data
      let nominationData;
      try {
        nominationData = JSON.parse(req.body.nomineeData || '{}');
      } catch (parseError) {
        console.error('❌ Failed to parse nomination data:', parseError);
        return res.status(400).json({
          status: 'error',
          message: 'Invalid nomination data format'
        });
      }

      console.log('📋 Parsed nomination data:', {
        hasNominee: !!nominationData.nominee,
        hasNominator: !!nominationData.nominator,
        category: nominationData.awardCategory
      });

      // Generate submission ID
      const submissionId = `TA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      console.log('🆔 Generated submission ID:', submissionId);

      // Handle file uploads to Cloudinary
      const cloudinaryUploads = {
        photo: null,
        supportingFiles: []
      };

      const uploadedFiles = {
        photo: null,
        supportingFiles: []
      };

      // Process nominee photo
      if (req.files?.nomineePhoto?.[0]) {
        const photoFile = req.files.nomineePhoto[0];
        uploadedFiles.photo = {
          filename: photoFile.filename,
          originalName: photoFile.originalname,
          path: photoFile.path,
          url: `/uploads/nominations/${photoFile.filename}`,
          size: photoFile.size,
          mimetype: photoFile.mimetype
        };

        // Upload to Cloudinary if available
        if (cloudinaryUtils) {
          try {
            const cloudinaryResult = await cloudinaryUtils.uploadNomineePhoto(photoFile.path, submissionId);
            cloudinaryUploads.photo = cloudinaryResult;
            console.log('✅ Photo uploaded to Cloudinary:', cloudinaryResult.url);
          } catch (cloudinaryError) {
            console.error('⚠️ Cloudinary upload failed:', cloudinaryError.message);
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

      // Build complete nomination record
      const nominationRecord = {
        submissionId: submissionId,
        nominee: {
          firstName: nominationData.nominee.firstName,
          middleName: nominationData.nominee.middleName || '',
          lastName: nominationData.nominee.lastName,
          dateOfBirth: new Date(nominationData.nominee.dateOfBirth),
          age: parseInt(nominationData.nominee.age),
          gender: nominationData.nominee.gender,
          email: nominationData.nominee.email || null,
          phone: nominationData.nominee.phone || null,
          nationality: nominationData.nominee.nationality,
          location: {
            county: nominationData.nominee.county || nominationData.nominee.location?.county,
            subcounty: nominationData.nominee.subcounty || nominationData.nominee.location?.subcounty || '',
            ward: nominationData.nominee.ward || nominationData.nominee.location?.ward || '',
            city: nominationData.nominee.city || nominationData.nominee.location?.city || ''
          },
          school: {
            name: nominationData.nominee.school?.name || null,
            level: nominationData.nominee.school?.level || null,
            grade: nominationData.nominee.school?.grade || null
          },
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

      // ✅ FORCE MONGODB SAVE
      let mongoId = null;
      let savedToMongo = false;

      console.log('💾 FORCING MongoDB save...');
      console.log('🔍 Mongoose connection state:', mongoose.connection.readyState);
      console.log('🔍 Nomination model:', !!Nomination);

      if (mongoose.connection.readyState === 1) {
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
          
        } catch (mongoSaveError) {
          console.error('❌ MongoDB save failed:', mongoSaveError.message);
          console.error('🔍 Error details:', mongoSaveError);
          
          if (mongoSaveError.errors) {
            console.error('🔍 Validation errors:');
            Object.entries(mongoSaveError.errors).forEach(([field, error]) => {
              console.error(`   • ${field}: ${error.message}`);
            });
          }
        }
      } else {
        console.error('❌ MongoDB not connected. Connection state:', mongoose.connection.readyState);
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

module.exports = router;