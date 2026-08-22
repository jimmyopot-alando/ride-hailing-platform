// server/models/Driver.js
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleInfo: {
      make: { type: String, required: true },
      model: { type: String, required: true },
      plateNumber: { type: String, required: true, unique: true },
      color: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["offline", "online", "busy"],
      default: "offline",
    },
    currentLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
    },
    lastLocationUpdate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
