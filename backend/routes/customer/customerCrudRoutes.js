const express = require("express");

const getCustomerController = require("../../controllers/customer/getCustomerDetailsController");

const updateCustomerController = require("../../controllers/customer/updateCustomerController");

const deleteCustomerController = require("../../controllers/customer/deleteCustomerController");

const authMiddleware = require("../../middlewares/authMiddleware");

const customerMiddleware = require("../../middlewares/customerMiddleware");

const router = express.Router();


// Get Profile
router.get("/profile", customerMiddleware,getCustomerController);


// Update Profile
router.put("/update",customerMiddleware,updateCustomerController);


// Delete Account
router.delete("/delete",customerMiddleware,deleteCustomerController);

module.exports = router;