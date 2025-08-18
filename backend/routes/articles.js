// File: backend/routes/articles.js
const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

// GET /api/articles - Get all articles
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 20 } = req.query;
    
    // Build query
    let query = { published: true };
    
    if (category && category !== 'ALL') {
      query.category = category;
    }
    
    if (featured) {
      query.featured = featured === 'true';
    }

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      status: 'success',
      results: articles.length,
      data: {
        articles
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// GET /api/articles/:id - Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'Article not found'
      });
    }

    // Increment views automatically
    article.views += 1;
    await article.save();

    res.json({
      status: 'success',
      data: {
        article
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// POST /api/articles - Create new article (for testing)
router.post('/', async (req, res) => {
  try {
    const article = await Article.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        article
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// PATCH /api/articles/:id/view - Manual view increment (optional)
router.patch('/:id/view', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({
        status: 'error',
        message: 'Article not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        views: article.views
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;