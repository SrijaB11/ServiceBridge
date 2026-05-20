const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");

const workerGetsToKnowHisAmountRecievedRoutes = require("../../controllers/payment/workerGetsToKnowHisAmountRecieved");

router.get(
  "/workerPaymentHistory",
  authMiddleware,
  workerGetsToKnowHisAmountRecievedRoutes
);

module.exports = router;