const User = require("../../../models/UserModel");

const getAllWorkersVerificationDetails = async (req, res) => {
  try {

    const workers = await User.find({
      role: "worker",
    }).select(
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

    // Extra backend response formatting
    const formattedWorkers = workers.map((worker) => ({
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
            ? "Worker Approved By Admin"

            : worker.workerVerificationStatus === "rejected"
            ? "Worker Rejected By Admin"

            : "Waiting For Admin Verification",
      },

      joinedAt: worker.createdAt,
    }));

    res.status(200).json({
      success: true,
      totalWorkers: formattedWorkers.length,
      workers: formattedWorkers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getAllWorkersVerificationDetails;