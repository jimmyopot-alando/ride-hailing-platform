// server/controllers/driverController.js
const Driver = require("../models/Driver");
const User = require("../models/User");

// @desc    Register driver profile (vehicle info)
// @route   POST /api/drivers
// @access  Private (role: driver)
exports.registerDriver = async (req, res) => {
  try {
    const { make, model, plateNumber, color } = req.body;

    // Ensure user is a driver
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Only drivers can register vehicles" });
    }

    // Check if driver profile already exists
    const existingDriver = await Driver.findOne({ userId: req.user.id });
    if (existingDriver) {
      return res.status(400).json({ message: "Driver profile already exists" });
    }

    const driver = new Driver({
      userId: req.user.id,
      vehicleInfo: { make, model, plateNumber, color },
    });

    await driver.save();

    res.status(201).json({
      message: "Driver profile created successfully",
      driver,
    });
  } catch (error) {
    console.error("❌ Register driver error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update driver status (online/offline/busy)
// @route   PUT /api/drivers/status
// @access  Private (role: driver)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const driver = await Driver.findOne({ userId: req.user.id });
    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    driver.status = status || driver.status;
    await driver.save();

    res.json({
      message: "Driver status updated",
      status: driver.status,
    });
  } catch (error) {
    console.error("❌ Update status error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update driver location
// @route   PUT /api/drivers/location
// @access  Private (role: driver)
exports.updateLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;

    const driver = await Driver.findOne({ userId: req.user.id });
    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    driver.currentLocation = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    driver.lastLocationUpdate = Date.now();

    await driver.save();

    res.json({
      driverId: driver._id,
      name: driver.userId?.name || "Driver", // safe fallback
      location: driver.currentLocation,
    });
  } catch (error) {
    console.error("❌ Update location error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get driver profile
// @route   GET /api/drivers/me
// @access  Private (role: driver)
exports.getMyDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.user.id }).populate("userId", "-passwordHash");
    if (!driver) {
      return res.status(404).json({ message: "Driver profile not found" });
    }

    res.json(driver);
  } catch (error) {
    console.error("❌ Fetch driver profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
