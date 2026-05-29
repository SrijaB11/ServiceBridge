const express = require("express");

const router =express.Router();

const payAdminToWorkerRoutes =require("../../controllers/payment/payAdminToWorkerController");
const adminGetsWorkerPaymentHistoryRoutes =require("../../controllers/payment/adminGetsWorkerPaymentHistory");
const adminGetsCommissionHistorRoutes =require("../../controllers/payment/adminGetsCommissionHistory");
const {createWorkerPaymentOrder, verifyWorkerPayment,} = require("../../controllers/payment/adminpaymentController");

router.put("/payadmintoworker",payAdminToWorkerRoutes);

router.get("/workerpaymenthistory",adminGetsWorkerPaymentHistoryRoutes);

router.get("/commissionhistory",adminGetsCommissionHistorRoutes);


router.post(
  "/create-worker-payment-order",
  createWorkerPaymentOrder
);

router.post(
  "/verify-worker-payment",
  verifyWorkerPayment
);

module.exports = router;