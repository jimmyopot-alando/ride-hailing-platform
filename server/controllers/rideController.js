// server/controllers/rideController.js
const Ride = require("../models/Ride");
const Driver = require("../models/Driver");

// @desc    Request a ride
// @route   POST /api/rides
// @access  Private (role: rider)
exports.requestRide = async (req, res) => {
  try {
    const { pickupLongitude, pickupLatitude, dropoffLongitude, dropoffLatitude } = req.body;

    if (req.user.role !== "rider") {
      return res.status(403).json({ message: "Only riders can request rides" });
    }

    const ride = new Ride({
      riderId: req.user.id,
      pickupLocation: { type: "Point", coordinates: [pickupLongitude, pickupLatitude] },
      dropoffLocation: { type: "Point", coordinates: [dropoffLongitude, dropoffLatitude] },
      status: "requested",
    });

    await ride.save();

    res.status(201).json({
      message: "Ride requested successfully",
      ride,
    });
  } catch (error) {
    console.error("❌ Request ride error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Accept a ride (driver)
// @route   PUT /api/rides/:id/accept
// @access  Private (role: driver)
exports.acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Only drivers can accept rides" });
    }

    ride.driverId = req.user.id;
    ride.status = "accepted";
    ride.matchedAt = Date.now();

    await ride.save();

    res.json({
      message: "Ride accepted",
      ride,
    });
  } catch (error) {
    console.error("❌ Accept ride error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Start a ride
// @route   PUT /api/rides/:id/start
// @access  Private (driver)
exports.startRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    ride.status = "in_progress";
    ride.startedAt = Date.now();

    await ride.save();

    res.json({
      message: "Ride started",
      ride,
    });
  } catch (error) {
    console.error("❌ Start ride error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Complete a ride
// @route   PUT /api/rides/:id/complete
// @access  Private (driver)
exports.completeRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    ride.status = "completed";
    ride.completedAt = Date.now();

    await ride.save();

    res.json({
      message: "Ride completed",
      ride,
    });
  } catch (error) {
    console.error("❌ Complete ride error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Cancel a ride
// @route   PUT /api/rides/:id/cancel
// @access  Private (rider/driver)
exports.cancelRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    ride.status = "cancelled";

    await ride.save();

    res.json({
      message: "Ride cancelled",
      ride,
    });
  } catch (error) {
    console.error("❌ Cancel ride error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
