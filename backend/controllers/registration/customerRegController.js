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

    // validations
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !location ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // OTP verification check
    const otpRecord = await otpModel.findOne({ email, verified: true, });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message:"Email not verified",
      });
    }

    // email validation
    if ( !validator.isEmail(email) ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimum 6 characters",
      });
    }

    // password match
    if ( password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =await bcrypt.hash( password, salt );

    // create customer
    const customer = await userModel.create({
        fullName,
        email,
        password:hashedPassword,
        location,
        phone,
        role,
        isVerified: true,
      });

    // delete otp
    await otpModel.deleteMany({ email });

    // generate token
    const token = jwt.sign( { id: customer._id,role:customer.role, },process.env.JWT_SECRET,{ expiresIn: "1d", });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: customer._id,
        fullName: customer.fullName,
        email: customer.email,
        role: customer.role,
      },
    });

  } catch (error) {

   // console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });

  }
};

module.exports = registerController;