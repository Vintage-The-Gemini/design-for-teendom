// File: frontend/src/components/nomination/NavigationButtons.jsx
// TEST VERSION - No validation, allows free navigation for testing

import React from 'react';

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  isSubmitting,
  errors,
  setErrors,
  formData
}) => {
  
  console.log('🔄 Navigation - Step', currentStep, 'of', totalSteps);

  // Handle next step - NO VALIDATION for testing
  const handleNext = () => {
    console.log('✅ Moving to next step (no validation)');
    onNext();
  };

  // Handle previous step
  const handlePrev = () => {
    onPrev();
  };

  // Handle form submission - MINIMAL validation for testing
  const handleSubmit = () => {
    console.log('🚀 Test submission - minimal validation');
    
    // Only check if we have basic nominee info for testing
    if (!formData.nominee?.firstName) {
      // Auto-fill for testing
      console.log('🧪 Auto-filling test data...');
      
      // Create test data
      const testData = {
        nominee: {
          firstName: 'Test',
          lastName: 'Nominee',
          dateOfBirth: '2005-01-01',
          age: '19',
          gender: 'male',
          email: 'test@example.com',
          phone: '+254123456789',
          nationality: 'kenyan',
          county: 'Nairobi',
          subcounty: 'Westlands',
          ward: 'Parklands',
          school: {
            name: 'Test High School',
            level: 'Secondary School',
            grade: 'Form 4'
          },
          photoFile: null // We'll skip photo for testing
        },
        nominator: {
          firstName: 'Test',
          lastName: 'Nominator',
          email: 'nominator@example.com',
          phone: '+254987654321',
          relationship: 'teacher',
          organization: 'Test School',
          isSelfNomination: false
        },
        awardCategory: 'Academic Excellence',
        shortBio: 'This is a test nominee for system testing purposes.',
        achievements: 'Test achievements for validation.',
        impact: 'Test impact statement for system validation.',
        whyDeserveAward: 'Test reason for award.',
        additionalInfo: 'Test additional information.',
        socialMediaLinks: {
          instagram: '',
          twitter: '',
          linkedin: '',
          youtube: '',
          tiktok: '',
          other: ''
        },
        referee: {
          name: 'Test Referee',
          email: 'referee@example.com',
          phone: '+254111222333',
          position: 'Head Teacher',
          organization: 'Test School',
          relationship: 'supervisor'
        },
        consent: {
          accurateInfo: true,
          nomineePermission: true,
          parentalConsent: true,
          dataUsage: true,
          antifraud: true
        }
      };
      
      // Show test submission alert
      alert(`🧪 TEST SUBMISSION MODE

This is a test submission with auto-generated data:
• Nominee: ${testData.nominee.firstName} ${testData.nominee.lastName}
• Category: ${testData.awardCategory}
• Email: ${testData.nominee.email}

This will test the complete backend submission workflow.
No real data is required - this is just for testing!

Click OK to proceed with test submission.`);
    }
    
    console.log('✅ Proceeding with submission...');
    onSubmit();
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrev}
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
        <div className="font-semibold text-blue-600">
          🧪 TEST MODE - Step {currentStep} of {totalSteps}
        </div>
        <div className="text-xs text-blue-500 mt-1">
          {currentStep === 1 && 'Nominee Information (validation disabled)'}
          {currentStep === 2 && 'Nominator Details (validation disabled)'}
          {currentStep === 3 && 'Category Selection (validation disabled)'}
          {currentStep === 4 && 'Nomination Statement (validation disabled)'}
          {currentStep === 5 && 'Supporting Documents (validation disabled)'}
          {currentStep === 6 && 'Referee Information (validation disabled)'}
          {currentStep === 7 && 'Review & Submit (auto-fill enabled)'}
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
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Testing...
            </span>
          ) : (
            '🧪 TEST SUBMIT'
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next → (No Validation)
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;