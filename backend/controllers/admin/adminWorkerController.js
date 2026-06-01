const User = require("../../models/UserModel"); 
const redisClient = require("../../config/redis");

// get
const getAllWorkers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const cacheKey = "admin:workers:list";

    // Check Redis cache
    const cachedWorkers = await redisClient.get(cacheKey);
    if (cachedWorkers) {
      const workers = JSON.parse(cachedWorkers);

      return res.status(200).json({
        success: true,
        source: "redis",
        count: workers.length,
        workers,
      });
    }

    //  Fetch from DB
    const workers = await User.find({ role: "worker" }).lean();

    if (!workers.length) {
      return res.status(404).json({ message: "No workers found" });
    }

    // Save to Redis (5 minutes) 
    await redisClient.set(
      cacheKey,
      JSON.stringify(workers),
      { ex: 300 }
    );

    res.status(200).json({
      success: true,
      source: "database",
      count: workers.length,
      workers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update
const updateWorker = async (req, res) => {
  try {
    const worker = await User.findOneAndUpdate(
      { _id: req.params.id, role: "worker" },
      req.body,
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({
      message: "Worker updated successfully",
      worker,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateWorker };

// Delete

const deleteWorker = async (req, res) => {
  try {
    const worker = await User.findOneAndDelete({
      _id: req.params.id,
      role: "worker",
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  };



module.exports = { getAllWorkers,updateWorker,deleteWorker };