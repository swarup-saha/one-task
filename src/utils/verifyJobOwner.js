const JobPost = require("../models/JobPost");

const isOwnerForCheck = async (req, res, next) => {
  try {
    const data = await JobPost.findById(req.params.jobPostId);
    if (data) {
      next();
    } else {
      res.status(403).json("user is access to this!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  isOwnerForCheck,
};
