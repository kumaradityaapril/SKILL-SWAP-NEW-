import express from "express";
import {
  createRequest,
  getMentorRequests,
  updateRequestStatus,
  getLearnerRequests,
  getUnreadCount,
  markAsRead,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";
import { mentorOnly } from "../middleware/roleMiddleware.js";


const router = express.Router();

// Learner sends request
router.post("/", protect, createRequest);

// Mentor views requests
router.get("/mentor", protect, mentorOnly, getMentorRequests);
router.patch("/:id", protect, mentorOnly, updateRequestStatus);
router.get("/learner", protect, getLearnerRequests);

// Notification endpoints
router.get("/notifications/unread-count", protect, getUnreadCount);
router.patch("/notifications/mark-read", protect, markAsRead);


export default router;
