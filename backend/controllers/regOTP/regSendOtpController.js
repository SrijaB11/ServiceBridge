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
        message: "Email required",
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // Existing registered user
    const existingUser = await userModel
      .findOne({ email })
      .lean();

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Check already verified
    const verifiedOtp =
      await otpModel.findOne({
        email,
        verified: true,
        purpose: "register",
      });

    if (verifiedOtp) {
      return res.status(200).json({
        success: true,
        verified: true,
        message:
          "Email already verified",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(
      6,
      {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      }
    );

    // Expiry time
    const expiresAt = new Date(
      Date.now() +
      5 * 60 * 1000
    );

    // Save OTP
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

    // Response
    res.status(200).json({
      success: true,
      verified: false,
      message:
        "OTP sent successfully",
    });

    // Send email
    setImmediate(() => {
      sendEmail(email, otp);
    });

  }

  catch (error) {

    //console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports =
sendOtpController;