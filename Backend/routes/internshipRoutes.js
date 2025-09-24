import express from "express";
import { getInternships, getRecommendations, searchInternships} from "../controllers/internshipController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getInternships);
router.get("/recommend", protect, getRecommendations);
router.get("/search", searchInternships);

export default router;
