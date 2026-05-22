const otpModel = require("../../models/OtpModel");

const verifyResetOtpController = async (req, res) => {
  try {

    const { email, otp } = req.body;

    const record = await otpModel.findOne({email,purpose: "reset"});

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    // Expiry check
    if (new Date() > record.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Convert both to string
    const dbOtp = String(record.otp).trim();
    const userOtp = String(otp).trim();

    if (dbOtp !== userOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    record.verified = true;

    await record.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {

    //console.log(error);

    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });

  }
};

module.exports = verifyResetOtpController;