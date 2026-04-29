// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const workerBookingController = require("../../controllers/booking/workerBookingController");
const workerAvailabilityController = require("../../controllers/booking/workerAvailabilityController");
const getWorkerRequest = require("../../controllers/booking/getWorkerRequestController");
const updateBookingStatus = require("../../controllers/booking/updateBookingStatusController");

// Customer books
router.post("/book", authMiddleware, workerBookingController);

// Get available dates
router.get("/availability/:workerId", workerAvailabilityController);

// Worker sees request
router.get("/worker", authMiddleware, getWorkerRequest);

// Worker accepts or rejects
router.get("/:id", authMiddleware, updateBookingStatus);

module.exports = router;