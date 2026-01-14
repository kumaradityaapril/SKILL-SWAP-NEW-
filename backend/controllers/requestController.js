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
