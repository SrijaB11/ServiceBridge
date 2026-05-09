const express = require("express");

const sendOtpController = require("../../controllers/regOTP/regSendOtpController");
const verifyOtpController = require("../../controllers/regOTP/regVerifyOtpController");
const customerRegisterController = require("../../controllers/registration/customerRegController");

const router = express.Router();

router.post("/customersendotp", sendOtpController);

router.post("/customerverifyotp", verifyOtpController);

router.post("/customerregister", customerRegisterController);

module.exports = router;