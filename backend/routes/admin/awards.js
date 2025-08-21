// File: backend/routes/admin/awards.js
const express = require('express');
const Award = require('../../models/Award');
const Nomination = require('../../models/Nomination');
const { protect, editorAccess, adminOnly } = require('../../middleware/auth');

const router = express.Router();

// === AWARDS MANAGEMENT ===

// GET /api/admin/awards - Get all awards
router.get('/', protect, editorAccess, async (req, res) => {
  try {
    const { phase, status, category } = req.query;
    
    let query = {};
    if (phase) query.phase = phase;
    if (status) query.status = status;
    if (category) query.category = category;

    const awards = await Award.find(query)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    // Get nomination counts for each award
    const awardsWithCounts = await Promise.all(
      awards.map(async (award) => {
        const nominationCount = await Nomination.countDocuments({
          awardCategory: award.category,
          status: { $ne: 'draft' }
        });
        
        const finalistsCount = await Nomination.countDocuments({
          awardCategory: award.category,
          status: 'finalist'
        });

        return {
          ...award.toObject(),
          nominationCount,
          finalistsCount
        };
      })
    );

    res.json({
      status: 'success',
      results: awardsWithCounts.length,
      data: {
        awards: awardsWithCounts
      }
    });
  } catch (error) {
    console.error('Get awards error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch awards'
    });
  }
});

// GET /api/admin/awards/stats - Get awards statistics
router.get('/stats', protect, editorAccess, async (req, res) => {
  try {
    const [
      totalNominations,
      totalAwards,
      nominationsByCategory,
      nominationsByStatus,
      recentNominations
    ] = await Promise.all([
      Nomination.countDocuments({ status: { $ne: 'draft' } }),
      Award.countDocuments(),
      Nomination.aggregate([
        { $match: { status: { $ne: 'draft' } } },
        { $group: { _id: '$awardCategory', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Nomination.aggregate([
        { $match: { status: { $ne: 'draft' } } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Nomination.find({ status: { $ne: 'draft' } })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('nominee.firstName nominee.lastName awardCategory status createdAt submissionNumber')
    ]);

    res.json({
      status: 'success',
      data: {
        overview: {
          totalNominations,
          totalAwards,
          totalJudges: 0 // Will be implemented later
        },
        nominationsByCategory: nominationsByCategory.map(item => ({
          category: item._id,
          count: item.count
        })),
        nominationsByStatus: nominationsByStatus.map(item => ({
          status: item._id,
          count: item.count
        })),
        recentNominations
      }
    });
  } catch (error) {
    console.error('Get awards stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics'
    });
  }
});

// POST /api/admin/awards - Create new award
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const awardData = {
      ...req.body,
      createdBy: req.user._id
    };

    const award = await Award.create(awardData);
    await award.populate('createdBy', 'name email');

    res.status(201).json({
      status: 'success',
      data: {
        award
      }
    });
  } catch (error) {
    console.error('Create award error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create award'
    });
  }
});

// === NOMINATIONS MANAGEMENT ===

// GET /api/admin/awards/nominations - Get all nominations
router.get('/nominations', protect, editorAccess, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    let query = {};
    
    if (status) query.status = status;
    if (category) query.awardCategory = category;
    
    if (search) {
      query.$or = [
        { 'nominee.firstName': { $regex: search, $options: 'i' } },
        { 'nominee.lastName': { $regex: search, $options: 'i' } },
        { 'nominee.email': { $regex: search, $options: 'i' } },
        { 'nominator.firstName': { $regex: search, $options: 'i' } },
        { 'nominator.lastName': { $regex: search, $options: 'i' } },
        { submissionNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * parseInt(limit);
    
    const [nominations, totalCount] = await Promise.all([
      Nomination.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit)),
      Nomination.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.json({
      status: 'success',
      results: nominations.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
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

// GET /api/admin/awards/nominations/:id - Get single nomination
router.get('/nominations/:id', protect, editorAccess, async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id)
      .populate('judgeNotes.judge', 'name email');

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

module.exports = router;