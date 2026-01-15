import Session from "../models/Session.js";
import Request from "../models/Request.js";
import SkillPost from "../models/SkillPost.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

// Create a new session
export const createSession = async (req, res) => {
  try {
    const { requestId, scheduledDate, duration, notes } = req.body;

    // Find the request
    const request = await Request.findById(requestId)
      .populate("skill")
      .populate("mentor")
      .populate("learner");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if request is accepted
    if (request.status !== "accepted") {
      return res.status(400).json({ message: "Request must be accepted first" });
    }

    // Check if user is authorized (must be mentor or learner)
    if (
      req.user.id !== request.mentor._id.toString() &&
      req.user.id !== request.learner._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Generate unique room ID
    const roomId = uuidv4();

    // Create session
    const session = await Session.create({
      request: requestId,
      skill: request.skill._id,
      mentor: request.mentor._id,
      learner: request.learner._id,
      scheduledDate,
      duration: duration || 60,
      roomId,
      notes,
      meetingLink: `${process.env.FRONTEND_URL}/session/${roomId}`,
    });

    res.status(201).json({
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    console.error("Create session error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get sessions for mentor
export const getMentorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.user.id })
      .populate("skill")
      .populate("learner", "name email")
      .sort({ scheduledDate: -1 });

    res.json(sessions);
  } catch (error) {
    console.error("Get mentor sessions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get sessions for learner
export const getLearnerSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ learner: req.user.id })
      .populate("skill")
      .populate("mentor", "name email")
      .sort({ scheduledDate: -1 });

    res.json(sessions);
  } catch (error) {
    console.error("Get learner sessions error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get session by room ID
export const getSessionByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;

    const session = await Session.findOne({ roomId })
      .populate("skill")
      .populate("mentor", "name email")
      .populate("learner", "name email");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if user is authorized
    if (
      req.user.id !== session.mentor._id.toString() &&
      req.user.id !== session.learner._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(session);
  } catch (error) {
    console.error("Get session error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update session status
export const updateSessionStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { status } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if user is authorized
    if (
      req.user.id !== session.mentor.toString() &&
      req.user.id !== session.learner.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    session.status = status;
    await session.save();

    res.json({ message: "Session status updated", session });
  } catch (error) {
    console.error("Update session status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel session
export const cancelSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if user is authorized
    if (
      req.user.id !== session.mentor.toString() &&
      req.user.id !== session.learner.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    session.status = "cancelled";
    await session.save();

    res.json({ message: "Session cancelled", session });
  } catch (error) {
    console.error("Cancel session error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
