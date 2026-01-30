import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  title: String,
  url: String
});

const companySchema = new mongoose.Schema({
  name: String,
  logo: String,

  aptitude: {
    topics: [String],
    links: [linkSchema]
  },

  coding: {
    topics: [String],
    links: [linkSchema]
  },

  hr: {
    links: [linkSchema]
  }
});

export default mongoose.model("Company", companySchema);