const userModel = require("../../models/UserModel");
const otpModel = require("../../models/OtpModel");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../temporaryOTP/sendEmail");
const validator = require("validator");
const bcrypt = require("bcrypt");

const regController = async (req, res) => {
  try {
    const data = req.body;

    // Required fields
    if (
      !data.fullName ||
      !data.email ||
      !data.phone ||
      !data.location ||
      !data.password ||
      !data.role
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Email format validation
    if (!validator.isEmail(data.email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    //console.log("Attempting to send OTP to:", data.email);

    // Send email
    const emailSent = await sendEmail(data.email, otp);

    // Email exists or not 
    if (!emailSent) {
      return res.status(200).json({
        message: "If the email exists, an OTP has been sent"
      });
    }

    // Store otp in database
    await otpModel.deleteMany({ email: data.email });

    await otpModel.create({
      email: data.email,
      otp,
      userData: data,
      purpose: "register",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    return res.status(200).json({
      message: "If the email exists, an OTP has been sent"
    });

  } catch (err) {
    // console.log(err);
    return res.status(500).json({
      message: "Registration unsuccessful",
    });
  }
};

module.exports = regController;