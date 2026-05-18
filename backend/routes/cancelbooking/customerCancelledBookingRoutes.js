const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const getcustomerCancelledBookings = require("../../controllers/cancelbooking/getcustomerCancelledBookings");


router.get("/cancelled", authMiddleware, getcustomerCancelledBookings);

module.exports = router;