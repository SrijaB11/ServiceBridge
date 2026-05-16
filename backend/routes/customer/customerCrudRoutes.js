const express = require("express");

const getCustomerController = require("../../controllers/customer/getCustomerDetailsController");

const updateCustomerController = require("../../controllers/customer/updateCustomerController");

const deleteCustomerController = require("../../controllers/customer/deleteCustomerController");

const authMiddleware = require("../../middlewares/authMiddleware");

const customerMiddleware = require("../../middlewares/customerMiddleware");

const router = express.Router();


// Get Profile
router.get("/profile",authMiddleware, customerMiddleware,getCustomerController);


// Update Profile
router.put("/update",authMiddleware,customerMiddleware,updateCustomerController);


// Delete Account
router.delete("/delete",authMiddleware,customerMiddleware,deleteCustomerController);

module.exports = router;