const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const gettotalWorkers = require("../../controllers/totalworkers/gettotalWorkers");

router.get("/totalworkers", authMiddleware, gettotalWorkers);

module.exports = router;
