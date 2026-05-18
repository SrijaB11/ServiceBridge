const User = require("../../../models/UserModel");

const getWorkerSkillCertificate = async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
    }).select(
      "fullName email phone documents workerVerified workerVerificationStatus"
    );

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