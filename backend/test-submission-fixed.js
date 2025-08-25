// File: backend/test-submission-fixed.js
// Test submission with CORRECT schema values
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

async function testSubmissionFixed() {
  console.log('🧪 TESTING FORM SUBMISSION - FIXED VERSION');
  console.log('==========================================');
  
  try {
    // Connect to database
    await connectDB();
    const Nomination = require('./models/Nomination');
    
    // Create test nomination data with CORRECT enum values
    const testNomination = {
      submissionId: `TEST-${Date.now()}`,
      
      // Nominee Information - CORRECTED VALUES
      nominee: {
        firstName: 'John',
        middleName: 'Test',
        lastName: 'Doe',
        dateOfBirth: new Date('2006-01-15'), // REQUIRED: Date object
        age: 18,
        gender: 'male', // ENUM: 'male' or 'female' (lowercase!)
        email: 'john.doe@test.com',
        phone: '+254700000000',
        nationality: 'kenyan-citizen', // ENUM: 'kenyan-citizen' or 'kenyan-resident'
        location: {
          county: 'Nairobi', // REQUIRED field
          subcounty: 'Westlands',
          ward: 'Parklands/Highridge'
        },
        school: {
          name: 'Test High School',
          level: 'Secondary School', // ENUM: exact match from schema
          grade: 'Form 4'
        },
        photo: 'test-photo-url.jpg', // REQUIRED: photo URL or filename
        photoPublicId: 'test-photo-public-id'
      },
      
      // Nominator Information - CORRECTED VALUES
      nominator: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@test.com',
        phone: '+254700000001',
        relationship: 'teacher', // ENUM: lowercase values only!
        organization: 'Test High School',
        isSelfNomination: false
      },
      
      // Award Category - EXACT MATCH
      awardCategory: 'Academic Excellence',
      
      // Nomination Content - CORRECTED LENGTHS
      shortBio: 'A dedicated student with outstanding academic performance and leadership qualities.',
      
      achievements: 'Top of class for 3 consecutive years, science fair winner, debate champion, mathematics olympiad participant.',
      
      // CRITICAL: Impact must be at least 300 words
      impact: 'John has consistently demonstrated exceptional academic prowess, inspiring fellow students through comprehensive tutoring programs and leading innovative study groups. His dedication to learning and helping others has created a transformative positive academic culture throughout the entire school community. Through his mentorship initiatives, over fifty students have improved their grades significantly, with many achieving academic excellence for the first time. John established peer-to-peer learning networks that continue to benefit students across multiple grade levels. His influence extends beyond academics, as he has organized science clubs, debate societies, and academic competitions that have elevated the school\'s reputation regionally. The systematic approach he brings to problem-solving has influenced teaching methodologies, with teachers adopting some of his collaborative learning techniques. His commitment to inclusive education ensures that students from all backgrounds receive equal support and encouragement. The academic improvement programs he initiated have become permanent fixtures in the school\'s educational framework, creating lasting positive change that will benefit future generations of students.',
      
      whyDeserveAward: 'John deserves this award because of his consistent academic excellence combined with his exceptional dedication to uplifting fellow students and creating lasting positive educational impact.',
      
      additionalInfo: 'Additional community service activities and extracurricular achievements.',
      
      // Social Media Links
      socialMediaLinks: {
        twitter: '',
        instagram: '',
        facebook: '',
        linkedin: '',
        other: ''
      },
      
      // Supporting Files
      supportingFiles: [],
      
      // Referee Information - CORRECTED VALUES
      referee: {
        name: 'Dr. Mary Teacher',
        email: 'mary.teacher@test.com',
        phone: '+254700000002',
        position: 'Head Teacher',
        organization: 'Test High School',
        relationship: 'teacher' // ENUM: lowercase
      },
      
      // Consent - ALL REQUIRED FIELDS
      consent: {
        accurateInfo: true,
        dataUsage: true,
        publicRecognition: true,
        backgroundCheck: true,
        nomineePermission: true, // THIS WAS MISSING!
        antifraud: true
      },
      
      // System Fields
      status: 'submitted',
      phase: 'nomination'
    };
    
    console.log('💾 Attempting to save corrected test nomination...');
    console.log('📋 Key corrections made:');
    console.log('  ✅ gender: "male" (lowercase)');
    console.log('  ✅ nationality: "kenyan-citizen" (with hyphen)');
    console.log('  ✅ relationship: "teacher" (lowercase)');
    console.log('  ✅ school.level: "Secondary School" (exact match)');
    console.log('  ✅ dateOfBirth: Date object (required)');
    console.log('  ✅ location.county: "Nairobi" (required field)');
    console.log('  ✅ photo: test URL (required)');
    console.log('  ✅ consent.nomineePermission: true (was missing!)');
    console.log('  ✅ impact: 300+ words (required length)');
    
    const savedNomination = await Nomination.create(testNomination);
    console.log('🎉 SUCCESS: Test nomination saved successfully!');
    console.log(`📋 Submission ID: ${savedNomination.submissionId}`);
    console.log(`🆔 MongoDB ID: ${savedNomination._id}`);
    
    // Check total count
    const totalCount = await Nomination.countDocuments();
    console.log(`📊 Total nominations in database: ${totalCount}`);
    
    await mongoose.disconnect();
    console.log('✅ Database connection closed');
    console.log('\n🏆 SUCCESS: Your database is now working and can receive nominations!');
    console.log('🎯 Next step: Update your frontend form to use these correct enum values');
    
  } catch (error) {
    console.log('❌ Test submission still failed:', error.message);
    
    if (error.errors) {
      console.log('\n🔍 Remaining validation errors:');
      Object.keys(error.errors).forEach(field => {
        console.log(`   • ${field}: ${error.errors[field].message}`);
      });
    }
  }
}

testSubmissionFixed();