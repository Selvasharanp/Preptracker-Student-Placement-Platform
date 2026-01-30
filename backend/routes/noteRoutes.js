import express from "express";
import Note from "../models/Note.js";

const router = express.Router();


/* ======================
   CREATE
====================== */
router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.json(note);
});


/* ======================
   READ (topic based)
====================== */
router.get("/:topicId/:userId", async (req, res) => {
  const notes = await Note.find({
    topic: req.params.topicId,
    user: req.params.userId
  });

  res.json(notes);
});


/* ======================
   UPDATE
====================== */
router.put("/:id", async (req, res) => {
  const updated = await Note.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );

  res.json(updated);
});


/* ======================
   DELETE
====================== */
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;