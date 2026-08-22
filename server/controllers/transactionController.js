// server/controllers/transactionController.js
const Transaction = require("../models/Transaction");
const Ride = require("../models/Ride");

// @desc    Create transaction (escrow hold when ride is requested)
// @route   POST /api/transactions
// @access  Private (rider)
exports.createTransaction = async (req, res) => {
  try {
    const { rideId, amount } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    const transaction = new Transaction({
      rideId,
      riderId: ride.riderId,
      driverId: ride.driverId,
      amount,
      escrowStatus: "held",
    });

    await transaction.save();

    res.status(201).json({
      message: "Transaction created and funds held in escrow",
      transaction,
    });
  } catch (error) {
    console.error("❌ Create transaction error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Release escrow (after ride completion)
// @route   PUT /api/transactions/:id/release
// @access  Private (system/admin)
exports.releaseEscrow = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.escrowStatus = "released";
    await transaction.save();

    res.json({
      message: "Escrow released to driver",
      transaction,
    });
  } catch (error) {
    console.error("❌ Release escrow error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Refund escrow (cancelled ride)
// @route   PUT /api/transactions/:id/refund
// @access  Private (system/admin)
exports.refundEscrow = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.escrowStatus = "refunded";
    await transaction.save();

    res.json({
      message: "Escrow refunded to rider",
      transaction,
    });
  } catch (error) {
    console.error("❌ Refund escrow error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Apply cancellation fee
// @route   PUT /api/transactions/:id/cancellation-fee
// @access  Private (system/admin)
exports.applyCancellationFee = async (req, res) => {
  try {
    const { feeAmount } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.cancellationFeeApplied = true;
    transaction.cancellationFee = feeAmount;
    await transaction.save();

    res.json({
      message: "Cancellation fee applied",
      transaction,
    });
  } catch (error) {
    console.error("❌ Apply cancellation fee error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Open a dispute
// @route   PUT /api/transactions/:id/dispute
// @access  Private (rider/driver)
exports.openDispute = async (req, res) => {
  try {
    const { reason } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.disputeOpened = true;
    transaction.disputeReason = reason;
    await transaction.save();

    res.json({
      message: "Dispute opened",
      transaction,
    });
  } catch (error) {
    console.error("❌ Open dispute error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Resolve a dispute
// @route   PUT /api/transactions/:id/resolve-dispute
// @access  Private (admin)
exports.resolveDispute = async (req, res) => {
  try {
    const { resolution } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.disputeResolved = true;
    transaction.resolution = resolution;
    await transaction.save();

    res.json({
      message: "Dispute resolved",
      transaction,
    });
  } catch (error) {
    console.error("❌ Resolve dispute error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
