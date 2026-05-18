const express = require("express");

const router = express.Router();

const upload = require(
  "../../middlewares/multerMiddleware"
);

const authMiddleware = require(
  "../../middlewares/authMiddleware"
);

const {
  getWorkerProfile,
  uploadWorkerDocs,
} = require(
  "../../controllers/worker/workerController"
);

const getWorkerVerificationStatusRoute = require("../../controllers/worker/getworkerVerificationStatus");

router.get(
  "/profile",
  authMiddleware,
  getWorkerProfile
);

router.post(
  "/upload-documents",
  authMiddleware,
  upload.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    },

    {
      name: "panCard",
      maxCount: 1,
    },

    {
      name: "skillDoc",
      maxCount: 5,
    },
  ]),
  uploadWorkerDocs
);

router.get("/workerverificationstatus",authMiddleware,getWorkerVerificationStatusRoute);

module.exports = router;