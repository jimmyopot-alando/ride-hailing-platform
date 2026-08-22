// server/utils/geoUtils.js

/**
 * Convert degrees to radians
 * @param {Number} degrees
 * @returns {Number} radians
 */
const toRadians = (degrees) => (degrees * Math.PI) / 180;

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Number} lat1 - Latitude of point 1
 * @param {Number} lon1 - Longitude of point 1
 * @param {Number} lat2 - Latitude of point 2
 * @param {Number} lon2 - Longitude of point 2
 * @returns {Number} distance in kilometers
 */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Check if a point lies within a bounding box
 * @param {Object} point - { lat, lon }
 * @param {Object} bbox - { minLat, minLon, maxLat, maxLon }
 * @returns {Boolean}
 */
const isPointInBoundingBox = (point, bbox) => {
  return (
    point.lat >= bbox.minLat &&
    point.lat <= bbox.maxLat &&
    point.lon >= bbox.minLon &&
    point.lon <= bbox.maxLon
  );
};

/**
 * Convert GeoJSON Point to [lat, lon]
 * @param {Object} geoPoint - { type: "Point", coordinates: [lon, lat] }
 * @returns {Object} { lat, lon }
 */
const geoJSONToLatLon = (geoPoint) => {
  if (!geoPoint || geoPoint.type !== "Point") {
    throw new Error("Invalid GeoJSON Point");
  }
  return { lat: geoPoint.coordinates[1], lon: geoPoint.coordinates[0] };
};

module.exports = {
  haversineDistance,
  isPointInBoundingBox,
  geoJSONToLatLon,
};
