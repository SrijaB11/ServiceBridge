const User = require("../../models/UserModel");

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await User.findOneAndUpdate(
      { _id: req.params.id, role: "customer" },
      req.body,
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findOneAndDelete({
      _id: req.params.id,
      role: "customer",
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};