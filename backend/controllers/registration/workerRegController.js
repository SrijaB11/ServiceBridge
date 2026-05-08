const bcrypt = require("bcryptjs");
const validator = require("validator");

const otpModel = require("../../models/OtpModel");
const userModel = require("../../models/UserModel");

const workerRegisterController = async (req, res) => {
  try {

    const {
      fullName,
      email,
      phone,
      location,
      password,
      confirmPassword,
      role,
    } = req.body;

    // Required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !location ||
      !password ||
      !confirmPassword 
    ) {
      return res.status(400).json({
        message: "All fields are required",
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
        message: "Password must be minimum 6 characters",
      });
    }

    // Password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // OTP verified check
    const otpRecord = await otpModel.findOne({
      email,
      verified: true,
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Email not verified",
      });
    }

    // Existing worker
    const existingWorker = await workerModel.findOne({ email });

    if (existingWorker) {
      return res.status(400).json({
        message: "Worker already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create worker
    await workerModel.create({
      fullName,
      email,
      phone,
      location,
      password: hashedPassword,
      role,
      services,

      documents: {
        profilePhoto: "",
        panCard: "",
        skillDoc: "",
      },
    });

    // Delete OTP
    await otpModel.deleteMany({ email });

    res.status(201).json({
      message: "Worker registration successful",
    });

  } catch (error) {
    //console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = workerRegisterController;