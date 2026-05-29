const express = require("express");

const router = express.Router();

const customerRatingController = require("../../controllers/apprating/customerRatingController");
const getCustomerAppReviewController = require("../../controllers/apprating/getCustomerAppReviewController");
const getOverallRatingController = require("../../controllers/apprating/getOverallRatingController");

const authMiddleware = require("../../middlewares/authMiddleware");
const customerMiddleware = require("../../middlewares/customerMiddleware");

// Rate app by customer
router.post("/rate",customerRatingController);

// Get overall app rating
router.get("/overall",getOverallRatingController);

//Customer sees his own review
router.get("/customerappreview",getCustomerAppReviewController);

module.exports = router;