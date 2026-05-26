const Service = require("../../models/ServiceModel");

const redisClient = require("../../config/redis");

const getAllServicesController = async (req, res) => {

  try {

    // check redis cache
    const cachedServices =await redisClient.get( "all_services" );

    // data found in redis
    if (cachedServices) {

      const services =JSON.parse(cachedServices);

      return res.status(200).json({ success: true, message:"Fetched from Redis",totalServices: services.length, services});
    }

    // fetch from mongodb
    const services =await Service.find().lean();

    // save in redis
    await redisClient.set( "all_services",JSON.stringify(services), { EX: 3600 });

    res.status(200).json({
      success: true,
      message:"Fetched from MongoDB",
      totalServices:
      services.length,
      services,
    });

  }

  catch (error) {

    res.status(500).json({
      success:false,
      message: "Server Error",
      error:error.message,
    });
  }
};

module.exports = getAllServicesController;