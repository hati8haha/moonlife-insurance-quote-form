
import React, { useEffect } from 'react';
import { CheckCircleIcon } from './Icons';
import { trackStepView, trackButtonClick } from '../utils/tracking';

interface SuccessStepProps {
    onRestart: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ onRestart }) => {
  
  // Track success view on mount
  useEffect(() => {
    trackStepView(4, 'success');
  }, []);

  const handleRestart = () => {
    trackButtonClick('success-restart', { step: 4 });
    onRestart();
  };

  return (
    <div className="text-center py-8">
      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-primary-900">Quote Request Received!</h2>
      <p className="text-gray-600 mt-2 mb-6 max-w-md mx-auto">
        Thank you! One of our MoonLife specialists will review your information and get back to you within 2 business days.
      </p>
      <button
        onClick={handleRestart}
        className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        Get Another Quote
      </button>
    </div>
  );
};

export default SuccessStep;
