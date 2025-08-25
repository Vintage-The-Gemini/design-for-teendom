// File: backend/utils/cloudinaryUtils.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Test Cloudinary connection and configuration
 * @returns {Promise<Object>} - Connection test result
 */
const testCloudinaryConnection = async () => {
  try {
    console.log('🔍 Testing Cloudinary connection...');
    console.log('📋 Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
      api_key: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing'
    });

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Missing Cloudinary credentials in environment variables');
    }

    // Test the connection by fetching account details
    const result = await cloudinary.api.ping();
    
    console.log('✅ Cloudinary connection successful:', result);
    return {
      success: true,
      message: 'Cloudinary connected successfully',
      status: result.status || 'ok'
    };
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};

/**
 * Get Cloudinary configuration status
 * @returns {Object} - Configuration status
 */
const getCloudinaryStatus = () => {
  const hasCredentials = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
  
  return {
    configured: hasCredentials,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'Not set',
    api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set',
    ready: hasCredentials
  };
};

/**
 * Upload a file to Cloudinary
 * @param {Object} file - The file object from multer
 * @param {String} folder - Cloudinary folder name
 * @param {Object} options - Additional upload options
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadToCloudinary = async (file, folder = 'teendom-awards', options = {}) => {
  try {
    // Check if Cloudinary is properly configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary not configured - missing environment variables');
    }

    console.log('☁️ Starting Cloudinary upload...', {
      file: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      folder: folder
    });

    const defaultOptions = {
      folder: folder,
      resource_type: 'auto', // Automatically detect file type
      quality: 'auto:best', // Optimize quality
      fetch_format: 'auto', // Automatically select best format
      flags: 'progressive', // Progressive loading for images
      ...options
    };

    // For images, add additional transformations
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      defaultOptions.transformation = [
        {
          width: 1920,
          height: 1080,
          crop: 'limit', // Don't upscale, only downscale if larger
          quality: 'auto:best',
          format: 'auto'
        },
        ...(options.transformation || [])
      ];
    }

    // For videos, add video-specific options
    if (file.mimetype && file.mimetype.startsWith('video/')) {
      defaultOptions.resource_type = 'video';
      defaultOptions.transformation = [
        {
          width: 1280,
          height: 720,
          crop: 'limit',
          quality: 'auto:best',
          format: 'mp4'
        },
        ...(options.transformation || [])
      ];
    }

    const result = await cloudinary.uploader.upload(file.path, defaultOptions);
    
    console.log('✅ Cloudinary upload successful:', {
      public_id: result.public_id,
      url: result.secure_url,
      format: result.format,
      bytes: result.bytes
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      createdAt: result.created_at,
      cloudinary: true // Mark as uploaded to Cloudinary
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
};

/**
 * Delete a file from Cloudinary
 * @param {String} publicId - The public ID of the file to delete
 * @param {String} resourceType - Type of resource (image, video, raw)
 * @returns {Promise<Object>} - Deletion result
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    
    return {
      success: result.result === 'ok',
      result: result.result
    };
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
  }
};

/**
 * Get optimized URL for an image
 * @param {String} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {String} - Optimized image URL
 */
const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto:best',
    fetch_format: 'auto',
    ...options
  };

  return cloudinary.url(publicId, defaultOptions);
};

/**
 * Create multiple sizes/versions of an image
 * @param {String} publicId - The public ID of the image
 * @returns {Object} - Object with different image sizes
 */
const getImageVariations = (publicId) => {
  return {
    thumbnail: cloudinary.url(publicId, {
      width: 150,
      height: 150,
      crop: 'fill',
      quality: 'auto:best',
      fetch_format: 'auto'
    }),
    small: cloudinary.url(publicId, {
      width: 300,
      height: 300,
      crop: 'limit',
      quality: 'auto:best',
      fetch_format: 'auto'
    }),
    medium: cloudinary.url(publicId, {
      width: 600,
      height: 600,
      crop: 'limit',
      quality: 'auto:best',
      fetch_format: 'auto'
    }),
    large: cloudinary.url(publicId, {
      width: 1200,
      height: 1200,
      crop: 'limit',
      quality: 'auto:best',
      fetch_format: 'auto'
    }),
    original: cloudinary.url(publicId, {
      quality: 'auto:best',
      fetch_format: 'auto'
    })
  };
};

/**
 * Upload nominee photo with specific optimizations
 * @param {Object} file - The file object from multer
 * @param {String} nomineeId - Unique identifier for the nominee
 * @returns {Promise<Object>} - Upload result with optimized URLs
 */
const uploadNomineePhoto = async (file, nomineeId) => {
  try {
    console.log('📸 Uploading nominee photo to Cloudinary...');
    const uploadResult = await uploadToCloudinary(file, 'teendom-awards/nominees', {
      public_id: `nominee-${nomineeId}-${Date.now()}`,
      transformation: [
        {
          width: 800,
          height: 800,
          crop: 'limit',
          quality: 'auto:best',
          format: 'auto'
        }
      ]
    });

    // Generate multiple sizes for different use cases
    const variations = getImageVariations(uploadResult.publicId);

    return {
      ...uploadResult,
      variations
    };
  } catch (error) {
    console.error('❌ Failed to upload nominee photo:', error.message);
    throw new Error(`Failed to upload nominee photo: ${error.message}`);
  }
};

/**
 * Upload supporting document
 * @param {Object} file - The file object from multer
 * @param {String} nomineeId - Unique identifier for the nominee
 * @param {Number} index - File index
 * @returns {Promise<Object>} - Upload result
 */
const uploadSupportingDocument = async (file, nomineeId, index) => {
  try {
    console.log(`📁 Uploading supporting document ${index + 1} to Cloudinary...`);
    const folder = file.mimetype.startsWith('image/') 
      ? 'teendom-awards/supporting-images'
      : file.mimetype.startsWith('video/')
      ? 'teendom-awards/supporting-videos'
      : 'teendom-awards/supporting-documents';

    const uploadResult = await uploadToCloudinary(file, folder, {
      public_id: `supporting-${nomineeId}-${index}-${Date.now()}`
    });

    return uploadResult;
  } catch (error) {
    console.error(`❌ Failed to upload supporting document ${index + 1}:`, error.message);
    throw new Error(`Failed to upload supporting document: ${error.message}`);
  }
};

module.exports = {
  testCloudinaryConnection,
  getCloudinaryStatus,
  uploadToCloudinary,
  deleteFromCloudinary,
  getOptimizedImageUrl,
  getImageVariations,
  uploadNomineePhoto,
  uploadSupportingDocument
};