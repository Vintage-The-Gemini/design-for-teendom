// File: frontend/src/components/nomination/SupportingDocumentsStep.jsx
import React, { useState, useEffect } from 'react';

const SupportingDocumentsStep = ({ 
  formData, 
  setFormData,
  handleNestedChange, 
  errors, 
  setErrors
}) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});

  // Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrls.photo) {
        URL.revokeObjectURL(previewUrls.photo);
      }
      
      Object.values(previewUrls).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  // Handle Photo Upload
  const handlePhotoUpload = async (file) => {
    if (!file) return;
    
    // Clean up previous preview URL
    if (previewUrls.photo) {
      URL.revokeObjectURL(previewUrls.photo);
    }
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, photo: 'Please select an image file (JPG, PNG, GIF)' }));
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'Image must be less than 10MB' }));
      return;
    }
    
    try {
      setUploadProgress(prev => ({ ...prev, photo: 0 }));
      
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrls(prev => ({ ...prev, photo: previewUrl }));
      
      handleNestedChange('nominee', 'photoFile', file);
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadProgress(prev => ({ ...prev, photo: progress }));
        
        if (progress >= 100) {
          clearInterval(interval);
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.photo;
            return newErrors;
          });
          
          setTimeout(() => {
            setUploadProgress(prev => ({ ...prev, photo: undefined }));
          }, 2000);
        }
      }, 200);
      
    } catch (error) {
      setErrors(prev => ({ ...prev, photo: 'Failed to prepare image for upload' }));
      setUploadProgress(prev => ({ ...prev, photo: 0 }));
    }
  };

  // Handle Supporting Files Upload
  const handleSupportingFilesUpload = async (files) => {
    const fileArray = Array.from(files);
    const currentFiles = formData.supportingFiles;
    
    if (currentFiles.length + fileArray.length > 5) {
      setErrors(prev => ({ 
        ...prev, 
        supportingFiles: 'Maximum 5 supporting files allowed' 
      }));
      return;
    }
    
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
      
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          supportingFiles: `${file.name} is too large (max 10MB)` 
        }));
        continue;
      }
      
      validFiles.push(file);
    }
    
    if (validFiles.length === 0) return;
    
    const processedFiles = [];
    
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const fileKey = `supportingFile_${Date.now()}_${i}`;
      
      try {
        setUploadProgress(prev => ({ ...prev, [fileKey]: 0 }));
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 25;
          setUploadProgress(prev => ({ ...prev, [fileKey]: Math.min(progress, 100) }));
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[fileKey];
                return newProgress;
              });
            }, 1000);
          }
        }, 150);
        
        processedFiles.push({
          file: file,
          originalName: file.name,
          mimetype: file.type,
          size: file.size,
          uploadDate: new Date().toISOString(),
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
        });
        
      } catch (error) {
        setErrors(prev => ({ 
          ...prev, 
          supportingFiles: `Failed to prepare ${file.name} for upload` 
        }));
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileKey];
          return newProgress;
        });
      }
    }
    
    if (processedFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        supportingFiles: [...prev.supportingFiles, ...processedFiles]
      }));
      
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.supportingFiles;
        return newErrors;
      });
    }
  };

  // Remove Supporting File
  const removeSupportingFile = (index) => {
    const fileToRemove = formData.supportingFiles[index];
    
    if (fileToRemove.preview && fileToRemove.preview.startsWith('blob:')) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    setFormData(prev => ({
      ...prev,
      supportingFiles: prev.supportingFiles.filter((_, i) => i !== index)
    }));
  };

  // Remove Photo
  const removePhoto = () => {
    if (previewUrls.photo) {
      URL.revokeObjectURL(previewUrls.photo);
      setPreviewUrls(prev => ({ ...prev, photo: null }));
    }
    
    handleNestedChange('nominee', 'photoFile', null);
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
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">📁 Supporting Documents</h3>
        <p className="text-gray-600">Upload nominee photo and supporting materials</p>
      </div>
      
      {/* Required Nominee Photo */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📷 Nominee Photo (Required)</h4>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {formData.nominee.photoFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                {previewUrls.photo && (
                  <img
                    src={previewUrls.photo}
                    alt="Nominee preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                )}
                <div className="text-left">
                  <p className="font-medium text-gray-900">{formData.nominee.photoFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(formData.nominee.photoFile.size)}
                  </p>
                  {uploadProgress.photo !== undefined && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress.photo}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Preparing... {uploadProgress.photo}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={removePhoto}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove Photo
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📷</div>
              <label htmlFor="nominee-photo" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload Nominee Photo
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  Click to select or drag and drop
                </span>
                <span className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Choose Photo
                </span>
                <input
                  id="nominee-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e.target.files[0])}
                  className="sr-only"
                  required
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 10MB</p>
            </div>
          )}
        </div>
        
        {errors.photo && (
          <p className="text-red-600 text-sm">{errors.photo}</p>
        )}
      </div>

      {/* Supporting Files */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📎 Supporting Files (Optional)</h4>
        <p className="text-sm text-gray-600">
          Upload certificates, awards, project photos, videos, or other supporting materials (Max 5 files)
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">📎</div>
          <label htmlFor="supportingFiles" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Upload Supporting Files
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              PDF, Word, Images, Videos up to 10MB each (Max 5 files)
            </span>
            <input
              id="supportingFiles"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi"
              onChange={(e) => handleSupportingFilesUpload(e.target.files)}
              className="sr-only"
            />
            <span className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Choose Files
            </span>
          </label>
        </div>
        
        {errors.supportingFiles && (
          <p className="text-red-600 text-sm">{errors.supportingFiles}</p>
        )}
        
        {formData.supportingFiles.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Uploaded Files:</h5>
            {formData.supportingFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(file)}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.originalName}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.preview && (
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeSupportingFile(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Social Media Links */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">🌐 Social Media & Website Links (Optional)</h4>
        <p className="text-sm text-gray-600">
          Add relevant social media profiles or websites that showcase the nominee's work
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.website || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'website', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://website.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.instagram || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'instagram', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://instagram.com/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.youtube || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'youtube', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://youtube.com/channel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Link</label>
            <input
              type="url"
              value={formData.socialMediaLinks?.other || ''}
              onChange={(e) => handleNestedChange('socialMediaLinks', 'other', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              placeholder="https://other-platform.com"
            />
          </div>
        </div>
      </div>

      {/* Storage Information */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h5 className="font-semibold text-red-800 mb-2">💾 File Storage Information:</h5>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Files are prepared locally and uploaded securely to Cloudinary when you submit</li>
          <li>• Primary storage: Cloudinary CDN for fast, optimized delivery</li>
          <li>• Backup storage: Local server files as failsafe</li>
          <li>• All uploads are encrypted and stored safely for review</li>
        </ul>
      </div>

      {/* Progress Indicator */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-800">Files Ready</span>
          <span className="text-sm text-green-600">
            {formData.nominee.photoFile ? '✅ Photo' : '❌ Photo Required'} | 
            {formData.supportingFiles.length} Supporting Files
          </span>
        </div>
        {Object.keys(uploadProgress).length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-green-600">Preparing files for submission...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportingDocumentsStep;