const User = require("../../models/UserModel");

const getWorkerVerificationStatus = async (req, res) => {
  try {

    // Logged in worker
    const worker = await User.findById(req.user._id).select(
      `
      fullName
      email
      phone
      location
      services
      documents
      workerVerified
      workerVerificationStatus
      createdAt
      `
    );

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.status(200).json({
      success: true,

      worker: {
        workerId: worker._id,

        fullName: worker.fullName,
        email: worker.email,
        phone: worker.phone,
        location: worker.location,

        services: worker.services,

        documents: {
          profilePhoto: worker.documents.profilePhoto,
          panCard: worker.documents.panCard,
          skillDoc: worker.documents.skillDoc,
        },

        verification: {
          isVerifiedWorker: worker.workerVerified,

          status: worker.workerVerificationStatus,

          message:
            worker.workerVerificationStatus === "approved"
              ? "Your documents are approved by admin"

              : worker.workerVerificationStatus === "rejected"
              ? "Your documents were rejected by admin"

              : "Your documents are under verification",
        },

        joinedAt: worker.createdAt,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getWorkerVerificationStatus;