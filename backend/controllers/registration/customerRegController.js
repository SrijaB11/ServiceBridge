const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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

    const otpRecord = await otpModel.findOne({
      email,
      verified: true,
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Email not verified",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password minimum 6 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message:
          "Passwords do not match",
      });
    }

    const existingUser =
      await userModel.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    // SAVE USER
    const newUser =
      await userModel.create({
        fullName,
        email,
        password:
          hashedPassword,
        location,
        phone,
        role,
        isVerified: true,
      });

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
        name: newUser.fullName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await otpModel.deleteMany({
      email,
    });

    res.status(201).json({
      message:
        "Registration successful",
      token,
      role: newUser.role,
      name: newUser.fullName,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Server Error",
    });

  }
};

module.exports =
  registerController;