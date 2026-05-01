const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const userModel = require("../../models/UserModel");

router.get("/customers", authMiddleware, async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const customers = await userModel
      .find({ role: "customer" })
      .select("-password");

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
});

router.delete("/customers/:id", authMiddleware, async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await userModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer" });
  }
});

module.exports = router;