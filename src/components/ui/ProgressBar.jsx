import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Background bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <span className="sr-only">{progress}% complété</span>
          </div>
        </div>

        {/* Step markers */}
        <div className="absolute -top-1.5 w-full flex justify-between px-[2px]">
          {steps.map((step) => (
            <div
              key={step}
              className={`relative flex items-center justify-center w-5 h-5 rounded-full 
                transition-all duration-300 border-2 
                ${step <= currentStep
                  ? 'bg-green-600 border-green-600'
                  : 'bg-white border-gray-300'
                }`}
            >
              <div 
                className={`absolute w-2 h-2 rounded-full transition-all duration-300
                  ${step <= currentStep ? 'bg-white' : 'bg-gray-300'}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Step counter and progress percentage */}
      <div className="mt-6 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full 
            ${currentStep === totalSteps ? 'bg-green-600' : 'bg-green-100'} 
            text-green-600 font-medium`}
          >
            {currentStep}
          </span>
          <span className="text-gray-500">sur {totalSteps} étapes</span>
        </div>
        <span className="text-green-600 font-medium">
          {Math.round(progress)}% complété
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;