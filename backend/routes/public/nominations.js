// File: backend/routes/public/nominations.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Nomination = require('../../models/Nomination');
const { sendConfirmationEmail } = require('../../utils/emailService');
const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads/nominations');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for local file uploads (temporary - until Cloudinary is set up)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 6 // Max 6 files (1 photo + 5 supporting)
  },
  fileFilter: function (req, file, cb) {
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
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Submit nomination
router.post('/', upload.fields([
  { name: 'nomineePhoto', maxCount: 1 },
  { name: 'supportingFiles', maxCount: 5 }
]), async (req, res) => {
  try {
    // Parse nomination data from form
    const nominationData = JSON.parse(req.body.nominationData);
    
    // Process uploaded files
    const supportingDocuments = [];
    
    if (req.files.supportingFiles) {
      req.files.supportingFiles.forEach(file => {
        supportingDocuments.push({
          originalName: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          uploadDate: new Date()
        });
      });
    }
    
    // Handle nominee photo
    let nomineePhotoPath = '';
    if (req.files.nomineePhoto && req.files.nomineePhoto[0]) {
      nomineePhotoPath = req.files.nomineePhoto[0].filename;
    }
    
    // Generate unique submission ID
    const submissionId = `TN${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // Create nomination document
    const nomination = new Nomination({
      submissionId: submissionId,
      
      // Nominee Information
      nominee: {
        firstName: nominationData.nominee.firstName,
        middleName: nominationData.nominee.middleName || '',
        lastName: nominationData.nominee.lastName,
        dateOfBirth: new Date(nominationData.nominee.dateOfBirth),
        age: parseInt(nominationData.nominee.age),
        gender: nominationData.nominee.gender,
        email: nominationData.nominee.email,
        phone: nominationData.nominee.phone,
        nationality: nominationData.nominee.nationality,
        location: {
          county: nominationData.nominee.county,
          subcounty: nominationData.nominee.subcounty || '',
          ward: nominationData.nominee.ward || ''
        },
        school: {
          name: nominationData.nominee.school?.name || '',
          level: nominationData.nominee.school?.level || '',
          grade: nominationData.nominee.school?.grade || ''
        },
        photo: nomineePhotoPath
      },
      
      // Nominator Information
      nominator: {
        firstName: nominationData.nominator.firstName,
        lastName: nominationData.nominator.lastName,
        email: nominationData.nominator.email,
        phone: nominationData.nominator.phone,
        relationship: nominationData.nominator.relationship,
        organization: nominationData.nominator.organization || '',
        isSelfNomination: nominationData.nominator.isSelfNomination || false
      },
      
      // Award Details
      awardCategory: nominationData.awardCategory,
      
      // Nomination Content
      shortBio: nominationData.shortBio,
      achievements: nominationData.achievements,
      impact: nominationData.impact,
      whyDeserveAward: nominationData.whyDeserveAward || '',
      additionalInfo: nominationData.additionalInfo || '',
      
      // Social Media Links
      socialMediaLinks: nominationData.socialMediaLinks || {},
      
      // Referee Information
      referee: nominationData.referee,
      
      // Supporting Documents
      documents: supportingDocuments,
      
      // Consent
      consent: nominationData.consent,
      
      // System Fields
      status: 'submitted',
      submittedAt: new Date(),
      
      // Admin Review Fields (initialized)
      adminReview: {
        reviewed: false,
        reviewer: null,
        reviewDate: null,
        status: 'pending',
        notes: ''
      }
    });
    
    // Save to database
    await nomination.save();
    
    // Send confirmation email to nominator
    try {
      await sendConfirmationEmail({
        to: nominationData.nominator.email,
        nomineeFirstName: nominationData.nominee.firstName,
        nomineeLastName: nominationData.nominee.lastName,
        submissionId: submissionId,
        category: nominationData.awardCategory
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the submission if email fails
    }
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Nomination submitted successfully',
      submissionId: submissionId,
      nominationId: nomination._id,
      status: 'submitted',
      nextSteps: [
        'Admin will review your nomination within 3-5 business days',
        'You will receive email updates on your nomination status',
        'If approved, your nomination will be forwarded to judges',
        'Voting period begins in November 2025'
      ]
    });
    
  } catch (error) {
    console.error('Nomination submission error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    // Handle file upload errors
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type uploaded'
      });
    }
    
    // Generic error
    res.status(500).json({
      success: false,
      message: 'Failed to submit nomination. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get nomination status (for follow-up)
router.get('/status/:submissionId', async (req, res) => {
  try {
    const nomination = await Nomination.findOne({ 
      submissionId: req.params.submissionId 
    }).select('submissionId status adminReview.status nominee.firstName nominee.lastName awardCategory submittedAt');
    
    if (!nomination) {
      return res.status(404).json({
        success: false,
        message: 'Nomination not found'
      });
    }
    
    res.json({
      success: true,
      nomination: {
        submissionId: nomination.submissionId,
        nomineeFirstName: nomination.nominee.firstName,
        nomineeLastName: nomination.nominee.lastName,
        category: nomination.awardCategory,
        status: nomination.status,
        adminStatus: nomination.adminReview.status,
        submittedAt: nomination.submittedAt,
        statusMessage: getStatusMessage(nomination.status, nomination.adminReview.status)
      }
    });
    
  } catch (error) {
    console.error('Error fetching nomination status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nomination status'
    });
  }
});

// Helper function to generate status messages
function getStatusMessage(status, adminStatus) {
  if (status === 'submitted' && adminStatus === 'pending') {
    return 'Your nomination is under review by our admin team';
  } else if (status === 'submitted' && adminStatus === 'approved') {
    return 'Your nomination has been approved and forwarded to judges';
  } else if (status === 'submitted' && adminStatus === 'rejected') {
    return 'Your nomination requires additional information';
  } else if (status === 'under-review') {
    return 'Your nomination is being reviewed by judges';
  } else if (status === 'finalist') {
    return 'Congratulations! Your nominee is a finalist';
  } else {
    return 'Your nomination is being processed';
  }
}

module.exports = router;