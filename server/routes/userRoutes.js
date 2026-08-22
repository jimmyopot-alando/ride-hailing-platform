// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get all users (admin only)
router.get("/", authMiddleware, getUsers);

// Get single user by ID
router.get("/:id", authMiddleware, getUserById);

// Update user profile
router.put("/:id", authMiddleware, updateUser);

// Delete user (admin only)
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
