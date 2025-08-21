// File: backend/routes/public/nominations.js
const express = require('express');
const Nomination = require('../../models/Nomination');

const router = express.Router();

// === PUBLIC NOMINATION ROUTES ===

// POST /api/nominations - Submit nomination (basic version without file upload)
router.post('/', async (req, res) => {
  try {
    const nomination = await Nomination.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        nomination: {
          submissionNumber: nomination.submissionNumber,
          status: nomination.status,
          createdAt: nomination.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Submit nomination error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to submit nomination'
    });
  }
});

// GET /api/nominations/:submissionNumber - Get nomination by submission number
router.get('/:submissionNumber', async (req, res) => {
  try {
    const nomination = await Nomination.findOne({
      submissionNumber: req.params.submissionNumber
    }).select('-judgeNotes -finalScore');

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
    console.error('Get nomination error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch nomination'
    });
  }
});

// GET /api/nominations/categories/stats - Get public statistics
router.get('/categories/stats', async (req, res) => {
  try {
    const stats = await Nomination.aggregate([
      { $match: { status: { $ne: 'draft' } } },
      {
        $group: {
          _id: '$awardCategory',
          totalNominations: { $sum: 1 },
          finalists: {
            $sum: { $cond: [{ $eq: ['$status', 'finalist'] }, 1, 0] }
          },
          totalVotes: { $sum: '$votes' }
        }
      },
      { $sort: { totalNominations: -1 } }
    ]);

    res.json({
      status: 'success',
      data: {
        categories: stats
      }
    });
  } catch (error) {
    console.error('Get category stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;