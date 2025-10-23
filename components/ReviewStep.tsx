
import React from 'react';
import { type FormData } from '../types';

interface ReviewStepProps {
  data: FormData;
  nextStep: () => void;
  prevStep: () => void;
}

const ReviewItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
    </div>
);

const ReviewStep: React.FC<ReviewStepProps> = ({ data, nextStep, prevStep }) => {
    
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
    
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-900 mb-1">Review Your Quote</h2>
      <p className="text-gray-600 mb-6">Please confirm the details below are correct.</p>
      
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        <ReviewItem label="First Name" value={data.firstName} />
        <ReviewItem label="Last Name" value={data.lastName} />
        <ReviewItem label="Email Address" value={data.email} />
        <ReviewItem label="Date of Birth" value={data.dateOfBirth} />
        <ReviewItem label="Plan Type" value={data.planType} />
        <ReviewItem label="Coverage Amount" value={formatCurrency(data.coverageAmount)} />
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Submit Quote
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
