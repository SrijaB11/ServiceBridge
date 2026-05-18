const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const getWorkerCancelledBookings = require("../../controllers/cancelbooking/getWorkerCancelledBookings");

router.get("/worker/cancelled", authMiddleware, getWorkerCancelledBookings);

module.exports = router;