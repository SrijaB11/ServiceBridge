const express = require("express");
const getWorkersByService = require("../../controllers/customer/workersListController");

const router = express.Router();


// GET/workers/byService
router.get("/workerslist/:service", getWorkersByService);

module.exports = router;

