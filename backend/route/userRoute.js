const express = require("express");
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  } = require("../controller/user");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// router.post("/", createUser); 
// router.get("/", getUsers); 
// router.get("/:id", getUserById);
// router.put("/:id", updateUser); 
// router.delete("/:id", deleteUser); 

router.post("/", verifyToken, createUser); 
router.post("/signup", createUser); 
router.get("/", verifyToken, getUsers); 
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

// export default router;
module.exports = router;

