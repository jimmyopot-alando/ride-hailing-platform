// server/routes/ratingRoutes.js
const express = require("express");
const router = express.Router();
const {
  leaveRating,
  getUserRatings,
  getAverageRating,
} = require("../controllers/ratingController");
const authMiddleware = require("../middlewares/authMiddleware");

// Leave a rating after a ride
router.post("/", authMiddleware, leaveRating);

// Get all ratings for a specific user
router.get("/user/:id", getUserRatings);

// Get average rating for a specific user
router.get("/user/:id/average", getAverageRating);

module.exports = router;
