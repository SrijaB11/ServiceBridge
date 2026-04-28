const Worker = require("../models/WorkerModel");


// VERIFY WORKER
const verifyWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      message: "Worker verified successfully",worker
    });
  } 
    catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};

module.exports = { verifyWorker };