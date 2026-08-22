// server/routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTransaction,
  releaseEscrow,
  refundEscrow,
  applyCancellationFee,
  openDispute,
  resolveDispute,
} = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create transaction (escrow hold when ride is requested)
router.post("/", authMiddleware, createTransaction);

// Release escrow (after ride completion)
router.put("/:id/release", authMiddleware, releaseEscrow);

// Refund escrow (cancelled ride)
router.put("/:id/refund", authMiddleware, refundEscrow);

// Apply cancellation fee
router.put("/:id/cancellation-fee", authMiddleware, applyCancellationFee);

// Open a dispute
router.put("/:id/dispute", authMiddleware, openDispute);

// Resolve a dispute (admin only)
router.put("/:id/resolve-dispute", authMiddleware, resolveDispute);

module.exports = router;
