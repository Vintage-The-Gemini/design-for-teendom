// File: backend/routes/auth.js - QUICK FIX FOR ADMIN LOGIN

const express = require('express');
const jwt = require('jsonwebtoken');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Import User model with fallback
let User;
try {
  User = require('../models/User');
  console.log('✅ User model loaded for auth');
} catch (error) {
  console.warn('⚠️ User model not available:', error.message);
}

// QUICK FIX: Add the missing admin login endpoint
router.post('/admin/login', async (req, res) => {
  try {
    console.log('🔐 Admin login attempt:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    if (!User) {
      return res.status(503).json({
        status: 'error',
        message: 'Authentication service unavailable - Database not connected'
      });
    }

    // Find user with admin/editor role
    const user = await User.findOne({ 
      email: email.toLowerCase(),
      role: { $in: ['admin', 'editor'] }
    }).select('+password');

    if (!user) {
      console.log('❌ Admin not found:', email);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials or insufficient permissions'
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (user.status && user.status !== 'active') {
      return res.status(401).json({
        status: 'error',
        message: 'Account is not active. Contact administrator.'
      });
    }

    // Generate token with correct payload structure
    const tokenPayload = {
      userId: user._id,  // Match what the middleware expects
      id: user._id,      // Fallback for older code
      role: user.role,
      email: user.email
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'teendom-admin-secret-key',
      { expiresIn: '24h' }
    );

    console.log('✅ Admin login successful:', { 
      userId: user._id, 
      role: user.role, 
      email: user.email 
    });

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status || 'active'
      }
    });

  } catch (error) {
    console.error('❌ Admin login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/auth/verify - Verify token validity
router.get('/verify', protect, async (req, res) => {
  try {
    // If we reach here, the protect middleware has validated the token
    res.json({
      status: 'success',
      message: 'Token is valid',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        status: req.user.status || 'active'
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      status: 'error',
      message: 'Token verification failed'
    });
  }
});

// POST /api/auth/login - Regular user login (keep existing functionality)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!User) {
      return res.status(503).json({
        status: 'error',
        message: 'Authentication service unavailable - Database not connected'
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    if (user.status && user.status !== 'active') {
      return res.status(401).json({
        status: 'error',
        message: 'Account is not active. Contact administrator.'
      });
    }

    // Update last login if method exists
    if (typeof user.updateLastLogin === 'function') {
      await user.updateLastLogin();
    }

    // Generate token
    const token = user.generateAuthToken ? 
      user.generateAuthToken() : 
      jwt.sign(
        { userId: user._id, id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET || 'teendom-admin-secret-key',
        { expiresIn: '24h' }
      );

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status || 'active',
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed'
    });
  }
});

// GET /api/auth/me - Get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          status: req.user.status || 'active',
          lastLogin: req.user.lastLogin,
          profileImage: req.user.profileImage
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get profile'
    });
  }
});

// Health check for auth service
router.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Auth service is healthy',
    features: {
      userModel: !!User,
      jwtSecret: !!process.env.JWT_SECRET,
      adminLogin: true,
      tokenVerification: true
    }
  });
});

// POST /api/auth/register - Register new admin user (admin only)
router.post('/register', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!User) {
      return res.status(503).json({
        status: 'error',
        message: 'Registration service unavailable'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'editor',
      status: 'active'
    });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        }
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Registration failed'
    });
  }
});

module.exports = router;