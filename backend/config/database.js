// File: backend/config/database.js - UPDATED VERSION
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string with fallback
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teendom_awards';
    
    console.log('🔌 Connecting to MongoDB...');
    console.log('📍 Database URL:', mongoURI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials in logs
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Log connection status
    mongoose.connection.on('connected', () => {
      console.log('🟢 MongoDB connection established');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔴 MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔒 MongoDB connection closed due to app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    // Don't exit the process - let the app continue with file storage
    console.log('📝 Continuing with file-based storage as fallback');
    return null;
  }
};

module.exports = connectDB;