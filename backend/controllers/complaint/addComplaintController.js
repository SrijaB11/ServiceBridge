const Complaint = require("../../models/ComplaintModel");
const Booking = require("../../models/BookingModel");

const addComplaint = async (req, res) => {
  try {
       // only customers allowed
    if (req.role !== "customer") {
      return res.status(403).json({ message: "Only customers can file complaints" });
    }

    const { bookingId, complaintText } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // booking belong to logged-in customers

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized booking access" });
    }

    const complaint = await Complaint.create({
      customer: req.user._id,
      worker: booking.worker,
      booking: booking._id,
      complaintText
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addComplaint;