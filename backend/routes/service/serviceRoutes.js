const express = require("express");

const getAllServicesController = require("../../controllers/services/getAllServicesController");

const router = express.Router();


// GET ALL SERVICES
router.get("/allServices",getAllServicesController);

module.exports = router;