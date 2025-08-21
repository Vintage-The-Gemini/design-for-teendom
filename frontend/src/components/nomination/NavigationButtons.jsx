// File: frontend/src/components/nomination/NavigationButtons.jsx
import React from 'react';

const NavigationButtons = ({
  currentStep,
  totalSteps,
  prevStep,
  nextStep,
  handleSubmit,
  isSubmitting,
  errors,
  formData
}) => {
  
  // Simplified validation function for each step
  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch (currentStep) {
      case 1: // Nominee Details
        if (!formData.nominee?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData.nominee?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.nominee?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.nominee?.gender) newErrors.gender = 'Gender is required';
        if (!formData.nominee?.email?.trim()) newErrors.email = 'Email is required';
        if (!formData.nominee?.phone?.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.nominee?.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.nominee?.county) newErrors.county = 'County is required';
        break;
        
      case 2: // Nominator Details
        if (!formData.nominator?.isSelfNomination) {
          if (!formData.nominator?.firstName?.trim()) newErrors.nominatorFirstName = 'Nominator first name is required';
          if (!formData.nominator?.lastName?.trim()) newErrors.nominatorLastName = 'Nominator last name is required';
          if (!formData.nominator?.email?.trim()) newErrors.nominatorEmail = 'Nominator email is required';
          if (!formData.nominator?.phone?.trim()) newErrors.nominatorPhone = 'Nominator phone is required';
          if (!formData.nominator?.relationship) newErrors.relationship = 'Relationship is required';
        }
        break;
        
      case 3: // Award Category
        if (!formData.awardCategory) newErrors.category = 'Award category is required';
        break;
        
      case 4: // Nomination Statement
        if (!formData.shortBio?.trim()) newErrors.shortBio = 'Short bio is required';
        if (!formData.achievements?.trim()) newErrors.achievements = 'Achievements are required';
        if (!formData.impact?.trim()) newErrors.impact = 'Impact description is required';
        break;
        
      case 5: // Supporting Documents
        if (!formData.nominee?.photo) newErrors.photo = 'Nominee photo is required';
        break;
        
      case 6: // Referee Information
        if (!formData.referee?.name?.trim()) newErrors.refereeName = 'Referee name is required';
        if (!formData.referee?.email?.trim()) newErrors.refereeEmail = 'Referee email is required';
        if (!formData.referee?.phone?.trim()) newErrors.refereePhone = 'Referee phone is required';
        if (!formData.referee?.position?.trim()) newErrors.refereePosition = 'Referee position is required';
        break;
        
      case 7: // Consent
        if (!formData.consent?.accurateInfo) newErrors.accurateInfo = 'Please confirm information accuracy';
        if (!formData.consent?.nomineePermission) newErrors.nomineePermission = 'Please confirm nominee permission';
        if (!formData.consent?.dataUsage) newErrors.dataUsage = 'Please accept data usage terms';
        if (!formData.consent?.antifraud) newErrors.antifraud = 'Please confirm anti-fraud declaration';
        // Parental consent required for under 18
        if (parseInt(formData.nominee?.age) < 18 && !formData.consent?.parentalConsent) {
          newErrors.parentalConsent = 'Parental consent required for nominees under 18';
        }
        break;
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    console.log(`🔄 Attempting to go from step ${currentStep} to ${currentStep + 1}`);
    console.log('📊 Current form data:', formData);
    
    // For now, let's be more lenient with validation to allow testing
    // Only validate critical fields that absolutely must be filled
    const criticalValidation = () => {
      switch (currentStep) {
        case 1: // Only require basic nominee info
          return formData.nominee?.firstName && formData.nominee?.lastName;
        case 2: // Only require nominator basic info if not self-nomination
          return formData.nominator?.isSelfNomination || 
                 (formData.nominator?.firstName && formData.nominator?.lastName);
        case 3: // Require category selection
          return formData.awardCategory;
        case 4: // Require some nomination content
          return formData.shortBio && formData.achievements;
        case 5: // Require photo
          return formData.nominee?.photo;
        case 6: // Require referee basics
          return formData.referee?.name && formData.referee?.email;
        default:
          return true;
      }
    };

    if (criticalValidation()) {
      console.log('✅ Validation passed, moving to next step');
      nextStep();
    } else {
      console.log('❌ Validation failed for step', currentStep);
      console.log('📋 Required fields missing for this step');
      
      // Show alert with specific requirements
      const stepRequirements = {
        1: 'Please fill in the nominee\'s first and last name',
        2: 'Please provide nominator information or select self-nomination',
        3: 'Please select an award category',
        4: 'Please provide a short bio and achievements',
        5: 'Please upload a nominee photo',
        6: 'Please provide referee name and email'
      };
      
      alert(`⚠️ Missing Required Information\n\n${stepRequirements[currentStep] || 'Please complete this step'}\n\nFill in the required fields to continue.`);
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t rounded-b-lg">
      {/* Previous Button */}
      <button
        type="button"
        onClick={prevStep}
        disabled={currentStep === 1}
        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          currentStep === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        ← Previous
      </button>

      {/* Step Indicator */}
      <div className="text-sm text-gray-600 text-center">
        <div>Step {currentStep} of {totalSteps}</div>
        <div className="text-xs text-gray-500 mt-1">
          {currentStep === 1 && 'Nominee Information'}
          {currentStep === 2 && 'Nominator Details'}
          {currentStep === 3 && 'Category Selection'}
          {currentStep === 4 && 'Nomination Statement'}
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
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </span>
          ) : (
            '🚀 Submit Nomination'
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Next →
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;