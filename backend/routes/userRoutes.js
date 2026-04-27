const express = require("express");
const regController = require("../controllers/regController");
const loginController = require("../controllers/loginController");

const regSendOtpController = require("../controllers/regOTP/regSendOtpController");
const regVerifyOtpController = require("../controllers/regOTP/regVerifyOtpController");

const router = express.Router();

// register 
//router.post("/register", regController);

// register with otp
router.post("/register", regSendOtpController);       // send OTP
router.post("/verify-otp", regVerifyOtpController); 

router.post("/login", loginController);

module.exports=router;
