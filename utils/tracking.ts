// Umami tracking utilities for MoonLife Insurance Quote Form

// Declare umami global function
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
      identify: (userIdOrData: string | Record<string, any>, data?: Record<string, any>) => void;
    };
  }
}

// Check if umami is available
const isUmamiAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.umami !== 'undefined';
};

// Track custom events
export const trackEvent = (eventName: string, eventData?: Record<string, any>): void => {
  if (isUmamiAvailable()) {
    window.umami!.track(eventName, eventData);
  } else {
    console.warn('Umami is not available. Event not tracked:', eventName, eventData);
  }
};

// Track step views
export const trackStepView = (step: number, stepName: string): void => {
  trackEvent(`${stepName}-viewed`, { step });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, context?: Record<string, any>): void => {
  trackEvent(`${buttonName}-clicked`, context);
};

// Track field interactions
export const trackFieldInteraction = (fieldName: string, value?: any): void => {
  trackEvent(`field-${fieldName}-filled`, { 
    fieldName,
    hasValue: !!value 
  });
};

// Track validation errors
export const trackValidationError = (step: string, errors: Record<string, string>): void => {
  trackEvent(`${step}-validation-error`, {
    errorCount: Object.keys(errors).length,
    errorFields: Object.keys(errors).join(',')
  });
};

// Track form abandonment
export const trackFormAbandonment = (currentStep: number, formData: any): void => {
  trackEvent('form-abandoned', {
    step: currentStep,
    completedFields: Object.keys(formData).filter(key => formData[key]).length
  });
};

// Track form submission
export const trackFormSubmission = (formData: any): void => {
  if (isUmamiAvailable()) {
    // Identify the user with their email
    window.umami!.identify(formData.email, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      planType: formData.planType,
      coverageAmount: formData.coverageAmount
    });
    
    // Track the submission event
    trackEvent('quote-submitted', {
      planType: formData.planType,
      coverageAmount: formData.coverageAmount,
      hasEmail: !!formData.email,
      hasDOB: !!formData.dateOfBirth
    });
  }
};

// Track plan selection
export const trackPlanSelection = (planType: string): void => {
  trackEvent('coverage-plan-selected', { planType });
};

// Track coverage amount change
export const trackCoverageAmountChange = (amount: number): void => {
  trackEvent('coverage-amount-adjusted', { 
    coverageAmount: amount,
    coverageRange: getCoverageRange(amount)
  });
};

// Helper to categorize coverage amounts
const getCoverageRange = (amount: number): string => {
  if (amount < 50000) return 'low';
  if (amount < 250000) return 'medium';
  if (amount < 500000) return 'high';
  return 'very-high';
};

// Track navigation
export const trackNavigation = (from: number, to: number, action: 'next' | 'back'): void => {
  trackEvent(`navigation-${action}`, {
    fromStep: from,
    toStep: to
  });
};

// Track session start
export const trackSessionStart = (): void => {
  trackEvent('form-session-started', {
    timestamp: Date.now(),
    userAgent: navigator.userAgent
  });
};

// Track session end
export const trackSessionEnd = (completed: boolean): void => {
  trackEvent('form-session-ended', {
    completed,
    timestamp: Date.now()
  });
};
