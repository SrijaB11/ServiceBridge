const User = require("../../../models/UserModel");

const getWorkerSkillCertificate = async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
    })
      .select(
        "fullName email phone services documents workerVerified workerVerificationStatus createdAt"
      )
      .sort({
        workerVerificationStatus: 1, // pending first
        createdAt: -1, // newest first
      });

    // Custom sorting so pending always stays on top
    workers.sort((a, b) => {
      if (
        a.workerVerificationStatus === "pending" &&
        b.workerVerificationStatus !== "pending"
      ) {
        return -1;
      }

      if (
        a.workerVerificationStatus !== "pending" &&
        b.workerVerificationStatus === "pending"
      ) {
        return 1;
      }

      // Recent workers first
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json({
      success: true,
      workers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getWorkerSkillCertificate;