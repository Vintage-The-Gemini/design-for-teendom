// File path: backend/fix-atlas-blob-urls.js

require('dotenv').config();
const mongoose = require('mongoose');

// Use the same connection string as your server
const MONGODB_URI = process.env.MONGODB_URI || 'your-atlas-connection-string-here';

console.log('Connecting to Atlas database...');
console.log('URI:', MONGODB_URI ? 'Found' : 'Missing');

async function fixBlobUrls() {
  try {
    // Connect using your Atlas URI
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Import your nomination model
    const Nomination = require('./models/Nomination');
    
    // Find all nominations with blob URLs
    const nominations = await Nomination.find({
      'nominee.photo': { $regex: /^blob:/ }
    });
    
    console.log(`Found ${nominations.length} nominations with blob URLs`);
    
    if (nominations.length === 0) {
      console.log('No nominations need fixing');
      return;
    }
    
    let fixed = 0;
    
    for (const nomination of nominations) {
      try {
        const submissionId = nomination.submissionId;
        const timestamp = submissionId.split('-')[1];
        
        // Construct the real Cloudinary URL
        const cloudinaryUrl = `https://res.cloudinary.com/dbidxxqxr/image/upload/v${timestamp}/teendom-awards/nominees/nominee-${submissionId}-${timestamp}.jpg`;
        
        console.log(`Fixing ${submissionId}:`);
        console.log(`  Old: ${nomination.nominee.photo}`);
        console.log(`  New: ${cloudinaryUrl}`);
        
        // Update the nomination
        await Nomination.updateOne(
          { _id: nomination._id },
          {
            $set: {
              'nominee.photo': cloudinaryUrl,
              'cloudinary.photo': {
                url: cloudinaryUrl,
                publicId: `teendom-awards/nominees/nominee-${submissionId}-${timestamp}`,
                cloudinary: true
              },
              'adminAccessUrls.nomineePhoto': cloudinaryUrl
            }
          }
        );
        
        fixed++;
        console.log(`  Status: FIXED`);
        
      } catch (error) {
        console.error(`Failed to fix ${nomination.submissionId}:`, error.message);
      }
    }
    
    console.log(`\nCompleted: Fixed ${fixed} out of ${nominations.length} nominations`);
    
    // Verify
    const stillBroken = await Nomination.find({
      'nominee.photo': { $regex: /^blob:/ }
    });
    
    console.log(`Remaining blob URLs: ${stillBroken.length}`);
    
    if (stillBroken.length === 0) {
      console.log('SUCCESS: All blob URLs have been fixed!');
    }
    
  } catch (error) {
    console.error('Migration failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected');
  }
}

fixBlobUrls();