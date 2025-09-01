// File: backend/routes/admin/nominations.js

const express = require('express');
const router = express.Router();

// Import models with error handling
let Nomination;
try {
  Nomination = require('../../models/Nomination');
  console.log('✅ Nomination model loaded in admin routes');
} catch (error) {
  console.error('❌ Failed to load Nomination model:', error);
}

// Import middleware
const { protect, authorize } = require('../../middleware/auth');

// Apply authentication middleware to all routes
router.use(protect);

// Admin access middleware
const adminAccess = authorize('admin', 'editor');

// PATCH /api/admin/nominations/:id/status - Update nomination status (FIXED)
router.patch('/:id/status', adminAccess, async (req, res) => {
  try {
    console.log('🔄 === NOMINATION STATUS UPDATE START ===');
    console.log('📋 Nomination ID:', req.params.id);
    console.log('📋 Request body:', req.body);
    console.log('👤 User authenticated:', !!req.user);
    console.log('👤 User details:', req.user ? { id: req.user._id, email: req.user.email, role: req.user.role } : 'None');

    const { status, notes } = req.body;
    const validStatuses = ['pending', 'approved', 'rejected', 'needs-info'];
    
    // Validate input
    if (!status) {
      console.log('❌ No status provided in request');
      return res.status(400).json({
        status: 'error',
        message: 'Status is required'
      });
    }

    if (!validStatuses.includes(status)) {
      console.log('❌ Invalid status provided:', status);
      return res.status(400).json({
        status: 'error',
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    // Check database availability
    if (!Nomination) {
      console.log('❌ Nomination model not available');
      return res.status(503).json({
        status: 'error',
        message: 'Database service unavailable - Nomination model not loaded'
      });
    }

    // Validate MongoDB ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('❌ Invalid ObjectId format:', req.params.id);
      return res.status(400).json({
        status: 'error',
        message: 'Invalid nomination ID format'
      });
    }

    console.log('🔍 Searching for nomination in database...');

    // Find nomination
    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      console.log('❌ Nomination not found in database');
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    console.log('✅ Found nomination:', {
      submissionId: nomination.submissionId,
      currentStatus: nomination.status,
      currentAdminStatus: nomination.adminReview?.status,
      nominee: `${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`
    });

    // Safely get reviewer info
    const reviewerId = req.user?._id?.toString() || 'system';
    const reviewerName = req.user?.name || req.user?.email || 'System Admin';

    console.log('👤 Reviewer info:', { reviewerId, reviewerName });

    // Initialize adminReview if it doesn't exist
    if (!nomination.adminReview) {
      nomination.adminReview = {};
      console.log('🔧 Initialized empty adminReview object');
    }

    console.log('🔧 Updating adminReview...');

    // Update admin review
    nomination.adminReview = {
      ...nomination.adminReview,
      reviewed: true,
      reviewer: reviewerId,
      reviewerName: reviewerName,
      reviewDate: new Date(),
      status: status,
      notes: notes || '',
      updatedAt: new Date()
    };

    console.log('🔧 Updated adminReview:', nomination.adminReview);

    // Update main nomination status
    console.log('🔧 Updating main nomination status...');
    
    const oldStatus = nomination.status;
    const oldPhase = nomination.phase;

    switch (status) {
      case 'approved':
        nomination.status = 'approved';
        nomination.phase = 'judging';
        break;
      case 'rejected':
        nomination.status = 'rejected';
        nomination.phase = 'rejected';
        break;
      case 'needs-info':
        nomination.status = 'submitted';
        nomination.phase = 'nomination';
        break;
      case 'pending':
      default:
        nomination.status = 'submitted';
        nomination.phase = 'nomination';
    }

    console.log('🔧 Status changes:', {
      oldStatus,
      newStatus: nomination.status,
      oldPhase,
      newPhase: nomination.phase
    });

    // Update timestamp
    nomination.updatedAt = new Date();

    console.log('💾 Attempting to save nomination...');

    // Save with comprehensive error handling
    try {
      const savedNomination = await nomination.save();
      console.log('✅ Nomination saved successfully');
      console.log('📊 Final nomination state:', {
        id: savedNomination._id,
        submissionId: savedNomination.submissionId,
        status: savedNomination.status,
        phase: savedNomination.phase,
        adminReviewStatus: savedNomination.adminReview.status
      });
    } catch (saveError) {
      console.error('❌ SAVE ERROR:', saveError);
      console.error('❌ Save error name:', saveError.name);
      console.error('❌ Save error message:', saveError.message);
      
      if (saveError.errors) {
        console.error('❌ Validation errors:', Object.keys(saveError.errors));
        Object.entries(saveError.errors).forEach(([field, error]) => {
          console.error(`❌   ${field}:`, error.message);
        });
      }
      
      return res.status(500).json({
        status: 'error',
        message: 'Database save failed',
        details: saveError.message,
        validationErrors: saveError.errors ? Object.keys(saveError.errors) : null
      });
    }

    console.log(`✅ Nomination ${nomination.submissionId} status updated to: ${status}`);

    // Return success response
    const responseData = {
      status: 'success',
      message: `Nomination ${status} successfully`,
      data: {
        nomination: {
          _id: nomination._id,
          submissionId: nomination.submissionId,
          status: nomination.status,
          phase: nomination.phase,
          adminReview: nomination.adminReview,
          updatedAt: nomination.updatedAt
        }
      }
    };

    console.log('✅ Sending success response:', responseData);
    console.log('🔄 === NOMINATION STATUS UPDATE END ===');

    res.json(responseData);

  } catch (error) {
    console.error('💥 === CRITICAL ERROR IN STATUS UPDATE ===');
    console.error('❌ Error type:', error.constructor.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      console.log('❌ MongoDB CastError - Invalid ID format');
      return res.status(400).json({
        status: 'error',
        message: 'Invalid nomination ID format',
        details: error.message
      });
    }
    
    if (error.name === 'ValidationError') {
      console.log('❌ MongoDB ValidationError');
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        details: Object.keys(error.errors || {}).join(', ')
      });
    }

    if (error.name === 'MongoNetworkError' || error.name === 'MongooseError') {
      console.log('❌ Database connection error');
      return res.status(503).json({
        status: 'error',
        message: 'Database connection error',
        details: 'Unable to connect to database'
      });
    }
    
    // Generic server error
    console.log('❌ Generic server error');
    res.status(500).json({
      status: 'error',
      message: 'Failed to update nomination status',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      errorType: error.constructor.name
    });
  }
});

