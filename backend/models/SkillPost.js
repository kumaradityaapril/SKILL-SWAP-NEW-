import mongoose from "mongoose";

const skillPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  availability: {type : String},
  image: {
    public_id: String,
    url: String,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("SkillPost", skillPostSchema);
