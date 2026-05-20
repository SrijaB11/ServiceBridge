const express = require("express");

const router =express.Router();

const payAdminToWorkerRoutes =require("../../controllers/payment/payAdminToWorkerController");
const adminGetsWorkerPaymentHistoryRoutes =require("../../controllers/payment/adminGetsWorkerPaymentHistory");
const adminGetsCommissionHistorRoutes =require("../../controllers/payment/adminGetsCommissionHistory");

router.put("/payadmintoworker",payAdminToWorkerRoutes);

router.get("/workerpaymenthistory",adminGetsWorkerPaymentHistoryRoutes);

router.get("/commissionhistory",adminGetsCommissionHistorRoutes);

module.exports = router;