const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const addComplaint = require("../../controllers/complaint/addComplaintController");
const getAllComplaints = require("../../controllers/complaint/getAllComplaints");
const resolveComplaint = require("../../controllers/complaint/resolveComplaint");
const getCustomerComplaints = require("../../controllers/complaint/getCustomerComplaints");

// customer gives complaint
router.post("/add", authMiddleware, addComplaint);

// admin views all complaints
router.get("/admin", authMiddleware, getAllComplaints);

// admin resolves complaint
router.put("/admin/:complaintId", authMiddleware, resolveComplaint);

// customer checks complaint updates
router.get("/customer", authMiddleware, getCustomerComplaints);

module.exports = router;