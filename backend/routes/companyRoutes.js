import express from "express";
import Company from "../models/Company.js";

const router = express.Router();


// ✅ Get all companies (cards page)
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Get single company (details page)
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Add company (Postman)
router.post("/", async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.json(newCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export default router;