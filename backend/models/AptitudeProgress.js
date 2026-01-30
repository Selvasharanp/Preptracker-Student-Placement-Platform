import mongoose from "mongoose";

const aptitudeProgressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  aptitudeId: mongoose.Schema.Types.ObjectId,
  score: Number,
  status: { type: String, default: "completed" }
});

export default mongoose.model("AptitudeProgress", aptitudeProgressSchema);
