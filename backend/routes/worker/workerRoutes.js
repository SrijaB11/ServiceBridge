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
  getWorkerRequests,
  acceptRequest,
  rejectRequest,
  updateWorkerProfile,
  completeRequest,
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
      name: "skillDocs",
      maxCount: 5,
    },
  ]),
  uploadWorkerDocs
);


router.get(
  "/requests",
  authMiddleware,
  getWorkerRequests
);

router.put(
  "/request/accept/:requestId",
  authMiddleware,
  acceptRequest
);

router.put(
  "/request/reject/:requestId",
  authMiddleware,
  rejectRequest
);


router.put(
  "/update-profile",
  authMiddleware,
  updateWorkerProfile
);

router.put(
  "/request/complete/:requestId",
  authMiddleware,
  completeRequest
);


router.post(
  "/complaint/add",
  authMiddleware,
);

router.get("/workerverificationstatus",authMiddleware,getWorkerVerificationStatusRoute);

module.exports = router;