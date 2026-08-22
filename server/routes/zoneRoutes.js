// server/routes/zoneRoutes.js
const express = require("express");
const router = express.Router();
const {
  createZone,
  getZones,
  getZoneById,
  updateZone,
  deleteZone,
  getActiveDriversInZone,
} = require("../controllers/zoneController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new zone (admin only)
router.post("/", authMiddleware, createZone);

// Get all zones
router.get("/", getZones);

// Get a single zone by ID
router.get("/:id", getZoneById);

// Update a zone (admin only)
router.put("/:id", authMiddleware, updateZone);

// Delete a zone (admin only)
router.delete("/:id", authMiddleware, deleteZone);

// Get active drivers in a zone
router.get("/:id/drivers", getActiveDriversInZone);

module.exports = router;
