const User = require("../models/user");
const moment = require("moment"); // To handle date comparisons

const getDashboardStats = async (req, res) => {
  try {
    // Get today's date range (start to end of the day)
    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    // Query database
    const totalUsers = await User.countDocuments();
    const todayRegistrations = await User.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } });
    const incompleteProfiles = await User.countDocuments({ isProfileComplete: false });
    const completedProfiles = await User.countDocuments({ isProfileComplete: true });

    // Send response
    res.status(200).json({
      totalUsers,
      todayRegistrations,
      incompleteProfiles,
      completedProfiles,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching dashboard stats" });
  }
};

// module.exports = { getDashboardStats };
module.exports = { getDashboardStats };
