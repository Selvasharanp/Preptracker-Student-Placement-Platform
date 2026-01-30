import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  topic: {
    type: mongoose.Schema.Types.ObjectId   // ⭐ changed
  },

  text: String
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);