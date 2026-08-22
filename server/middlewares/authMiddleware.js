// server/middlewares/authMiddleware.js
const jwt = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded; // attach user payload (id, role) to request
    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
