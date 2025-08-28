// File: backend/routes/admin/nominations.js
const express = require('express');
const Nomination = require('../../models/Nomination');
const { protect, editorAccess, adminOnly } = require('../../middleware/auth');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();

// Apply authentication to all routes
router.use(protect);
router.use(editorAccess);

// GET /api/admin/nominations - Get all nominations with filtering and pagination
router.get('/', async (req, res) => {
  try {
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

    console.log('📊 Admin nominations query:', req.query);

    // Build filter object
    const filter = {};
    
    if (status && status !== 'all') filter.status = status;
    if (category && category !== 'all') filter.awardCategory = category;
    if (adminStatus && adminStatus !== 'all') filter['adminReview.status'] = adminStatus;
    
    // Search functionality
    if (search) {
      filter.$or = [
        { 'nominee.firstName': { $regex: search, $options: 'i' } },
        { 'nominee.lastName': { $regex: search, $options: 'i' } },
        { 'nominee.email': { $regex: search, $options: 'i' } },
        { 'nominator.firstName': { $regex: search, $options: 'i' } },
        { 'nominator.lastName': { $regex: search, $options: 'i' } },
        { 'nominator.email': { $regex: search, $options: 'i' } },
        { submissionId: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * parseInt(limit);
    
    const [nominations, totalCount] = await Promise.all([
      Nomination.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('adminReview.reviewer', 'name email')
        .lean(),
      Nomination.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    // Enhanced logging for image availability
    nominations.forEach(nomination => {
      console.log(`📋 Nomination ${nomination.submissionId} image sources:`, {
        cloudinary: !!nomination.cloudinary?.photo?.url,
        adminUrl: !!nomination.adminAccessUrls?.nomineePhoto,
        localFile: !!nomination.files?.photo?.filename,
        fileUrl: !!nomination.files?.photo?.url
      });
    });

    res.json({
      status: 'success',
      results: nominations.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
        limit: parseInt(limit)
      },
      data: {
        nominations
      }
    });
  } catch (error) {
    console.error('Get nominations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nominations'
    });
  }
});

// GET /api/admin/nominations/stats - Get nomination statistics
router.get('/stats', async (req, res) => {
  try {
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
                  { $eq: ['$adminReview.status', null] }
                ]}, 
                1, 
                0
              ]
            }
          },
          approved: {
            $sum: {
              $cond: [{ $eq: ['$adminReview.status', 'approved'] }, 1, 0]
            }
          },
          rejected: {
            $sum: {
              $cond: [{ $eq: ['$adminReview.status', 'rejected'] }, 1, 0]
            }
          },
          needsInfo: {
            $sum: {
              $cond: [{ $eq: ['$adminReview.status', 'needs-info'] }, 1, 0]
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      needsInfo: 0
    };

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('Nominations stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nominations statistics'
    });
  }
});

// GET /api/admin/nominations/:id - Get single nomination details
router.get('/:id', async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id)
      .populate('adminReview.reviewer', 'name email')
      .lean();
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    // Enhanced logging for single nomination image data
    console.log(`🔍 Single nomination ${nomination.submissionId} image details:`, {
      cloudinary: nomination.cloudinary?.photo,
      adminAccessUrls: nomination.adminAccessUrls,
      files: nomination.files?.photo
    });

    res.json({
      status: 'success',
      data: {
        nomination
      }
    });
  } catch (error) {
    console.error('Admin get nomination error:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid nomination ID'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nomination details'
    });
  }
});

// PATCH /api/admin/nominations/:id/status - Update nomination review status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes, sendNotification = true } = req.body;
    const validStatuses = ['pending', 'approved', 'rejected', 'needs-info'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    // Update admin review
    nomination.adminReview = {
      reviewed: true,
      reviewer: req.user._id,
      reviewDate: new Date(),
      status: status,
      notes: notes || ''
    };

    // Update main status based on admin decision
    switch (status) {
      case 'approved':
        nomination.status = 'under-review';
        nomination.phase = 'judging';
        break;
      case 'rejected':
        nomination.status = 'rejected';
        break;
      case 'needs-info':
        nomination.status = 'submitted'; // Keep as submitted but flag for info
        break;
      default:
        nomination.status = 'submitted';
    }

    await nomination.save();

    console.log(`✅ Nomination ${nomination.submissionId} status updated to: ${status}`);

    // TODO: Send email notification if requested
    if (sendNotification) {
      console.log('📧 Email notification requested for:', nomination.nominator.email);
      // Implement email service here
    }

    res.json({
      status: 'success',
      message: `Nomination ${status} successfully`,
      data: {
        nomination: {
          _id: nomination._id,
          submissionId: nomination.submissionId,
          status: nomination.status,
          adminReview: nomination.adminReview
        }
      }
    });

  } catch (error) {
    console.error('Update nomination status error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid nomination ID'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to update nomination status'
    });
  }
});

