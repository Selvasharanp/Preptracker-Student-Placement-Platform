import express from "express";
import mongoose from "mongoose";
import Progress from "../models/Progress.js";
import AptitudeProgress from "../models/AptitudeProgress.js"; // ✅ IMPORTANT

const router = express.Router();

/* ================= CODING PROGRESS ================= */

// Mark coding problem as completed
router.post("/coding", async (req, res) => {
  try {
    const { userId, problemId, platform } = req.body;

    if (!userId || !problemId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const exists = await Progress.findOne({
      userId,
      problemId,
      type: "coding"
    });

    if (exists) {
      return res.json({ message: "Already completed" });
    }

    await Progress.create({
      userId,
      problemId,
      platform,
      type: "coding"
    });

    res.json({ message: "Marked as completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CHECK CODING COMPLETED ================= */

router.get("/coding/check/:userId/:problemId", async (req, res) => {
  try {
    const { userId, problemId } = req.params;

    const exists = await Progress.findOne({
      userId,
      problemId,
      type: "coding"
    });

    res.json({ completed: !!exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= SUMMARY (🔥 FIXED) ================= */

router.get("/summary/:userId", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    /* ✅ coding from Progress */
    const codingCount = await Progress.countDocuments({
      userId,
      type: "coding"
    });

    /* ✅ aptitude from AptitudeProgress (THIS IS THE FIX) */
    const aptitudeCount = await AptitudeProgress.countDocuments({
      userId
    });

    /* coding grouped by platform */
    const codingByPlatform = await Progress.aggregate([
      { $match: { userId, type: "coding" } },
      {
        $group: {
          _id: "$platform",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalTasks = 30; // adjust if needed
    const overall = Math.round(
      ((codingCount + aptitudeCount) / totalTasks) * 100
    );

    res.json({
      codingCount,
      aptitudeCount,
      codingByPlatform,
      overall
    });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;