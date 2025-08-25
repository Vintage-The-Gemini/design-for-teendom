// File: frontend/src/components/nomination/ConsentDeclarationStep.jsx
import React from 'react';

const ConsentDeclarationStep = ({ 
  formData, 
  setFormData, 
  handleNestedChange, 
  errors, 
  setErrors 
}) => {

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">✅ Consent & Declarations</h3>
        <p className="text-gray-600">Please read and agree to the following terms and conditions</p>
      </div>

      {/* Legal Declarations */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">📜 Required Declarations</h4>
        
        {/* Accurate Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent?.accurateInfo || false}
              onChange={(e) => handleNestedChange('consent', 'accurateInfo', e.target.checked)}
              className="mt-1 h-5 w-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
              required
            />
            <div>
              <span className="font-semibold text-gray-800">Accuracy Declaration *</span>
              <p className="text-sm text-gray-600 mt-1">
                I declare that all information provided in this nomination is true, accurate, and complete to the best of my knowledge. 
                I understand that providing false information may result in disqualification.
              </p>
            </div>
          </label>
        </div>

        {/* Data Usage Consent */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent?.dataUsage || false}
              onChange={(e) => handleNestedChange('consent', 'dataUsage', e.target.checked)}
              className="mt-1 h-5 w-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
              required
            />
            <div>
              <span className="font-semibold text-gray-800">Data Usage Consent *</span>
              <p className="text-sm text-gray-600 mt-1">
                I consent to the collection, processing, and storage of the provided information for the purposes of the Teendom Awards. 
                This includes sharing nomination details with judges and administrators as necessary for the evaluation process.
              </p>
            </div>
          </label>
        </div>

        {/* Public Recognition Consent */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent?.publicRecognition || false}
              onChange={(e) => handleNestedChange('consent', 'publicRecognition', e.target.checked)}
              className="mt-1 h-5 w-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
              required
            />
            <div>
              <span className="font-semibold text-gray-800">Public Recognition Consent *</span>
              <p className="text-sm text-gray-600 mt-1">
                I consent to the nominee's name, photo, and achievements being published on the Teendom website, social media, 
                and other promotional materials if they become a finalist or winner.
              </p>
            </div>
          </label>
        </div>

        {/* Background Check Consent */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent?.backgroundCheck || false}
              onChange={(e) => handleNestedChange('consent', 'backgroundCheck', e.target.checked)}
              className="mt-1 h-5 w-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
              required
            />
            <div>
              <span className="font-semibold text-gray-800">Background Verification Consent *</span>
              <p className="text-sm text-gray-600 mt-1">
                I consent to Teendom conducting reasonable background checks and verification of the achievements 
                and information provided in this nomination.
              </p>
            </div>
          </label>
        </div>

        {/* CRITICAL: Nominee Permission Consent - THIS WAS MISSING! */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent?.nomineePermission || false}
              onChange={(e) => handleNestedChange('consent', 'nomineePermission', e.target.checked)}
              className="mt-1 h-5 w-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
              required
            />
            <div>
              <span className="font-semibold text-gray-800">Nominee Permission Consent *</span>
              <p className="text-sm text-gray-600 mt-1">
                I confirm that I have the nominee's permission to submit this nomination, and that the nominee 
                is aware of and consents to being nominated for this award.
              </p>
            </div>
          </label>
        </div>

        {/* Anti-Fraud Declaration */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent?.antifraud || false}
              onChange={(e) => handleNestedChange('consent', 'antifraud', e.target.checked)}
              className="mt-1 h-5 w-5 text-red-500 rounded focus:ring-2 focus:ring-red-500"
              required
            />
            <div>
              <span className="font-semibold text-gray-800">Anti-Fraud Declaration *</span>
              <p className="text-sm text-gray-600 mt-1">
                I declare that this nomination is submitted in good faith and is not part of any fraudulent, 
                malicious, or coordinated effort to manipulate the awards process.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-800 mb-3">📄 Terms and Conditions Summary:</h5>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Submission:</strong> By submitting this form, you acknowledge that you have read and agree to the Teendom Awards terms and conditions.</p>
          <p><strong>Evaluation:</strong> All nominations will be reviewed by a panel of qualified judges. Their decisions are final.</p>
          <p><strong>Timeline:</strong> The evaluation process may take several weeks. You will be notified of the outcome via email.</p>
          <p><strong>Contact:</strong> You may be contacted for additional information or clarification during the review process.</p>
          <p><strong>Awards Ceremony:</strong> Finalists and winners will be invited to attend the awards ceremony in December 2025.</p>
        </div>
      </div>

      {/* Final Validation Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2">📊 Consent Status:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className={`flex items-center space-x-2 ${formData.consent?.accurateInfo ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.consent?.accurateInfo ? '✅' : '❌'}</span>
            <span>Accuracy Declaration</span>
          </div>
          <div className={`flex items-center space-x-2 ${formData.consent?.dataUsage ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.consent?.dataUsage ? '✅' : '❌'}</span>
            <span>Data Usage Consent</span>
          </div>
          <div className={`flex items-center space-x-2 ${formData.consent?.publicRecognition ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.consent?.publicRecognition ? '✅' : '❌'}</span>
            <span>Public Recognition</span>
          </div>
          <div className={`flex items-center space-x-2 ${formData.consent?.backgroundCheck ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.consent?.backgroundCheck ? '✅' : '❌'}</span>
            <span>Background Check</span>
          </div>
          <div className={`flex items-center space-x-2 ${formData.consent?.nomineePermission ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.consent?.nomineePermission ? '✅' : '❌'}</span>
            <span>Nominee Permission</span>
          </div>
          <div className={`flex items-center space-x-2 ${formData.consent?.antifraud ? 'text-green-600' : 'text-red-500'}`}>
            <span>{formData.consent?.antifraud ? '✅' : '❌'}</span>
            <span>Anti-Fraud Declaration</span>
          </div>
        </div>
        
        {/* Show submission readiness */}
        <div className="mt-3 pt-3 border-t border-blue-200">
          {Object.values(formData.consent || {}).every(value => value === true) ? (
            <p className="text-green-600 font-semibold">🎉 All consent requirements completed - Ready to submit!</p>
          ) : (
            <p className="text-red-500 font-semibold">⚠️ Please complete all required consent declarations</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h5 className="font-semibold text-green-800 mb-2">📞 Need Help?</h5>
        <p className="text-sm text-green-700">
          If you have questions about this nomination or the terms and conditions, 
          please contact us at <strong>awards@teendom.co.ke</strong> or call <strong>+254 XXX XXX XXX</strong>.
        </p>
      </div>
    </div>
  );
};

export default ConsentDeclarationStep;