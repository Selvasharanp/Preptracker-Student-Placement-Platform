import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  problemUrl: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  youtubeUrl: {
    type: String,
    required: true
  },
  testCases: [
    {
      input: String,
      output: String
    }
  ]
});

export default mongoose.model("Problem", problemSchema);
