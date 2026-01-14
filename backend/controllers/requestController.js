import Request from "../models/Request.js";
import SkillPost from "../models/SkillPost.js";
import mongoose from "mongoose";

/**
 * Learner sends request to mentor
 */
export const createRequest = async (req, res) => {
  try {
    const { skillId, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      return res.status(400).json({ message: "Invalid skill ID" });
    }

    const skill = await SkillPost.findById(skillId).populate("mentor");

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Prevent mentor requesting own skill
    if (skill.mentor._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot request your own skill" });
    }

    const existingRequest = await Request.findOne({
      skill: skillId,
      learner: req.user._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await Request.create({
      skill: skillId,
      learner: req.user._id,
      mentor: skill.mentor._id,
      message,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Mentor views incoming requests
 */
export const getMentorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ mentor: req.user._id })
      .populate("skill", "title")
      .populate("learner", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Ensure only mentor can update their requests
    if (request.mentor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getLearnerRequests = async (req, res) => {
  try {
    const requests = await Request.find({ learner: req.user._id })
      .populate("skill", "title")
      .populate("mentor", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

