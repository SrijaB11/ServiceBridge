const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const getAdminCancelledBookings =require("../../controllers/cancelbooking/getAdminCancelledBookings");

router.get("/admin/cancelled", authMiddleware, getAdminCancelledBookings);

module.exports = router;