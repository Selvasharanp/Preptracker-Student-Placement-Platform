import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: String,
  url: String
});

const learningSchema = new mongoose.Schema({
  category: String,

  // ✅ NEW
  roadmap: [String],

  topics: [topicSchema]
});

export default mongoose.model("Learning", learningSchema);