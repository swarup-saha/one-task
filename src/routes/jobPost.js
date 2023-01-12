const {
  jobPostCreate,
  fetchAllJobsBasedByFilter,
  fetchJobsBasedOnId,
} = require("../controller/jobPostController");
const { verifyTokenAndAutherization } = require("../utils/verifyToken");

const router = require("express").Router();

router.post("/create", verifyTokenAndAutherization, jobPostCreate);
router.get("/fetch", verifyTokenAndAutherization, fetchAllJobsBasedByFilter);
router.get("/fetch/:id", verifyTokenAndAutherization, fetchJobsBasedOnId);
module.exports = router;
