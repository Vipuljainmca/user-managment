const express = require("express");
const dashboardController = require("../controller/dashboard"); 
const verifyToken = require("../middleware/authMiddleware"); 

const router = express.Router();

router.get("/", verifyToken, dashboardController.getDashboardStats); 

module.exports = router;
