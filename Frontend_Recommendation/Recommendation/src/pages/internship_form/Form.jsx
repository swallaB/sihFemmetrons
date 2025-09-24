import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Star, CheckCircle } from 'lucide-react';
import EducationStep from './EducationStep';
import SkillsLanguagesStep from './SkillsLanguagesStep';
import PreferenceStep from './PreferenceStep';
import CVUploadStep from './CVUploadStep';
import ProgressBar from './ProgressBar';
import CompletionModal from './CompletionModal';

const initialFormData = {
  personalDetails: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: ''
  },
  contactDetails: {
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  },
  education: [{
    degree: '',
    institution: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: ''
  }],
  skills: [],
  languages: [],
  sectorOfInterest: [],
  experience: '',
  preferences: {
    duration: '',
    mode: '',
    location: ''
  },
  cv: null
};

const steps = [
  { title: 'Education', icon: '🎓' },
  { title: 'Skills & Languages', icon: '🛠️' },
  { title: 'Preferences', icon: '⚙️' },
  { title: 'CV Upload', icon: '📄' }
];

function Form() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [completedSteps, setCompletedSteps] = useState(new Array(steps.length).fill(false));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState([]);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('internship-form-data');
    const savedStep = localStorage.getItem('internship-form-step');
    const savedCompleted = localStorage.getItem('internship-form-completed');
    const savedBadges = localStorage.getItem('internship-form-badges');
    
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error loading saved form data:', e);
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
    
    if (savedCompleted) {
      try {
        setCompletedSteps(JSON.parse(savedCompleted));
      } catch (e) {
        console.error('Error loading completed steps:', e);
      }
    }

    if (savedBadges) {
      try {
        setEarnedBadges(JSON.parse(savedBadges));
      } catch (e) {
        console.error('Error loading badges:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('internship-form-data', JSON.stringify(formData));
    localStorage.setItem('internship-form-step', currentStep.toString());
    localStorage.setItem('internship-form-completed', JSON.stringify(completedSteps));
    localStorage.setItem('internship-form-badges', JSON.stringify(earnedBadges));
  }, [formData, currentStep, completedSteps, earnedBadges]);

  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const addBadge = (badgeName) => {
    if (!earnedBadges.includes(badgeName)) {
      setEarnedBadges(prev => [...prev, badgeName]);
    }
  };

  const validateStep = (stepIndex) => {
    switch (stepIndex) {
      case 0: // Education
        return formData.education.some(edu => edu.degree && edu.institution);
      case 1: // Skills & Languages
        return formData.skills.length > 0 || formData.languages.length > 0;
      case 2: // Preferences
        return formData.sectorOfInterest.length > 0 && !!formData.preferences.mode;
      case 3: // CV Upload
        return !!formData.cv;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && validateStep(currentStep)) {
      const newCompleted = [...completedSteps];
      newCompleted[currentStep] = true;
      setCompletedSteps(newCompleted);
      addBadge(`step-${currentStep + 1}-complete`);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);
    
    try {
      const submitData = {
        email: '',
        password: '',
        candidateProfile: {
          personalDetails: '',
          contactDetails: '',
          education: formData.education,
          skills: formData.skills,
          languages: formData.languages,
          sectorOfInterest: formData.sectorOfInterest,
          experience: formData.experience,
          preferences: formData.preferences,
          cv: formData.cv ? formData.cv.name : null
        }
      };

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.removeItem('internship-form-data');
      localStorage.removeItem('internship-form-step');
      localStorage.removeItem('internship-form-completed');
      localStorage.removeItem('internship-form-badges');
      
      addBadge('form-completed');
      setShowCompletion(true);
      
      console.log('Form submitted:', submitData);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <EducationStep
            data={formData.education}
            onUpdate={(data) => updateFormData({ education: data })}
            onBadgeEarned={addBadge}
          />
        );
      case 1:
        return (
          <SkillsLanguagesStep
            skills={formData.skills}
            languages={formData.languages}
            onUpdate={(data) => updateFormData(data)}
            onBadgeEarned={addBadge}
          />
        );
      case 2:
        return (
          <PreferenceStep
            sectorOfInterest={formData.sectorOfInterest}
            experience={formData.experience}
            preferences={formData.preferences}
            onUpdate={(data) => updateFormData(data)}
            onBadgeEarned={addBadge}
          />
        );
      case 3:
        return (
          <CVUploadStep
            cv={formData.cv}
            onUpdate={(data) => updateFormData(data)}
            onBadgeEarned={addBadge}
          />
        );
      default:
        return null;
    }
  };

  const isStepValid = validateStep(currentStep);
  const completedCount = completedSteps.filter(Boolean).length;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Trophy className="text-yellow-500" size={40} />
            Internship Application
          </h1>
          <p className="text-gray-600">Complete your profile step by step and earn badges!</p>
          
          {earnedBadges.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Badges Earned:</span>
              {earnedBadges.map((badge, index) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium animate-bounce"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Star size={12} className="text-yellow-600" />
                  {badge.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          completedSteps={completedSteps}
          steps={steps}
        />

        {/* Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{steps[currentStep].icon}</span>
              <h2 className="text-4xl font-bold text-gray-800">{steps[currentStep].title}</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Step {currentStep + 1} of {steps.length}</span>
              {completedSteps[currentStep] && (
                <CheckCircle size={16} className="text-blue-500" />
              )}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                Progress: {Math.round(((completedCount + (isStepValid ? 1 : 0)) / steps.length) * 100)}%
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                  style={{ width: `${((completedCount + (isStepValid ? 1 : 0)) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid || isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Trophy size={20} />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!isStepValid}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Continue
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {!isStepValid && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 text-sm font-medium">
                Please fill in all required fields to continue to the next step.
              </p>
            </div>
          )}
        </div>
      </div>

      {showCompletion && (
        <CompletionModal onClose={() => setShowCompletion(false)} />
      )}
    </div>
  );
}

export default Form;
