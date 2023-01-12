const mongoose = require("mongoose");

const JobPost = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, require: true },
    email: { type: String, required: true },
    experience: { type: String, required: true },
    skills: [{ type: String, required: true }],
    createdBy: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobpost", JobPost);
