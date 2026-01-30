import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, problemId, platform } = req.body;

  // prevent duplicate completion
  const exists = await Submission.findOne({ userId, problemId });
  if (exists) {
    return res.status(200).json({ message: "Already completed" });
  }

  const submission = new Submission({
    userId,
    problemId,
    platform
  });

  await submission.save();
  res.status(201).json({ message: "Marked as completed" });
});

export default router;