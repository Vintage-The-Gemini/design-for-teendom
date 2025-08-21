// File: frontend/src/components/nomination/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-red-800 rounded-full h-2 mt-4">
      <div 
        className="bg-white h-2 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;