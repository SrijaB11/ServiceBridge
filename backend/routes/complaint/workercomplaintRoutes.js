const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const addWorkerComplaint = require("../../controllers/workercomplaint/addWorkerComplaint");
const adminComplaint = require("../../controllers/workercomplaint/adminComplaint");
const resolveWorkerComplaints = require("../../controllers/workercomplaint/resolveWorkerComplaints");
const getWorkerComplaints = require("../../controllers/workercomplaint/getWorkerComplaints");

// worker gives complaint
router.post("/addworker", authMiddleware, addWorkerComplaint);

// admin views complaint
router.get("/complaints/admin", authMiddleware, adminComplaint);

// admin resolve complaint 
router.put("/admin/:id", authMiddleware, resolveWorkerComplaints);

// admin checks complaint
router.get("/worker", authMiddleware, getWorkerComplaints);


module.exports = router;