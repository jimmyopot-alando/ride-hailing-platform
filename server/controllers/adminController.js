// server/controllers/adminController.js
const User = require("../models/User");
const Driver = require("../models/Driver");
const Ride = require("../models/Ride");
const Transaction = require("../models/Transaction");
const Rating = require("../models/Rating");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (error) {
    console.error("❌ Fetch users error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all drivers
// @route   GET /api/admin/drivers
// @access  Private/Admin
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate("userId", "name email role");
    res.json(drivers);
  } catch (error) {
    console.error("❌ Fetch drivers error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all rides
// @route   GET /api/admin/rides
// @access  Private/Admin
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate("riderId driverId", "name email role");
    res.json(rides);
  } catch (error) {
    console.error("❌ Fetch rides error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all transactions
// @route   GET /api/admin/transactions
// @access  Private/Admin
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("riderId driverId", "name email role");
    res.json(transactions);
  } catch (error) {
    console.error("❌ Fetch transactions error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all disputes
// @route   GET /api/admin/disputes
// @access  Private/Admin
exports.getAllDisputes = async (req, res) => {
  try {
    const disputes = await Transaction.find({ disputeStatus: "open" }).populate("riderId driverId", "name email role");
    res.json(disputes);
  } catch (error) {
    console.error("❌ Fetch disputes error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all ratings
// @route   GET /api/admin/ratings
// @access  Private/Admin
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().populate("raterId ratedUserId", "name role");
    res.json(ratings);
  } catch (error) {
    console.error("❌ Fetch ratings error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
