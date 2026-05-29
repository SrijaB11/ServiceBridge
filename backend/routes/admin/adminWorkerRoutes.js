const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const { getAllWorkers,updateWorker,deleteWorker, } = require("../../controllers/admin/adminWorkerController");

router.get("/workers", authMiddleware, adminMiddleware, getAllWorkers);
router.put("/workers/:id",authMiddleware, adminMiddleware, updateWorker);
router.delete("/workers/:id",authMiddleware,adminMiddleware, deleteWorker);


module.exports = router;