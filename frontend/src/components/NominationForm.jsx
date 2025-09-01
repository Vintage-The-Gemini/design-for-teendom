// File: /frontend/src/components/NominationForm.jsx

import React, { useState } from 'react';
import { X, CheckCircle, Home } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

// Import your existing step components
import NomineeDetailsStep from './nomination/NomineeDetailsStep';
import NominatorDetailsStep from './nomination/NominatorDetailsStep';
import CategorySelectionStep from './nomination/CategorySelectionStep';
import NominationStatementStep from './nomination/NominationStatementStep';
import SupportingDocumentsStep from './nomination/SupportingDocumentsStep';
import RefereeInformationStep from './nomination/RefereeInformationStep';
import ConsentDeclarationStep from './nomination/ConsentDeclarationStep';

// Success Modal
const SuccessModal = ({ isVisible, onClose, submissionData }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              🎉 Nomination Submitted Successfully!
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Your nomination has been received and is now under review.
            </p>
          </div>

          {submissionData && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                📋 Submission Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-sm font-medium text-gray-600">Submission ID:</span>
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded text-red-600">
                    {submissionData?.data?.submissionId || 'Generated'}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-700">
                    ✅ Successfully Submitted
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Next Steps</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
              <ol className="list-decimal list-inside space-y-1 md:space-y-2 text-red-800 text-sm md:text-base">
                <li>Your nomination will be reviewed by our admin team</li>
                <li>Approved nominations will be sent to judges for evaluation</li>
                <li>Finalists will be contacted directly via email</li>
                <li>Public voting opens for finalists in November 2025</li>
                <li>Awards ceremony on December 6, 2025</li>
              </ol>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={onClose}
              className="w-full sm:w-auto bg-red-600 text-white px-4 md:px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              <span>Return to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NominationForm = ({ isOpen, onClose, selectedCategory }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [errors, setErrors] = useState({});

  const stepNames = [
    "Nominee Details",
    "Nominator Details", 
    "Award Category",
    "Nomination Statement",
    "Supporting Documents",
    "Referee Information",
    "Consent & Declaration"
  ];

  const [formData, setFormData] = useState({
    nominee: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      nationality: '',
      county: '',
      subcounty: '',
      ward: '',
      school: {
        name: '',
        level: ''
      },
      photo: '',
      photoFile: null
    },
    nominator: {
      isSelfNomination: false,
      firstName: '',
      middleName: '',
      lastName: '',
      relationship: '',
      email: '',
      phone: '',
      organization: ''
    },
    awardCategory: selectedCategory || '',
    shortBio: '',
    achievements: '',
    impact: '',
    whyDeserveAward: '',
    additionalInfo: '',
    socialMediaLinks: {
      website: '',
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      tiktok: ''
    },
    supportingFiles: [],
    referee: {
      name: '',
      position: '',
      organization: '',
      email: '',
      phone: '',
      allowContact: true
    },
    consent: {
      accurateInfo: false,
      nomineePermission: false,
      publicRecognition: false,
      backgroundCheck: false,
      dataUsage: false,
      antifraud: false
    }
  });

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDeepNestedChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!formData.nominee.firstName || !formData.nominee.lastName) {
        alert('Please fill in all required nominee information.');
        setIsSubmitting(false);
        return;
      }

      console.log('📋 Submission data structure:', formData);

      const formDataToSend = new FormData();

      formDataToSend.append('nomineeData', JSON.stringify({
        nominee: formData.nominee,
        nominator: formData.nominator,
        awardCategory: formData.awardCategory,
        shortBio: formData.shortBio,
        achievements: formData.achievements,
        impact: formData.impact,
        whyDeserveAward: formData.whyDeserveAward,
        additionalInfo: formData.additionalInfo,
        socialMediaLinks: formData.socialMediaLinks,
        referee: formData.referee,
        consent: formData.consent
      }));

      if (formData.nominee.photoFile) {
        formDataToSend.append('nomineePhoto', formData.nominee.photoFile);
      }
      
      formData.supportingFiles.forEach((file, index) => {
        formDataToSend.append(`supportingFile${index}`, file);
      });

      console.log('Submitting data to backend...');
      
      const apiUrl = `${API_BASE_URL}/api/nominations`;
      console.log('🌐 Making request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Submission failed:', errorText);
        throw new Error(`Submission failed: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text();
      console.log('Raw response text:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid response format from server');
      }

      console.log('Parsed response:', result);

      if (result.status === 'success') {
        console.log('✅ Submission successful:', result);
        setSubmissionData(result);
        setIsSubmissionComplete(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmissionComplete) {
    return (
      <SuccessModal 
        isVisible={true}
        onClose={onClose}
        submissionData={submissionData}
      />
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold mb-2">Submit Nomination</h2>
          <p className="text-red-100">
            Fill out all required information to nominate an outstanding teenager
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-red-800 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <div className="p-6">
            {currentStep === 1 && (
              <NomineeDetailsStep 
                formData={formData}
                setFormData={setFormData}
                handleNestedChange={handleNestedChange}
                handleDeepNestedChange={handleDeepNestedChange}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            
            {currentStep === 2 && (
              <NominatorDetailsStep 
                formData={formData}
                setFormData={setFormData}
                handleNestedChange={handleNestedChange}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            
            {currentStep === 3 && (
              <CategorySelectionStep 
                formData={formData}
                setFormData={setFormData}
                preSelectedCategory={selectedCategory}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            
            {currentStep === 4 && (
              <NominationStatementStep 
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            
            {currentStep === 5 && (
              <SupportingDocumentsStep 
                formData={formData}
                setFormData={setFormData}
                handleNestedChange={handleNestedChange}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            
            {currentStep === 6 && (
              <RefereeInformationStep 
                formData={formData}
                setFormData={setFormData}
                handleNestedChange={handleNestedChange}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            
            {currentStep === 7 && (
              <ConsentDeclarationStep 
                formData={formData}
                setFormData={setFormData}
                handleNestedChange={handleNestedChange}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1 || isSubmitting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-600 text-center">
            <div className="font-semibold text-red-600">
              Step {currentStep} of 7
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stepNames[currentStep - 1]}
            </div>
          </div>

          {currentStep === 7 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NominationForm;