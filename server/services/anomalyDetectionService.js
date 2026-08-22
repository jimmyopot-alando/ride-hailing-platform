// server/services/anomalyDetectionService.js
const Transaction = require("../models/Transaction");
const Ride = require("../models/Ride");

/**
 * Detect anomalies in transactions
 * Example: unusually high fare, repeated refunds, or multiple disputes
 * @param {Object} transaction - Transaction object
 * @returns {Array} anomalies - List of anomaly descriptions
 */
const detectTransactionAnomalies = (transaction) => {
  const anomalies = [];

  if (transaction.amount > 1000) {
    anomalies.push("High fare amount detected");
  }

  if (transaction.escrowStatus === "refunded" && transaction.refundCount > 3) {
    anomalies.push("Multiple refunds detected for this rider");
  }

  if (transaction.disputeStatus === "open") {
    anomalies.push("Transaction currently under dispute");
  }

  return anomalies;
};

/**
 * Detect anomalies in rides
 * Example: excessive cancellations, unusually long ride duration
 * @param {Object} ride - Ride object
 * @returns {Array} anomalies - List of anomaly descriptions
 */
const detectRideAnomalies = (ride) => {
  const anomalies = [];

  if (ride.status === "cancelled" && ride.cancellationCount > 5) {
    anomalies.push("Excessive ride cancellations detected");
  }

  if (ride.duration > 180) {
    anomalies.push("Unusually long ride duration detected");
  }

  if (ride.fare < 1) {
    anomalies.push("Suspiciously low fare detected");
  }

  return anomalies;
};

/**
 * Detect anomalies in driver behavior
 * Example: driver rejecting too many rides, or abnormal location changes
 * @param {Object} driver - Driver object
 * @returns {Array} anomalies - List of anomaly descriptions
 */
const detectDriverAnomalies = (driver) => {
  const anomalies = [];

  if (driver.rejectedRides > 10) {
    anomalies.push("Driver rejecting too many rides");
  }

  if (driver.locationHistory && driver.locationHistory.length > 50) {
    anomalies.push("Abnormal driver location changes detected");
  }

  return anomalies;
};

module.exports = {
  detectTransactionAnomalies,
  detectRideAnomalies,
  detectDriverAnomalies,
};
