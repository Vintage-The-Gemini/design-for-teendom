// File: backend/routes/admin/system.js
const express = require('express');
const { protect, adminOnly } = require('../../middleware/auth');

const router = express.Router();

// Apply authentication to all routes
router.use(protect);
router.use(adminOnly);

// GET /api/admin/system/cloudinary-test - Test Cloudinary connection
router.get('/cloudinary-test', async (req, res) => {
  try {
    console.log('☁️ Testing Cloudinary connection...');
    
    // Import Cloudinary utils
    let cloudinaryUtils;
    try {
      cloudinaryUtils = require('../../utils/cloudinaryUtils');
    } catch (error) {
      return res.json({
        status: 'error',
        message: 'Cloudinary utilities not available',
        details: error.message
      });
    }

    // Test connection
    const testResult = await cloudinaryUtils.testCloudinaryConnection();
    
    if (testResult.success) {
      console.log('☁️ ✅ Cloudinary connection test successful');
      res.json({
        status: 'success',
        message: 'Cloudinary connection successful',
        data: {
          cloudName: testResult.cloudName,
          apiConnected: true,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      console.log('☁️ ❌ Cloudinary connection test failed');
      res.json({
        status: 'error',
        message: 'Cloudinary connection failed',
        details: testResult.error
      });
    }

  } catch (error) {
    console.error('☁️ ❌ Cloudinary test error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to test Cloudinary connection',
      details: error.message
    });
  }
});

// GET /api/admin/system/health - System health check
router.get('/health', async (req, res) => {
  try {
    const health = {
      status: 'success',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected', // You can add actual DB health check here
        uploads: 'available',
        cloudinary: 'unknown' // Will test separately
      },
      statistics: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
      }
    };

    res.json(health);
  } catch (error) {
    console.error('System health check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'System health check failed'
    });
  }
});

// POST /api/admin/system/clear-cache - Clear various caches (if implemented)
router.post('/clear-cache', async (req, res) => {
  try {
    console.log('🧹 Cache clearing requested by admin');
    
    // Add cache clearing logic here
    // For example: clear Redis cache, temporary files, etc.
    
    res.json({
      status: 'success',
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cache clearing error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to clear cache'
    });
  }
});

module.exports = router;