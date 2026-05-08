const express = require("express");
const regController = require("../controllers/registration/customerRegController");
const loginController = require("../controllers/login/loginController");

const regSendOtpController = require("../controllers/regOTP/regSendOtpController");
const regVerifyOtpController = require("../controllers/regOTP/regVerifyOtpController");

const forgotPasswordController = require("../controllers/forgetPassword/forgetPasswordController");
const resetPasswordController = require("../controllers/forgetPassword/resetPasswordController");

const router = express.Router();

// register
router.post("/register", regController);

// register with otp
router.post("/registerotp", regSendOtpController);
router.post("/verifyotp", regVerifyOtpController);

router.post("/login", loginController);

// Forgot Password
router.post("/forgotpassword", forgotPasswordController);
router.post("/resetpassword", resetPasswordController);

module.exports = router;
