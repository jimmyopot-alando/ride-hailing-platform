// server/services/surgePricingService.js
const Zone = require("../models/Zone");

/**
 * Calculate surge multiplier for a ride based on zone conditions
 * @param {Object} pickupLocation - GeoJSON Point { type: "Point", coordinates: [lng, lat] }
 * @returns {Number} surgeMultiplier
 */
const calculateSurgeMultiplier = async (pickupLocation) => {
  try {
    // Find zone containing pickup location
    const zone = await Zone.findOne({
      boundaries: {
        $geoIntersects: {
          $geometry: pickupLocation,
        },
      },
    });

    if (!zone) {
      return 1.0; // default multiplier if no zone found
    }

    // Surge multiplier logic: base zone multiplier + demand factor
    let surgeMultiplier = zone.surgeMultiplier;

    // Example: if active drivers < 3, increase surge
    if (zone.activeDrivers.length < 3) {
      surgeMultiplier += 0.5;
    }

    // Example: if active rides in zone > 10, increase surge
    if (zone.activeRides && zone.activeRides.length > 10) {
      surgeMultiplier += 0.3;
    }

    return surgeMultiplier;
  } catch (error) {
    console.error("❌ Surge pricing error:", error.message);
    return 1.0; // fallback multiplier
  }
};

/**
 * Calculate final ride fare with surge pricing
 * @param {Number} baseFare - Base fare for the ride
 * @param {Object} pickupLocation - GeoJSON Point { type: "Point", coordinates: [lng, lat] }
 * @returns {Number} finalFare
 */
const calculateFareWithSurge = async (baseFare, pickupLocation) => {
  const surgeMultiplier = await calculateSurgeMultiplier(pickupLocation);
  return baseFare * surgeMultiplier;
};

module.exports = {
  calculateSurgeMultiplier,
  calculateFareWithSurge,
};
