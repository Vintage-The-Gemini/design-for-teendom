// File: backend/routes/public/nominations.js
// DEBUG VERSION - Let's see what's happening

const express = require('express');
const router = express.Router();

console.log('🚀 Nominations route file loaded');

// Add logging to see which routes are being registered
router.use((req, res, next) => {
  console.log(`📝 Nominations route: ${req.method} ${req.url}`);
  console.log(`📦 Body keys: ${Object.keys(req.body)}`);
  console.log(`📁 Files: ${req.files ? 'present' : 'none'}`);
  next();
});

// Health check - THIS IS WORKING
router.get('/health', (req, res) => {
  console.log('🏥 Health check endpoint called');
  res.json({
    status: 'success',
    message: 'Nominations API is healthy',
    timestamp: new Date().toISOString(),
    routes: {
      health: 'GET /api/nominations/health',
      submit: 'POST /api/nominations',
      status: 'GET /api/nominations/status/:submissionId'
    }
  });
});

// Test GET route
router.get('/test', (req, res) => {
  console.log('🧪 Test GET endpoint called');
  res.json({
    status: 'success',
    message: 'Test GET endpoint working',
    timestamp: new Date().toISOString()
  });
});

// Main POST endpoint - SIMPLE VERSION
router.post('/', (req, res) => {
  console.log('🎯 POST / endpoint called - THIS SHOULD WORK');
  console.log('📦 Request body:', req.body);
  console.log('📁 Request files:', req.files || 'no files');
  
  try {
    // Generate submission ID
    const submissionId = `TEST-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    
    console.log('✅ Generated submission ID:', submissionId);
    
    // Simple success response
    const response = {
      status: 'success',
      message: 'TEST submission successful!',
      submissionId: submissionId,
      timestamp: new Date().toISOString(),
      debug: {
        hasBody: !!req.body,
        bodyKeys: Object.keys(req.body),
        hasFiles: !!req.files,
        method: req.method,
        url: req.url
      }
    };
    
    console.log('📤 Sending success response');
    res.status(200).json(response);
    
  } catch (error) {
    console.error('❌ Error in POST endpoint:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Catch-all for debugging
router.all('*', (req, res) => {
  console.log(`🤔 Unhandled route: ${req.method} ${req.url}`);
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.url} not found in nominations router`,
    availableRoutes: [
      'GET /health',
      'GET /test', 
      'POST /'
    ]
  });
});

console.log('✅ All nomination routes configured');
console.log('📋 Routes: GET /health, GET /test, POST /');

module.exports = router;