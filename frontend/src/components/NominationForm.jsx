// File: frontend/src/components/NominationForm.jsx
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

// Navigation Buttons Component - RESPONSIVE VERSION
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
        
      case 4: // Nomination Statement
        if (!formData.shortBio || formData.shortBio.length < 50) newErrors.shortBio = 'Bio must be at least 50 characters';
        if (!formData.impact || formData.impact.length < 300) newErrors.impact = 'Impact statement must be at least 300 characters';
        if (!formData.whyDeserveAward || formData.whyDeserveAward.length < 200) newErrors.whyDeserveAward = 'Must be at least 200 characters';
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      <button
        onClick={onPrev}
        disabled={currentStep === 1 || isSubmitting}
        className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
          currentStep === 1 || isSubmitting
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
        <span>Previous</span>
      </button>

      <div className="text-xs md:text-sm text-gray-500 text-center order-first sm:order-none">
        <span className="font-medium">{currentStep}</span> of {totalSteps}
      </div>

      {currentStep < totalSteps ? (
        <button
          onClick={() => {
            if (validateCurrentStep()) {
              onNext();
            } else {
              alert('Please complete all required fields before proceeding.');
            }
          }}
          disabled={isSubmitting}
          className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
            isSubmitting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      ) : (
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 md:px-8 py-3 md:py-3 rounded-lg font-bold text-base md:text-lg transition-colors ${
            isSubmitting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 md:w-5 md:h-5" />
              <span>Submit Nomination</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

// Success Modal Component - RESPONSIVE with CLOUDINARY URLs
const NominationSuccess = ({ submissionData, onClose }) => {
  const cloudinaryPhoto = submissionData?.data?.files?.photo?.cloudinary;
  const localPhoto = submissionData?.data?.files?.photo?.local;
  const supportingFilesCloudinary = submissionData?.data?.files?.supportingFiles?.cloudinary || 0;
  const supportingFilesLocal = submissionData?.data?.files?.supportingFiles?.local || 0;
  
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
        <div className="p-4 md:p-8">
          {/* Success Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
              Nomination Submitted Successfully!
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-4">
              Your nomination has been received and saved to our database
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 inline-block">
              <p className="font-semibold text-green-800 text-sm md:text-base">
                Submission ID: <span className="font-mono text-xs md:text-sm">{submissionData?.submissionId}</span>
              </p>
            </div>
          </div>

          {/* Photo Display - RESPONSIVE with CLOUDINARY URLs */}
          {displayPhotoUrl && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Nominee Photo</h3>
              <div className="bg-gray-50 border rounded-lg p-3 md:p-4">
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={displayPhotoUrl}
                      alt="Uploaded nominee photo"
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                      onError={(e) => {
                        console.error('Image load error:', e.target.src);
                        if (localPhoto && !e.target.src.includes('/uploads/')) {
                          e.target.src = `/uploads/nominations/${localPhoto}`;
                        } else {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 items-center justify-center flex-col text-gray-500 text-xs md:text-sm hidden">
                      <span>Image not available</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-medium text-gray-900 mb-2 text-sm md:text-base">
                      Nominee Photo Successfully Uploaded
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 mb-3">
                      Uploaded on {formatDate(new Date())}
                      {cloudinaryPhoto && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          Cloudinary
                        </span>
                      )}
                    </p>
                    
                    <div className="text-xs text-gray-500 mb-3 p-2 bg-yellow-50 rounded">
                      <strong>Storage Info:</strong><br/>
                      <strong>Cloudinary:</strong> {cloudinaryPhoto ? 'Success' : 'Not found'}<br/>
                      <strong>Local Backup:</strong> {localPhoto ? 'Success' : 'Not found'}<br/>
                      <strong>Final URL:</strong> <span className="break-all text-xs">{displayPhotoUrl}</span>
                    </div>
                    
                    <div className="flex justify-center sm:justify-start">
                      <a 
                        href={displayPhotoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-xs md:text-sm transition-colors"
                      >
                        <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        View Full Size
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Storage Status - RESPONSIVE */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Storage Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-red-900 text-sm md:text-base">Database</span>
                  <span className={`px-2 py-1 rounded text-xs md:text-sm ${
                    submissionData?.data?.storage?.mongodb 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {submissionData?.data?.storage?.mongodb ? 'Saved' : 'Failed'}
                  </span>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-red-900 text-sm md:text-base">Cloudinary</span>
                  <span className={`px-2 py-1 rounded text-xs md:text-sm ${
                    cloudinaryPhoto 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {cloudinaryPhoto ? 'Uploaded' : 'Local Only'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps - RESPONSIVE */}
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

          {/* Action Buttons - RESPONSIVE */}
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
const NominationForm = () => {
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
      phone: ''
    },
    awardCategory: '',
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
    
    // Statement validation
    if (!data.shortBio || data.shortBio.length < 50) errors.shortBio = 'Bio must be at least 50 characters';
    if (!data.impact || data.impact.length < 300) errors.impact = 'Impact statement must be at least 300 characters';
    if (!data.whyDeserveAward || data.whyDeserveAward.length < 200) errors.whyDeserveAward = 'Must be at least 200 characters';
    
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

  // FIXED: handleSubmit now properly cleans up blob URLs and shows Cloudinary URLs
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
      
      // Create FormData for file uploads
      const formDataToSubmit = new FormData();
      
      // Add nomination data as JSON string
      formDataToSubmit.append('nominationData', JSON.stringify(submissionData));
      
      // Add files if available
      if (formData.nominee.photoFile) {
        formDataToSubmit.append('nomineePhoto', formData.nominee.photoFile);
      }
      
      if (formData.supportingFiles && formData.supportingFiles.length > 0) {
        formData.supportingFiles.forEach((fileData) => {
          formDataToSubmit.append('supportingFiles', fileData.file);
        });
      }
      
      console.log('Submitting data to backend...');
      
      // Submit to backend
      const response = await fetch('http://localhost:5000/api/nominations', {
        method: 'POST',
        body: formDataToSubmit
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.warn('Could not parse error response');
        }
        throw new Error(errorMessage);
      }
      
      let result;
      try {
        const responseText = await response.text();
        console.log('Raw response text:', responseText);
        
        if (!responseText.trim()) {
          throw new Error('Server returned empty response');
        }
        
        result = JSON.parse(responseText);
        console.log('Parsed response:', result);
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        throw new Error('Server returned invalid response format');
      }
      
      console.log('Submission successful:', result);
      
      // FIXED: Clean up blob URLs before showing success modal
      if (formData.nominee.photoFile) {
        const blobUrl = URL.createObjectURL(formData.nominee.photoFile);
        URL.revokeObjectURL(blobUrl);
      }
      
      // Clean up supporting files blob URLs
      formData.supportingFiles.forEach(fileData => {
        if (fileData.file) {
          const blobUrl = URL.createObjectURL(fileData.file);
          URL.revokeObjectURL(blobUrl);
        }
      });
      
      // FIXED: Store the submission data and show success component
      setSubmissionData(result);
      setIsSubmissionComplete(true);
      setIsSubmitting(false);
      
    } catch (error) {
      console.error('Submission failed:', error);
      setIsSubmitting(false);
      alert(`Submission failed: ${error.message}`);
    }
  };

  return (
    <>
      {/* FIXED: Proper Modal Overlay - Allows scrolling and proper positioning */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div className="min-h-screen py-4 px-4 flex items-start justify-center">
          <div className={`w-full max-w-4xl bg-white rounded-xl shadow-lg my-4 ${isSubmissionComplete ? 'hidden' : 'block'}`}>
            {/* Header - RESPONSIVE */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl md:text-3xl font-black truncate">Teendom Awards 2025</h1>
                  <p className="text-red-100 mt-1 text-sm md:text-base">Nominate an Outstanding Teenager</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to close? All progress will be lost.')) {
                      window.location.href = '/';
                    }
                  }}
                  className="text-white hover:text-red-200 text-lg md:text-xl font-bold ml-4 flex-shrink-0"
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            {/* Progress Bar - RESPONSIVE */}
            <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-b">
              <ProgressBar currentStep={currentStep} totalSteps={7} stepNames={stepNames} />
            </div>

            {/* Form Content - RESPONSIVE with proper height */}
            <div className="px-4 md:px-6 py-4 md:py-6 max-h-[60vh] overflow-y-auto">
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

            {/* Navigation Footer - FIXED positioning */}
            <div className="border-t bg-gray-50 px-4 md:px-6 py-3 md:py-4">
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
        </div>
      </div>

      {/* Success Modal - Shows actual Cloudinary URLs - RESPONSIVE */}
      {isSubmissionComplete && submissionData && (
        <NominationSuccess 
          submissionData={submissionData}
          onClose={() => {
            setIsSubmissionComplete(false);
            setSubmissionData(null);
            window.location.href = '/';
          }}
        />
      )}
    </>
  );
};

export default NominationForm;