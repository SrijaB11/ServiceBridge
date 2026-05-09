const bcrypt = require("bcryptjs");
const validator = require("validator");

const userModel = require("../../models/UserModel");
const otpModel = require("../../models/OtpModel");

const registerController = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      location,
      phone,
    } = req.body;

    const role = "customer";

    // Required fields
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !location ||
      !phone
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check verified OTP
    const otpRecord = await otpModel.findOne({
      email,
      verified: true,
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Email not verified",
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password minimum 6 characters",
      });
    }

    // Password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      location,
      phone,
      role,
      isVerified: true,
    });

    // Delete OTP record
    await otpModel.deleteMany({ email });

    res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    //console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = registerController;