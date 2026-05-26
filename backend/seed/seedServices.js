const mongoose = require("mongoose");

const dotenv =require("dotenv");

const Service =require("../models/ServiceModel");

const services =require("./servicesData");

const redisClient =require("../config/redis");

dotenv.config();

const seedServices =async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL);

        // delete old
        await Service.deleteMany();

        // insert new
        await Service.insertMany(services);

        // clear redis cache
        await redisClient.del("all_services");

        console.log("Seed completed");

        process.exit();

    }

    catch(error){
        console.log(error);
        process.exit(1);
    }

};

seedServices();