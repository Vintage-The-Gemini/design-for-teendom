// File: backend/debug-database.js
// Run this script to test your database connection
require('dotenv').config();
const mongoose = require('mongoose');

async function debugDatabase() {
  console.log('🔍 DATABASE CONNECTION DEBUG');
  console.log('================================');
  
  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log(`MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
  console.log(`PORT: ${process.env.PORT || '5000'}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  
  if (!process.env.MONGODB_URI) {
    console.log('❌ MONGODB_URI not found in environment variables');
    console.log('💡 Create a .env file with: MONGODB_URI=mongodb://localhost:27017/teendom_awards');
    return;
  }
  
  try {
    console.log('\n🔌 Testing MongoDB connection...');
    console.log(`Connecting to: ${process.env.MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@')}`);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test if Nomination model can be loaded
    try {
      const Nomination = require('./models/Nomination');
      console.log('✅ Nomination model loaded successfully');
      
      // Check existing nominations
      const count = await Nomination.countDocuments();
      console.log(`📊 Current nominations in database: ${count}`);
      
      if (count === 0) {
        console.log('💡 Database is empty - this is why you see 0 nominations');
        console.log('🎯 Next step: Submit a test nomination to verify the flow');
      }
      
    } catch (modelError) {
      console.log('❌ Nomination model error:', modelError.message);
    }
    
    await mongoose.disconnect();
    console.log('🔒 Database connection closed');
    
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    console.log('\n🛠️  Common solutions:');
    console.log('• Make sure MongoDB is running locally');
    console.log('• Check if the database URL is correct');
    console.log('• For local MongoDB: brew services start mongodb-community (Mac)');
    console.log('• For Windows: Start MongoDB service');
    console.log('• For Atlas: Check network access and credentials');
  }
}

debugDatabase();