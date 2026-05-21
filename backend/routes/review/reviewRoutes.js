const express = require("express");
const router = express.Router();

const createReviewCustomerController = require("../../controllers/review/createReviewCustomerController");
const getMyReviewWorkerController = require("../../controllers/review/getMyReviewWorkerController");
const getMyReviewCustomerController = require("../../controllers/review/getMyReviewCustomerController");

const customerMiddleware = require("../../middlewares/customerMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
router.post(
  "/add",
  (req, res, next) => {
    console.log("POST /review/add reached");
    next();
  },
  authMiddleware,customerMiddleware,
  createReviewCustomerController,
);
// Customer gives review
//router.post("/add", authMiddleware, createReviewCustomerController);

// Worker views their reviews
router.get("/myReview", authMiddleware, getMyReviewWorkerController);

// Customer views his own given review
router.get("/mygivenReviews", authMiddleware,customerMiddleware, getMyReviewCustomerController);

module.exports = router;
