
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

  // Track session start on mount (only once)
  useEffect(() => {
    trackSessionStart();
  }, []); // Empty dependency array - runs only once on mount

  // Track form abandonment when user leaves the page
  useEffect(() => {
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
  }, [currentStep, formData]); // These dependencies are needed for abandonment tracking

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
    <div className="min-h-screen flex flex-col">
      {/* Demo Warning Banner - Fixed at top */}
      <div className="flex-shrink-0 mb-1 p-4 bg-yellow-50 border border-yellow-200 w-full">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <div className="text-sm text-yellow-700">
              <p>
                This is a demonstration application showcasing analytics tracking.
                <strong> Please do not enter real personal information or data. </strong>
                All form submissions are for educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - fills remaining height */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-primary-50 font-sans">
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
    </div>

  );
};

export default App;
