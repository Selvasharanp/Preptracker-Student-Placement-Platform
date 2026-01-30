import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learning"   // ⭐ NEW
  },

  completedTopics: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

export default mongoose.model("LearningProgress", progressSchema);