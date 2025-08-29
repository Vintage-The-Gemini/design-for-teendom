// File: backend/routes/admin/nominations.js

const express = require('express');
const Nomination = require('../../models/Nomination');
const { protect, editorAccess, adminOnly } = require('../../middleware/auth');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();

// TEST ROUTE - NO AUTH (for debugging)
router.get('/test', async (req, res) => {
  try {
    console.log('🧪 Test route accessed');
    const nominations = await Nomination.find().limit(5).lean();
    
    res.json({
      status: 'success',
      message: '✅ Test route working - nominations found',
      count: nominations.length,
      sampleData: nominations.length > 0 ? {
        submissionId: nominations[0].submissionId,
        hasPhoto: !!nominations[0].nominee?.photo,
        photoUrl: nominations[0].nominee?.photo,
        photoType: typeof nominations[0].nominee?.photo,
        createdAt: nominations[0].createdAt
      } : null,
      allNominations: nominations.map(n => ({
        id: n.submissionId,
        photo: n.nominee?.photo,
        photoType: typeof n.nominee?.photo
      }))
    });
  } catch (error) {
    console.error('❌ Test route error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Apply authentication to all routes below this point
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
      sortBy = 'createdAt',
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
      const photoData = nomination.nominee?.photo;
      console.log(`📋 Nomination ${nomination.submissionId} image sources:`, {
        directPhoto: !!photoData,
        photoType: typeof photoData,
        photoValue: photoData ? (photoData.length > 100 ? `${photoData.substring(0, 50)}...` : photoData) : null,
        isCloudinaryUrl: photoData && typeof photoData === 'string' && photoData.includes('cloudinary'),
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
    console.error('❌ Get nominations error:', error);
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
    console.error('❌ Nominations stats error:', error);
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
    const photoData = nomination.nominee?.photo;
    console.log(`🔍 Single nomination ${nomination.submissionId} image details:`, {
      directPhoto: photoData,
      photoType: typeof photoData,
      isCloudinaryUrl: photoData && typeof photoData === 'string' && photoData.includes('cloudinary'),
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
    console.error('❌ Admin get nomination error:', error);
    
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
        nomination.status = 'submitted';
        break;
      default:
        nomination.status = 'submitted';
    }

    await nomination.save();

    console.log(`✅ Nomination ${nomination.submissionId} status updated to: ${status}`);

    if (sendNotification) {
      console.log('📧 Email notification requested for:', nomination.nominator.email);
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
    console.error('❌ Update nomination status error:', error);
    
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

    // Delete from Cloudinary if exists
    if (nomination.cloudinary?.photo?.publicId) {
      try {
        const cloudinaryUtils = require('../../utils/cloudinaryUtils');
        await cloudinaryUtils.deleteImage(nomination.cloudinary.photo.publicId);
        console.log('☁️ ✅ Cloudinary image deleted');
      } catch (cloudinaryError) {
        console.warn('☁️ ⚠️ Cloudinary deletion failed:', cloudinaryError.message);
      }
    }

    // Delete local files if they exist
    const localFilesToDelete = [];
    
    if (nomination.files?.photo?.filename) {
      localFilesToDelete.push(path.join(__dirname, '../../uploads/nominations', nomination.files.photo.filename));
    }
    
    if (nomination.files?.supportingFiles) {
      nomination.files.supportingFiles.forEach(file => {
        if (file.filename) {
          localFilesToDelete.push(path.join(__dirname, '../../uploads/nominations', file.filename));
        }
      });
    }

    for (const filePath of localFilesToDelete) {
      try {
        await fs.unlink(filePath);
        console.log('📁 ✅ Local file deleted:', path.basename(filePath));
      } catch (fileError) {
        console.warn('📁 ⚠️ Local file deletion failed:', fileError.message);
      }
    }

    await Nomination.findByIdAndDelete(nominationId);
    console.log('💾 ✅ Nomination deleted from database');

    res.json({
      status: 'success',
      message: 'Nomination and associated files deleted successfully',
      data: {
        deletedNomination: {
          _id: nomination._id,
          submissionId: nomination.submissionId,
          nominee: `${nomination.nominee?.firstName} ${nomination.nominee?.lastName}`
        },
        filesDeleted: {
          cloudinary: !!nomination.cloudinary?.photo?.publicId,
          localFiles: localFilesToDelete.length
        }
      }
    });

  } catch (error) {
    console.error('❌ Delete nomination error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid nomination ID'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete nomination'
    });
  }
});

module.exports = router;