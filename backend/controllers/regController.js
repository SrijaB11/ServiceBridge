const userModel = require("../models/UserModel");

const regController = async (req, res) => {
  try {
    const data = req.body;

    // 1. Required fields
    if (
      !data.name ||
      !data.email ||
      !data.number ||
      !data.password ||
      !data.confirmpassword ||
      !data.role
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2. Password match check
    if (data.password !== data.confirmpassword) {
      return res.status(400).json({
        message: "Password and confirm password must match"
      });
    }

    // 3. Check existing email
    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    // 4. Create user (DO NOT save confirmpassword)
    await userModel.create({
      name: data.name,
      email: data.email,
      number: data.number,
      password: data.password,
      role: data.role
    });

    return res.status(201).json({
      message: "Registration successful"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Registration unsuccessful"
    });
  }
};

module.exports = regController;