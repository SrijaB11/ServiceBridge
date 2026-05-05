
const userModel = require("../../models/UserModel");
const otpModel = require("../../models/OtpModel");

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await otpModel.findOne({ email });

    if (!record) {
      return res.status(400).json({
        message: "No OTP found",
      });
    }

    // Expiry check
    if (new Date() > record.expiresAt) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // OTP match
    if (record.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Create user
    await userModel.create(record.userData);

    // Delete OTP 
    await otpModel.deleteOne({ email });

    return res.status(201).json({
      message: "Registration successful",
    });

  } catch (err) {
    return res.status(500).json({
      message: "Verification failed",
    });
  }
};

module.exports = verifyOtpController;