const Complaint = require("../../models/ComplaintModel");

const resolveComplaint = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const { complaintId } = req.params;
    const { adminReply } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "resolved";
    complaint.adminReply = adminReply;
    complaint.resolvedAt = new Date();

    await complaint.save();

    res.json({
      message: "Complaint resolved successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = resolveComplaint;