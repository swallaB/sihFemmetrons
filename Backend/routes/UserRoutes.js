import express from "express";
import { updateProfile, getProfile, upload } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get candidate profile
router.get("/profile", protect, getProfile);

// Update candidate profile (with CV upload)
router.put("/profile", protect, upload.single("cv"), updateProfile);

export default router;
