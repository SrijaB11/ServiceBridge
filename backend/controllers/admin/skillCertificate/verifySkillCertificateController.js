const User = require("../../../models/UserModel");

const verifyWorkerSkillCertificate = async (req, res) => {
  try {

    const { workerId, status } = req.body;

    // status = approved / rejected

    if (
      status !== "approved" &&
      status !== "rejected"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const worker = await User.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    // update verification status
    worker.workerVerificationStatus = status;

    await worker.save();

    res.status(200).json({
      success: true,
      message: `Worker ${status} successfully`,
      worker,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = verifyWorkerSkillCertificate;