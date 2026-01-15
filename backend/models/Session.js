import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillPost",
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      default: 60,
    },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "cancelled"],
      default: "scheduled",
    },
    roomId: {
      type: String,
      unique: true,
      required: true,
    },
    notes: {
      type: String,
    },
    meetingLink: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
