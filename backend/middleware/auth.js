// File: backend/middleware/auth.js - FIXED VERSION

const jwt = require('jsonwebtoken');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'teendom-admin-secret-key');
    console.log('🔍 Token decoded:', decoded);

    // Import User model with fallback
    let User;
    try {
      User = require('../models/User');
    } catch (error) {
      console.warn('⚠️ User model not available in middleware');
      return res.status(503).json({
        status: 'error',
        message: 'Authentication service unavailable'
      });
    }

    // Get user from token (handle both userId and id fields)
    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token - no user ID found'
      });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Token is no longer valid. User not found.'
      });
    }

    // Check if user is active (if status field exists)
    if (user.status && user.status !== 'active') {
      return res.status(401).json({
        status: 'error',
        message: 'Account is not active. Contact administrator.'
      });
    }

    // Add user to request object
    req.user = user;
    console.log('✅ User authenticated:', { id: user._id, email: user.email, role: user.role });
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please login again.'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Authentication error.'
    });
  }
};

// Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. Authentication required.'
      });
    }

    if (!roles.includes(req.user.role)) {
      console.log(`❌ Access denied: User role '${req.user.role}' not in required roles: [${roles.join(', ')}]`);
      return res.status(403).json({
        status: 'error',
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    console.log(`✅ Role authorized: ${req.user.role} has access`);
    next();
  };
};

// Check if user is admin
const adminOnly = authorize('admin');

// Check if user is admin or editor
const editorAccess = authorize('admin', 'editor');

// Check if user is judge (for awards phase)
const judgeAccess = authorize('admin', 'judge');

module.exports = {
  protect,
  authorize,
  adminOnly,
  editorAccess,
  judgeAccess
};