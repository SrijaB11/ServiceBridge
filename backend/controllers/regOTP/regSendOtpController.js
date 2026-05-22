const otpGenerator = require("otp-generator");
const validator = require("validator");

const otpModel = require("../../models/OtpModel");
const userModel = require("../../models/UserModel");

const sendEmail = require("../../temporaryOTP/sendEmail");

const sendOtpController = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const existingUser = await userModel
      .findOne({ email })
      .lean();

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await otpModel.findOneAndUpdate(
      { email },

      {
        email,
        otp,
        purpose: "register",
        verified: false,
        expiresAt,
      },

      {
        upsert: true,
        new: true,
      }
    );

    // return immediately
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

    // background email sending
    setImmediate(() => {
      sendEmail(email, otp);
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = sendOtpController;