const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const adminDashboardStatsController = require("../../controllers/admin/adminDashboardStatsController");

router.get("/stats", authMiddleware, adminDashboardStatsController);

module.exports = router;    

