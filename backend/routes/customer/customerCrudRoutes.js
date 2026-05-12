const express = require("express");

const getCustomerController = require("../../controllers/customer/getCustomerDetailsController");

const updateCustomerController = require("../../controllers/customer/updateCustomerController");

const deleteCustomerController = require("../../controllers/customer/deleteCustomerController");

const authMiddleware = require("../../middlewares/authMiddleware");

const customerMiddleware = require("../../middlewares/customerMiddleware");

const router = express.Router();


// GET PROFILE
router.get(
  "/profile",
  authMiddleware,
  customerMiddleware,
  getCustomerController
);


// UPDATE PROFILE
router.put(
  "/update",
  authMiddleware,
  customerMiddleware,
  updateCustomerController
);


// DELETE ACCOUNT
router.delete(
  "/delete",
  authMiddleware,
  customerMiddleware,
  deleteCustomerController
);

module.exports = router;