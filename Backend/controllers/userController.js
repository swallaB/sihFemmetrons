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

// ---- Update candidate profile ----
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Extract profile fields
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
      education,
      skills,
      languages,
      sectorOfInterest,
      experience,
      preferences,
    } = req.body;

    // Build new profile object
    const profile = {
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
      education,
      skills,
      languages,
      sectorOfInterest,
      experience,
      preferences,
    };

    // If CV uploaded
    if (req.file) {
      profile.cv = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    // Save in DB
    user.candidateProfile = profile;
    await user.save();

    res.json({ message: "Profile updated", profile: user.candidateProfile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---- Get candidate profile ----
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.candidateProfile || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
