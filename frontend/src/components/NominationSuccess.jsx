// File: frontend/src/components/NominationSuccess.jsx
import React from 'react';
import { CheckCircle, Download, Eye, Home } from 'lucide-react';

const NominationSuccess = ({ submissionData, onClose }) => {
  // Extract the actual URLs from submission response
  const cloudinaryPhoto = submissionData?.data?.files?.photo?.cloudinary;
  const localPhoto = submissionData?.data?.files?.photo?.local;
  const supportingFilesCloudinary = submissionData?.data?.files?.supportingFiles?.cloudinary || 0;
  const supportingFilesLocal = submissionData?.data?.files?.supportingFiles?.local || 0;
  
  // Use Cloudinary URL first, fallback to local
  const displayPhotoUrl = cloudinaryPhoto || (localPhoto ? `/uploads/nominations/${localPhoto}` : null);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              🎉 Nomination Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Your nomination has been received and saved to our database
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="font-semibold text-green-800">
                Submission ID: <span className="font-mono">{submissionData?.submissionId}</span>
              </p>
            </div>
          </div>

          {/* Photo Display - FIXED */}
          {displayPhotoUrl && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📸 Nominee Photo</h3>
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={displayPhotoUrl}
                      alt="Uploaded nominee photo"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                      onError={(e) => {
                        console.error('Image load error:', e.target.src);
                        // Try local backup
                        if (localPhoto && !e.target.src.includes('/uploads/')) {
                          e.target.src = `/uploads/nominations/${localPhoto}`;
                        } else {
                          // Hide image and show error
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div 
                      className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 items-center justify-center flex-col text-gray-500 text-sm hidden"
                    >
                      <span>Image not available</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      Nominee Photo Successfully Uploaded
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Uploaded on {formatDate(new Date())}
                      {cloudinaryPhoto && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          ☁️ Cloudinary
                        </span>
                      )}
                    </p>
                    
                    {/* Debug info - SHOWS ACTUAL URLS */}
                    <div className="text-xs text-gray-500 mb-3 p-2 bg-yellow-50 rounded">
                      <strong>Storage Info:</strong><br/>
                      <strong>Cloudinary:</strong> {cloudinaryPhoto ? '✅ Success' : '❌ Not found'}<br/>
                      <strong>Local Backup:</strong> {localPhoto ? '✅ Success' : '❌ Not found'}<br/>
                      <strong>Display URL:</strong> {displayPhotoUrl}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <a 
                        href={displayPhotoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Full Size
                      </a>
                      <a 
                        href={displayPhotoUrl}
                        download
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm transition-colors"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Storage Status */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Storage Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-900">Database</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    submissionData?.data?.storage?.mongodb 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {submissionData?.data?.storage?.mongodb ? '✅ Saved' : '❌ Failed'}
                  </span>
                </div>
                {submissionData?.data?.storage?.mongoId && (
                  <p className="text-xs text-blue-600 mt-1 font-mono">
                    ID: {submissionData.data.storage.mongoId}
                  </p>
                )}
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-purple-900">Cloudinary</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    cloudinaryPhoto 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {cloudinaryPhoto ? '✅ Uploaded' : '⚠️ Local Only'}
                  </span>
                </div>
                <p className="text-xs text-purple-600 mt-1">
                  Photo + {supportingFilesCloudinary} supporting files
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-900">Local Backup</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    submissionData?.data?.storage?.fileBackup 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {submissionData?.data?.storage?.fileBackup ? '✅ Saved' : '❌ Failed'}
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Photo + {supportingFilesLocal} supporting files
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-yellow-900">Status</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {submissionData?.data?.status || 'Submitted'}
                  </span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  Ready for admin review
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Next Steps</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <ol className="list-decimal list-inside space-y-2 text-blue-800">
                <li>Your nomination will be reviewed by our admin team</li>
                <li>Approved nominations will be sent to judges for evaluation</li>
                <li>Finalists will be contacted directly via email</li>
                <li>Public voting opens for finalists in November 2025</li>
                <li>Awards ceremony on December 6, 2025</li>
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onClose}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Return to Home</span>
            </button>
            
            <button 
              onClick={() => {
                const submissionText = `
Teendom Awards 2025 - Nomination Submitted Successfully!

Submission ID: ${submissionData?.submissionId}
Date: ${formatDate(new Date())}
Status: ${submissionData?.data?.status || 'Submitted'}

Storage Status:
- Database: ${submissionData?.data?.storage?.mongodb ? '✅ Saved' : '❌ Failed'}
- Cloudinary: ${cloudinaryPhoto ? '✅ Uploaded' : '⚠️ Local Only'}
- Local Backup: ${submissionData?.data?.storage?.fileBackup ? '✅ Saved' : '❌ Failed'}

Keep this confirmation for your records.
                `.trim();
                
                navigator.clipboard.writeText(submissionText).then(() => {
                  alert('✅ Confirmation details copied to clipboard!');
                });
              }}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              📋 Copy Confirmation Details
            </button>
          </div>

          {/* Debug Panel - Remove in production */}
          {process.env.REACT_APP_DEBUG_MODE === 'true' && (
            <details className="mt-8">
              <summary className="cursor-pointer text-gray-500 text-sm mb-2">
                🛠️ Debug Information (Development Only)
              </summary>
              <div className="bg-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                <strong>Full Response Data:</strong>
                <pre>{JSON.stringify(submissionData, null, 2)}</pre>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

export default NominationSuccess;