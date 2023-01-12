const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resume: { type: String, required: true },
    "cover letter": { type: String, required: true },
    jobPostId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("applicant", ApplicantSchema);