// DELETE /api/admin/nominations/:id - Delete nomination with file cleanup
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const nominationId = req.params.id;
    console.log('🗑️ Admin deleting nomination:', nominationId);

    // Find the nomination first to get file information
    const nomination = await Nomination.findById(nominationId);
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    console.log('📋 Found nomination to delete:', {
      id: nomination.submissionId,
      nominee: `${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`,
      hasCloudinaryPhoto: !!nomination.cloudinary?.photo?.publicId,
      hasLocalFiles: !!nomination.files?.photo?.filename
    });

    // Step 1: Delete from Cloudinary if exists
    const cloudinaryDeletions = [];
    
    if (nomination.cloudinary?.photo?.publicId) {
      try {
        const { deleteFromCloudinary } = require('../../utils/cloudinaryUtils');
        const deleteResult = await deleteFromCloudinary(nomination.cloudinary.photo.publicId);
        
        if (deleteResult.success) {
          cloudinaryDeletions.push(`Photo: ${nomination.cloudinary.photo.publicId}`);
          console.log('☁️ ✅ Deleted photo from Cloudinary');
        } else {
          console.warn('☁️ ⚠️ Failed to delete photo from Cloudinary');
        }
      } catch (cloudinaryError) {
        console.error('☁️ ❌ Cloudinary deletion error:', cloudinaryError);
      }
    }

    // Delete supporting files from Cloudinary
    if (nomination.cloudinary?.supportingFiles?.length > 0) {
      for (const file of nomination.cloudinary.supportingFiles) {
        if (file.publicId) {
          try {
            const { deleteFromCloudinary } = require('../../utils/cloudinaryUtils');
            const deleteResult = await deleteFromCloudinary(file.publicId);
            
            if (deleteResult.success) {
              cloudinaryDeletions.push(`Supporting file: ${file.publicId}`);
              console.log('☁️ ✅ Deleted supporting file from Cloudinary');
            }
          } catch (error) {
            console.error('☁️ ❌ Failed to delete supporting file:', error);
          }
        }
      }
    }

    // Step 2: Delete local files if they exist
    const localDeletions = [];

    if (nomination.files?.photo?.filename) {
      try {
        const photoPath = path.join(__dirname, '../../uploads/nominations', nomination.files.photo.filename);
        await fs.unlink(photoPath);
        localDeletions.push(`Photo: ${nomination.files.photo.filename}`);
        console.log('🗂️ ✅ Deleted local photo file');
      } catch (fileError) {
        console.warn('🗂️ ⚠️ Failed to delete local photo:', fileError.message);
      }
    }

    // Delete local supporting files
    if (nomination.files?.supportingFiles?.length > 0) {
      for (const file of nomination.files.supportingFiles) {
        if (file.filename) {
          try {
            const filePath = path.join(__dirname, '../../uploads/nominations', file.filename);
            await fs.unlink(filePath);
            localDeletions.push(`Supporting file: ${file.filename}`);
            console.log('🗂️ ✅ Deleted local supporting file');
          } catch (error) {
            console.warn('🗂️ ⚠️ Failed to delete local supporting file:', error);
          }
        }
      }
    }

    // Step 3: Delete from MongoDB
    await Nomination.findByIdAndDelete(nominationId);
    console.log('🗄️ ✅ Deleted nomination from MongoDB');

    // Step 4: Delete JSON backup file if it exists
    try {
      const backupPath = path.join(__dirname, '../../data/nominations', `nomination-${nomination.submissionId}.json`);
      await fs.unlink(backupPath);
      console.log('📄 ✅ Deleted JSON backup file');
    } catch (backupError) {
      console.warn('📄 ⚠️ JSON backup file not found or already deleted');
    }

    // Response with deletion summary
    res.json({
      status: 'success',
      message: 'Nomination deleted successfully',
      data: {
        nominationId: nominationId,
        submissionId: nomination.submissionId,
        nominee: `${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`,
        deletionSummary: {
          database: true,
          cloudinaryFiles: cloudinaryDeletions,
          localFiles: localDeletions,
          totalFilesDeleted: cloudinaryDeletions.length + localDeletions.length
        }
      }
    });

    console.log('✅ Nomination deletion completed:', {
      id: nomination.submissionId,
      cloudinaryDeleted: cloudinaryDeletions.length,
      localFilesDeleted: localDeletions.length
    });

  } catch (error) {
    console.error('❌ Admin delete nomination error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid nomination ID format'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete nomination',
      details: error.message
    });
  }
});

