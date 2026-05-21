const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");
require("dotenv").config();

const customerMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check token exists
    if ( !authHeader || !authHeader.startsWith("Bearer ") ) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET );

    // Get user
    const user = await userModel
        .findById(decoded.id)
        .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Customer role check
    if (user.role !== "customer") {
      return res.status(403).json({
        message: "Only customers allowed",
      });
    }

    // Store user data
    req.user = user;
    req.role = user.role;

    next();

  } catch (error) {
    return res.status(401).json({
      message:"Invalid or expired token",
    });
  }
};

module.exports = customerMiddleware;