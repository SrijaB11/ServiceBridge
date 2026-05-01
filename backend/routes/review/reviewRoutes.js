// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();

const createReviewCustomerController = require("../../controllers/review/createReviewCustomerController");
const getMyReviewWorkerController = require("../../controllers/review/getMyReviewWorkerController");

const authMiddleware = require("../../middlewares/authMiddleware");

// Customer gives review
router.post("/add", authMiddleware, createReviewCustomerController);

// Worker views their reviews
router.get("/myReview", authMiddleware, getMyReviewWorkerController);

module.exports = router;