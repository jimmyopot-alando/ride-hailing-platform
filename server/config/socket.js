// server/config/socket.js
const jwt = require("../utils/jwt"); // helper for verifying JWT

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    // Authenticate socket connection
    socket.on("authenticate", (token) => {
      try {
        const user = jwt.verifyToken(token);
        socket.user = user;
        console.log(`✅ Socket authenticated for user: ${user.id}`);
        socket.emit("auth-success");
      } catch (err) {
        console.error("❌ Socket authentication failed:", err.message);
        socket.emit("auth-error", "Invalid token");
        socket.disconnect();
      }
    });

    // Rider requests a ride
    socket.on("request-ride", (rideData) => {
      console.log("📍 Ride requested:", rideData);
      // TODO: Call matchingService to find nearest driver
      // Emit ride-offer to driver
    });

    // Driver updates location
    socket.on("update-location", (location) => {
      console.log("🚗 Driver location update:", location);
      // TODO: Update driver’s location in DB
      // Emit driver-location-update to rider if trip is active
    });

    // Trip lifecycle events
    socket.on("join-trip", (tripId) => {
      socket.join(tripId);
      console.log(`👥 User joined trip room: ${tripId}`);
    });

    socket.on("leave-trip", (tripId) => {
      socket.leave(tripId);
      console.log(`👋 User left trip room: ${tripId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

module.exports = initSocket;
