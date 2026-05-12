const express = require("express");

const getAllServicesController = require("../../controllers/services/getAllServicesController");
const getTotalServicesController = require("../../controllers/services/getTotalNumberOfServices");


const router = express.Router();


// GET ALL SERVICES
router.get("/allServices",getAllServicesController);

// GET TOTAL SERVICES
router.get("/totalServices", getTotalServicesController);

module.exports = router;