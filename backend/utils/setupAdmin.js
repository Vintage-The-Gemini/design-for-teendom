// File: backend/utils/setupAdmin.js
// Script to set up initial admin user and categories

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const connectDB = require('../config/database');

const setupAdmin = async () => {
  try {
    console.log('🚀 Starting admin setup...');

    // Connect to database
    await connectDB();

    // 1. Create super admin user
    console.log('👤 Creating super admin user...');
    
    const adminExists = await User.findOne({ email: 'admin@teendom.co.ke' });
    
    if (!adminExists) {
      const adminUser = await User.create({
        name: 'Teendom Admin',
        email: 'admin@teendom.co.ke',
        password: 'TeendomAdmin2024!',
        role: 'admin',
        status: 'active'
      });
      
      console.log('✅ Super admin created:');
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Password: TeendomAdmin2024!`);
      console.log(`   Role: ${adminUser.role}`);
    } else {
      console.log('ℹ️  Super admin already exists');
    }

    // 2. Create default categories
    console.log('📂 Creating default categories...');
    
    const defaultCategories = [
      { 
        name: 'SELF-CARE', 
        description: 'Mental health, wellness, and personal development', 
        color: '#3B82F6', 
        icon: '💆‍♀️', 
        sortOrder: 1 
      },
      { 
        name: 'LEADERSHIP', 
        description: 'Leadership skills and youth empowerment', 
        color: '#EF4444', 
        icon: '👑', 
        sortOrder: 2 
      },
      { 
        name: 'BUSINESS', 
        description: 'Entrepreneurship and business skills', 
        color: '#8B5CF6', 
        icon: '💼', 
        sortOrder: 3 
      },
      { 
        name: 'MONEY', 
        description: 'Financial literacy and money management', 
        color: '#10B981', 
        icon: '💰', 
        sortOrder: 4 
      },
      { 
        name: 'LIFESTYLE', 
        description: 'Lifestyle tips and personal growth', 
        color: '#F59E0B', 
        icon: '🌟', 
        sortOrder: 5 
      },
      { 
        name: 'RELATIONSHIPS', 
        description: 'Friendship, family, and romantic relationships', 
        color: '#EC4899', 
        icon: '❤️', 
        sortOrder: 6 
      },
      { 
        name: 'EDUCATION', 
        description: 'Learning, career guidance, and academic success', 
        color: '#6366F1', 
        icon: '📚', 
        sortOrder: 7 
      }
    ];

    let createdCategories = 0;
    
    for (const categoryData of defaultCategories) {
      try {
        const existing = await Category.findOne({ name: categoryData.name });
        if (!existing) {
          await Category.create(categoryData);
          createdCategories++;
          console.log(`   ✅ Created: ${categoryData.name}`);
        } else {
          console.log(`   ℹ️  Exists: ${categoryData.name}`);
        }
      } catch (error) {
        console.log(`   ❌ Failed: ${categoryData.name} - ${error.message}`);
      }
    }

    console.log(`📂 ${createdCategories} categories created`);

    // 3. Create uploads directory
    console.log('📁 Setting up uploads directory...');
    const fs = require('fs').promises;
    const path = require('path');
    
    const uploadsDir = path.join(__dirname, '../uploads/articles');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      console.log('✅ Uploads directory created');
    } catch (error) {
      console.log('ℹ️  Uploads directory already exists');
    }

    console.log('\n🎉 Admin setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the backend server: npm start');
    console.log('2. Login to admin panel with:');
    console.log('   Email: admin@teendom.co.ke');
    console.log('   Password: TeendomAdmin2024!');
    console.log('3. Change the default password after first login');
    console.log('4. Create additional users as needed');

    process.exit(0);
  } catch (error) {
    console.error('❌ Admin setup failed:', error);
    process.exit(1);
  }
};

// Run setup if called directly
if (require.main === module) {
  setupAdmin();
}

module.exports = setupAdmin;