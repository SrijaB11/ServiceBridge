const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const addComplaint = require("../../controllers/customercomplaint/addComplaintController");
const getAllComplaints = require("../../controllers/customercomplaint/getAllComplaints");
const resolveComplaint = require("../../controllers/customercomplaint/resolveComplaint");
const getCustomerComplaints = require("../../controllers/customercomplaint/getCustomerComplaints");


// customer gives complaint
router.post("/add", authMiddleware, addComplaint);

// admin views all complaints
router.get("/admin", authMiddleware, getAllComplaints);

// admin resolve complaints
router.put("/admin/:complaintId", authMiddleware, resolveComplaint);

// customer checks all complaints
router.get("/customer", authMiddleware, getCustomerComplaints);


module.exports = router;