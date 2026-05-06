const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/multerMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");

const { uploadWorkerDocs } = require("../../controllers/worker/workerController");

router.post(
  "/upload-documents",
  authMiddleware,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "skillDoc", maxCount: 1 },
  ]),
  uploadWorkerDocs
);

module.exports = router;