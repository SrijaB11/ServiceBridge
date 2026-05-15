const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Service = require("../models/ServiceModel");

const services = require("./servicesData");

dotenv.config();

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // remove old services
    await Service.deleteMany();

    // insert new services
    await Service.insertMany(services);

    console.log("Services Seeded Successfully");

    process.exit();

  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedServices();