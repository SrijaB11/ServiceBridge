// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const workerBookingController = require("../../controllers/booking/workerBookingController");
const workerAvailabilityController = require("../../controllers/booking/workerAvailabilityController")

// Customer books
router.post("/book", authMiddleware, workerBookingController);

// Get available dates
router.get("/availability/:workerId", workerAvailabilityController);

module.exports = router;