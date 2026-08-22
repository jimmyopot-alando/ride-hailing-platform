// server/services/matchingService.js
const Driver = require("../models/Driver");
const Ride = require("../models/Ride");

/**
 * Find the nearest available driver for a ride request
 * @param {Object} ride - Ride object with pickup location
 * @returns {Object|null} - Matched driver or null if none found
 */
const findNearestDriver = async (ride) => {
  try {
    // Search for drivers who are online and available
    const drivers = await Driver.find({
      status: "online",
    });

    if (!drivers || drivers.length === 0) {
      return null;
    }

    // Calculate distance between pickup and each driver
    const pickupCoords = ride.pickupLocation.coordinates;

    let nearestDriver = null;
    let minDistance = Infinity;

    drivers.forEach((driver) => {
      if (driver.currentLocation && driver.currentLocation.coordinates) {
        const [lng, lat] = driver.currentLocation.coordinates;
        const distance = calculateDistance(pickupCoords[1], pickupCoords[0], lat, lng);

        if (distance < minDistance) {
          minDistance = distance;
          nearestDriver = driver;
        }
      }
    });

    return nearestDriver;
  } catch (error) {
    console.error("❌ Matching service error:", error.message);
    return null;
  }
};

/**
 * Haversine formula to calculate distance between two coordinates
 * @param {Number} lat1
 * @param {Number} lon1
 * @param {Number} lat2
 * @param {Number} lon2
 * @returns {Number} distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

module.exports = {
  findNearestDriver,
};
