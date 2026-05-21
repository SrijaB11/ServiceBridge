const User = require("../../models/UserModel");
const Booking = require("../../models/BookingModel");
const Service = require("../../models/ServiceModel");
const AppRating = require("../../models/AppRatingModel");

const customerDashboardStatsController = async (req, res) => {
  try {
    // role base access
    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    // run all in parallel 
      const [
      totalWorkers,
      totalServices,
      totalBookings,
      totalRatings,
      avgResult,
    ] = await Promise.all([
      User.countDocuments({ role: "worker" }),
      Service.countDocuments(),
      Booking.countDocuments({ customer: req.user._id }),
      AppRating.countDocuments(),
      AppRating.aggregate([
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" },
          },
        },
      ]),
    ]);

    const averageRating =
      avgResult.length > 0
        ? Number(avgResult[0].averageRating.toFixed(1))
        : 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalWorkers,
        totalServices,
        totalBookings,
        totalRatings,
        averageRating,
      },
    });
  } catch (error) {
    console.error("Customer Dashboard Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer dashboard stats",
    });
  }
};

module.exports = customerDashboardStatsController;
