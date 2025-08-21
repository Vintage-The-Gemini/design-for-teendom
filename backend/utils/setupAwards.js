// File: backend/utils/setupAwards.js
// Clean setup script for Teendom Awards

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');

const setupAwards = async () => {
  try {
    console.log('🏆 Starting Teendom Awards setup...');
    
    // Connect to database
    await connectDB();
    console.log('📊 Database connected successfully');

    // Import models after database connection
    const User = require('../models/User');
    const Award = require('../models/Award');

    // Check if admin user exists
    const adminUser = await User.findOne({ 
      $or: [
        { email: 'admin@teendom.co.ke' },
        { role: 'admin' }
      ]
    });

    if (!adminUser) {
      console.log('❌ No admin user found!');
      console.log('💡 Please run the admin setup first:');
      console.log('   node utils/setupAdmin.js');
      process.exit(1);
    }

    console.log(`👤 Found admin user: ${adminUser.name || adminUser.email}`);

    // Define all 10 award categories
    const categories = [
      {
        name: 'Advocate for Change',
        description: 'Recognizing teenagers who actively work to create positive social change in their communities through advocacy, activism, and community engagement.',
        category: 'Advocate for Change'
      },
      {
        name: 'Sports Excellence',
        description: 'Celebrating outstanding athletic achievement, sportsmanship, and dedication to sports among teenagers.',
        category: 'Sports Excellence'
      },
      {
        name: 'Academic Excellence',
        description: 'Honoring exceptional academic achievement, intellectual curiosity, and scholarly pursuits.',
        category: 'Academic Excellence'
      },
      {
        name: 'Arts & Creativity',
        description: 'Recognizing outstanding artistic talent, creative expression, and innovation in various art forms.',
        category: 'Arts & Creativity'
      },
      {
        name: 'Leadership Excellence',
        description: 'Celebrating exceptional leadership qualities, vision, and the ability to inspire and guide others.',
        category: 'Leadership Excellence'
      },
      {
        name: 'Community Service',
        description: 'Honoring dedication to community service, volunteerism, and making a positive impact in local communities.',
        category: 'Community Service'
      },
      {
        name: 'Innovation & Technology',
        description: 'Recognizing innovative use of technology, technological creativity, and contributions to the digital world.',
        category: 'Innovation & Technology'
      },
      {
        name: 'Environmental Champion',
        description: 'Celebrating commitment to environmental protection, sustainability, and conservation efforts.',
        category: 'Environmental Champion'
      },
      {
        name: 'Entrepreneurship',
        description: 'Honoring young entrepreneurs, business innovators, and those showing exceptional business acumen.',
        category: 'Entrepreneurship'
      },
      {
        name: 'Cultural Ambassador',
        description: 'Recognizing promotion and preservation of cultural heritage, traditions, and cross-cultural understanding.',
        category: 'Cultural Ambassador'
      }
    ];

    // Set up common award properties
    const commonProperties = {
      phase: 'nominations',
      status: 'active',
      nominationDeadline: new Date('2025-09-30T23:59:59.999Z'),
      judgingDeadline: new Date('2025-11-05T23:59:59.999Z'),
      votingDeadline: new Date('2025-11-24T23:59:59.999Z'),
      createdBy: adminUser._id
    };

    console.log('📝 Creating award categories...');
    
    let createdCount = 0;
    let existingCount = 0;

    // Create each award category
    for (const categoryData of categories) {
      try {
        // Check if award already exists
        const existingAward = await Award.findOne({ 
          category: categoryData.category 
        });

        if (existingAward) {
          console.log(`ℹ️  Award already exists: ${categoryData.name}`);
          existingCount++;
        } else {
          // Create new award
          const awardData = {
            ...categoryData,
            ...commonProperties
          };

          const newAward = await Award.create(awardData);
          console.log(`✅ Created award: ${newAward.name}`);
          createdCount++;
        }
      } catch (error) {
        console.error(`❌ Error creating award ${categoryData.name}:`, error.message);
      }
    }

    // Summary
    console.log('\n🎉 Awards setup completed!');
    console.log('📊 Summary:');
    console.log(`   ✅ Awards created: ${createdCount}`);
    console.log(`   ℹ️  Awards already existed: ${existingCount}`);
    console.log(`   📋 Total categories: ${categories.length}`);
    console.log('');
    console.log('📅 Timeline:');
    console.log('   📝 Nominations: Open until September 30, 2025');
    console.log('   👥 Judging: October 5 - November 5, 2025');
    console.log('   🗳️ Voting: November 8 - 24, 2025');
    console.log('   🏆 Ceremony: December 6, 2025');
    console.log('');
    console.log('🔗 Next Steps:');
    console.log('   1. Start your backend: npm run dev');
    console.log('   2. Open admin panel: http://localhost:3000/admin');
    console.log('   3. Click on Awards tab to manage the system');
    console.log('');
    console.log('🚀 Teendom Awards 2025 is ready to go!');

    // Close database connection
    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Setup failed:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

// Run setup if this file is executed directly
if (require.main === module) {
  setupAwards().catch(error => {
    console.error('❌ Fatal error during setup:', error);
    process.exit(1);
  });
}

module.exports = setupAwards;