// server/routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerDriver,
  updateStatus,
  updateLocation,
  getMyDriverProfile,
} = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");

// Register driver profile (vehicle info)
router.post("/", authMiddleware, registerDriver);

// Update driver status (online/offline/busy)
router.put("/status", authMiddleware, updateStatus);

// Update driver location
router.put("/location", authMiddleware, updateLocation);

// Get driver’s own profile
router.get("/me", authMiddleware, getMyDriverProfile);

module.exports = router;
