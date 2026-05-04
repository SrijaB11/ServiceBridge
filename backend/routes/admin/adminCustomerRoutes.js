const express = require("express");
const {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../../controllers/admin/adminCustomerController");

const router = express.Router();

router.get("/customers", getAllCustomers);

router.put("/customers/:id", updateCustomer);

router.delete("/customers/:id", deleteCustomer);

module.exports = router;