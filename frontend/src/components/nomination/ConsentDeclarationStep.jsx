// File: frontend/src/components/nomination/ConsentDeclarationStep.jsx
import React from 'react';

const ConsentDeclarationStep = ({ 
  formData, 
  handleNestedChange, 
  errors 
}) => {
  const isNomineeUnder18 = parseInt(formData.nominee.age) < 18;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4 text-red-600">📋 Consent & Declaration</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="text-blue-800 font-semibold mb-2">📄 Legal Requirements:</h4>
        <p className="text-sm text-blue-700">
          Before submitting your nomination, please read and agree to the following declarations. 
          All items marked with * are required for submission.
        </p>
      </div>

      {/* Nomination Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-gray-800 font-semibold mb-3">📊 Nomination Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Nominee:</strong> {formData.nominee.firstName} {formData.nominee.lastName}</p>
            <p><strong>Age:</strong> {formData.nominee.age} years old</p>
            <p><strong>Category:</strong> {formData.awardCategory}</p>
            <p><strong>County:</strong> {formData.nominee.county}</p>
          </div>
          <div>
            <p><strong>Nominator:</strong> {formData.nominator.firstName} {formData.nominator.lastName}</p>
            <p><strong>Relationship:</strong> {formData.nominator.relationship}</p>
            <p><strong>Self-nomination:</strong> {formData.nominator.isSelfNomination ? 'Yes' : 'No'}</p>
            <p><strong>Referee:</strong> {formData.referee.name}</p>
          </div>
        </div>
      </div>

      {/* Required Consents */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">Required Agreements *</h4>
        
        {/* Information Accuracy */}
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent.accurateInfo || false}
              onChange={(e) => handleNestedChange('consent', 'accurateInfo', e.target.checked)}
              className="mt-1 w-4 h-4 text-red-600"
              required
            />
            <div className="flex-1">
              <span className="text-sm font-medium">
                Information Accuracy Declaration *
              </span>
              <p className="text-xs text-gray-600 mt-1">
                I declare that all information provided in this nomination is accurate, truthful, and complete to the best of my knowledge. 
                I understand that providing false information may result in disqualification.
              </p>
            </div>
          </label>
          {errors.accurateInfo && (
            <p className="text-red-500 text-xs mt-2">{errors.accurateInfo}</p>
          )}
        </div>

        {/* Nominee Permission */}
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent.nomineePermission || false}
              onChange={(e) => handleNestedChange('consent', 'nomineePermission', e.target.checked)}
              className="mt-1 w-4 h-4 text-red-600"
              required
            />
            <div className="flex-1">
              <span className="text-sm font-medium">
                Nominee Permission *
              </span>
              <p className="text-xs text-gray-600 mt-1">
                {formData.nominator.isSelfNomination 
                  ? "I give permission for my nomination to be processed and for my information to be used in the Teendom Awards 2025."
                  : "I confirm that I have obtained permission from the nominee to submit this nomination on their behalf."
                }
              </p>
            </div>
          </label>
          {errors.nomineePermission && (
            <p className="text-red-500 text-xs mt-2">{errors.nomineePermission}</p>
          )}
        </div>

        {/* Parental Consent (if under 18) */}
        {isNomineeUnder18 && (
          <div className="border border-red-300 rounded-lg p-4 bg-red-50">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent.parentalConsent || false}
                onChange={(e) => handleNestedChange('consent', 'parentalConsent', e.target.checked)}
                className="mt-1 w-4 h-4 text-red-600"
                required
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-red-700">
                  Parental/Guardian Consent * (Required for nominees under 18)
                </span>
                <p className="text-xs text-red-600 mt-1">
                  As the parent/guardian of the nominee, or as someone with proper authority, I give consent for this minor's 
                  participation in the Teendom Awards 2025. I understand their information may be used for award purposes 
                  and promotional materials if they become a finalist or winner.
                </p>
              </div>
            </label>
            {errors.parentalConsent && (
              <p className="text-red-500 text-xs mt-2">{errors.parentalConsent}</p>
            )}
          </div>
        )}

        {/* Data Usage Consent */}
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent.dataUsage || false}
              onChange={(e) => handleNestedChange('consent', 'dataUsage', e.target.checked)}
              className="mt-1 w-4 h-4 text-red-600"
              required
            />
            <div className="flex-1">
              <span className="text-sm font-medium">
                Data Usage Agreement *
              </span>
              <p className="text-xs text-gray-600 mt-1">
                I consent to Teendom Africa using the nominee's information, photos, and achievements for the purposes of 
                the awards program, including judging, finalist announcements, and promotional materials. 
                I understand that personal data will be handled in accordance with data protection principles.
              </p>
            </div>
          </label>
          {errors.dataUsage && (
            <p className="text-red-500 text-xs mt-2">{errors.dataUsage}</p>
          )}
        </div>

        {/* Anti-fraud Declaration */}
        <div className="border border-gray-300 rounded-lg p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent.antifraud || false}
              onChange={(e) => handleNestedChange('consent', 'antifraud', e.target.checked)}
              className="mt-1 w-4 h-4 text-red-600"
              required
            />
            <div className="flex-1">
              <span className="text-sm font-medium">
                Anti-fraud Declaration *
              </span>
              <p className="text-xs text-gray-600 mt-1">
                I declare that this nomination is genuine and submitted in good faith. I understand that fraudulent 
                nominations, vote manipulation, or any other dishonest practices will result in immediate disqualification 
                and may be reported to relevant authorities.
              </p>
            </div>
          </label>
          {errors.antifraud && (
            <p className="text-red-500 text-xs mt-2">{errors.antifraud}</p>
          )}
        </div>
      </div>

      {/* Additional Terms */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">📋 Additional Terms & Conditions:</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Nominations will be reviewed by our admin team within 3-5 business days</li>
          <li>• Only complete and eligible nominations will be forwarded to judges</li>
          <li>• The judging process is confidential and decisions are final</li>
          <li>• Finalists will be contacted directly and may be asked for additional information</li>
          <li>• Winners will be announced at the awards ceremony on December 6, 2025</li>
          <li>• Teendom Africa reserves the right to use winner information for promotional purposes</li>
          <li>• No cash prizes are awarded - recognition is the primary reward</li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-semibold text-gray-700 mb-2">📞 Questions or Concerns?</h5>
        <p className="text-sm text-gray-600 mb-2">
          If you have any questions about these terms or the nomination process, please contact us:
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Email: <a href="mailto:awards@teendomafrica.org" className="text-red-600 hover:underline">awards@teendomafrica.org</a></li>
          <li>• WhatsApp: <a href="https://wa.me/254742862080" className="text-red-600 hover:underline">0742 862 080</a></li>
          <li>• Website: <a href="https://teendomafrica.org/awards" className="text-red-600 hover:underline">teendomafrica.org/awards</a></li>
        </ul>
      </div>

      {/* Submission Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-green-800 font-semibold mb-2">🚀 Ready to Submit?</h4>
        <p className="text-sm text-green-700 mb-3">
          By clicking "Submit Nomination" below, you confirm that:
        </p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>✓ All information provided is accurate and complete</li>
          <li>✓ You have obtained all necessary permissions</li>
          <li>✓ You agree to all terms and conditions</li>
          <li>✓ You understand the nomination and judging process</li>
        </ul>
        
        {isNomineeUnder18 && (
          <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded">
            <p className="text-xs text-red-700 font-medium">
              ⚠️ Special Note: This nomination is for a minor (under 18). Parental consent is required above.
            </p>
          </div>
        )}
      </div>

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-red-800 font-semibold mb-2">❌ Please Complete Required Items:</h4>
          <ul className="text-sm text-red-600 space-y-1">
            {Object.entries(errors).map(([key, message]) => (
              <li key={key}>• {message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConsentDeclarationStep;