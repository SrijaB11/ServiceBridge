const otpGenerator = require("otp-generator");
const validator = require("validator");

const otpModel = require("../../models/OtpModel");
const userModel = require("../../models/UserModel");

const sendEmail = require("../../temporaryOTP/sendEmail");

const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    // Email required
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // Delete old OTP
    await otpModel.deleteMany({ email });

    // Save new OTP
    await otpModel.create({
      email,
      otp,
      purpose: "register",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send email
    await sendEmail(email, otp);

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    //console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = sendOtpController;
