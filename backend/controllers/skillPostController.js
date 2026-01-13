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
  const skills = await SkillPost.find().populate("mentor", "name role");
  res.json(skills);
};
