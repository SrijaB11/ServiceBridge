const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const customerDashboardStatsController = require("../../controllers/customer/customerDashboardStatsController");

router.get("/stats", authMiddleware, customerDashboardStatsController);

module.exports = router;