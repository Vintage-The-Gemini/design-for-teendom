// File: backend/routes/admin/nominations.js
const express = require('express');
const Nomination = require('../../models/Nomination');
const { adminAuth } = require('../../middleware/auth');
const { sendStatusUpdateEmail } = require('../../utils/emailService');
const router = express.Router();

// Apply admin authentication to all routes
router.use(adminAuth);

// Get all nominations with filtering and pagination
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

    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.awardCategory = category;
    if (adminStatus) filter['adminReview.status'] = adminStatus;
    
    // Search functionality
    if (search) {
      filter.$or = [
        { 'nominee.firstName': { $regex: search, $options: 'i' } },
        { 'nominee.lastName': { $regex: search, $options: 'i' } },
        { 'nominator.firstName': { $regex: search, $options: 'i' } },
        { 'nominator.lastName': { $regex: search, $options: 'i' } },
        { submissionId: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const nominations = await Nomination.find(filter)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-documents.data') // Exclude large file data from list view
      .exec();

    // Get total count for pagination
    const total = await Nomination.countDocuments(filter);

    // Get statistics
    const stats = await Nomination.aggregate([
      {
        $group: {
          _id: '$adminReview.status',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Nomination.aggregate([
      {
        $group: {
          _id: '$awardCategory',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      nominations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      },
      statistics: {
        statusCounts: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        categoryCounts: categoryStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Error fetching nominations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nominations'
    });
  }
});

// Get single nomination details
router.get('/:id', async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        success: false,
        message: 'Nomination not found'
      });
    }

    res.json({
      success: true,
      nomination
    });

  } catch (error) {
    console.error('Error fetching nomination:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nomination details'
    });
  }
});

// Update nomination admin review status
router.patch('/:id/review', async (req, res) => {
  try {
    const { status, notes, sendEmail = true } = req.body;
    const adminId = req.admin.id;
    
    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        success: false,
        message: 'Nomination not found'
      });
    }

    // Update admin review
    nomination.adminReview = {
      reviewed: true,
      reviewer: adminId,
      reviewDate: new Date(),
      status: status, // approved, rejected, needs-info
      notes: notes || ''
    };

    // Update main status if approved
    if (status === 'approved') {
      nomination.status = 'under-review'; // Ready for judges
    }

    await nomination.save();

    // Send status update email if requested
    if (sendEmail) {
      try {
        await sendStatusUpdateEmail({
          to: nomination.nominator.email,
          nomineeFirstName: nomination.nominee.firstName,
          nomineeLastName: nomination.nominee.lastName,
          submissionId: nomination.submissionId,
          status: status,
          notes: notes
        });
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }
    }

    res.json({
      success: true,
      message: 'Nomination review updated successfully',
      nomination: {
        id: nomination._id,
        submissionId: nomination.submissionId,
        status: nomination.status,
        adminReview: nomination.adminReview
      }
    });

  } catch (error) {
    console.error('Error updating nomination review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update nomination review'
    });
  }
});

// Bulk approve nominations
router.post('/bulk-approve', async (req, res) => {
  try {
    const { nominationIds, notes = '' } = req.body;
    const adminId = req.admin.id;

    if (!nominationIds || !Array.isArray(nominationIds)) {
      return res.status(400).json({
        success: false,
        message: 'Valid nomination IDs array is required'
      });
    }

    const updateResult = await Nomination.updateMany(
      { _id: { $in: nominationIds } },
      {
        $set: {
          'adminReview.reviewed': true,
          'adminReview.reviewer': adminId,
          'adminReview.reviewDate': new Date(),
          'adminReview.status': 'approved',
          'adminReview.notes': notes,
          'status': 'under-review'
        }
      }
    );

    res.json({
      success: true,
      message: `${updateResult.modifiedCount} nominations approved successfully`,
      modifiedCount: updateResult.modifiedCount
    });

  } catch (error) {
    console.error('Error bulk approving nominations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk approve nominations'
    });
  }
});

// Export nominations for judges (by category)
router.get('/export/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const nominations = await Nomination.find({
      awardCategory: category,
      'adminReview.status': 'approved',
      status: 'under-review'
    }).select('-documents -adminReview -__v');

    if (nominations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No approved nominations found for this category'
      });
    }

    res.json({
      success: true,
      category,
      count: nominations.length,
      nominations,
      exportDate: new Date(),
      instructions: {
        judging: 'Please review each nomination and score based on the provided criteria',
        deadline: 'November 5, 2025',
        contact: 'awards@teendomafrica.org'
      }
    });

  } catch (error) {
    console.error('Error exporting nominations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export nominations'
    });
  }
});

// Get nomination statistics for dashboard
router.get('/stats/dashboard', async (req, res) => {
  try {
    const stats = await Promise.all([
      // Total nominations
      Nomination.countDocuments(),
      
      // By status
      Nomination.aggregate([
        {
          $group: {
            _id: '$adminReview.status',
            count: { $sum: 1 }
          }
        }
      ]),
      
      // By category
      Nomination.aggregate([
        {
          $group: {
            _id: '$awardCategory',
            count: { $sum: 1 }
          }
        }
      ]),
      
      // Recent submissions (last 7 days)
      Nomination.countDocuments({
        submittedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
      
      // Pending reviews
      Nomination.countDocuments({
        'adminReview.status': 'pending'
      })
    ]);

    const [total, statusStats, categoryStats, recent, pending] = stats;

    res.json({
      success: true,
      dashboard: {
        totalNominations: total,
        recentSubmissions: recent,
        pendingReviews: pending,
        statusDistribution: statusStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        categoryDistribution: categoryStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// Delete nomination (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        success: false,
        message: 'Nomination not found'
      });
    }

    // Soft delete by updating status
    nomination.status = 'deleted';
    nomination.deletedAt = new Date();
    nomination.deletedBy = req.admin.id;
    
    await nomination.save();

    res.json({
      success: true,
      message: 'Nomination deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting nomination:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete nomination'
    });
  }
});

module.exports = router;