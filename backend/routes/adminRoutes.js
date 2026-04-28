const express = require("express");
const upload = require("../middleware/upload");
const { verifyWorker } = require("../controllers/adminController");

const router = express.Router();

router.put("/verify-worker/:id", authMiddleware, verifyWorker);

module.exports = router;