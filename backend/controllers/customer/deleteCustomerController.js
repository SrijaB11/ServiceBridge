const userModel = require("../../models/UserModel");

const deleteCustomerController = async (req, res) => {
  try {

    const customer = await userModel.findById(req.user._id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await userModel.findByIdAndDelete(req.user._id);

    res.status(200).json({
      message: "Customer account deleted successfully",
    });

  } catch (error) {
    console.log("Delete Customer Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = deleteCustomerController;