// File: frontend/src/components/NominationForm.jsx - COMPLETE FIXED VERSION
import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Send, CheckCircle, Eye, Download, Home } from 'lucide-react';
import NomineeDetailsStep from './nomination/NomineeDetailsStep';
import NominatorDetailsStep from './nomination/NominatorDetailsStep';
import CategorySelectionStep from './nomination/CategorySelectionStep';
import NominationStatementStep from './nomination/NominationStatementStep';
import SupportingDocumentsStep from './nomination/SupportingDocumentsStep';
import RefereeInformationStep from './nomination/RefereeInformationStep';
import ConsentDeclarationStep from './nomination/ConsentDeclarationStep';

// Progress Bar Component - RESPONSIVE VERSION
const ProgressBar = ({ currentStep, totalSteps, stepNames }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs md:text-sm font-medium text-red-600">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-xs md:text-sm text-gray-500 text-right truncate max-w-xs">
          {stepNames[currentStep - 1]}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-red-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      {/* Mobile: Show only current step indicator */}
      <div className="flex justify-between mt-2 md:hidden">
        <span className="text-xs text-red-600 font-medium">Step {currentStep}</span>
        <span className="text-xs text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      
      {/* Desktop: Show all step indicators */}
      <div className="hidden md:flex justify-between mt-2">
        {stepNames.map((step, index) => (
          <div
            key={index}
            className={`text-xs ${
              index + 1 <= currentStep 
                ? 'text-red-600 font-medium' 
                : 'text-gray-400'
            }`}
          >
            {index + 1 <= currentStep && '✓'}
          </div>
        ))}
      </div>
    </div>
  );
};

