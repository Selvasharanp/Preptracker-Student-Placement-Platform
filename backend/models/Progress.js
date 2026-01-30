import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem"
    },

    aptitudeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aptitude"
    },

    platform: String,

    score: Number,

    type: {
      type: String,
      enum: ["coding", "aptitude"],
      required: true
    },

    status: {
      type: String,
      default: "completed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);