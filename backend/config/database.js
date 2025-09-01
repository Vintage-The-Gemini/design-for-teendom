// File: backend/config/database.js - HOTFIX FOR MONGOOSE VERSION
const mongoose = require('mongoose');

// Global connection state
let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
  // Return existing connection if available
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('🔄 Using existing MongoDB connection');
    return mongoose.connection;
  }

  // Return existing connection promise if already connecting
  if (connectionPromise) {
    console.log('🔄 Waiting for existing connection attempt...');
    return connectionPromise;
  }

  try {
    console.log('🔌 Initializing MongoDB Atlas connection...');
    
    // Load environment variables
    require('dotenv').config();
    
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('❌ MONGODB_URI not found in environment variables');
    }

    console.log('📍 Connecting to Atlas cluster...');
    console.log('🔗 URI Format Check:', mongoURI.startsWith('mongodb+srv://') ? '✅ Valid Atlas URI' : '❌ Invalid URI');

    // Disconnect any existing connection
    if (mongoose.connection.readyState !== 0) {
      console.log('🔄 Closing existing connection...');
      await mongoose.disconnect();
    }

    // HOTFIX: Minimal connection options for modern Mongoose
    const connectionOptions = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    };

    console.log('🔗 Attempting connection with minimal options...');

    // Create connection promise
    connectionPromise = mongoose.connect(mongoURI, connectionOptions);
    
    // Await the connection
    const conn = await connectionPromise;
    
    // Test connection immediately
    console.log('🏓 Testing connection with ping...');
    await mongoose.connection.db.admin().ping();
    
    // Success!
    isConnected = true;
    console.log('🎉 MongoDB Atlas Connected Successfully!');
    console.log(`✅ Host: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    console.log(`✅ Ready State: ${mongoose.connection.readyState}`);
    
    // Setup event handlers
    setupEventHandlers();
    
    // Clear the promise
    connectionPromise = null;
    
    return conn;

  } catch (error) {
    isConnected = false;
    connectionPromise = null;
    
    console.error('❌ MongoDB Atlas Connection Failed:');
    console.error('🔍 Error Message:', error.message);
    
    // Re-throw for handling in server.js
    throw error;
  }
};

// Event handlers for connection monitoring
const setupEventHandlers = () => {
  mongoose.connection.on('connected', () => {
    console.log('🟢 Atlas connection established');
    isConnected = true;
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Atlas connection error:', err.message);
    isConnected = false;
  });

  mongoose.connection.on('disconnected', () => {
    console.log('🔴 Atlas disconnected');
    isConnected = false;
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 Atlas reconnected');
    isConnected = true;
  });
};

// Test connection function
const testConnection = async () => {
  try {
    const conn = await connectDB();
    console.log('🎯 Connection test successful!');
    
    return { success: true, connection: conn };
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Get connection status
const getConnectionStatus = () => {
  return {
    isConnected: isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
    models: Object.keys(mongoose.models)
  };
};

module.exports = {
  connectDB,
  testConnection,
  getConnectionStatus,
  isConnected: () => isConnected
};