// GET /api/admin/nominations - Get all nominations
router.get('/', adminAccess, async (req, res) => {
  try {
    console.log('📊 Admin fetching nominations');
    
    if (!Nomination) {
      return res.status(503).json({
        status: 'error',
        message: 'Database service unavailable'
      });
    }

    const {
      page = 1,
      limit = 20,
      status,
      category,
      adminStatus,
      search,
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = {};
    
    if (status && status !== 'all') filter.status = status;
    if (category && category !== 'all') filter.awardCategory = category;
    if (adminStatus && adminStatus !== 'all') filter['adminReview.status'] = adminStatus;
    
    // Search
    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      filter.$or = [
        { 'nominee.firstName': searchRegex },
        { 'nominee.lastName': searchRegex },
        { 'nominee.email': searchRegex },
        { submissionId: searchRegex }
      ];
    }

    // Sort
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [nominations, totalCount] = await Promise.all([
      Nomination.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Nomination.countDocuments(filter)
    ]);

    console.log(`✅ Found ${nominations.length} nominations`);

    res.json({
      status: 'success',
      results: nominations.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalCount,
        limit: parseInt(limit)
      },
      data: {
        nominations
      }
    });
  } catch (error) {
    console.error('❌ Get nominations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nominations'
    });
  }
});

// GET /api/admin/nominations/stats
router.get('/stats', adminAccess, async (req, res) => {
  try {
    if (!Nomination) {
      return res.json({
        status: 'success',
        data: { total: 0, pending: 0, approved: 0, rejected: 0, needsInfo: 0 }
      });
    }

    const stats = await Nomination.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: {
              $cond: [
                { $or: [
                  { $eq: ['$adminReview.status', 'pending'] },
                  { $eq: ['$adminReview.status', null] },
                  { $not: { $ifNull: ['$adminReview.status', false] } }
                ]}, 
                1, 0
              ]
            }
          },
          approved: {
            $sum: { $cond: [{ $eq: ['$adminReview.status', 'approved'] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$adminReview.status', 'rejected'] }, 1, 0] }
          },
          needsInfo: {
            $sum: { $cond: [{ $eq: ['$adminReview.status', 'needs-info'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      total: 0, pending: 0, approved: 0, rejected: 0, needsInfo: 0
    };

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch stats'
    });
  }
});

// DELETE /api/admin/nominations/:id
router.delete('/:id', authorize('admin'), async (req, res) => {
  try {
    console.log('🗑️ Deleting nomination:', req.params.id);

    if (!Nomination) {
      return res.status(503).json({
        status: 'error',
        message: 'Database unavailable'
      });
    }

    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    await Nomination.findByIdAndDelete(req.params.id);

    console.log(`✅ Nomination ${nomination.submissionId} deleted`);

    res.json({
      status: 'success',
      message: 'Nomination deleted successfully'
    });

  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete nomination'
    });
  }
});

module.exports = router;