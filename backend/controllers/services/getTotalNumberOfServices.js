const services = require("../../services/services");

const getTotalServicesController = async (req, res) => {
  try {
    res.status(200).json({
      message: "Total services fetched successfully",
      totalServices: services.length,
    });
  } catch (error) {
    //console.log("Total Services Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = getTotalServicesController;