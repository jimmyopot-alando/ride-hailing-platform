// server/controllers/userController.js
const User = require("../models/User");

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (error) {
    console.error("❌ Fetch users error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("❌ Fetch user error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const { name, email, profilePicUrl } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePicUrl = profilePicUrl || user.profilePicUrl;

    const updatedUser = await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profilePicUrl: updatedUser.profilePicUrl,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Update user error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Delete user error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
