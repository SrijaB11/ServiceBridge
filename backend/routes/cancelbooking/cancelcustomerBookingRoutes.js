const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const customercancelBooking = require("../../controllers/cancelbooking/customercancelBooking");

router.put("/cancel/:bookingId", authMiddleware, customercancelBooking);

module.exports = router;