const Complaint = require("../../../models/ComplaintModel");

const getAllComplaints = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const complaints = await Complaint.find()
      .populate("customer", "fullName phone")
      .populate("worker", "fullName phone")
      .populate("booking", "service date")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllComplaints;