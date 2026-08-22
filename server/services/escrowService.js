// server/services/escrowService.js
const Transaction = require("../models/Transaction");

/**
 * Hold funds in escrow when a ride is requested
 * @param {String} rideId - Ride ID
 * @param {String} riderId - Rider ID
 * @param {String} driverId - Driver ID
 * @param {Number} amount - Fare amount
 * @returns {Object} transaction
 */
const holdFunds = async (rideId, riderId, driverId, amount) => {
  const transaction = new Transaction({
    rideId,
    riderId,
    driverId,
    amount,
    escrowStatus: "held",
  });
  await transaction.save();
  return transaction;
};

/**
 * Release funds to driver after ride completion
 * @param {String} transactionId - Transaction ID
 * @returns {Object} updated transaction
 */
const releaseFunds = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) throw new Error("Transaction not found");

  transaction.escrowStatus = "released";
  await transaction.save();
  return transaction;
};

/**
 * Refund funds to rider if ride is cancelled
 * @param {String} transactionId - Transaction ID
 * @returns {Object} updated transaction
 */
const refundFunds = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) throw new Error("Transaction not found");

  transaction.escrowStatus = "refunded";
  await transaction.save();
  return transaction;
};

/**
 * Apply cancellation fee to a transaction
 * @param {String} transactionId - Transaction ID
 * @param {Number} feeAmount - Fee amount
 * @returns {Object} updated transaction
 */
const applyCancellationFee = async (transactionId, feeAmount) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) throw new Error("Transaction not found");

  transaction.cancellationFeeApplied = true;
  transaction.cancellationFee = feeAmount;
  await transaction.save();
  return transaction;
};

module.exports = {
  holdFunds,
  releaseFunds,
  refundFunds,
  applyCancellationFee,
};
