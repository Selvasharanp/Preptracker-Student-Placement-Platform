import express from "express";
import Problem from "../models/Problem.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const problems = await Problem.insertMany(req.body);
      res.json({ message: "Problems added", problems });
    } else {
      const problem = new Problem(req.body);
      await problem.save();
      res.json({ message: "Problem added", problem });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { platform } = req.query;

    let filter = {};
    if (platform) {
      filter = { platform: platform };
    }

    const problems = await Problem.find(filter);
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
