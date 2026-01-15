import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillPost",
      required: true,
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
    },
    // Notification tracking
    mentorRead: {
      type: Boolean,
      default: false,
    },
    learnerRead: {
      type: Boolean,
      default: true, // Learner created it, so they've "read" it
    },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
