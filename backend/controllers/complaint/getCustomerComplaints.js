const Complaint = require("../../models/ComplaintModel");

const getCustomerComplaints = async (req, res) => {
  try {
    if (req.role !== "customer") {
      return res.status(403).json({ message: "Only customers allowed" });
    }

    const complaints = await Complaint.find({ customer: req.user._id })
      .populate("worker", "fullName phone")
      .populate("booking", "service date")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getCustomerComplaints;