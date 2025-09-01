// File: frontend/src/utils/imageUtils.js

export const resolveImageUrl = (nomination) => {
  if (!nomination) return null;
  
  console.log('🔍 Resolving image URL for nomination:', nomination.submissionId);
  
  // Priority 1: Direct photo field (Cloudinary URL)
  if (nomination.nominee?.photo && nomination.nominee.photo.includes('cloudinary')) {
    console.log('✅ Using Cloudinary URL:', nomination.nominee.photo);
    return nomination.nominee.photo;
  }

  // Priority 2: Root level photo field
  if (nomination.photo && nomination.photo.includes('cloudinary')) {
    console.log('✅ Using root-level Cloudinary URL:', nomination.photo);
    return nomination.photo;
  }
  
  // Priority 3: Admin access URLs
  if (nomination.adminAccessUrls?.nomineePhoto) {
    const adminUrl = nomination.adminAccessUrls.nomineePhoto;
    const apiBaseUrl = 'https://design-for-teendom-backend.onrender.com';
    const fullUrl = adminUrl.startsWith('http') ? adminUrl : `${apiBaseUrl}${adminUrl}`;
    console.log('✅ Using admin access URL:', fullUrl);
    return fullUrl;
  }
  
  // Priority 4: Local file with API base
  if (nomination.files?.photo?.filename) {
    const apiBaseUrl = 'https://design-for-teendom-backend.onrender.com';
    const localUrl = `${apiBaseUrl}/uploads/nominations/${nomination.files.photo.filename}`;
    console.log('✅ Using local file URL:', localUrl);
    return localUrl;
  }
  
  console.log('❌ No valid image URL found');
  return null;
};