import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import RecommendationPage from "./RecommendationPage";

const RecommCheck = () => {
  const navigate = useNavigate();
  const [isProfileComplete, setIsProfileComplete] = useState(null); // null = checking state

  useEffect(() => {
    const savedData = localStorage.getItem("internship-form-data");
    const savedCompleted = localStorage.getItem("internship-form-completed");

    if (savedData && savedCompleted) {
      try {
        const formData = JSON.parse(savedData);
        const completedSteps = JSON.parse(savedCompleted);

        // check if all steps are marked as completed
        const allStepsCompleted = completedSteps.every(step => step === true);

        // check mandatory fields
        const hasEducation = formData.education?.some(e => e.degree && e.institution);
        const hasSkillsOrLanguages = (formData.skills?.length > 0 || formData.languages?.length > 0);
        const hasPreferences = formData.sectorOfInterest?.length > 0 && formData.preferences?.mode;
        const hasCV = !!formData.cv;

        if (allStepsCompleted && hasEducation && hasSkillsOrLanguages && hasPreferences && hasCV) {
          setIsProfileComplete(true);
          return;
        }
      } catch (e) {
        console.error("Profile check failed:", e);
      }
    }

    setIsProfileComplete(false);
  }, []);

  if (isProfileComplete === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking profile...</p>
      </div>
    );
  }

  return isProfileComplete ? <RecommendationPage /> : <Form />;
};

export default RecommCheck;
