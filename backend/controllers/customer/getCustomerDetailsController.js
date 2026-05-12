const userModel = require("../../models/UserModel");

const getCustomerDetailsController = async (req, res) => {
  try {

    const customer = await userModel
      .findById(req.user._id)
      .select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer details fetched successfully",
      customer,
    });

  } catch (error) {
    //console.log("Get Customer Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = getCustomerDetailsController;