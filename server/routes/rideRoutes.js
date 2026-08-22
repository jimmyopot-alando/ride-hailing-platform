// server/routes/rideRoutes.js
const express = require("express");
const router = express.Router();
const {
  requestRide,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
} = require("../controllers/rideController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rider requests a ride
router.post("/", authMiddleware, requestRide);

// Driver accepts a ride
router.put("/:id/accept", authMiddleware, acceptRide);

// Driver starts a ride
router.put("/:id/start", authMiddleware, startRide);

// Driver completes a ride
router.put("/:id/complete", authMiddleware, completeRide);

// Rider or driver cancels a ride
router.put("/:id/cancel", authMiddleware, cancelRide);

module.exports = router;
