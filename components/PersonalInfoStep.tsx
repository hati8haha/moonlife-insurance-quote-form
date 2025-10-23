
import React, { useState } from 'react';
import { type FormData } from '../types';

interface PersonalInfoStepProps {
  data: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, handleChange, nextStep }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.firstName) newErrors.firstName = 'First name is required.';
    if (!data.lastName) newErrors.lastName = 'Last name is required.';
    if (!data.email) {
        newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = 'Email is invalid.';
    }
    if (!data.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-900 mb-1">Personal Information</h2>
      <p className="text-gray-600 mb-6">Let's get to know you a bit.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={data.firstName}
            onChange={handleChange}
            placeholder="e.g., Neil"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'}`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="e.g., Armstrong"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'}`}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={data.dateOfBirth}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'}`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
