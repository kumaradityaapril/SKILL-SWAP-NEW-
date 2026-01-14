import express from "express";
import {
  createRequest,
  getMentorRequests,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";
import { mentorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Learner sends request
router.post("/", protect, createRequest);

// Mentor views requests
router.get("/mentor", protect, mentorOnly, getMentorRequests);

export default router;