// POST /api/admin/nominations/bulk-action - Bulk actions on nominations
router.post('/bulk-action', adminOnly, async (req, res) => {
  try {
    const { nominationIds, action, notes = '', sendNotifications = true } = req.body;
    
    if (!nominationIds || !Array.isArray(nominationIds) || nominationIds.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Valid nomination IDs array is required'
      });
    }

    const validActions = ['approve', 'reject', 'delete'];
    if (!validActions.includes(action)) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid action. Must be one of: ${validActions.join(', ')}`
      });
    }

    let updatedCount = 0;
    let errors = [];

    if (action === 'delete') {
      // Handle bulk deletion
      for (const id of nominationIds) {
        try {
          const nomination = await Nomination.findById(id);
          if (nomination) {
            await Nomination.findByIdAndDelete(id);
            updatedCount++;
          }
        } catch (error) {
          errors.push(`Failed to delete ${id}: ${error.message}`);
        }
      }
    } else {
      // Handle bulk status updates
      const statusMap = {
        'approve': 'approved',
        'reject': 'rejected'
      };

      const updateData = {
        'adminReview.reviewed': true,
        'adminReview.reviewer': req.user._id,
        'adminReview.reviewDate': new Date(),
        'adminReview.status': statusMap[action],
        'adminReview.notes': notes
      };

      // Update main status based on action
      if (action === 'approve') {
        updateData.status = 'under-review';
        updateData.phase = 'judging';
      } else if (action === 'reject') {
        updateData.status = 'rejected';
      }

      const result = await Nomination.updateMany(
        { _id: { $in: nominationIds } },
        updateData
      );

      updatedCount = result.modifiedCount;
    }

    console.log(`✅ Bulk action ${action} completed: ${updatedCount} nominations affected`);

    res.json({
      status: 'success',
      message: `Bulk ${action} completed`,
      data: {
        action,
        updatedCount,
        totalRequested: nominationIds.length,
        errors: errors.length > 0 ? errors : undefined
      }
    });

  } catch (error) {
    console.error('Bulk action error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to perform bulk action'
    });
  }
});

// GET /api/admin/nominations/:id/files - Get nomination file URLs (for debugging)
router.get('/:id/files', async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id).select('files cloudinary adminAccessUrls submissionId').lean();
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    // Build comprehensive file information
    const fileInfo = {
      submissionId: nomination.submissionId,
      cloudinary: {
        photo: nomination.cloudinary?.photo || null,
        supportingFiles: nomination.cloudinary?.supportingFiles || []
      },
      local: {
        photo: nomination.files?.photo ? {
          filename: nomination.files.photo.filename,
          url: `${req.protocol}://${req.get('host')}/uploads/nominations/${nomination.files.photo.filename}`,
          size: nomination.files.photo.size,
          mimetype: nomination.files.photo.mimetype
        } : null,
        supportingFiles: nomination.files?.supportingFiles?.map(file => ({
          filename: file.filename,
          url: `${req.protocol}://${req.get('host')}/uploads/nominations/${file.filename}`,
          size: file.size,
          mimetype: file.mimetype,
          originalName: file.originalName
        })) || []
      },
      adminAccessUrls: nomination.adminAccessUrls || {},
      // Resolved URLs for direct use
      resolvedUrls: {
        photo: nomination.cloudinary?.photo?.url || 
               nomination.adminAccessUrls?.nomineePhoto ||
               (nomination.files?.photo?.filename ? 
                 `${req.protocol}://${req.get('host')}/uploads/nominations/${nomination.files.photo.filename}` : 
                 null),
        supportingFiles: []
      }
    };

    res.json({
      status: 'success',
      data: { files: fileInfo }
    });

  } catch (error) {
    console.error('Get nomination files error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid nomination ID'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nomination files'
    });
  }
});

module.exports = router;