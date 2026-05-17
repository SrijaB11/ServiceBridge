const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const getCancelledBookings = require("../../controllers/cancelbooking/getCancelledBookings");


router.get("/cancelled", authMiddleware, getCancelledBookings);

module.exports = router;