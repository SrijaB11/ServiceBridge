const express = require("express");

const router = express.Router();

const customerRatingController = require("../../controllers/apprating/customerRatingController");

const getOverallRatingController = require("../../controllers/apprating/getOverallRatingController");

const authMiddleware = require("../../middlewares/authMiddleware");
const customerMiddleware = require("../../middlewares/customerMiddleware");

// Rate app by customer
router.post("/rate",authMiddleware,customerRatingController);

// Get overall app rating
router.get("/overall",authMiddleware,getOverallRatingController);

module.exports = router;