const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const gettotalBookings = require("../../controllers/totalbookings/gettotalBookings");

// total no of bookings
router.get("/totalbookings", authMiddleware, gettotalBookings);

module.exports = router;