const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}`
    });

    return true;

  } catch (error) {
    console.log("Email error:", error.responseCode || error.message);

    // failures
    if (error.responseCode === 550 || error.responseCode === 553) {
      return false;
    }

    throw new Error("Email service failed");
  }
};

module.exports = sendEmail;