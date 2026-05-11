const userModel = require("../../models/UserModel");

const updateCustomerController = async (req, res) => {
  try {

    const {
      fullName,
      location,
      phone,
    } = req.body;

    const customer = await userModel.findById(req.user._id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // update only provided fields
    if (fullName) customer.fullName = fullName;
    if (location) customer.location = location;
    if (phone) customer.phone = phone;

    await customer.save();

    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });

  } catch (error) {
   // console.log("Update Customer Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = updateCustomerController;