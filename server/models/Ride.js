// server/models/Ride.js
const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null, // initially no driver assigned
    },
    pickupLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    dropoffLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    status: {
      type: String,
      enum: [
        "requested",
        "matched",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "requested",
    },
    surgeMultiplier: {
      type: Number,
      default: 1.0,
    },
    fare: {
      type: Number,
      default: 0,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    matchedAt: Date,
    startedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
);

// Index for geospatial queries
rideSchema.index({ pickupLocation: "2dsphere" });
rideSchema.index({ dropoffLocation: "2dsphere" });

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