// Navigation Buttons Component - FIXED VERSION WITH 100 CHARACTER VALIDATION
const NavigationButtons = ({ currentStep, totalSteps, onPrev, onNext, onSubmit, isSubmitting, errors, setErrors, formData }) => {
  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch (currentStep) {
      case 1: // Nominee Details
        if (!formData.nominee.firstName) newErrors.firstName = 'First name is required';
        if (!formData.nominee.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.nominee.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.nominee.gender) newErrors.gender = 'Gender is required';
        if (!formData.nominee.email) newErrors.email = 'Email is required';
        if (!formData.nominee.phone) newErrors.phone = 'Phone is required';
        if (!formData.nominee.county) newErrors.county = 'County is required';
        if (!formData.nominee.nationality) newErrors.nationality = 'Nationality is required';
        break;
        
      case 2: // Nominator Details
        if (!formData.nominator.firstName) newErrors.nominatorFirstName = 'First name is required';
        if (!formData.nominator.lastName) newErrors.nominatorLastName = 'Last name is required';
        if (!formData.nominator.email) newErrors.nominatorEmail = 'Email is required';
        if (!formData.nominator.phone) newErrors.nominatorPhone = 'Phone is required';
        if (!formData.nominator.relationship) newErrors.relationship = 'Relationship is required';
        break;
        
      case 3: // Category Selection
        if (!formData.awardCategory) newErrors.awardCategory = 'Please select an award category';
        break;
        
      case 4: // Nomination Statement - ✅ ALL SET TO 100 CHARACTERS
        if (!formData.shortBio || formData.shortBio.length < 100) {
          newErrors.shortBio = 'Bio must be at least 100 characters';
        }
        if (!formData.impact || formData.impact.length < 100) {
          newErrors.impact = 'Impact statement must be at least 100 characters';
        }
        if (!formData.whyDeserveAward || formData.whyDeserveAward.length < 100) {
          newErrors.whyDeserveAward = 'Must be at least 100 characters';
        }
        // Achievements is optional but if provided, must be 100+ chars
        if (formData.achievements && formData.achievements.length > 0 && formData.achievements.length < 100) {
          newErrors.achievements = 'Achievements must be at least 100 characters if provided';
        }
        break;
        
      case 5: // Supporting Documents
        if (!formData.nominee.photoFile) newErrors.photo = 'Nominee photo is required';
        break;
        
      case 6: // Referee Information
        if (!formData.referee.name) newErrors.refereeName = 'Referee name is required';
        if (!formData.referee.email) newErrors.refereeEmail = 'Referee email is required';
        if (!formData.referee.phone) newErrors.refereePhone = 'Referee phone is required';
        if (!formData.referee.position) newErrors.refereePosition = 'Referee position is required';
        break;
        
      case 7: // Consent
        if (!formData.consent.accurateInfo) newErrors.accurateInfo = 'This consent is required';
        if (!formData.consent.nomineePermission) newErrors.nomineePermission = 'This consent is required';
        if (!formData.consent.publicRecognition) newErrors.publicRecognition = 'This consent is required';
        if (!formData.consent.backgroundCheck) newErrors.backgroundCheck = 'This consent is required';
        if (!formData.consent.dataUsage) newErrors.dataUsage = 'This consent is required';
        if (!formData.consent.antifraud) newErrors.antifraud = 'This consent is required';
        break;
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateCurrentStep();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      alert('Please fix the validation errors before proceeding.');
      return;
    }
    onNext();
  };

  const handleSubmit = () => {
    const allErrors = validateCurrentStep();
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      alert('Please fix all validation errors before submitting.');
      return;
    }
    onSubmit();
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={currentStep === 1 || isSubmitting}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          currentStep === 1 || isSubmitting
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        ← Previous
      </button>

      {/* Step Indicator */}
      <div className="text-sm text-gray-600 text-center">
        <div className="font-semibold text-red-600">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {currentStep === 1 && 'Nominee Information'}
          {currentStep === 2 && 'Nominator Details'}
          {currentStep === 3 && 'Category Selection'}
          {currentStep === 4 && 'Nomination Statement (100+ chars each)'}
          {currentStep === 5 && 'Supporting Documents'}
          {currentStep === 6 && 'Referee Information'}
          {currentStep === 7 && 'Review & Submit'}
        </div>
      </div>

      {/* Next/Submit Button */}
      {currentStep === totalSteps ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Nomination</span>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
        >
          Next →
        </button>
      )}
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ isVisible, onClose, submissionData }) => {
  if (!isVisible) return null;

  const cloudinaryPhoto = submissionData?.data?.files?.photo?.cloudinary;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Header */}
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

          {/* Submission Details */}
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Submission Details</h3>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-sm font-medium text-gray-600">Submission ID:</span>
                <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                  {submissionData?.submissionId || 'N/A'}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  ✅ Submitted Successfully
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-sm font-medium text-gray-600">Database:</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  submissionData?.data?.storage?.mongodb 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {submissionData?.data?.storage?.mongodb ? 'Saved to Database' : 'File Backup Only'}
                </span>
              </div>

              {cloudinaryPhoto && (
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-sm font-medium text-gray-600">Photo:</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    cloudinaryPhoto ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {cloudinaryPhoto ? 'Uploaded' : 'Local Only'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
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

          {/* Action Buttons */}
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

// Main Form Component
const NominationForm = ({ onClose, preSelectedCategory }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

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
    awardCategory: preSelectedCategory || '',
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

  // ✅ FIXED: Complete validation with 100 character requirements
  const validateForm = (data) => {
    const errors = {};
    
    // Nominee validation
    if (!data.nominee.firstName) errors.firstName = 'First name is required';
    if (!data.nominee.lastName) errors.lastName = 'Last name is required';
    if (!data.nominee.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!data.nominee.gender) errors.gender = 'Gender is required';
    if (!data.nominee.email) errors.email = 'Email is required';
    if (!data.nominee.phone) errors.phone = 'Phone is required';
    if (!data.nominee.county) errors.county = 'County is required';
    if (!data.nominee.nationality) errors.nationality = 'Nationality is required';
    if (!data.nominee.photoFile) errors.photo = 'Nominee photo is required';
    
    // Nominator validation
    if (!data.nominator.firstName) errors.nominatorFirstName = 'First name is required';
    if (!data.nominator.lastName) errors.nominatorLastName = 'Last name is required';
    if (!data.nominator.email) errors.nominatorEmail = 'Email is required';
    if (!data.nominator.phone) errors.nominatorPhone = 'Phone is required';
    if (!data.nominator.relationship) errors.relationship = 'Relationship is required';
    
    // Category validation
    if (!data.awardCategory) errors.awardCategory = 'Award category is required';
    
    // ✅ FIXED: ALL STATEMENT VALIDATIONS SET TO 100 CHARACTERS MINIMUM
    if (!data.shortBio || data.shortBio.length < 100) {
      errors.shortBio = 'Bio must be at least 100 characters';
    }
    
    if (!data.impact || data.impact.length < 100) {
      errors.impact = 'Impact statement must be at least 100 characters';
    }
    
    if (!data.whyDeserveAward || data.whyDeserveAward.length < 100) {
      errors.whyDeserveAward = 'Must be at least 100 characters';
    }
    
    // ✅ FIXED: Achievements also set to 100 characters if provided
    if (data.achievements && data.achievements.length > 0 && data.achievements.length < 100) {
      errors.achievements = 'Achievements must be at least 100 characters if provided';
    }
    
    // Referee validation
    if (!data.referee.name) errors.refereeName = 'Referee name is required';
    if (!data.referee.email) errors.refereeEmail = 'Referee email is required';
    if (!data.referee.phone) errors.refereePhone = 'Referee phone is required';
    if (!data.referee.position) errors.refereePosition = 'Referee position is required';
    
    // Consent validation
    if (!data.consent.accurateInfo) errors.accurateInfo = 'This consent is required';
    if (!data.consent.nomineePermission) errors.nomineePermission = 'This consent is required';
    if (!data.consent.publicRecognition) errors.publicRecognition = 'This consent is required';
    if (!data.consent.backgroundCheck) errors.backgroundCheck = 'This consent is required';
    if (!data.consent.dataUsage) errors.dataUsage = 'This consent is required';
    if (!data.consent.antifraud) errors.antifraud = 'This consent is required';
    
    return errors;
  };

  // ✅ FIXED: Complete handleSubmit function
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Validate form
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        alert('Please fix the validation errors before submitting.');
        return;
      }

      const submissionId = `TA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Prepare the submission data for backend
      const submissionData = {
        submissionId,
        nominee: {
          firstName: formData.nominee.firstName,
          middleName: formData.nominee.middleName || "",
          lastName: formData.nominee.lastName,
          dateOfBirth: new Date(formData.nominee.dateOfBirth),
          age: formData.nominee.age,
          gender: formData.nominee.gender,
          email: formData.nominee.email,
          phone: formData.nominee.phone,
          nationality: formData.nominee.nationality,
          location: {
            county: formData.nominee.county,
            subcounty: formData.nominee.subcounty || "",
            ward: formData.nominee.ward || ""
          },
          school: formData.nominee.school || {},
          photo: formData.nominee.photo || 'placeholder-photo.jpg'
        },
        nominator: formData.nominator,
        awardCategory: formData.awardCategory,
        shortBio: formData.shortBio,
        achievements: formData.achievements,
        impact: formData.impact,
        whyDeserveAward: formData.whyDeserveAward,
        additionalInfo: formData.additionalInfo,
        socialMediaLinks: formData.socialMediaLinks,
        supportingFiles: [],
        referee: formData.referee,
        consent: formData.consent
      };
      
      console.log('Submission data structure:', submissionData);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add JSON data as a string
      formDataToSend.append('data', JSON.stringify(submissionData));
      
      // Add nominee photo if exists
      if (formData.nominee.photoFile) {
        formDataToSend.append('nomineePhoto', formData.nominee.photoFile);
      }
      
      // Add supporting files
      formData.supportingFiles.forEach((file, index) => {
        formDataToSend.append(`supportingFile${index}`, file);
      });

      console.log('Submitting data to backend...');
      
      // Submit to backend - FIXED: Use correct endpoint
      const response = await fetch('/api/nominations', {
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
        console.log('Submission successful:', result);
        setSubmissionData(result);
        setIsSubmissionComplete(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Submission error:', error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render success modal if submission complete
  if (isSubmissionComplete) {
    return (
      <SuccessModal 
        isVisible={true}
        onClose={onClose}
        submissionData={submissionData}
      />
    );
  }

  // Main form render
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b bg-white">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            Submit Nomination - Teendom Awards 2025
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Progress Bar - Fixed */}
        <div className="px-4 md:px-6 py-4 border-b bg-gray-50">
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={7} 
            stepNames={stepNames}
          />
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
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
                preSelectedCategory={preSelectedCategory}
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

        {/* Navigation - Fixed */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={7}
          onPrev={prevStep}
          onNext={nextStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
          setErrors={setErrors}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default NominationForm;