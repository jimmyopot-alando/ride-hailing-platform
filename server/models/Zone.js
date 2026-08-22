// server/models/Zone.js
const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    boundaries: {
      type: {
        type: String,
        enum: ["Polygon"],
        default: "Polygon",
      },
      coordinates: {
        type: [[[Number]]], // array of arrays of [longitude, latitude]
        required: true,
      },
    },
    surgeMultiplier: {
      type: Number,
      default: 1.0,
    },
    activeDrivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
      },
    ],
  },
  { timestamps: true }
);

// Index for geospatial queries
zoneSchema.index({ boundaries: "2dsphere" });

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = Zone;
