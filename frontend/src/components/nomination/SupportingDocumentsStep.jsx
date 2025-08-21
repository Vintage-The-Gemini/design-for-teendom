// File: frontend/src/components/nomination/SupportingDocumentsStep.jsx
import React, { useState } from 'react';

const SupportingDocumentsStep = ({ 
  formData, 
  setFormData,
  handleNestedChange, 
  errors, 
  setErrors
}) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});

  // Real Cloudinary Upload Function
  const uploadToCloudinary = async (file, onProgress) => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    formDataUpload.append('folder', 'teendom-awards/nominations');
    
    try {
      // Create XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        // Track upload progress
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable && onProgress) {
            const percentComplete = (e.loaded / e.total) * 100;
            onProgress(percentComplete);
          }
        });
        
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve({
              url: response.secure_url,
              publicId: response.public_id,
              originalName: file.name,
              size: file.size,
              mimetype: file.type
            });
          } else {
            reject(new Error('Upload failed'));
          }
        });
        
        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'));
        });
        
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`);
        xhr.send(formDataUpload);
      });
      
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Failed to upload file');
    }
  };

  // Handle Photo Upload with Real Cloudinary
  const handlePhotoUpload = async (file) => {
    if (!file) return;
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, photo: 'Please select an image file (JPG, PNG, GIF)' }));
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setErrors(prev => ({ ...prev, photo: 'Image must be less than 10MB' }));
      return;
    }
    
    try {
      // Start upload progress
      setUploadProgress(prev => ({ ...prev, photo: 0 }));
      
      // Upload to Cloudinary with progress tracking
      const result = await uploadToCloudinary(file, (progress) => {
        setUploadProgress(prev => ({ ...prev, photo: Math.round(progress) }));
      });
      
      // Store Cloudinary result
      handleNestedChange('nominee', 'photo', result.url);
      handleNestedChange('nominee', 'photoPublicId', result.publicId);
      handleNestedChange('nominee', 'photoFile', null); // Clear local file
      
      setUploadProgress(prev => ({ ...prev, photo: 100 }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.photo;
        return newErrors;
      });
      
      // Show success message
      setTimeout(() => {
        setUploadProgress(prev => ({ ...prev, photo: undefined }));
      }, 2000);
      
    } catch (error) {
      setErrors(prev => ({ ...prev, photo: 'Failed to upload image to cloud storage' }));
      setUploadProgress(prev => ({ ...prev, photo: 0 }));
    }
  };

  // Handle Supporting Files Upload with Real Cloudinary
  const handleSupportingFilesUpload = async (files) => {
    const fileArray = Array.from(files);
    const currentFiles = formData.supportingFiles;
    
    // Check total file limit (5 files max)
    if (currentFiles.length + fileArray.length > 5) {
      setErrors(prev => ({ 
        ...prev, 
        supportingFiles: 'Maximum 5 supporting files allowed' 
      }));
      return;
    }
    
    // Validate each file
    const validFiles = [];
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo'
    ];
    
    for (const file of fileArray) {
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          supportingFiles: `${file.name} is not a valid file type. Allowed: PDF, Word, Images, Videos` 
        }));
        continue;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors(prev => ({ 
          ...prev, 
          supportingFiles: `${file.name} is too large (max 10MB)` 
        }));
        continue;
      }
      
      validFiles.push(file);
    }
    
    if (validFiles.length === 0) return;
    
    // Upload each valid file to Cloudinary
    const uploadPromises = validFiles.map(async (file, index) => {
      const fileKey = `supportingFile_${Date.now()}_${index}`;
      
      try {
        setUploadProgress(prev => ({ ...prev, [fileKey]: 0 }));
        
        const result = await uploadToCloudinary(file, (progress) => {
          setUploadProgress(prev => ({ ...prev, [fileKey]: Math.round(progress) }));
        });
        
        setUploadProgress(prev => ({ ...prev, [fileKey]: 100 }));
        
        // Clean up progress after 2 seconds
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileKey];
            return newProgress;
          });
        }, 2000);
        
        return {
          originalName: file.name,
          cloudinaryUrl: result.url,
          publicId: result.publicId,
          mimetype: file.type,
          size: file.size,
          uploadDate: new Date().toISOString()
        };
        
      } catch (error) {
        setErrors(prev => ({ 
          ...prev, 
          supportingFiles: `Failed to upload ${file.name}` 
        }));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileKey];
          return newProgress;
        });
        return null;
      }
    });
    
    // Wait for all uploads to complete
    const uploadedFiles = await Promise.all(uploadPromises);
    const successfulUploads = uploadedFiles.filter(file => file !== null);
    
    if (successfulUploads.length > 0) {
      setFormData(prev => ({
        ...prev,
        supportingFiles: [...prev.supportingFiles, ...successfulUploads]
      }));
      
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.supportingFiles;
        return newErrors;
      });
    }
  };

  // Remove Supporting File from Cloudinary
  const removeSupportingFile = async (index) => {
    const fileToRemove = formData.supportingFiles[index];
    
    // Optionally delete from Cloudinary (you might want to keep files for admin review)
    // This would require a backend endpoint to delete files
    // try {
    //   await fetch(`/api/admin/files/${fileToRemove.publicId}`, { method: 'DELETE' });
    // } catch (error) {
    //   console.error('Failed to delete file from Cloudinary:', error);
    // }
    
    setFormData(prev => ({
      ...prev,
      supportingFiles: prev.supportingFiles.filter((_, i) => i !== index)
    }));
  };

  // Remove Photo from Cloudinary
  const removePhoto = () => {
    // Clear photo data
    handleNestedChange('nominee', 'photo', null);
    handleNestedChange('nominee', 'photoPublicId', null);
    
    // Clear any local preview URLs
    if (previewUrls.photo) {
      URL.revokeObjectURL(previewUrls.photo);
      setPreviewUrls(prev => ({ ...prev, photo: null }));
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file type icon
  const getFileIcon = (file) => {
    if (file.mimetype?.startsWith('image/')) return '🖼️';
    if (file.mimetype?.startsWith('video/')) return '🎥';
    if (file.mimetype?.includes('pdf')) return '📄';
    if (file.mimetype?.includes('word')) return '📝';
    return '📎';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">📁 Supporting Documents & Images</h3>
      
      {/* Required Nominee Photo */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📷 Nominee Photo (Required)</h4>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {formData.nominee.photo ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img 
                  src={formData.nominee.photo} 
                  alt="Nominee" 
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-green-600 font-medium">✅ Photo uploaded successfully to cloud storage</p>
              {uploadProgress.photo !== undefined && uploadProgress.photo < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress.photo}%` }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-1">Uploading... {uploadProgress.photo}%</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-gray-400">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <label className="cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    Click to upload nominee photo or drag and drop
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e.target.files[0])}
                    className="hidden"
                    required
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB - Will be stored securely in cloud
                </p>
              </div>
            </div>
          )}
        </div>
        
        {errors.photo && (
          <p className="text-red-500 text-sm mt-2">❌ {errors.photo}</p>
        )}
      </div>

      {/* Supporting Files */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📎 Supporting Files (Optional)</h4>
        <p className="text-sm text-gray-600">
          Upload certificates, photos, videos, or other documents that support the nomination (max 5 files)
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center space-y-4">
            <div className="text-gray-400">
              <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M16 4v12m0-12l4 4m-4-4L12 8m20 4v12m0-12l4 4m-4-4l-4 4M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <label className="cursor-pointer">
                <span className="text-sm font-medium text-gray-700">
                  Click to upload files or drag and drop
                </span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
                  onChange={(e) => handleSupportingFilesUpload(e.target.files)}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                PDF, Word docs, Images, Videos up to 10MB each - Secure cloud storage
              </p>
            </div>
          </div>
        </div>

        {/* Display uploaded files */}
        {formData.supportingFiles.length > 0 && (
          <div className="space-y-2">
            <h5 className="font-medium text-gray-700">Uploaded Files ({formData.supportingFiles.length}/5):</h5>
            {formData.supportingFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(file)}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.originalName}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)} • Uploaded to cloud</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSupportingFile(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Show upload progress for files */}
        {Object.keys(uploadProgress).filter(key => key.startsWith('supportingFile_')).map(key => (
          <div key={key} className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress[key]}%` }}
            ></div>
            <p className="text-xs text-gray-600 mt-1">Uploading file... {uploadProgress[key]}%</p>
          </div>
        ))}

        {errors.supportingFiles && (
          <p className="text-red-500 text-sm mt-2">❌ {errors.supportingFiles}</p>
        )}
      </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">🔗 Social Media & Online Presence (Optional)</h4>
        <p className="text-sm text-gray-600">
          Add links to social media accounts or online content that showcases the nominee's achievements
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">📱 Instagram</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.instagram || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'instagram', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://instagram.com/username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">🐦 Twitter</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.twitter || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'twitter', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://twitter.com/username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">💼 LinkedIn</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.linkedin || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'linkedin', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">🎥 YouTube</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.youtube || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'youtube', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://youtube.com/channel/..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">🎵 TikTok</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.tiktok || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'tiktok', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://tiktok.com/@username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">🌐 Other Website/Portfolio</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.other || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'other', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://website.com"
            />
          </div>
        </div>
      </div>

      {/* Cloud Storage Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h5 className="font-semibold text-green-800 mb-2">☁️ Secure Cloud Storage:</h5>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• All files are uploaded to secure cloud storage (Cloudinary)</li>
          <li>• Files are automatically optimized and backed up</li>
          <li>• Your data is encrypted and safely stored</li>
          <li>• Files will be accessible to admin and judges for review</li>
        </ul>
      </div>

      {/* File Upload Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">📋 File Upload Guidelines:</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>Nominee Photo:</strong> Required - Clear, recent photo of the nominee</li>
          <li>• <strong>Supporting Files:</strong> Optional but recommended for stronger nominations</li>
          <li>• <strong>Accepted Formats:</strong> PDF, Word docs, Images (JPG/PNG/GIF), Videos (MP4/MOV)</li>
          <li>• <strong>File Size Limit:</strong> Maximum 10MB per file</li>
          <li>• <strong>Total Files:</strong> Up to 5 supporting files + 1 nominee photo</li>
          <li>• <strong>Recommended Content:</strong> Certificates, awards, project photos, videos of achievements</li>
          <li>• <strong>Upload Time:</strong> Large files may take a few moments to upload</li>
        </ul>
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-800">Upload Progress</span>
          <span className="text-sm text-blue-600">
            {formData.nominee.photo ? '✅ Photo' : '❌ Photo'} | 
            {formData.supportingFiles.length} Supporting Files
          </span>
        </div>
        {Object.keys(uploadProgress).length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-blue-600">Uploading files to secure cloud storage...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportingDocumentsStep;