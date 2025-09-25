// import User from "../models/User.js";
// import multer from "multer";

// // ---- CV Upload (Multer Config) ----
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/cv/"); // folder to store CVs
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage });

// // ---- Update candidate profile ----
// export const updateProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Extract profile fields
//     const {
//       firstName,
//       lastName,
//       dateOfBirth,
//       gender,
//       phone,
//       address,
//       city,
//       state,
//       country,
//       pincode,
//       education,
//       skills,
//       languages,
//       sectorOfInterest,
//       experience,
//       preferences,
//     } = req.body;

//     // Build new profile object
//     const profile = {
//       firstName,
//       lastName,
//       dateOfBirth,
//       gender,
//       phone,
//       address,
//       city,
//       state,
//       country,
//       pincode,
//       education,
//       skills,
//       languages,
//       sectorOfInterest,
//       experience,
//       preferences,
//     };

//     // If CV uploaded
//     if (req.file) {
//       profile.cv = {
//         filename: req.file.filename,
//         path: req.file.path,
//         mimetype: req.file.mimetype,
//         size: req.file.size,
//       };
//     }

//     // Save in DB
//     user.candidateProfile = profile;
//     await user.save();

//     res.json({ message: "Profile updated", profile: user.candidateProfile });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---- Get candidate profile ----
// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user.candidateProfile || {});
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

import User from "../models/User.js";
import multer from "multer";

// ---- CV Upload (Multer Config) ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cv/"); // folder to store CVs
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

/* ------------------------------
   Update Personal + Contact Details (Form 1)
   ------------------------------ */
export const updatePersonalAndContact = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      address,
      city,
      state,
      country,
      pincode,
    } = req.body;

    // ✅ Validate all required fields
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !country ||
      !pincode
    ) {
      return res
        .status(400)
        .json({ message: "All personal and contact fields are required" });
    }

    user.candidateProfile = {
      ...user.candidateProfile?.toObject(),
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      address,
      city,
      state,
      country,
      pincode,
    };

    await user.save();
    res.json({
      message: "Personal & contact details updated",
      profile: user.candidateProfile,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ------------------------------
   Update Other Details (Form 2)
   ------------------------------ */
export const updateOtherDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { education, skills, languages, sectorOfInterest, experience, preferences } =
      req.body;

    // ✅ Validate all required fields
    if (
      !education ||
      !Array.isArray(education) ||
      education.length === 0 ||
      !skills ||
      !Array.isArray(skills) ||
      skills.length === 0 ||
      !languages ||
      !Array.isArray(languages) ||
      languages.length === 0 ||
      !sectorOfInterest ||
      !Array.isArray(sectorOfInterest) ||
      sectorOfInterest.length === 0 ||
      !experience ||
      !preferences ||
      !preferences.duration ||
      !preferences.mode ||
      !preferences.locationPref
    ) {
      return res
        .status(400)
        .json({ message: "All other details are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "CV upload is required" });
    }

    // ✅ Save all details (overwrite existing other details)
    user.candidateProfile = {
      ...user.candidateProfile?.toObject(),
      education,
      skills,
      languages,
      sectorOfInterest,
      experience,
      preferences,
      cv: {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    };

    await user.save();
    res.json({
      message: "Other details updated",
      profile: user.candidateProfile,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ------------------------------
   Get candidate profile
   ------------------------------ */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.candidateProfile || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
