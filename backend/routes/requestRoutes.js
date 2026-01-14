import express from "express";
import {
  createRequest,
  getMentorRequests,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";
import { mentorOnly } from "../middleware/roleMiddleware.js";
import { updateRequestStatus } from "../controllers/requestController.js";
import { getLearnerRequests } from "../controllers/requestController.js";


const router = express.Router();

// Learner sends request
router.post("/", protect, createRequest);

// Mentor views requests
router.get("/mentor", protect, mentorOnly, getMentorRequests);
router.patch("/:id", protect, mentorOnly, updateRequestStatus);
router.get("/learner", protect, getLearnerRequests);



export default router;
