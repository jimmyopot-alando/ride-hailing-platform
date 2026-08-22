// server/controllers/zoneController.js
const Zone = require("../models/Zone");
const Driver = require("../models/Driver");

// @desc    Create a new zone
// @route   POST /api/zones
// @access  Private/Admin
exports.createZone = async (req, res) => {
  try {
    const { name, coordinates, surgeMultiplier } = req.body;

    const zone = new Zone({
      name,
      boundaries: { type: "Polygon", coordinates },
      surgeMultiplier: surgeMultiplier || 1.0,
    });

    await zone.save();

    res.status(201).json({
      message: "Zone created successfully",
      zone,
    });
  } catch (error) {
    console.error("❌ Create zone error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all zones
// @route   GET /api/zones
// @access  Public
exports.getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (error) {
    console.error("❌ Fetch zones error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get a single zone by ID
// @route   GET /api/zones/:id
// @access  Public
exports.getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    res.json(zone);
  } catch (error) {
    console.error("❌ Fetch zone error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a zone (surge multiplier, boundaries)
// @route   PUT /api/zones/:id
// @access  Private/Admin
exports.updateZone = async (req, res) => {
  try {
    const { name, coordinates, surgeMultiplier } = req.body;

    const zone = await Zone.findById(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    zone.name = name || zone.name;
    zone.boundaries = coordinates ? { type: "Polygon", coordinates } : zone.boundaries;
    zone.surgeMultiplier = surgeMultiplier || zone.surgeMultiplier;

    const updatedZone = await zone.save();

    res.json({
      message: "Zone updated successfully",
      zone: updatedZone,
    });
  } catch (error) {
    console.error("❌ Update zone error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a zone
// @route   DELETE /api/zones/:id
// @access  Private/Admin
exports.deleteZone = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    res.json({ message: "Zone deleted successfully" });
  } catch (error) {
    console.error("❌ Delete zone error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get active drivers in a zone
// @route   GET /api/zones/:id/drivers
// @access  Public
exports.getActiveDriversInZone = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id).populate("activeDrivers");
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    res.json({
      zone: zone.name,
      activeDrivers: zone.activeDrivers,
    });
  } catch (error) {
    console.error("❌ Fetch drivers in zone error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
