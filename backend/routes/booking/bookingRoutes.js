
const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const customerMiddleware = require("../../middlewares/customerMiddleware");

const workerBookingController = require("../../controllers/booking/workerBookingController");
const workerAvailabilityController = require("../../controllers/booking/workerAvailabilityController");
const getWorkerRequest = require("../../controllers/booking/getWorkerRequestController");
const updateBookingStatus = require("../../controllers/booking/updateBookingStatusController");
const getCustomerBookings = require("../../controllers/booking/workerBookinggetController");
const admingetAllBookings = require("../../controllers/booking/adminGetsBookingstatusController");
const getSingleBookingController = require( "../../controllers/booking/getSingleBookingController");


// Customer books
router.post("/book", authMiddleware, workerBookingController);

// Get available dates
router.get("/availability/:workerId",authMiddleware, workerAvailabilityController);

// Worker sees request
router.get("/worker", authMiddleware, getWorkerRequest);

// Worker accepts or rejects
router.put("/:id", authMiddleware, updateBookingStatus);

// Customer sees booking status
router.get("/customerbookingstatus",authMiddleware, getCustomerBookings);


// Admin gets Customer sees booking status
router.get("/customerbookingstatusforadmin",authMiddleware, admingetAllBookings);

router.get( "/:id", authMiddleware,getSingleBookingController);

module.exports = router;