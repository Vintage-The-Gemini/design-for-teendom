// File: backend/routes/admin/articles.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const Article = require('../../models/Article');
const { protect, editorAccess, adminOnly } = require('../../middleware/auth');

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/articles');
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `article-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// GET /api/admin/articles - Get all articles for admin
router.get('/', protect, editorAccess, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = {};
    
    if (category && category !== 'ALL') {
      query.category = category;
    }
    
    if (status) {
      query.published = status === 'published';
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * parseInt(limit);
    
    const [articles, totalCount] = await Promise.all([
      Article.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit)),
      Article.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      status: 'success',
      results: articles.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      },
      data: {
        articles
      }
    });
  } catch (error) {
    console.error('Admin get articles error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch articles'
    });
  }
});

// GET /api/admin/articles/:id - Get single article for editing
router.get('/:id', protect, editorAccess, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'Article not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        article
      }
    });
  } catch (error) {
    console.error('Admin get article error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch article'
    });
  }
});

// POST /api/admin/articles - Create new article
router.post('/', protect, editorAccess, upload.single('image'), async (req, res) => {
  try {
    const articleData = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
    };

    // Handle image upload
    if (req.file) {
      articleData.image = `/uploads/articles/${req.file.filename}`;
    }

    // Convert string booleans to actual booleans
    if (req.body.featured !== undefined) {
      articleData.featured = req.body.featured === 'true';
    }
    if (req.body.published !== undefined) {
      articleData.published = req.body.published === 'true';
    }

    const article = await Article.create(articleData);

    res.status(201).json({
      status: 'success',
      message: 'Article created successfully',
      data: {
        article
      }
    });
  } catch (error) {
    console.error('Create article error:', error);
    
    // Delete uploaded file if article creation failed
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to delete uploaded file:', unlinkError);
      }
    }

    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// PUT /api/admin/articles/:id - Update article
router.put('/:id', protect, editorAccess, upload.single('image'), async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'Article not found'
      });
    }

    const updateData = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : article.tags
    };

    // Handle new image upload
    if (req.file) {
      // Delete old image if it exists
      if (article.image && article.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '../../', article.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.log('Old image not found or already deleted');
        }
      }
      
      updateData.image = `/uploads/articles/${req.file.filename}`;
    }

    // Convert string booleans to actual booleans
    if (req.body.featured !== undefined) {
      updateData.featured = req.body.featured === 'true';
    }
    if (req.body.published !== undefined) {
      updateData.published = req.body.published === 'true';
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'Article updated successfully',
      data: {
        article: updatedArticle
      }
    });
  } catch (error) {
    console.error('Update article error:', error);
    
    // Delete uploaded file if update failed
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to delete uploaded file:', unlinkError);
      }
    }

    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// DELETE /api/admin/articles/:id - Delete article
router.delete('/:id', protect, editorAccess, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'Article not found'
      });
    }

    // Delete associated image
    if (article.image && article.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '../../', article.image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.log('Image file not found or already deleted');
      }
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Article deleted successfully'
    });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete article'
    });
  }
});

// POST /api/admin/articles/:id/toggle-featured - Toggle featured status
router.post('/:id/toggle-featured', protect, editorAccess, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'Article not found'
      });
    }

    article.featured = !article.featured;
    await article.save();

    res.json({
      status: 'success',
      message: `Article ${article.featured ? 'featured' : 'unfeatured'} successfully`,
      data: {
        article
      }
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to toggle featured status'
    });
  }
});

// POST /api/admin/articles/:id/toggle-published - Toggle published status
router.post('/:id/toggle-published', protect, editorAccess, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'Article not found'
      });
    }

    article.published = !article.published;
    await article.save();

    res.json({
      status: 'success',
      message: `Article ${article.published ? 'published' : 'unpublished'} successfully`,
      data: {
        article
      }
    });
  } catch (error) {
    console.error('Toggle published error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to toggle published status'
    });
  }
});

// GET /api/admin/articles/stats/overview - Get articles statistics
router.get('/stats/overview', protect, editorAccess, async (req, res) => {
  try {
    const [
      totalArticles,
      publishedArticles,
      featuredArticles,
      draftArticles,
      categoryStats
    ] = await Promise.all([
      Article.countDocuments(),
      Article.countDocuments({ published: true }),
      Article.countDocuments({ featured: true }),
      Article.countDocuments({ published: false }),
      Article.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    const recentArticles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category createdAt views published featured');

    res.json({
      status: 'success',
      data: {
        stats: {
          total: totalArticles,
          published: publishedArticles,
          featured: featuredArticles,
          drafts: draftArticles
        },
        categoryStats,
        recentArticles
      }
    });
  } catch (error) {
    console.error('Articles stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch articles statistics'
    });
  }
});

module.exports = router;