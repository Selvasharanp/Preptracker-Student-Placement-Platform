import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await Progress
      .find()
      .sort({ overallPerformance: -1 })
      .limit(10);

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;