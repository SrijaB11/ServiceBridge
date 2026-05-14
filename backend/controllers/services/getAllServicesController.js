const Service = require("../../models/ServiceModel");

const getAllServicesController = async (req, res) => {
  try {

    const services = await Service.find();

    res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      totalServices: services.length,
      services,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = getAllServicesController;