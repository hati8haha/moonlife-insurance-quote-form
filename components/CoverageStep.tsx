
import React, { useEffect, useCallback, useRef } from 'react';
import { type FormData, PlanType } from '../types';
import { 
  trackStepView, 
  trackPlanSelection, 
  trackCoverageAmountChange, 
  trackButtonClick 
} from '../utils/tracking';

interface CoverageStepProps {
  data: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const CoverageStep: React.FC<CoverageStepProps> = ({ data, handleChange, nextStep, prevStep }) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Track step view on mount
  useEffect(() => {
    trackStepView(2, 'coverage');
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Debounced coverage tracking with proper cleanup
  const debouncedTrackCoverage = useCallback((amount: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      trackCoverageAmountChange(amount);
    }, 500);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e);
    trackPlanSelection(e.target.value);
  };

  const handleCoverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    debouncedTrackCoverage(Number(e.target.value));
  };

  const handleNextClick = () => {
    trackButtonClick('coverage-next', { 
      step: 2,
      planType: data.planType,
      coverageAmount: data.coverageAmount
    });
    nextStep();
  };

  const handleBackClick = () => {
    trackButtonClick('coverage-back', { step: 2 });
    prevStep();
  };
    
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-900 mb-1">Coverage Details</h2>
      <p className="text-gray-600 mb-6">Choose the plan that best fits your needs.</p>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="planType" className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
          <select
            name="planType"
            id="planType"
            value={data.planType}
            onChange={handlePlanChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
          >
            {Object.values(PlanType).map((plan) => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="coverageAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Coverage Amount: <span className="font-bold text-primary-700">{formatCurrency(data.coverageAmount)}</span>
          </label>
          <input
            type="range"
            name="coverageAmount"
            id="coverageAmount"
            min="10000"
            max="1000000"
            step="10000"
            value={data.coverageAmount}
            onChange={handleCoverageChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
           <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatCurrency(10000)}</span>
            <span>{formatCurrency(1000000)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBackClick}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNextClick}
          className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoverageStep;
