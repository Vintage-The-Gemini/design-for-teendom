// File: backend/server.js
// Express server for Teendom Backend with Database

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database connection
const connectDB = require("./config/database");

// Import routes
const articleRoutes = require("./routes/articles");

// Create Express app
const app = express();

// Connect to database
connectDB();

// Basic middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/articles", articleRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "🚀 Teendom Backend API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/api/health",
      articles: "/api/articles",
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
  });
});

// Basic 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Teendom Backend running on port ${PORT}`);
  console.log(
    `📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});
