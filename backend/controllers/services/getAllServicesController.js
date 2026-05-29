const Service = require("../../models/ServiceModel");
const redisClient = require("../../config/redis");

const getAllServicesController = async (req, res) => {
  try {

    // Check cache
    const cachedServices =await redisClient.get("all_services");

    if (cachedServices) {

      return res.status(200).json({
        success: true,
        message: "Fetched from Redis",
        totalServices: cachedServices.length,
        services: cachedServices,
      });

    }

    // MongoDB
    const services = await Service.find().lean();

    // Save cache for 1 hour
    await redisClient.set(
      "all_services",
      services,
      {
        ex: 3600,
      }
    );

    res.status(200).json({
      success: true,
      message: "Fetched from MongoDB",
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