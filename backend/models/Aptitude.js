import mongoose from "mongoose";

const aptitudeSchema = new mongoose.Schema({
  title: String,          // e.g. Time & Work
  topic: String,          // Arithmetic, Logical, Verbal
  youtubeUrl: String,     // Video link
  questions: [
    {
      question: String,
      options: [String],
      answer: Number      // index of correct option
    }
  ]
});

export default mongoose.model("Aptitude", aptitudeSchema);
