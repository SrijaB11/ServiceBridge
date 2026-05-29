const userModel = require("../../models/UserModel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

require("dotenv").config();

const loginController = async (req, res) => {

  try {

    const {email,password, } = req.body;

    const user =await userModel.findOne({ email: email.toLowerCase()}).select( "+password role fullName").lean();

    if (!user) {
      return res.status(401).json({ message:"Invalid credentials" });
    }

    const isMatch =await bcrypt.compare(password,user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials",});
    }

    const token =jwt.sign({
        id: user._id,
        role: user.role,
        name: user.fullName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }

    );

    return res.json({token,role: user.role,name: user.fullName,message: "Login successful" });

  }

  catch (err) {
    return res.status(500).json({message: "Server Error",});
  }

};

module.exports = loginController;