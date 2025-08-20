// File: backend/routes/admin/categories.js
const express = require('express');
const Category = require('../../models/Category');
const Article = require('../../models/Article');
const { protect, editorAccess, adminOnly } = require('../../middleware/auth');

const router = express.Router();

// GET /api/admin/categories - Get all categories
router.get('/', protect, editorAccess, async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ sortOrder: 1, name: 1 });

    // Update article counts
    for (let category of categories) {
      const count = await Article.countDocuments({ category: category.name });
      if (category.articleCount !== count) {
        category.articleCount = count;
        await category.save();
      }
    }

    res.json({
      status: 'success',
      results: categories.length,
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch categories'
    });
  }
});

// GET /api/admin/categories/:id - Get single category
router.get('/:id', protect, editorAccess, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    // Get recent articles in this category
    const recentArticles = await Article.find({ category: category.name })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title createdAt published views');

    res.json({
      status: 'success',
      data: {
        category,
        recentArticles
      }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch category'
    });
  }
});

// POST /api/admin/categories - Create new category
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, description, color, icon, sortOrder } = req.body;

    const category = await Category.create({
      name: name.toUpperCase().trim(),
      description,
      color,
      icon,
      sortOrder: sortOrder || 0
    });

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: {
        category
      }
    });
  } catch (error) {
    console.error('Create category error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Category with this name already exists'
      });
    }

    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// PUT /api/admin/categories/:id - Update category
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { name, description, color, icon, sortOrder, isActive } = req.body;
    
    const oldCategory = await Category.findById(req.params.id);
    if (!oldCategory) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    const updateData = {
      description,
      color,
      icon,
      sortOrder,
      isActive
    };

    // Handle name change
    if (name && name.toUpperCase().trim() !== oldCategory.name) {
      const newName = name.toUpperCase().trim();
      updateData.name = newName;
      
      // Update all articles with this category
      await Article.updateMany(
        { category: oldCategory.name },
        { category: newName }
      );
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'Category updated successfully',
      data: {
        category
      }
    });
  } catch (error) {
    console.error('Update category error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Category with this name already exists'
      });
    }

    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// DELETE /api/admin/categories/:id - Delete category
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      });
    }

    // Check if category has articles
    const articleCount = await Article.countDocuments({ category: category.name });
    
    if (articleCount > 0) {
      return res.status(400).json({
        status: 'error',
        message: `Cannot delete category. It has ${articleCount} articles. Please move or delete the articles first.`
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete category'
    });
  }
});

// POST /api/admin/categories/seed-defaults - Create default categories
router.post('/seed-defaults', protect, adminOnly, async (req, res) => {
  try {
    const defaultCategories = [
      { name: 'SELF-CARE', description: 'Mental health, wellness, and personal development', color: '#3B82F6', icon: '💆‍♀️', sortOrder: 1 },
      { name: 'LEADERSHIP', description: 'Leadership skills and youth empowerment', color: '#EF4444', icon: '👑', sortOrder: 2 },
      { name: 'BUSINESS', description: 'Entrepreneurship and business skills', color: '#8B5CF6', icon: '💼', sortOrder: 3 },
      { name: 'MONEY', description: 'Financial literacy and money management', color: '#10B981', icon: '💰', sortOrder: 4 },
      { name: 'LIFESTYLE', description: 'Lifestyle tips and personal growth', color: '#F59E0B', icon: '🌟', sortOrder: 5 },
      { name: 'RELATIONSHIPS', description: 'Friendship, family, and romantic relationships', color: '#EC4899', icon: '❤️', sortOrder: 6 },
      { name: 'EDUCATION', description: 'Learning, career guidance, and academic success', color: '#6366F1', icon: '📚', sortOrder: 7 }
    ];

    const createdCategories = [];
    
    for (const categoryData of defaultCategories) {
      try {
        const existing = await Category.findOne({ name: categoryData.name });
        if (!existing) {
          const category = await Category.create(categoryData);
          createdCategories.push(category);
        }
      } catch (error) {
        console.log(`Category ${categoryData.name} already exists or failed to create`);
      }
    }

    res.json({
      status: 'success',
      message: `${createdCategories.length} default categories created successfully`,
      data: {
        categories: createdCategories
      }
    });
  } catch (error) {
    console.error('Seed categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create default categories'
    });
  }
});

module.exports = router;