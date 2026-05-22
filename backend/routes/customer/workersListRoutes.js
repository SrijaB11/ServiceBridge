const express = require("express");
const getWorkersByService = require("../../controllers/customer/workersListController");

const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const customerMiddleware = require("../../middlewares/customerMiddleware");

// GET/workers/byService
router.get("/workerslist/:service", getWorkersByService);

module.exports = router;

