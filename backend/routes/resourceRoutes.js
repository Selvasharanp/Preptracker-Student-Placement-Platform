import express from "express";
import Resource from "../models/Resource.js";

const router = express.Router();

// Add a YouTube resource (Admin)
router.post("/add", async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json({ message: "Resource added successfully", resource });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all resources (Student)
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
