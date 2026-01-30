import express from "express";
import Aptitude from "../models/Aptitude.js";
import AptitudeProgress from "../models/AptitudeProgress.js";

const router = express.Router();

/* ================= GET APTITUDE TOPICS ================= */
router.get("/", async (req, res) => {
  try {
    const data = await Aptitude.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= SUBMIT APTITUDE TEST ================= */
router.post("/submit", async (req, res) => {
  try {
    const { userId, aptitudeId, score } = req.body;

    if (!userId || !aptitudeId) {
      return res.status(400).json({ message: "Missing data" });
    }

    // prevent duplicate attempts
    const exists = await AptitudeProgress.findOne({ userId, aptitudeId });
    if (exists) {
      return res.json(exists);
    }

    const progress = new AptitudeProgress({
      userId,
      aptitudeId,
      score,
      status: "completed"
    });

    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET USER APTITUDE PROGRESS ================= */
router.get("/progress/:userId", async (req, res) => {
  try {
    const progress = await AptitudeProgress.find({
      userId: req.params.userId
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;