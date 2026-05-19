
const express = require("express");
const router = express.Router();

const createReviewCustomerController = require("../../controllers/review/createReviewCustomerController");
const getMyReviewWorkerController = require("../../controllers/review/getMyReviewWorkerController");
const getMyReviewCustomerController = require("../../controllers/review/getMyReviewCustomerController");

const authMiddleware = require("../../middlewares/authMiddleware");

// Customer gives review
router.post("/add", authMiddleware, createReviewCustomerController);

// Worker views their reviews
router.get("/myReview", authMiddleware, getMyReviewWorkerController);

// Customer views his own given review
router.get("/mygivenReviews",authMiddleware,getMyReviewCustomerController);

module.exports = router;