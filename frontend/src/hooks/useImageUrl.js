// File: frontend/src/hooks/useImageUrl.js

import { useState, useEffect } from 'react';

/**
 * Custom hook to resolve image URLs from nominations
 * WORKS WITH YOUR ACTUAL DATABASE STRUCTURE!
 * 
 * Based on your database data:
 * - nomination.nominee.photo (direct Cloudinary URL)
 * - nomination.files?.photo?.url (local URL)
 * - nomination.cloudinary?.photo?.url (if structure changes)
 */
export const useImageUrl = (nomination) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageSource, setImageSource] = useState('none');
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!nomination) {
      setImageUrl(null);
      setImageSource('none');
      setImageError(false);
      setImageLoading(false);
      return;
    }

    const resolveImageUrl = () => {
      console.log('🖼️ Resolving image for nomination:', nomination.submissionId);
      
      // ✅ PRIORITY 1: Direct photo field (THIS IS YOUR ACTUAL STRUCTURE!)
      if (nomination.nominee?.photo && nomination.nominee.photo.includes('cloudinary')) {
        console.log('✅ Using direct Cloudinary URL:', nomination.nominee.photo);
        setImageUrl(nomination.nominee.photo);
        setImageSource('cloudinary-direct');
        setImageError(false);
        setImageLoading(false);
        return;
      }

      // ✅ PRIORITY 2: Root level photo field (backup)
      if (nomination.photo && nomination.photo.includes('cloudinary')) {
        console.log('✅ Using root-level Cloudinary URL:', nomination.photo);
        setImageUrl(nomination.photo);
        setImageSource('cloudinary-root');
        setImageError(false);
        setImageLoading(false);
        return;
      }
      
      // PRIORITY 3: Cloudinary nested structure (future-proof)
      if (nomination.cloudinary?.photo?.url) {
        console.log('✅ Using nested Cloudinary URL:', nomination.cloudinary.photo.url);
        setImageUrl(nomination.cloudinary.photo.url);
        setImageSource('cloudinary-nested');
        setImageError(false);
        setImageLoading(false);
        return;
      }
      
      // PRIORITY 4: Cloudinary secure URL (HTTPS)
      if (nomination.cloudinary?.photo?.secure_url) {
        console.log('✅ Using Cloudinary HTTPS URL:', nomination.cloudinary.photo.secure_url);
        setImageUrl(nomination.cloudinary.photo.secure_url);
        setImageSource('cloudinary-secure');
        setImageError(false);
        setImageLoading(false);
        return;
      }
      
      // PRIORITY 5: Admin access URLs (currently empty but checking)
      if (nomination.adminAccessUrls?.nomineePhoto) {
        const adminUrl = nomination.adminAccessUrls.nomineePhoto;
        const fullUrl = adminUrl.startsWith('http') ? adminUrl : `http://localhost:5000${adminUrl}`;
        console.log('✅ Using admin access URL:', fullUrl);
        setImageUrl(fullUrl);
        setImageSource('admin-url');
        setImageError(false);
        setImageLoading(false);
        return;
      }
      
      // PRIORITY 6: Local server file (backup - works in development)
      if (nomination.files?.photo?.filename) {
        const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
        const localUrl = `${apiUrl}/uploads/nominations/${nomination.files.photo.filename}`;
        console.log('✅ Using local file URL:', localUrl);
        setImageUrl(localUrl);
        setImageSource('local-file');
        setImageError(false);
        setImageLoading(false);
        return;
      }
      
      // PRIORITY 7: File URL with proper base (backup)
      if (nomination.files?.photo?.url) {
        const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
        const fileUrl = nomination.files.photo.url.startsWith('http') 
          ? nomination.files.photo.url 
          : `${apiUrl}${nomination.files.photo.url}`;
        console.log('✅ Using file URL:', fileUrl);
        setImageUrl(fileUrl);
        setImageSource('file-url');
        setImageError(false);
        setImageLoading(false);
        return;
      }
      
      // ❌ NO VALID IMAGE FOUND
      console.log('❌ No valid image URL found');
      console.log('🔍 Available data paths:');
      console.log('  - nomination.nominee.photo:', nomination.nominee?.photo);
      console.log('  - nomination.photo:', nomination.photo);
      console.log('  - nomination.cloudinary:', nomination.cloudinary);
      console.log('  - nomination.files:', nomination.files);
      console.log('  - nomination.adminAccessUrls:', nomination.adminAccessUrls);
      
      setImageUrl(null);
      setImageSource('none');
      setImageError(true);
      setImageLoading(false);
    };

    resolveImageUrl();
  }, [nomination]);

  return {
    imageUrl,
    imageSource,
    imageError,
    imageLoading,
    hasImage: !!imageUrl
  };
};

/**
 * Simple function version for components that don't need reactive updates
 */
export const getImageUrl = (nomination) => {
  if (!nomination) return null;
  
  console.log('🖼️ Resolving image for nomination:', nomination.submissionId);
  
  // ✅ PRIORITY 1: Direct photo field (YOUR ACTUAL STRUCTURE!)
  if (nomination.nominee?.photo && nomination.nominee.photo.includes('cloudinary')) {
    console.log('✅ Using direct Cloudinary URL:', nomination.nominee.photo);
    return nomination.nominee.photo;
  }

  // ✅ PRIORITY 2: Root level photo field (backup)
  if (nomination.photo && nomination.photo.includes('cloudinary')) {
    console.log('✅ Using root-level Cloudinary URL:', nomination.photo);
    return nomination.photo;
  }
  
  // PRIORITY 3: Cloudinary nested structure (future-proof)
  if (nomination.cloudinary?.photo?.url) {
    console.log('✅ Using nested Cloudinary URL:', nomination.cloudinary.photo.url);
    return nomination.cloudinary.photo.url;
  }
  
  // PRIORITY 4: Cloudinary secure URL (HTTPS)
  if (nomination.cloudinary?.photo?.secure_url) {
    console.log('✅ Using Cloudinary HTTPS URL:', nomination.cloudinary.photo.secure_url);
    return nomination.cloudinary.photo.secure_url;
  }
  
  // PRIORITY 5: Admin access URLs
  if (nomination.adminAccessUrls?.nomineePhoto) {
    const adminUrl = nomination.adminAccessUrls.nomineePhoto;
    const fullUrl = adminUrl.startsWith('http') ? adminUrl : `http://localhost:5000${adminUrl}`;
    console.log('✅ Using admin access URL:', fullUrl);
    return fullUrl;
  }
  
  // PRIORITY 6: Local server file
  if (nomination.files?.photo?.filename) {
    const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
    const localUrl = `${apiUrl}/uploads/nominations/${nomination.files.photo.filename}`;
    console.log('✅ Using local file URL:', localUrl);
    return localUrl;
  }
  
  // PRIORITY 7: File URL with proper base
  if (nomination.files?.photo?.url) {
    const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
    const fileUrl = nomination.files.photo.url.startsWith('http') 
      ? nomination.files.photo.url 
      : `${apiUrl}${nomination.files.photo.url}`;
    console.log('✅ Using file URL:', fileUrl);
    return fileUrl;
  }
  
  // ❌ NO VALID IMAGE FOUND
  console.log('❌ No valid image URL found');
  return null;
};