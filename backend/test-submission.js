// File: backend/test-submission.js
// Test if form submissions are working
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

async function testSubmission() {
  console.log('🧪 TESTING FORM SUBMISSION FLOW');
  console.log('================================');
  
  try {
    // Connect to database
    await connectDB();
    const Nomination = require('./models/Nomination');
    
    // Create test nomination data
    const testNomination = {
      submissionId: `TEST-${Date.now()}`,
      nominee: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        age: 17,
        gender: 'Male',
        phone: '+254700000000',
        nationality: 'Kenyan Citizen',
        county: 'Nairobi',
        subcounty: 'Westlands',
        ward: 'Parklands/Highridge',
        school: {
          name: 'Test High School',
          level: 'Secondary',
          gradeLevel: 'Form 4'
        }
      },
      nominator: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@test.com',
        phone: '+254700000001',
        relationship: 'Teacher',
        organization: 'Test High School'
      },
      awardCategory: 'Academic Excellence',
      shortBio: 'A dedicated student with outstanding academic performance.',
      achievements: 'Top of class, science fair winner, debate champion.',
      impact: 'John has consistently demonstrated exceptional academic prowess, inspiring fellow students through tutoring programs and leading study groups. His dedication to learning and helping others has created a positive academic culture in the school.',
      whyDeserveAward: 'John deserves this award because of his consistent academic excellence and positive influence on peers.',
      referee: {
        name: 'Dr. Mary Teacher',
        email: 'mary.teacher@test.com',
        phone: '+254700000002',
        position: 'Head Teacher',
        organization: 'Test High School',
        relationship: 'Teacher'
      },
      consent: {
        accurateInfo: true,
        dataUsage: true,
        publicRecognition: true,
        backgroundCheck: true,
        antifraud: true
      },
      status: 'submitted'
    };
    
    // Try to save to database
    console.log('💾 Attempting to save test nomination...');
    const savedNomination = await Nomination.create(testNomination);
    console.log('✅ Test nomination saved successfully!');
    console.log(`📋 Submission ID: ${savedNomination.submissionId}`);
    console.log(`🆔 MongoDB ID: ${savedNomination._id}`);
    
    // Check total count
    const totalCount = await Nomination.countDocuments();
    console.log(`📊 Total nominations in database: ${totalCount}`);
    
    await mongoose.disconnect();
    console.log('🎉 SUCCESS: Database is working and can receive nominations!');
    
  } catch (error) {
    console.log('❌ Test submission failed:', error.message);
    console.log('\n🔍 Error details:', error);
  }
}

testSubmission();