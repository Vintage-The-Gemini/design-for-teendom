// File: backend/routes/admin/nominations.js
const express = require('express');
const Nomination = require('../../models/Nomination');
const { protect, editorAccess, adminOnly } = require('../../middleware/auth');

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

    // Execute query with pagination
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

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Get statistics for dashboard
    const [statusStats, categoryStats] = await Promise.all([
      Nomination.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Nomination.aggregate([
        { $group: { _id: '$awardCategory', count: { $sum: 1 } } }
      ])
    ]);

    res.json({
      status: 'success',
      results: nominations.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      statistics: {
        byStatus: statusStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        byCategory: categoryStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      },
      data: {
        nominations
      }
    });
  } catch (error) {
    console.error('Admin get nominations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nominations'
    });
  }
});

// GET /api/admin/nominations/stats - Get nominations statistics for dashboard
router.get('/stats', async (req, res) => {
  try {
    const [
      totalNominations,
      pendingNominations,
      approvedNominations,
      rejectedNominations,
      recentNominations,
      categoryStats
    ] = await Promise.all([
      Nomination.countDocuments(),
      Nomination.countDocuments({ 'adminReview.status': 'pending' }),
      Nomination.countDocuments({ 'adminReview.status': 'approved' }),
      Nomination.countDocuments({ 'adminReview.status': 'rejected' }),
      Nomination.find()
        .sort({ submittedAt: -1 })
        .limit(5)
        .select('submissionId nominee.firstName nominee.lastName awardCategory submittedAt adminReview.status')
        .lean(),
      Nomination.aggregate([
        { $group: { _id: '$awardCategory', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    res.json({
      status: 'success',
      data: {
        overview: {
          total: totalNominations,
          pending: pendingNominations,
          approved: approvedNominations,
          rejected: rejectedNominations
        },
        recent: recentNominations,
        categoryBreakdown: categoryStats
      }
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
    res.status(500).json({
      status: 'error',
      message: 'Failed to update nomination status'
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

    let updateData = {};
    let statusMessage = '';

    switch (action) {
      case 'approve':
        updateData = {
          'adminReview.reviewed': true,
          'adminReview.reviewer': req.user._id,
          'adminReview.reviewDate': new Date(),
          'adminReview.status': 'approved',
          'adminReview.notes': notes,
          'status': 'under-review',
          'phase': 'judging'
        };
        statusMessage = 'approved';
        break;
      case 'reject':
        updateData = {
          'adminReview.reviewed': true,
          'adminReview.reviewer': req.user._id,
          'adminReview.reviewDate': new Date(),
          'adminReview.status': 'rejected',
          'adminReview.notes': notes,
          'status': 'rejected'
        };
        statusMessage = 'rejected';
        break;
      case 'delete':
        const deleteResult = await Nomination.deleteMany({ _id: { $in: nominationIds } });
        return res.json({
          status: 'success',
          message: `Successfully deleted ${deleteResult.deletedCount} nominations`,
          data: { deletedCount: deleteResult.deletedCount }
        });
    }

    const updateResult = await Nomination.updateMany(
      { _id: { $in: nominationIds } },
      { $set: updateData }
    );

    // TODO: Send bulk email notifications if requested
    if (sendNotifications && action !== 'delete') {
      console.log(`📧 Bulk email notifications requested for ${nominationIds.length} nominations`);
      // Implement bulk email service here
    }

    res.json({
      status: 'success',
      message: `Successfully ${statusMessage} ${updateResult.modifiedCount} nominations`,
      data: {
        modifiedCount: updateResult.modifiedCount,
        action: action
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

// DELETE /api/admin/nominations/:id - Delete single nomination
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    // TODO: Delete associated files from storage
    console.log('🗑️ TODO: Delete files for nomination:', nomination.submissionId);

    await Nomination.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Nomination deleted successfully'
    });

  } catch (error) {
    console.error('Delete nomination error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete nomination'
    });
  }
});

// GET /api/admin/nominations/:id/files - Get nomination file URLs
router.get('/:id/files', async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id).select('files submissionId').lean();
    
    if (!nomination) {
      return res.status(404).json({
        status: 'error',
        message: 'Nomination not found'
      });
    }

    const files = {
      photo: nomination.files?.photo ? {
        url: `${req.protocol}://${req.get('host')}${nomination.files.photo.url}`,
        filename: nomination.files.photo.filename,
        size: nomination.files.photo.size
      } : null,
      supportingFiles: nomination.files?.supportingFiles?.map(file => ({
        url: `${req.protocol}://${req.get('host')}${file.url}`,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype
      })) || []
    };

    res.json({
      status: 'success',
      data: { files }
    });

  } catch (error) {
    console.error('Get nomination files error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nomination files'
    });
  }
});

module.exports = router;