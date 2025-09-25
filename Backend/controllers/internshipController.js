import Internship from "../models/Internship.js";
import { getRecommendationsFromFlask } from "../services/flaskService.js";

// Get all internships
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params; // id = Internship_ID from URL
    const internship = await Internship.findOne({ Internship_ID: id });
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get recommendations (send profile + preferences to Flask API)
export const getRecommendations = async (req, res) => {
  try {
    if (!req.user.candidateProfile) {
      return res.status(400).json({ message: "Please complete profile first" });
    }

    const profile = req.user.candidateProfile;

    // Full candidate profile payload
    const profileData = {
      personal: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
      },
      contact: {
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        pincode: profile.pincode,
      },
      education: profile.education || [],
      skills: profile.skills || [],
      languages: profile.languages || [],
      sectorOfInterest: profile.sectorOfInterest || [],
      experience: profile.experience || null,
      preferences: {
        duration: profile.preferences?.duration || null,
        mode: profile.preferences?.mode || null,
        locationPref: profile.preferences?.locationPref || null,
      },
      cv: profile.cv || {},
    };

    // Send to Flask service
    const flaskResponse = await getRecommendationsFromFlask(profileData);

    // Expect Flask to return something like:
    // { ids: ["ID1", "ID2", ...], scores: [0.95, 0.88, ...] }
    if (!flaskResponse.ids || !Array.isArray(flaskResponse.ids)) {
      return res.status(500).json({ message: "Invalid response from ML service" });
    }

    // Fetch full internship documents from MongoDB
    let internships = await Internship.find({
      Internship_ID: { $in: flaskResponse.ids }
    });

    // Optional: reorder according to ML ranking
    const idToInternship = {};
    internships.forEach(i => { idToInternship[i.Internship_ID] = i; });

    const orderedInternships = flaskResponse.ids
      .map(id => idToInternship[id])
      .filter(Boolean); // remove any missing

    // Include score if Flask returned scores
    if (flaskResponse.scores && Array.isArray(flaskResponse.scores)) {
      orderedInternships.forEach((internship, index) => {
        internship._doc.score = flaskResponse.scores[index] || null;
      });
    }

    res.json(orderedInternships);

  } catch (err) {
    console.error("Error in getRecommendations:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const searchInternships = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const regex = new RegExp(query, "i"); // case-insensitive

    const internships = await Internship.find({
      $or: [
        { Internship_Title: regex },
        { Company_Name: regex },
        { Sector: regex },
        { Area_Field: regex },
        { Required_Skills: regex },
        { Internship_State: regex },
        { Internship_District: regex },
        { Benefits: regex },
        { Company_Description: regex },
        { Stipend_Type: regex },
        { Requirement_Contact: regex },
        { Eligibility_Education: regex },
        { Eligibility_Experience: regex },
        { Eligibility_Description: regex },
        { Hiring_Workflow: regex },
      ]
    }).limit(50);

    res.json(internships);
  } catch (err) {
    console.error("Error in searchInternships:", err.message);
    res.status(500).json({ message: err.message });
  }
};
