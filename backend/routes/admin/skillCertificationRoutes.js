const express = require("express");
const router = express.Router();

const getSkillCertificateRoute = require("../../controllers/admin/skillCertificate/getSkillCertificateController");
const verifySkillCertificateRoute = require("../../controllers/admin/skillCertificate/verifySkillCertificateController");
const getAllWorkerSkillAfterVerifyController = require("../../controllers/admin/skillCertificate/getAllWorkerSkillAfterVerifyController");

const authAdmin = require("../../middlewares/authMiddleware");

// get Workers skillCertificate
router.get("/workerskillcertificates",authAdmin,getSkillCertificateRoute);

// verify Worker skill certificate
router.put("/verifyworkerskillcertificates",authAdmin,verifySkillCertificateRoute);

// after verifing admin will see the verified details
router.get("/workerafterverificationdetails",authAdmin,getAllWorkerSkillAfterVerifyController);

module.exports = router;