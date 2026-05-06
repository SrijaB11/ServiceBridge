const express = require("express");
const router = express.Router();

const { createWorker,getAllWorkers,updateWorker,deleteWorker, } = require("../../controllers/admin/adminWorkerController");
router.get("/workers", getAllWorkers);
router.put("/workers/:id", updateWorker);
router.delete("/workers/:id", deleteWorker);


module.exports = router;