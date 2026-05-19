const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../../middlewares/authMiddleware"
);

const {
  getWorkerPayments,
  markWorkerPaid,
  getPaymentStats,
} = require(
  "../../controllers/admin/adminPaymentController"
);


router.get(
  "/worker-payments",
  authMiddleware,
  getWorkerPayments
);


router.put(
  "/pay-worker/:bookingId",
  authMiddleware,
  markWorkerPaid
);

router.get(
  "/payment-stats",
  authMiddleware,
  getPaymentStats
);

module.exports = router;