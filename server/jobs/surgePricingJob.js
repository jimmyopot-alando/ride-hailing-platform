// server/jobs/surgePricingJob.js
const cron = require("node-cron");
const Zone = require("../models/Zone");

/**
 * Recalculate surge multipliers for all zones
 */
const recalculateSurgePricing = async () => {
  try {
    const zones = await Zone.find();

    for (const zone of zones) {
      let surgeMultiplier = 1.0;

      // Example logic: fewer drivers = higher surge
      if (zone.activeDrivers.length < 3) {
        surgeMultiplier += 0.5;
      }

      // Example logic: more rides = higher surge
      if (zone.activeRides && zone.activeRides.length > 10) {
        surgeMultiplier += 0.3;
      }

      zone.surgeMultiplier = surgeMultiplier;
      await zone.save();
    }

    console.log("✅ Surge pricing recalculated for all zones");
  } catch (error) {
    console.error("❌ Surge pricing job error:", error.message);
  }
};

// Schedule job to run every 5 minutes
cron.schedule("*/5 * * * *", () => {
  console.log("⏱ Running surge pricing job...");
  recalculateSurgePricing();
});

module.exports = recalculateSurgePricing;
