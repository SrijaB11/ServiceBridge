const Complaint = require("../../models/ComplaintModel");
const Booking = require("../../models/BookingModel");

const addComplaint = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can file complaints" }); //only customers are allowed
    }

    const { bookingId, complaintText } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // booking belongs to login customers
    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized booking access" });
    }

    if (booking.status !== "accepted" && booking.status !== "completed") {
      return res.status(400).json({
        message: "Complaint allowed only after worker accepts the booking",
      });
    }

    const complaint = await Complaint.create({
      customer: req.user._id,
      worker: booking.worker,
      booking: booking._id,
      complaintText,
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addComplaint;
