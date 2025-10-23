
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps -1)) * 100;

  const steps = [
    { number: 1, name: 'Personal' },
    { number: 2, name: 'Coverage' },
    { number: 3, name: 'Review' },
  ];

  return (
    <div className="w-full">
      <div className="relative mb-2">
         <div className="flex items-center justify-between">
            {steps.map((step) => (
                <div key={step.number} className="z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${
                        currentStep >= step.number ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                        {step.number}
                    </div>
                    <p className={`mt-2 text-xs font-semibold ${
                        currentStep >= step.number ? 'text-primary-700' : 'text-gray-500'
                    }`}>{step.name}</p>
                </div>
            ))}
        </div>
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-200">
            <div
            className="h-1 bg-primary-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
