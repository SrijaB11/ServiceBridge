const services = require("../../services/services");

const getAllServicesController = async (req, res) => {
  try {

    res.status(200).json({
      message: "Services fetched successfully",
      totalServices: services.length,
      services,
    });

  } catch (error) {
    console.log("Get Services Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = getAllServicesController;