const User = require("../models/user");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

// Create user (with or without profile picture)
const createUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, role } = req.body;
    console.log(req.body)
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Profile picture handling (optional)
    let profilePicture = req.file ? req.file.filename : null;
    console.log(hashedPassword, "hashedPassword")
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      role,
      profilePicture, // Save filename if uploaded
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        dateOfBirth: newUser.dateOfBirth,
        profilePicture: newUser.profilePicture ? `/uploads/${newUser.profilePicture}` : null,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, dateOfBirth, profilePicture } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, dateOfBirth, profilePicture },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    if (user.profilePicture) {
      const oldImagePath = path.join("uploads", user.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
         // Remove old image
      }
    }

    // Update profile picture
    user.profilePicture = req.file.filename;
    await user.save();

    res.status(200).json({ message: "Profile picture updated successfully", image: `/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile picture" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadProfilePicture,
};
