const Complaint = require("../../models/ComplaintModel");

const adminComplaint = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const complaints = await Complaint.find()
      .populate("worker", "fullName phone")
      .populate("customer", "fullName phone")
      .populate("booking", "service date")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports =  adminComplaint ;