const userModel = require("../../models/UserModel");
const otpGenerator = require("otp-generator");
const otpStore = require("../../temporaryOTP/otpStore");
const sendEmail = require("../../temporaryOTP/sendEmail");

const regController = async (req, res) => {
  try {
    const data = req.body;

    if (
      !data.fullName ||
      !data.email ||
      !data.phone ||
      !data.location ||
      !data.password ||
      !data.role
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    // Store temporarily (IMPORTANT)
    otpStore[data.email] = {
      otp,
      userData: data,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    //console.log("OTP:", otp); 

    // Send email
    await sendEmail(data.email, otp);

    return res.status(200).json({
      message: "OTP sent to email",
    });

  } 
  catch (err) {
    console.log("ERROR:", err);   
    return res.status(500).json({
      message: "Registration unsuccessful",
            
    });
  }
};

module.exports = regController;