const otpModel = require("../../models/OtpModel");

const checkVerificationAfterRefreshController = async (req,res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const record =
      await otpModel.findOne({
        email,
        verified: true,
        purpose: "register",
      });

    res.status(200).json({
      success: true,
      verified: !!record,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = checkVerificationAfterRefreshController;