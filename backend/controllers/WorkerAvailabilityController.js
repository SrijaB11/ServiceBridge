const WorkerAvailability = require("../models/WorkerAvailability");
const Booking = require("../models/Booking");

// ADD AVAIALBLE SLOT

const addAvailability = async(req,res) => {

try {
    if (req.role !== "worker") {
      return res.status(403).json({ message: "Only workers allowed" });
    }

    const { date, startTime, endTime } = req.body;

    const slot = await WorkerAvailability.create({
      workerId: req.userId,
      date,
      startTime,
      endTime,
    });

    res.json({ message: "Slot added", slot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ACCEPT BOOKING

const acceptBooking = async(req,res) => {
try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.workerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = "ACCEPTED";
    await booking.save();

    await WorkerAvailability.findByIdAndUpdate(
      booking.availabilityId,
      { isBooked: true }
    );

    res.json({ message: "Booking accepted & slot blocked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addAvailability,acceptBooking };