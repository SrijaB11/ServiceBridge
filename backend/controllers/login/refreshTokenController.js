const userModel = require("../../models/UserModel");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

require("dotenv").config();

const refreshTokenController = async (req, res) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await userModel
      .findById(decoded.id)
      .select("+refreshToken");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.fullName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.json({
      token: newAccessToken,
    });

  } catch (error) {

    return res.status(403).json({
      message: "Invalid refresh token",
    });

  }
};

module.exports = refreshTokenController;