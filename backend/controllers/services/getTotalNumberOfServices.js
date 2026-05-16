const Service = require("../../models/ServiceModel");

const getTotalServicesController = async (req, res) => {
  try {

    const totalServices = await Service.countDocuments();

    res.status(200).json({
      success: true,
      totalServices,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = getTotalServicesController;