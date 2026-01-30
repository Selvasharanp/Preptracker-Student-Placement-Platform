import express from "express";
import Learning from "../models/Learning.js";
import LearningProgress from "../models/LearningProgress.js";

const router = express.Router();


/* =====================================================
   GET ALL COURSES
   GET /api/learning
===================================================== */
router.get("/", async (req, res) => {
  const data = await Learning.find();
  res.json(data);
});


/* =====================================================
   GET SINGLE COURSE
   GET /api/learning/:id
===================================================== */
router.get("/:id", async (req, res) => {
  const data = await Learning.findById(req.params.id);
  res.json(data);
});


/* =====================================================
   MARK TOPIC COMPLETE (course wise)
   POST /api/learning/complete
===================================================== */
router.post("/complete", async (req, res) => {
  const { userId, topicId, courseId } = req.body;

  let progress = await LearningProgress.findOne({
    user: userId,
    course: courseId
  });

  if (!progress) {
    progress = new LearningProgress({
      user: userId,
      course: courseId,
      completedTopics: []
    });
  }

  if (!progress.completedTopics.includes(topicId)) {
    progress.completedTopics.push(topicId);
  }

  await progress.save();

  res.json(progress);
});


/* =====================================================
   COURSE PROGRESS %
   GET /api/learning/progress/:courseId/:userId
===================================================== */
router.get("/progress/:courseId/:userId", async (req, res) => {
  const { courseId, userId } = req.params;

  const course = await Learning.findById(courseId);
  const totalTopics = course.topics.length;

  const progress = await LearningProgress.findOne({
    user: userId,
    course: courseId
  });

  const completed = progress ? progress.completedTopics.length : 0;

  const percent =
    totalTopics === 0 ? 0 : Math.round((completed / totalTopics) * 100);

  res.json({
    percent,
    completedTopics: progress?.completedTopics || []
  });
});


/* =====================================================
   OVERALL LEARNING %
   GET /api/learning/overall/:userId
   (for dashboard)
===================================================== */
router.get("/overall/:userId", async (req, res) => {
  const { userId } = req.params;

  const courses = await Learning.find();

  let totalTopics = 0;
  let totalCompleted = 0;

  for (const course of courses) {
    totalTopics += course.topics.length;

    const progress = await LearningProgress.findOne({
      user: userId,
      course: course._id
    });

    if (progress) {
      totalCompleted += progress.completedTopics.length;
    }
  }

  const percent =
    totalTopics === 0 ? 0 : Math.round((totalCompleted / totalTopics) * 100);

  res.json({ percent });
});


export default router;