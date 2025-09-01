// File: backend/config/database.js - FIXED VERSION
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Load environment variables
    require('dotenv').config();
    
    // MongoDB connection string with better fallback
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teendom_awards';
    
    console.log('🔌 Connecting to MongoDB...');
    console.log('📍 Database URL:', mongoURI.replace(/\/\/.*:.*@/, '//***:***@'));
    
    // Fixed connection options - removed unsupported options
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Enhanced connection event handlers
    mongoose.connection.on('connected', () => {
      console.log('🟢 MongoDB connection established');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔴 MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Test the connection by performing a simple operation
    await mongoose.connection.db.admin().ping();
    console.log('🏓 Database ping successful');

    return conn;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('🔍 Full error:', error);
    
    // Provide specific error guidance
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 MongoDB service is not running. Start it with:');
      console.log('   • Mac: brew services start mongodb-community');
      console.log('   • Windows: Start MongoDB service from Services panel');
      console.log('   • Linux: sudo systemctl start mongod');
    }
    
    if (error.message.includes('authentication')) {
      console.log('💡 Database authentication failed. Check your credentials.');
    }
    
    if (error.message.includes('timeout')) {
      console.log('💡 Connection timeout. Check if MongoDB is accessible.');
    }
    
    throw error; // Re-throw to handle in server.js
  }
};

// Test connection function
const testConnection = async () => {
  try {
    await connectDB();
    console.log('🎉 Database connection test successful!');
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    return false;
  }
};

module.exports = connectDB;