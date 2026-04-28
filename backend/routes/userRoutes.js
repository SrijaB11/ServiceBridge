const express = require("express");
const regController = require("../controllers/regController");
const loginController = require("../controllers/loginController");

const router = express.Router();

// register //
router.post("/register", regController);

router.post("/login", loginController);

<<<<<<< HEAD
module.exports = router;
=======
module.exports=router;
>>>>>>> f748ed3bf41e709206d035c80f73262767b51702
