import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import { mentorOnly } from "../middleware/roleMiddleware.js";
import {
  createSkillPost,
  getAllSkills,
} from "../controllers/skillPostController.js";
import { getSkillById } from "../controllers/skillPostController.js";


const router = express.Router();

router.post(
  "/",
  protect,
  mentorOnly,
  upload.single("image"),
  createSkillPost
);

router.get("/", getAllSkills);
router.get("/:id", getSkillById);


export default router;
