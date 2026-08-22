// server/controllers/ratingController.js
const Rating = require("../models/Rating");
const Ride = require("../models/Ride");

// @desc    Leave a rating after a ride
// @route   POST /api/ratings
// @access  Private (rider/driver)
exports.leaveRating = async (req, res) => {
  try {
    const { rideId, ratedUserId, rating, comment } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    // Ensure the rater participated in the ride
    if (ride.riderId.toString() !== req.user.id && ride.driverId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot rate this ride" });
    }

    const newRating = new Rating({
      rideId,
      raterId: req.user.id,
      ratedUserId,
      rating,
      comment,
    });

    await newRating.save();

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error("❌ Leave rating error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get ratings for a user
// @route   GET /api/ratings/user/:id
// @access  Public
exports.getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedUserId: req.params.id }).populate("raterId", "name role");
    res.json(ratings);
  } catch (error) {
    console.error("❌ Fetch user ratings error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get average rating for a user
// @route   GET /api/ratings/user/:id/average
// @access  Public
exports.getAverageRating = async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedUserId: req.params.id });
    if (ratings.length === 0) {
      return res.json({ average: 0, count: 0 });
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / ratings.length;

    res.json({ average, count: ratings.length });
  } catch (error) {
    console.error("❌ Fetch average rating error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
