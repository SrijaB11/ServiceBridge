const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const cancelBooking = require("../../controllers/cancelbooking/cancelBooking");

router.put("/cancel/:bookingId", authMiddleware, cancelBooking);

module.exports = router;