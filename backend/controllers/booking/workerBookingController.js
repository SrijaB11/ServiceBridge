
const Booking = require("../../models/BookingModel");

const createBookingWorker = async (req, res) => {
  try {
    const { workerId, date } = req.body;

