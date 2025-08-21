// File: frontend/src/components/NominationForm.jsx
import React, { useState } from 'react';
import NomineeDetailsStep from './nomination/NomineeDetailsStep';
import NominatorDetailsStep from './nomination/NominatorDetailsStep';
import CategorySelectionStep from './nomination/CategorySelectionStep';
import NominationStatementStep from './nomination/NominationStatementStep';
import SupportingDocumentsStep from './nomination/SupportingDocumentsStep';
import RefereeInformationStep from './nomination/RefereeInformationStep';
import ConsentDeclarationStep from './nomination/ConsentDeclarationStep';
import ProgressBar from './nomination/ProgressBar';
import NavigationButtons from './nomination/NavigationButtons';

const NominationForm = ({ isOpen, onClose, selectedCategory = '' }) => {
  // Main form state
  const [formData, setFormData] = useState({
    // Nominee Info - Complete Structure
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
        level: '',
        grade: ''
      },
      photo: null, // Will store Cloudinary URL after upload
      photoFile: null // Will store the actual file for upload
    },
    
    // Nominator Info  
    nominator: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      relationship: '',
      organization: '',
      isSelfNomination: false
    },
    
    // Award Details
    awardCategory: selectedCategory,
    
    // Nomination Content
    shortBio: '',
    achievements: '',
    impact: '',
    whyDeserveAward: '',
    additionalInfo: '',
    
    // Supporting Materials
    supportingFiles: [],
    socialMediaLinks: {
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      tiktok: '',
      other: ''
    },
    
    // Referee Information
    referee: {
      name: '',
      email: '',
      phone: '',
      position: '',
      organization: '',
      relationship: ''
    },
    
    // Consent & Declarations
    consent: {
      accurateInfo: false,
      nomineePermission: false,
      parentalConsent: false,
      dataUsage: false,
      antifraud: false
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Step names for progress tracking
  const stepNames = [
    'Nominee Details',
    'Nominator Details', 
    'Award Category',
    'Nomination Statement',
    'Supporting Documents',
    'Referee Information',
    'Consent & Declaration'
  ];

  // Handle nested state updates
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

  // Cloudinary Image Upload Function
  const uploadToCloudinary = async (file) => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload
        }
      );
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Failed to upload image');
    }
  };

  // Navigation Functions
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit Function - CONNECTED TO BACKEND
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('🚀 Starting nomination submission...');
      
      // Upload nominee photo to Cloudinary if exists
      let photoUrl = '';
      if (formData.nominee.photoFile) {
        console.log('📸 Uploading photo to Cloudinary...');
        photoUrl = await uploadToCloudinary(formData.nominee.photoFile);
        console.log('✅ Photo uploaded:', photoUrl);
      }
      
      // Prepare submission data matching backend schema
      const submissionData = {
        nominee: {
          firstName: formData.nominee.firstName,
          middleName: formData.nominee.middleName,
          lastName: formData.nominee.lastName,
          dateOfBirth: formData.nominee.dateOfBirth,
          age: parseInt(formData.nominee.age),
          gender: formData.nominee.gender,
          email: formData.nominee.email,
          phone: formData.nominee.phone,
          nationality: formData.nominee.nationality,
          county: formData.nominee.county,
          subcounty: formData.nominee.subcounty,
          ward: formData.nominee.ward,
          school: formData.nominee.school
        },
        nominator: {
          firstName: formData.nominator.firstName,
          lastName: formData.nominator.lastName,
          email: formData.nominator.email,
          phone: formData.nominator.phone,
          relationship: formData.nominator.relationship,
          organization: formData.nominator.organization,
          isSelfNomination: formData.nominator.isSelfNomination
        },
        awardCategory: formData.awardCategory,
        shortBio: formData.shortBio,
        achievements: formData.achievements,
        impact: formData.impact,
        whyDeserveAward: formData.whyDeserveAward,
        additionalInfo: formData.additionalInfo,
        socialMediaLinks: formData.socialMediaLinks,
        referee: formData.referee,
        consent: formData.consent
      };
      
      // Create FormData for file uploads
      const formDataToSubmit = new FormData();
      
      // Add nomination data as JSON string
      formDataToSubmit.append('nominationData', JSON.stringify(submissionData));
      
      // Add nominee photo if exists
      if (formData.nominee.photoFile) {
        formDataToSubmit.append('nomineePhoto', formData.nominee.photoFile);
      }
      
      // Add supporting files
      formData.supportingFiles.forEach((file, index) => {
        formDataToSubmit.append('supportingFiles', file);
      });
      
      console.log('📤 Submitting to backend API...');
      
      // Submit to backend API
      const response = await fetch('/api/nominations', {
        method: 'POST',
        body: formDataToSubmit
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit nomination');
      }
      
      console.log('✅ Nomination submitted successfully:', result);
      
      // Show success message
      alert(`🎉 Nomination submitted successfully! 
      
Your submission ID: ${result.submissionId}
You will receive confirmation via email shortly.

Next Steps:
• Admin will review your nomination within 3-5 business days
• You'll be notified of the status via email
• If approved, it will be forwarded to judges
• Voting period begins in November 2025

Thank you for nominating an outstanding teenager!`);
      
      // Close form
      onClose();
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      
      // Show error message
      alert(`❌ Error submitting nomination: ${error.message}

Please try again. If the problem persists:
• Check your internet connection
• Ensure all required fields are filled
• Contact support: awards@teendomafrica.org

We apologize for the inconvenience.`);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Render current step component
  const renderStepComponent = () => {
    const commonProps = {
      formData,
      setFormData,
      handleNestedChange,
      handleDeepNestedChange,
      errors,
      setErrors
    };

    switch (currentStep) {
      case 1:
        return <NomineeDetailsStep {...commonProps} />;
      case 2:
        return <NominatorDetailsStep {...commonProps} />;
      case 3:
        return <CategorySelectionStep {...commonProps} />;
      case 4:
        return <NominationStatementStep {...commonProps} />;
      case 5:
        return <SupportingDocumentsStep {...commonProps} uploadToCloudinary={uploadToCloudinary} />;
      case 6:
        return <RefereeInformationStep {...commonProps} />;
      case 7:
        return <ConsentDeclarationStep {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Teendom Awards 2025 - Nomination Form</h2>
              <p className="text-red-100">Step {currentStep} of 7: {stepNames[currentStep - 1]}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-red-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={7} />
        </div>

        {/* Form Content */}
        <div className="p-6">
          {renderStepComponent()}
        </div>

        {/* Navigation */}
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={7}
          prevStep={prevStep}
          nextStep={nextStep}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default NominationForm;