const userModel = require("../../models/UserModel");

const otpModel =require("../../models/OtpModel");

const bcrypt =require("bcryptjs");

const resetPasswordController =async (req, res) => {

    try {

    const {email,newPassword} = req.body;

    const record =await otpModel.findOne({email, purpose: "reset" });

    if (!record) {

    return res.status(400).json({

    success: false,

    message: "No OTP record found"

    });

    }

    // Check verification first
    if (!record.verified) {

    return res.status(400).json({

    success: false,

    message: "Verify OTP first"

    });

    }

    // Extra expiry check
    if ( new Date() > record.expiresAt ) {

    return res.status(400).json({

    success: false,

    message:"OTP expired"

    });

    }

    // Hash password
    const hashedPassword =await bcrypt.hash(newPassword,10 );

    // Update password
    await userModel.updateOne( { email }, { $set: { password: hashedPassword } }  );

    // Delete OTP
    await otpModel.deleteOne({ _id: record._id});

    return res.status(200).json({
        success: true,
        message: "Password reset successful"

    });

    }

    catch (error) {

    return res.status(500).json({
        success: false,
        message: "Reset failed"

    });

    }

};

module.exports = resetPasswordController;