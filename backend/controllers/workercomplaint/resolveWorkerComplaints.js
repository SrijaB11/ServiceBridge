const Complaint = require("../../models/ComplaintModel");

const resolveWorkerComplaints = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const { adminResponse } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "resolved";
    complaint.adminResponse = adminResponse;

    await complaint.save();

    res.json({
      message: "Complaint resolved",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports =  resolveWorkerComplaints ;