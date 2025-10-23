
import React, { useState, useCallback, useEffect } from 'react';
import { type FormData, PlanType } from './types';
import PersonalInfoStep from './components/PersonalInfoStep';
import CoverageStep from './components/CoverageStep';
import ReviewStep from './components/ReviewStep';
import SuccessStep from './components/SuccessStep';
import ProgressBar from './components/ProgressBar';
import { MoonIcon } from './components/Icons';
import { 
  trackSessionStart, 
  trackFormAbandonment, 
  trackNavigation, 
  trackSessionEnd 
} from './utils/tracking';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    planType: PlanType.LUNAR_STANDARD,
    coverageAmount: 50000,
  });

  const totalSteps = 3; // Excluding success step

  // Track session start on mount
  useEffect(() => {
    trackSessionStart();
    
    // Track form abandonment when user leaves the page
    const handleBeforeUnload = () => {
      if (currentStep < 4) {
        trackFormAbandonment(currentStep, formData);
        trackSessionEnd(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep, formData]);

  const handleNextStep = useCallback(() => {
    const nextStep = Math.min(currentStep + 1, totalSteps + 1);
    trackNavigation(currentStep, nextStep, 'next');
    setCurrentStep(nextStep);
  }, [currentStep, totalSteps]);

  const handlePrevStep = useCallback(() => {
    const prevStep = Math.max(currentStep - 1, 1);
    trackNavigation(currentStep, prevStep, 'back');
    setCurrentStep(prevStep);
  }, [currentStep]);
  
  const handleRestart = useCallback(() => {
    trackSessionEnd(true);
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        planType: PlanType.LUNAR_STANDARD,
        coverageAmount: 50000,
    });
    setCurrentStep(1);
    trackSessionStart();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'coverageAmount' ? Number(value) : value,
    }));
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData}
            handleChange={handleChange}
            nextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <CoverageStep
            data={formData}
            handleChange={handleChange}
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
          />
        );
      case 3:
        return (
          <ReviewStep
            data={formData}
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
          />
        );
      case 4:
        return <SuccessStep onRestart={handleRestart} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-primary-50 font-sans">
        <div className="w-full max-w-2xl">
            <header className="flex items-center justify-center mb-6">
                <MoonIcon className="w-10 h-10 text-primary-600 mr-3" />
                <h1 className="text-4xl font-bold text-primary-900">MoonLife</h1>
            </header>

            <div className="bg-white rounded-xl shadow-lg p-8">
                {currentStep <= totalSteps && (
                     <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                )}
                <div className="mt-8">
                    {renderStep()}
                </div>
            </div>
             <footer className="text-center mt-6 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} MoonLife Insurance. All rights reserved.</p>
            </footer>
        </div>
    </div>
  );
};

export default App;
