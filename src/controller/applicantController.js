const Applicant = require("../models/Applicant");
const mongoose = require("mongoose");
const jobApplicantCreate = async (req, res) => {
  try {
    const { name, email, jobPostId, coverLetter } = req.body;
    const applicantData = new Applicant({
      name,
      email,
      jobPostId: mongoose.Types.ObjectId(jobPostId),
      resume: `/images/${req.file.filename}`,
      "cover letter": `# ${coverLetter}`,
    });
    const data = await applicantData.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const listOfAllApplicant = async (req, res) => {
  try {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let startIndex = (page - 1) * limit;
    const applicantData = await Applicant.find({
      jobPostId: req.params.jobPostId,
    })
      .limit(limit)
      .skip(startIndex);
    if (applicantData) {
      res.status(200).json(applicantData);
    } else {
      res.status(200).json("no applicant there!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  jobApplicantCreate,
  listOfAllApplicant,
};
