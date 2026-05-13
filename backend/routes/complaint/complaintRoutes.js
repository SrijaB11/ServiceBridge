const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");


const addComplaint = require("../../controllers/complaint/customercomplaint/addComplaintController");
const getAllComplaints = require("../../controllers/complaint/customercomplaint/getAllComplaints");
const resolveComplaint = require("../../controllers/complaint/customercomplaint/resolveComplaint");
const getCustomerComplaints = require("../../controllers/complaint/customercomplaint/getCustomerComplaints");

// customer gives complaint
router.post("/add", authMiddleware, addComplaint);
router.get("/admin", authMiddleware, getAllComplaints);
router.put("/admin/:complaintId", authMiddleware, resolveComplaint);
router.get("/customer", authMiddleware, getCustomerComplaints);


router.post("/complaint/worker", authMiddleware, addWorkerComplaint);
router.get("/complaint/admin", authMiddleware, adminComplaint);
router.put("/complaint/admin/:id", authMiddleware, resolveWorkerComplaints);
router.get("/complaint/worker", authMiddleware, getWorkerComplaints);

module.exports = router;