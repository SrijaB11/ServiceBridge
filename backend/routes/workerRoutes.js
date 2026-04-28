const express = require("express");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadDocuments } = require("../controllers/workerController");

const router = express.Router();

router.post("/upload-docs",authMiddleware,
    upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "certificate", maxCount: 1 }
  ]),
  uploadDocuments   
);

module.exports = router;