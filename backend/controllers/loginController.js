const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const loginController = async (req, res) => {
  try {
    const data = req.body;

    const user = await userModel.findOne({ email: data.email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      role: user.role,
      message: "Login successful",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error",
    });
  }
};

module.exports = loginController;
