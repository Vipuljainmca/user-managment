
const express = require("express");

const { loginUser, logoutUser } = require("../controller/Auth");


const router = express.Router();

router.post("/login", loginUser); 
router.post("/logout", logoutUser); 

// export default router;
module.exports = router;

