const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const addComplaint = require("../../controllers/complaint/addComplaintController");
const getWorkerComplaints = require("../../controllers/complaint/getWorkerComplaintsController");

// customer gives complaint
router.post("/add", authMiddleware, addComplaint);

// worker views complaint
router.get("/worker", authMiddleware, getWorkerComplaints);

module.exports = router;
