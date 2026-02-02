// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import aptitudeRoutes from "./routes/aptitudeRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import runRoutes from "./routes/runRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/code", runRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/notes", noteRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Placement Platform Backend Running...");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
