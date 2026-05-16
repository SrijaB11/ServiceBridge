const User = require("../../models/UserModel");

const gettotalWorkers = async (req, res) => {
  try {
    // role base access control to know count of workers for admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admin can view total workers.",
      });
    }

    // Count workers
    const totalWorkers = await User.countDocuments({ role: "worker" });

    return res.status(200).json({
      success: true,
      totalWorkers,
    });

  } catch (error) {
    console.error("Get Total Workers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = gettotalWorkers;