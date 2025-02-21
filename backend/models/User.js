const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    profilePicture: { type: String }, // Path to profile image
    isProfileComplete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Middleware to set profile completeness
userSchema.pre("save", function (next) {
  this.isProfileComplete = !!this.profilePicture;
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate(); // Yeh updated values ko access karega
  
    if (update.profilePicture !== undefined) {
      update.isProfileComplete = !!update.profilePicture; // isProfileComplete bhi update kar do
    }
  
    next();
  });

  
  // Method to compare passwords
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

// export default mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);

