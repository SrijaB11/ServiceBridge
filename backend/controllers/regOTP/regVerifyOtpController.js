const userModel = require("../../models/UserModel");
const otpStore = require("../../temporaryOTP/otpStore");

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const data = otpStore[email];

    if (!data) {
      return res.status(400).json({
        message: "No OTP found",
      });
    }

    // Expiry check
    if (Date.now() > data.expiresAt) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // OTP match
    if (data.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Create user NOW
    await userModel.create(data.userData);

    // Clean memory
    delete otpStore[email];

    return res.status(201).json({
      message: "Registration successful",
    });

  } 
  
  catch (err) {
    return res.status(500).json({
      message: "Verification failed",
    });
  }
};

module.exports = verifyOtpController;