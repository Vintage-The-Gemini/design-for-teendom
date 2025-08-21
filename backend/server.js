// File: backend/server.js
// Express server for Teendom Backend with Admin Panel and Awards System

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import database connection
const connectDB = require("./config/database");

// Import existing routes
const articleRoutes = require("./routes/articles");
const authRoutes = require("./routes/auth");
const adminArticleRoutes = require("./routes/admin/articles");
const adminCategoryRoutes = require("./routes/admin/categories");

// Import new awards routes
const adminAwardsRoutes = require("./routes/admin/awards");
const publicNominationsRoutes = require("./routes/public/nominations");

// Create Express app
const app = express();

// Connect to database
connectDB();

// Basic middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Public routes
app.use("/api/articles", articleRoutes);
app.use("/api/nominations", publicNominationsRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// Admin routes (protected)
app.use("/api/admin/articles", adminArticleRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/awards", adminAwardsRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Teendom Backend API is running!",
    version: "2.1.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/api/health",
      articles: "/api/articles",
      nominations: "/api/nominations",
      auth: "/api/auth",
      admin: {
        articles: "/api/admin/articles",
        categories: "/api/admin/categories",
        awards: "/api/admin/awards",
      }
    },
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "✅ Backend is healthy",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: "Connected",
    adminPanel: "Available",
    awardsSystem: "Active",
  });
});

// Basic 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  
  if (error.name === 'MulterError') {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'File too large. Maximum size is 50MB.'
      });
    }
  }
  
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors
    });
  }
  
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Teendom Backend running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`👩‍💼 Admin Panel API: http://localhost:${PORT}/api/admin`);
  console.log(`🏆 Awards System: http://localhost:${PORT}/api/admin/awards`);
  console.log(`📝 Public Nominations: http://localhost:${PORT}/api/nominations`);
  console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
});