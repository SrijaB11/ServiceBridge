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
      name: "skillDocs",
      maxCount: 5,
    },
  ]),
  uploadWorkerDocs
);

module.exports = router;