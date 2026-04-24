const userModel = require("../models/UserModel");

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

    await userModel.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      password: data.password,
      role: data.role,
      services: data.services,
      address: data.address,
    });

    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Registration unsuccessful",
    });
  }
};


 module.exports = regController;