const {
  jobApplicantCreate,
  listOfAllApplicant,
} = require("../controller/applicantController");
const { isOwnerForCheck } = require("../utils/verifyJobOwner");
const { verifyTokenAndAutherization } = require("../utils/verifyToken");
const { multerStorage } = require("../utils/fileUploadUtil");
const multer = require("multer");
const router = require("express").Router();
let upload = multer({ storage: multerStorage("/images") });
router.post(
  "/create",
  verifyTokenAndAutherization,
  upload.single("resume"),
  jobApplicantCreate
);
router.get(
  "/fetch/:jobPostId",
  verifyTokenAndAutherization,
  isOwnerForCheck,
  listOfAllApplicant
);
module.exports = router;
