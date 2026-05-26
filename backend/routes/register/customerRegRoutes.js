const express = require("express");

const sendOtpController = require("../../controllers/regOTP/regSendOtpController");
const verifyOtpController = require("../../controllers/regOTP/regVerifyOtpController");
const checkVerificationAfterRefreshController = require("../../controllers/regOTP/checkVerificationAfterRefresh");
const customerRegisterController = require("../../controllers/registration/customerRegController");

const router = express.Router();

router.post("/customersendotp", sendOtpController);

router.post("/customerverifyotp", verifyOtpController);

router.post("/checkverification",checkVerificationAfterRefreshController);

router.post("/customerregister", customerRegisterController);

module.exports = router;