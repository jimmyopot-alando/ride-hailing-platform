// server/models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    escrowStatus: {
      type: String,
      enum: ["held", "released", "refunded"],
      default: "held",
    },
    cancellationFeeApplied: {
      type: Boolean,
      default: false,
    },
    disputeStatus: {
      type: String,
      enum: ["none", "open", "resolved"],
      default: "none",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
