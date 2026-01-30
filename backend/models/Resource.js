import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  category: String,  // Full Stack, AI, DSA, Data Science
  topic: String,
  youtubeUrl: String
});

export default mongoose.model("Resource", resourceSchema);
