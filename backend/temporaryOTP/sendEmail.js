const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

    }); 

    await transporter.sendMail({

      from: `"ServiceBridge Team" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "ServiceBridge - OTP Verification",

      html: `
      
      <div style="
        background:#f4f6f9;
        padding:40px;
        font-family:Arial,sans-serif;
      ">

        <div style="
          max-width:600px;
          margin:auto;
          background:white;
          border-radius:12px;
          padding:30px;
          box-shadow:0 4px 12px rgba(0,0,0,0.1);
        ">

          <div style="text-align:center;">

            <h1 style="
              color:#16a34a;
              margin-bottom:10px;
            ">
              ServiceBridge
            </h1>

            <p style="
              color:#666;
              font-size:15px;
            ">
              Secure Account Verification
            </p>

          </div>

          <hr style="
            margin:20px 0;
            border:none;
            border-top:1px solid #eee;
          ">

          <h2 style="
            color:#222;
          ">
            Hello User,
          </h2>

          <p style="
            color:#555;
            line-height:1.6;
          ">
            Use the OTP below to verify your account on 
            <b>ServiceBridge</b>.
          </p>

          <div style="
            background:#ecfdf5;
            border:2px dashed #16a34a;
            border-radius:10px;
            padding:20px;
            text-align:center;
            margin:30px 0;
          ">

            <span style="
              font-size:34px;
              font-weight:bold;
              letter-spacing:8px;
              color:#15803d;
            ">
              ${otp}
            </span>

          </div>

          <p style="
            color:#444;
          ">
             OTP Validity: 
            <b>5 Minutes</b>
          </p>

          <p style="
            color:#777;
            font-size:14px;
            line-height:1.6;
          ">
            Do not share this OTP with anyone.
            ServiceBridge team will never ask for your OTP.
          </p>

          <hr style="
            margin:25px 0;
            border:none;
            border-top:1px solid #eee;
          ">

          <div style="
            text-align:center;
            color:#999;
            font-size:13px;
          ">

            © 2026 ServiceBridge <br>
            Connecting Customers & Skilled Workers

          </div>

        </div>

      </div>
      
      `,
    });

    return true;

  } catch (error) {

    //console.log(error);

    return false;

  }
};

module.exports = sendEmail;