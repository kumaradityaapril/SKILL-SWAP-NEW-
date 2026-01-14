import mongoose from "mongoose";

import SkillPost from "../models/SkillPost.js";
import cloudinary from "../config/cloudinary.js";

console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);

export const createSkillPost = async (req, res) => {
  try {
    let image = {};

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const skill = await SkillPost.create({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags?.split(","),
      availability: req.body.availability,
      image,
      mentor: req.user.id,
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const { search, tag, availability, page = 1, limit = 6 } = req.query;

    const query = {};

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    // Filter by availability
    if (availability) {
      query.availability = availability;
    }

    const skip = (page - 1) * limit;

    const skills = await SkillPost.find(query)
      .populate("mentor", "name role")
      .skip(skip)
      .limit(Number(limit));

    const total = await SkillPost.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      skills,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Prevent invalid ObjectId crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid skill ID" });
    }

    const skill = await SkillPost.findById(id)
      .populate("mentor", "name email role");

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

