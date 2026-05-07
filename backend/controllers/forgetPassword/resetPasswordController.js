const userModel = require("../../models/UserModel");
const otpModel = require("../../models/OtpModel");
const bcrypt = require("bcrypt");

const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const record = await otpModel.findOne({ email, purpose: "reset" });

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

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await userModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    // Delete OTP
    await otpModel.deleteOne({ email });

    return res.status(200).json({
      message: "Password reset successful",
    });

  } catch (err) {
    return res.status(500).json({
      message: "Reset failed",
    });
  }
};

module.exports = resetPasswordController;