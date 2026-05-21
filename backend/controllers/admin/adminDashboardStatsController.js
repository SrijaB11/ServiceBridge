const User = require("../../models/UserModel");
const Booking = require("../../models/BookingModel");
const Service = require("../../models/ServiceModel");
const AppRating = require("../../models/AppRatingModel");

const adminDashboardStatsController = async (req, res) => {
  try {
    // role-based access
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    // run all in parallel
    const [
      totalCustomers,
      totalWorkers,
      totalServices,
      totalBookings,
      totalRatings,
      avgResult,
    ] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "worker" }),
      Service.countDocuments(),
      Booking.countDocuments(),
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
        totalCustomers,
        totalWorkers,
        totalServices,
        totalBookings,
        totalRatings,
        averageRating,
      },
    });
  } catch (error) {
    console.error("Admin Dashboard Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard stats",
    });
  }
};

module.exports = adminDashboardStatsController;