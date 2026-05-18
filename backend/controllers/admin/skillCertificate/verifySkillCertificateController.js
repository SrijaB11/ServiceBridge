const User = require("../../../models/UserModel");

const verifyWorkerSkillCertificate = async (req, res) => {
  try {

    const { workerId, status } = req.body;

    const worker = await User.findById(workerId);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    if (status === "approved") {
      worker.workerVerificationStatus = "approved";
    } 
    else if (status === "rejected") {
      worker.workerVerificationStatus = "rejected";
    } 
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

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