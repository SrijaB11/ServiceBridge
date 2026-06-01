const express = require("express");
const regController = require("../controllers/registration/customerRegController");
const loginController = require("../controllers/login/loginController");
const refreshTokenController = require("../controllers/login/refreshTokenController")
const logoutController = require("../controllers/login/logoutController")

const loginRateLimiter = require("../middlewares/loginRatelimiterMiddleware");

const regSendOtpController = require("../controllers/regOTP/regSendOtpController");
const regVerifyOtpController = require("../controllers/regOTP/regVerifyOtpController");
const checkVerificationAfterRefreshController = require("../controllers/regOTP/checkVerificationAfterRefresh");

const forgotPasswordController = require("../controllers/forgetPassword/forgetPasswordController");
const verifyResetOtpController = require("../controllers/forgetPassword/verifyResetOtpController");
const resetPasswordController = require("../controllers/forgetPassword/resetPasswordController");

const router = express.Router();

// register
router.post("/register", regController);

// register with otp
 router.post("/registerotp", regSendOtpController);
 router.post("/verifyotp", regVerifyOtpController);
 router.post("/checkverification",checkVerificationAfterRefreshController);

 // login
router.post("/login", loginRateLimiter, loginController);
router.post( "/refresh-token", refreshTokenController);
router.post("/logout", logoutController);

// Forgot Password
router.post("/forgotpassword", forgotPasswordController);
router.post("/verifyresetpassword", verifyResetOtpController);
router.post("/resetpassword", resetPasswordController);

module.exports = router;
