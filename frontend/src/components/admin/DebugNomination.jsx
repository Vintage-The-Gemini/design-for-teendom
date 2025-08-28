// File: frontend/src/components/admin/DebugNomination.jsx
// Temporary component to debug nomination data structure

import React from 'react';

const DebugNomination = ({ nomination }) => {
  if (!nomination) return null;

  console.log('🐛 FULL NOMINATION DATA:', JSON.stringify(nomination, null, 2));

  return (
    <div className="fixed top-0 right-0 w-96 h-screen bg-black bg-opacity-90 text-white p-4 overflow-auto text-xs z-50">
      <h3 className="text-lg font-bold mb-4">Debug: Nomination Data</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-yellow-400">Submission ID:</h4>
          <p>{nomination.submissionId}</p>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400">Files Structure:</h4>
          <pre className="bg-gray-800 p-2 rounded">
            {JSON.stringify(nomination.files, null, 2)}
          </pre>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400">Cloudinary Structure:</h4>
          <pre className="bg-gray-800 p-2 rounded">
            {JSON.stringify(nomination.cloudinary, null, 2)}
          </pre>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400">Admin Access URLs:</h4>
          <pre className="bg-gray-800 p-2 rounded">
            {JSON.stringify(nomination.adminAccessUrls, null, 2)}
          </pre>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400">Nominee Location:</h4>
          <pre className="bg-gray-800 p-2 rounded">
            {JSON.stringify(nomination.nominee?.location, null, 2)}
          </pre>
        </div>

        <div>
          <h4 className="font-bold text-yellow-400">All Image URLs Found:</h4>
          <div className="space-y-1">
            {nomination.cloudinary?.photo?.url && (
              <p className="text-green-400">☁️ Cloudinary: {nomination.cloudinary.photo.url}</p>
            )}
            {nomination.adminAccessUrls?.nomineePhoto && (
              <p className="text-blue-400">🔗 Admin URL: {nomination.adminAccessUrls.nomineePhoto}</p>
            )}
            {nomination.files?.photo?.filename && (
              <p className="text-yellow-400">📁 Local: /uploads/nominations/{nomination.files.photo.filename}</p>
            )}
            {nomination.files?.photo?.url && (
              <p className="text-purple-400">🔗 File URL: {nomination.files.photo.url}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugNomination;