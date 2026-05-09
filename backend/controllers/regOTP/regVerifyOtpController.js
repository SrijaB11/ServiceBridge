const otpModel = require("../../models/OtpModel");

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check OTP record
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

    // Match OTP
    if (record.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Verified
    record.verified = true;

    await record.save();

    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    //console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = verifyOtpController;