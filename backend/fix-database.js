// File: backend/fix-database.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

async function fixDatabase() {
  console.log('🔧 FIXING DATABASE ISSUES');
  console.log('=========================');
  
  try {
    await connectDB();
    
    // Drop the problematic collection and recreate clean
    console.log('🗑️ Dropping nominations collection to fix index issues...');
    await mongoose.connection.db.collection('nominations').drop().catch(() => {
      console.log('Collection doesn\'t exist yet - that\'s ok');
    });
    
    console.log('✅ Collection dropped');
    
    // Now require the model to recreate with correct schema
    const Nomination = require('./models/Nomination');
    
    // Test data with NO word count issues
    const testData = {
      submissionId: `CLEAN-${Date.now()}`,
      nominee: {
        firstName: 'Clean',
        lastName: 'Test',
        dateOfBirth: new Date('2006-01-01'),
        age: 18,
        gender: 'male',
        email: 'clean@test.com',
        phone: '+254700000000',
        nationality: 'kenyan-citizen',
        location: {
          county: 'Nairobi'
        },
        school: {
          level: 'Secondary School'
        },
        photo: 'clean-test.jpg'
      },
      nominator: {
        firstName: 'Clean',
        lastName: 'Nominator',
        email: 'nominator@clean.com',
        phone: '+254700000001',
        relationship: 'teacher'
      },
      awardCategory: 'Academic Excellence',
      shortBio: 'Short bio.',
      achievements: 'Achievements.',
      impact: 'Simple impact text.',
      referee: {
        name: 'Clean Referee',
        email: 'referee@clean.com',
        phone: '+254700000002',
        position: 'Teacher'
      },
      consent: {
        accurateInfo: true,
        nomineePermission: true,
        publicRecognition: true,
        backgroundCheck: true,
        dataUsage: true,
        antifraud: true
      }
    };
    
    console.log('💾 Testing clean save...');
    const saved = await Nomination.create(testData);
    console.log('🎉 SUCCESS! Clean nomination saved!');
    console.log(`ID: ${saved._id}`);
    
    await mongoose.disconnect();
    console.log('✅ Database fixed - try form submission now!');
    
  } catch (error) {
    console.log('❌ Fix failed:', error.message);
  }
}

fixDatabase();