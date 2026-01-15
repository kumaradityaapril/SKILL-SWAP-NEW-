import express from "express";
import {
  createSession,
  getMentorSessions,
  getLearnerSessions,
  getSessionByRoomId,
  updateSessionStatus,
  cancelSession,
} from "../controllers/sessionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create session
router.post("/", protect, createSession);

// Get mentor sessions
router.get("/mentor", protect, getMentorSessions);

// Get learner sessions
router.get("/learner", protect, getLearnerSessions);

// Get session by room ID
router.get("/room/:roomId", protect, getSessionByRoomId);

// Update session status
router.patch("/:sessionId/status", protect, updateSessionStatus);

// Cancel session
router.patch("/:sessionId/cancel", protect, cancelSession);

export default router;
