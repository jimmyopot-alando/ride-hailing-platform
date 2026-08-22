// server/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllDrivers,
  getAllRides,
  getAllTransactions,
  getAllDisputes,
  getAllRatings,
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get all users
router.get("/users", authMiddleware, getAllUsers);

// Get all drivers
router.get("/drivers", authMiddleware, getAllDrivers);

// Get all rides
router.get("/rides", authMiddleware, getAllRides);

// Get all transactions
router.get("/transactions", authMiddleware, getAllTransactions);

// Get all disputes
router.get("/disputes", authMiddleware, getAllDisputes);

// Get all ratings
router.get("/ratings", authMiddleware, getAllRatings);

module.exports = router;
