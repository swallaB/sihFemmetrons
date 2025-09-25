import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./internship_form/form"; 
import RecommendationPage from "./recomm_page"; // adjust path

const RecommCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formCompleted, setFormCompleted] = useState(false);
  const navigate = useNavigate();
useEffect(() => {
  const checkFormStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profile = res.data; // ✅ your backend saves under candidateProfile
     console.log("✅ CandidateProfile from backend:", profile);
      if (!profile) {
        setFormCompleted(false);
        setIsLoading(false);
        return;
      }

      // ✅ Match backend validation
      const isComplete =
        profile.education?.length > 0 &&
        profile.skills?.length > 0 &&
        profile.languages?.length > 0 &&
        profile.sectorOfInterest?.length > 0 &&
        profile.preferences?.duration &&
        profile.preferences?.mode &&
        profile.preferences?.locationPref &&
        profile.cv?.filename;

         console.log("✅ Completion check:", {
        education: profile.education?.length > 0,
        skills: profile.skills?.length > 0,
        languages: profile.languages?.length > 0,
        sectorOfInterest: profile.sectorOfInterest?.length > 0,
        experience: !!profile.experience,
        duration: !!profile.preferences?.duration,
        mode: !!profile.preferences?.mode,
        locationPref: !!profile.preferences?.locationPref,
        cv: !!profile.cv?.filename,
      });

      setFormCompleted(isComplete);
    } catch (err) {
      console.error(err);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  checkFormStatus();
}, [navigate]);


  if (isLoading) return <div>Loading...</div>;

  return formCompleted ? <RecommendationPage /> : <Form />;
};

export default RecommCheck;
