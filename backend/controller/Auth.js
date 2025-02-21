const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// **User Login**
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user,"user")
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role : user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// **User Logout** (Handled on client side by removing token)
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { loginUser, logoutUser };
