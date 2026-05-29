const express = require("express");

const sendOtpController = require("../../controllers/regOTP/regSendOtpController");
const verifyOtpController = require("../../controllers/regOTP/regVerifyOtpController");
const checkVerificationAfterRefreshController = require("../../controllers/regOTP/checkVerificationAfterRefresh");
const workerRegisterController = require("../../controllers/registration/workerRegController");

const router = express.Router();

router.post("/workersendotp", sendOtpController);

router.post("/workerverifyotp", verifyOtpController);

router.post("/checkverification",checkVerificationAfterRefreshController);

router.post("/workerregister", workerRegisterController);

module.exports = router;