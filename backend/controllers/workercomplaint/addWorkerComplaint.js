const Complaint = require("../../models/ComplaintModel");
const Booking = require("../../models/BookingModel");

const addWorkerComplaint = async (req, res) => {
  try {
    if (req.user.role !== "worker") {
      return res.status(403).json({ message: "Only workers allowed" });
    }

    const { bookingId, message } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const complaint = await Complaint.create({
      worker: req.user._id,
      customer: booking.customer,
      booking: bookingId,
      complaintText: message,
       complaintBy: "worker",
    });

    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addWorkerComplaint;