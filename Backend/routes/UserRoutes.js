// import express from "express";
// import { updateProfile, getProfile, upload } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Get candidate profile
// router.get("/profile", protect, getProfile);

// // Update candidate profile (with CV upload)
// router.put("/profile", protect, upload.single("cv"), updateProfile);

// export default router;


import express from "express";
import {
  updatePersonalAndContact,
  updateOtherDetails,
  getProfile,
  upload,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get candidate profile
router.get("/profile", protect, getProfile);

// ✅ Update Form 1: Personal + Contact details
router.put("/profile/personal", protect, updatePersonalAndContact);

// ✅ Update Form 2: Other details (with CV upload)
router.put("/profile/other", protect, upload.single("cv"), updateOtherDetails);

export default router;
