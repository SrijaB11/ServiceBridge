const Complaint = require("../../models/ComplaintModel");

const getWorkerComplaints = async (req, res) => {
  try {
    if (req.user.role !== "worker") {
      return res.status(403).json({ message: "Only workers allowed" });
    }

    const complaints = await Complaint.find({ worker: req.user._id, complaintBy:"worker", })
      .populate("customer", "fullName phone")
      .populate("booking", "service date")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports =  getWorkerComplaints ;