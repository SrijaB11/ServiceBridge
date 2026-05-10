const userModel = require("../../models/UserModel");
const otpModel = require("../../models/OtpModel");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../temporaryOTP/sendEmail");

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Delete old OTP
    await otpModel.deleteMany({
      email,
      purpose: "reset",
    });

    // Save OTP
    await otpModel.create({
      email,
      otp,
      purpose: "reset",
      verified: false,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send email
    await sendEmail(email, otp);

    return res.status(200).json({
      message: "OTP has been sent",
    });

  } catch (err) {
   // console.log(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = forgotPasswordController;