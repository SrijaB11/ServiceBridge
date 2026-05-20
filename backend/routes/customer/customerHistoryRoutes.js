const express = require("express");
const router = express.Router();

const customerHistoryController = require("../../controllers/customer/historyCustomerController");

const authMiddleware = require("../../middlewares/authMiddleware");

router.get("/history",authMiddleware,customerHistoryController);

module.exports = router;