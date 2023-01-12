const JobPost = require("../models/JobPost");
const mongoose = require("mongoose");
const jobPostCreate = async (req, res) => {
  try {
    const { title, description, email, skills, experience, createdBy } =
      req.body;
    if (title && description && email && skills && experience && createdBy) {
      const jobData = new JobPost({
        title,
        description,
        email,
        skills,
        experience,
        createdBy: mongoose.Types.ObjectId(createdBy),
      });
      const data = await jobData.save();
      res.status(201).json(data);
    } else {
      res.status(200).json({ message: "need required information!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchAllJobsBasedByFilter = async (req, res) => {
  try {
    const { skills, experience } = req.body;
    let page = Number(req.body.page);
    let limit = Number(req.body.limit);
    let startIndex = (page - 1) * limit;
    if (skills && experience) {
      const jobData = await JobPost.aggregate([
        {
          $match: {
            experience,
            skills: { $in: skills },
          },
        },
        {
          $project: {
            skills: 1,
            title: 1,
            description: 1,
            createdBy: 1,
            experience: 1,
          },
        },
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);
      res.status(200).json(jobData);
    } else {
      const jobData = await JobPost.aggregate([
        {
          $project: {
            skills: 1,
            title: 1,
            description: 1,
            createdBy: 1,
            experience: 1,
          },
        },
        {
          $skip: startIndex,
        },
        {
          $limit: limit,
        },
      ]);
      res.status(200).json(jobData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const fetchJobsBasedOnId = async (req, res) => {
  try {
    const jobData = await JobPost.findById(req.params.id);
    res.status(200).json(jobData);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  jobPostCreate,
  fetchAllJobsBasedByFilter,
  fetchJobsBasedOnId,
};
